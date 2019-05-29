const Staff = require('../models/staff').Staff;
const Site = require('../models/site').Site;

const path = require('path');
const git = require('nodegit');
const repoDir = './client/theme';

exports.getStyleGuide = (req, res, next) => {
  setViews(req.app);
  res.render('style-guide', {
    site: req.app.get('site'),
    page_title: 'Style guide',
    canonical_url: canoncalUrl(req),
    template: 'style-guide'
  });
}

exports.getDashboard = (req, res, next) => {
  if (!req.app.get('installed')) {
    return res.redirect('/install')
  }
  setViews(req.app);
  const errors = [];
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('dashboard', {
        site: req.app.get('site'),
        page_title: 'Dashboard',
        canonical_url: canoncalUrl(req),
        template: 'dashboard',
        errors: errors,
        user: user
      });
    } else {
      return res.render('login', {
        site: req.app.get('site'),
        page_title: 'Admin',
        canonical_url: canoncalUrl(req),
        template: 'login',
        errors: errors,
        user: false
      });
    }
  });
}

exports.getUsers = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('users', {
        site: site,
        page_title: 'Users',
        canonical_url: canoncalUrl(req),
        template: 'users',
        errors: errors,
        user: user,
      });
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.getApps = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('apps', {
        site: site,
        page_title: 'Apps',
        canonical_url: canoncalUrl(req),
        template: 'apps',
        errors: errors,
        user: user,
      });
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.getSettings = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('settings', {
        site: site,
        page_title: 'Settings',
        canonical_url: canoncalUrl(req),
        template: 'settings',
        errors: errors,
        user: user,
      });
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.getThemes = (req, res, next) => {
  setViews(req.app);
  const errors = [];
  const site = req.app.get('site');
  const repo = req.app.get('repo');
  // Get files list
  repo.getReferenceNames(1).then(function(branchRefs) {
    const themes = branchRefs.map((branchRef) => branchRef.replace('refs/heads/', ''))
    console.log(`[status] ${themes.join(', ')}`.grey);
    Staff.findById(req.session.userId, (error, user) => {
      if (user) {
        return res.render('themes', {
          site: site,
          page_title: 'Themes',
          canonical_url: canoncalUrl(req),
          template: 'themes',
          errors: errors,
          user: user,
          themes: themes
        });
      } else {
        return res.redirect('/admin');
      }
    });
  })
}

exports.getTheme = (req, res, next) => {
  setViews(req.app);
  const errors = [];
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
    // `walk()` returns an event.
    var walker = tree.walk();
    walker.on('entry', function(entry) {
      const paths = entry.path().split('/')
      if (paths.length === 2) {
        const parent = paths[0];
        const child = paths[1]
        fileTree[parent].push(child);
      }
    });
    walker.start();
  })
  .done(function() {
    Staff.findById(req.session.userId, (error, user) => {
      if (error) {
        return next(error);
      } else {
        if (user) {
          return res.render('theme', {
            site: site,
            page_title: 'Theme',
            canonical_url: canoncalUrl(req),
            template: 'theme',
            errors: errors,
            user: user,
            theme: req.params.theme,
            fileTree: fileTree
          });
        }
        return res.redirect('/admin');
      }
    });
  });
}

exports.deleteSite = (req, res, next) => {
  Staff.deleteMany({}, (err) => {
    console.log('[db] staff deleted'.green);
    if (err) {
      console.error(err);
      return res.send(JSON.stringify(err));
    }
    Site.deleteMany({}, (error) => {
      console.log('[db] Site deleted'.green);
      if (error) {
        return res.send(JSON.stringify(error));
      }
      Site.findOne({}, (err, site) => {
        if (err) {
          return res.send(JSON.stringify(err));
        }
        req.app.set('site', null);
        req.app.set('installed', null);
        return res.redirect('/install');
      })
    })

  })
}

exports.getFileJson = (req, res, next) => {
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
      url: `${key}/${file}`,
      format: `${file.split('.')[1]}`,
      file: blob.toString()
    });
  })
  .done();
}

exports.logout = (req, res, next) => {
  if (req.session) {
    // Delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
  return res.redirect('/');
}

exports.postLogin = (req, res) => {
  const errors = [];
  Staff.authenticate(req.body.username, req.body.password, (error, user) => {
    if (error || !user) {
      errors.push({
        message: 'Username or password could not be found.'
      })
      return res.redirect('/admin');
    } else {
      req.session.userId = user._id;
      return res.redirect('/admin');
    }
  });
}

exports.get404 = (req, res) => {
  setViews(req.app);
  return res.render('404', {
    site: req.app.get('site'),
    page_title: '404',
    canonical_url: canoncalUrl(req),
    template: '404',
    errors: ['404 - Page not found']
  });
}

function canoncalUrl(req) {
  return `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`;
}

function setViews(app) {
  app.set('views', [
    path.resolve(`./client/admin/layouts`),
    path.resolve(`./client/admin/templates`),
    path.resolve(`./client/admin/snippets`),
  ]);
}
