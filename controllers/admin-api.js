const { App } = require('../models/app');
const { Staff } = require('../models/staff');
const { Collection } = require('../models/collection');
const { Permalink } = require('../models/permalink');
const { Item } = require('../models/item');


const fs = require('fs-extra');
const path = require('path');
const git = require('nodegit');
const repoDir = './client/theme';

exports.putThemeFile = (req, res, next) => {
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
        return fs.outputFile(filePath, data);
      })
      .then(() => {
        gfs.remove({ filename: `${dir}/${file}`}, function (err, gridStore) {
          if (err) throw err
        });
        const writestream = gfs.createWriteStream({
          filename: `${dir}/${file}`
        });
        fs.createReadStream(filePath).pipe(writestream);
        writestream.on('close', file => {
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

exports.getThemes = (req, res, next) => {
  const site = req.app.get('site');
  const repo = req.app.get('repo');
  // Get branch list
  repo.getReferenceNames(1).then(function(branchRefs) {
    const themes = branchRefs.map((branchRef) => branchRef.replace('refs/heads/', ''))
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

exports.getThemeFiles = (req, res) => {
  App.authenticate(req.body.key, req.body.password, (error, app) => {
    if (error || !app) {
      return res.json({
        status: 'error: Could not establish a connection'
      });
    } else {
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

exports.getFile = (req, res, next) => {
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

exports.getCollection = (req, res) => {
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      const limit = 50;
      const ids = req.params.ids;
      const query = {}
      if (ids) {
        const idarr = ids.split(',');
        const objectIds = [];
        for (var i = 0; i < idarr.length; i++) {
          objectIds.push(idarr[i])
        }
        query._id = {
          $in: objectIds
        }
      }
      Collection
      .find(query)
      .limit(limit)
      .populate('permalink')
      .exec(function(err, collections) {
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

exports.postUpdateCollection = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
    permalink
  } = req.body;
  const form = {
    title,
    handle,
    permalink
  }
  if (!title) {
    errors.push({
      message: 'Please provide a collection title',
      field: 'title'
    });
  }
  if (!handle) {
    errors.push({
      message: 'Handle cannot be blank',
      field: 'handle'
    });
  }
  if (!permalink) {
    errors.push({
      message: 'Permalink cannot be blank',
      field: 'permalink'
    });
  }

  if (errors.length) {
    return res.json({
      status: 'error',
      errors
    });
  } else {
    Permalink.updateOne({ object: req.params.id }, {
      $set: {
        permalink: req.body.permalink
      }
    }).then(linkResult => {
      Collection.updateOne({ _id: req.params.id }, {
        $set: {
          title: req.body.title,
          handle: req.body.handle,
        }
      }).then(collectionResult => {
        return res.json({
          status: 'success',
          collection: collectionResult
        });
      });
    })
  }
}

exports.postCreateCollection = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
    permalink
  } = req.body;
  const form = {
    title,
    handle,
    permalink
  }
  if (!title) {
    errors.push({
      message: 'Please provide an collection name',
      field: 'title'
    });
  }
  if (!handle) {
    errors.push({
      message: 'Please provide an collection handle',
      field: 'handle'
    });
  }
  if (!permalink) {
    errors.push({
      message: 'Please provide an collection permalink',
      field: 'permalink'
    });
  }
  if (permalink.startsWith('/admin')) {
    errors.push({
      message: 'Permalink cannot start with /admin',
      field: 'permalink'
    })
  }
  if (permalink.startsWith('/install')) {
    errors.push({
      message: 'Permalink cannot start with /install',
      field: 'permalink'
    })
  }
  if (errors.length) {
    return res.json({
      status: 'error',
      errors,
      form
    })
  } else {
    Permalink.create({
      permalink: permalink,
      objectModel: 'Collection',
    }, (error, link) => {
      if (error) {
        return res.json({
          status: 'error',
          errors: [{
            message: error.errmsg,
            field: 'permalink'
          }],
          form
        })
      }
      Collection.create({
        title: title,
        handle: handle,
        permalink: link._id
      }, (error, collection) => {
        Permalink.updateOne({
          _id: link._id
        }, {
          $set: {
            object: collection._id,
          }
        }).then((result) => {
          if (error) {
            return res.json({
              status: 'error',
              errors: [{
                message: error.errmsg,
                field: 'permalink'
              }],
              form,
            });
          } else {
            return res.json({
              status: 'success',
              collection,
            });
          }
        });
      });
    });
  }
};

exports.deleteCollection = (req, res) => {
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      Permalink.deleteOne({ object: req.params.id }, (err) => {
        if (err) {
          return res.sendStatus(500);
        }
        Collection.deleteOne({ _id: req.params.id }, (err) => {
          if (err) {
            return res.sendStatus(500);
          } else {
            return res.json({
              status: 'success',
            });
          }
        });
      });
    } else {
      return res.json({
        status: 'error',
        errors: [{
          message: 'Inactive session',
        }],
      });
    }
  });
};

exports.getItems = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  Item.getManyFlat({}, function(err, items) {
    if (err) {
      errors.push(err)
      return res.json({
        status: 'error',
        errors
      });
    }
    Staff.findById(req.session.userId, (error, user) => {
      if (user) {
        return res.json({
          status: 'success',
          items: items
        });
      } else {
        return res.json({
          status: 'error',
          errors: [{
            message: 'Inactive session'
          }]
        });
      }
    });
  })
}
