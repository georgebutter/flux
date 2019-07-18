const { App } = require('../models/app');
const { Staff } = require('../models/staff');
const { Collection } = require('../models/collection');
const fs = require('fs-extra');
const path = require('path');
const git = require('nodegit');
const colors = require('colors');
const repoDir = './client/theme';

exports.putThemeFileJson = (req, res, next) => {
  console.log(`[route] PUT theme file json`.cyan)
  const { key, password, content, attachment } = req.body;
  const { theme, dir, file } = req.params;

  App.authenticate(key, password, (error, app) => {
    if (error || !app) {
      return res.json({
        status: 'error: Could not establish a connection'
      });
    }
    if (app.themes !== 'readwrite') {
      return res.json({
        status: 'error: This app does not have permission to read themes'
      });
    }
    if (dir !== 'layouts' && dir !== 'snippets' && dir !== 'templates' && dir !== 'assets') {
      return res.json({
        status: 'error: Invalid file directory'
      })
    }
    const gfs = req.app.get('gfs');
    const filePath = path.join(path.resolve(repoDir), `${dir}/${file}`);
    const split = file.split('.');
    const format = split[split.length - 1];
    let data;
    if (format === 'png' || format === 'jpg' || format === 'ico' || format === 'woff' || format === 'woff2' || format === 'eot' || format === 'ttf') {
      if (attachment) {
        data = new Buffer.from(attachment, 'base64');
      } else {
        return res.json({
          status: 'error: No attachment provided'
        })
      }
    } else {
      data = content;
    }
    fs.ensureDir(path.resolve(repoDir))
    .then(() => {
      console.log(`[status] confirmed directory at ${path.resolve(repoDir)}`.grey)
      return fs.outputFile(filePath, data);
    })
    .then(() => {
      console.log(`[status] written file at ${filePath}`.grey)
      gfs.remove({ filename: `${dir}/${file}`}, function (err, gridStore) {
        if (err) return console.log(err);
      });
      const writestream = gfs.createWriteStream({
        filename: `${dir}/${file}`
      });
      fs.createReadStream(filePath).pipe(writestream);
      writestream.on('close', file => {
        console.log(`[status] ${file.filename} written to db`);
        console.log(`[files] New file uploaded`.blue);

        return res.json({
          status: 'success'
        })
      })
    })
    .catch(err => {
      console.error(`[files] Could not write to file ${filePath}`.red)
      console.error(err);
    });
  });
}

exports.getThemesJson = (req, res, next) => {
  const site = req.app.get('site');
  const repo = req.app.get('repo');
  // Get branch list
  repo.getReferenceNames(1).then(function(branchRefs) {
    const themes = branchRefs.map((branchRef) => branchRef.replace('refs/heads/', ''))
    console.log(`[status] ${themes.join(', ')}`.grey);
    App.authenticate(req.body.key, req.body.password, (error, app) => {
      if (error || !app) {
        return res.json({
          status: 'error: Could not establish a connection'
        });
      } else {
        if (app.themes === 'none') {
          return res.json({
            status: 'error: This app does not have permission to read themes'
          });
        } else {
          return res.json({
            status: 'success',
            themes
          });
        }
      }
    });
  })
}

exports.getThemeFilesJson = (req, res) => {
  console.log('[status] Getting theme json')
  App.authenticate(req.body.key, req.body.password, (error, app) => {
    if (error || !app) {
      return res.json({
        status: 'error: Could not establish a connection'
      });
    } else {
      console.log('[status] App authenticated'.grey)
      const site = req.app.get('site');
      const fileTree = {
        assets: [],
        layouts: [],
        templates: [],
        snippets: [],
      };
      git.Repository.open(path.resolve(repoDir))
      .then(function(repo) {
        return repo.getMasterCommit();
      })
      .then(function(firstCommitOnMaster) {
        return firstCommitOnMaster.getTree();
      })
      .then(function(tree) {
        return new Promise(resolve => {
          const walker = tree.walk();
          walker.on('entry', entry => {
            const paths = entry.path().split('/')
            if (paths.length === 2) {
              const parent = paths[0];
              const child = paths[1]
              fileTree[parent].push(child);
            }
          });
          walker.on('end', trees => {
            resolve(fileTree)
          })
          walker.start();
        })
      })
      .done(function() {
        if (app.themes === 'none') {
          return res.json({
            status: 'error: This app does not have permission to read themes'
          });
        } else {
          return res.json({
            status: 'success',
            theme: fileTree
          });
        }
      });
    }
  });
}

exports.getFileJson = (req, res, next) => {
  App.authenticate(req.body.key, req.body.password, (error, app) => {
    if (error || !app) {
      return res.json({
        status: 'error: Could not establish a connection'
      });
    } else {
      const { theme, key, file } = req.params;
      git.Repository.open(path.resolve(repoDir))
      .then(function(repo) {
        return repo.getMasterCommit();
      })
      .then(function(commit) {
        return commit.getEntry(`${key}/${file}`);
      })
      .then(function(entry) {
        _entry = entry;
        return _entry.getBlob();
      })
      .then(function(blob) {
        return res.json({
          status: 'success',
          file: blob.toString()
        });
      })
      .done();
    }
  });
}

exports.getCollectionJson = (req, res) => {
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      const limit = 50;
      const ids = req.params.ids;
      const query = {}
      if (ids) {
        const idarr = ids.split(',');
        const objectIds = [];
        for (var i = 0; i < idarr.length; i++) {
          objectIds.push(ObjectId(idarr[i]))
        }
        query._id = {
          $in: objectIds
        }
      }
      Collection.find(query).limit(limit).exec(function(err, collections) {
        if (err) {
          return res.json({
            status: 'error',
            message: 'Query error',
            error: err
          });
        }
        return res.json({
          status: 'success',
          collections
        });
      });
    } else {
      return res.json({
        status: 'error',
        message: 'Inactive session'
      });
    }
  });
}
