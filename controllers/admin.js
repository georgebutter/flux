const { Staff } = require('../models/staff');
const { Site } = require('../models/site');
const { App } = require('../models/app');

const path = require('path');
const git = require('nodegit');
const uuidV4 = require('uuid/v4');
const validator = require('validator');
const colors = require('colors');

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
  App.find({}, function(err, apps) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('apps', {
            site: site,
            page_title: 'Apps',
            canonical_url: canoncalUrl(req),
            template: 'apps',
            errors: errors,
            user: user,
            apps: apps
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getApp = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  App.findById(req.params.id, function(err, app) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('app', {
            site: site,
            page_title: 'Apps',
            canonical_url: canoncalUrl(req),
            template: 'app',
            errors: errors,
            user: user,
            app: app
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getAppsCreate = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  const form = {};
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('apps', {
        site: site,
        page_title: 'Create a new app',
        canonical_url: canoncalUrl(req),
        template: 'create-app',
        errors: errors,
        user: user,
        form: form
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

exports.getThemesJson = (req, res, next) => {
  setViews(req.app);
  const errors = [];
  const site = req.app.get('site');
  const repo = req.app.get('repo');
  // Get branch list
  repo.getReferenceNames(1).then(function(branchRefs) {
    const themes = branchRefs.map((branchRef) => branchRef.replace('refs/heads/', ''))
    console.log(`[status] ${themes.join(', ')}`.grey);
    App.authenticate(req.body.key, req.body.password, (error, user) => {
      if (error || !user) {
        return res.json({
          status: 'error: Could not establish a connection'
        });
      } else {
        return res.json({
          status: 'success',
          themes
        });
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



exports.getFile = (req, res, next) => {
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
    return res.send(blob.toString());
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

exports.postCreateApp = (req, res) => {
  console.log('[route] POST /admin/apps/create'.cyan)
  const site = req.app.get('site');
  const errors = [];
  const {
    name,
    email,
    themes
  } = req.body;
  const form = {
    name,
    email,
    themes
  }
  if (!name) {
    errors.push({
      message: 'Please provide an app name',
      field: 'name'
    });
  }
  if (!email) {
    errors.push({
      message: 'Please provide an emergency developer email',
      field: 'email'
    });
  } else if (!validator.isEmail(email)) {
    errors.push({
      message: 'Please provide a valid email address',
      field: 'email'
    });
  }
  if (themes !== 'none' && themes !== 'read' && themes !== 'readwrite') {
    errors.push({
      message: 'Invalid permissions for themes',
      field: 'themes'
    })
  }
  const key = uuidV4();
  const password = uuidV4();
  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setViews(req.app);
      return res.render('apps', {
        site: site,
        page_title: 'Create a new app',
        canonical_url: canoncalUrl(req),
        template: 'create-app',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    console.log('[status] Creating new app'.grey)
    App.create({
      name,
      email,
      key,
      password,
      themes
    }, (error, app) => {
      console.error(error)
      if (error) {
        errors.push({ message: error });
        Staff.findById(req.session.userId, (error, user) => {
          setViews(req.app);
          return res.render('apps', {
            site: site,
            page_title: 'Create a new app',
            canonical_url: canoncalUrl(req),
            template: 'create-app',
            errors: errors,
            user: user,
            form: form
          });
        });
      } else {
        return res.redirect('/admin/apps');
      }
    });
  }
}

exports.postUpdateApp = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    name,
    email,
    themes
  } = req.body;
  const form = {
    name,
    email,
    themes
  }
  if (!name) {
    errors.push({
      message: 'Please provide an app name',
      field: 'name'
    });
  }
  if (!email) {
    errors.push({
      message: 'Please provide an emergency developer email',
      field: 'email'
    });
  } else if (!validator.isEmail(email)) {
    errors.push({
      message: 'Please provide a valid email address',
      field: 'email'
    });
  }
  if (themes !== 'none' && themes !== 'read' && themes !== 'readwrite') {
    errors.push({
      message: 'Invalid permissions for themes',
      field: 'themes'
    })
  }
  if (errors.length) {
    App.findById(req.params.id, function(err, app) {
      if (err) {
        throw err;
      } else {
        Staff.findById(req.session.userId, (error, user) => {
          if (user) {
            setViews(req.app);
            return res.render('app', {
              site: site,
              page_title: 'Apps',
              canonical_url: canoncalUrl(req),
              template: 'app',
              errors: errors,
              user: user,
              app: app
            });
          } else {
            return res.redirect('/admin');
          }
        });
      }
    });
  } else {
    console.log(req.params)
    App.updateOne({ _id: req.params.id }, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        themes: req.body.themes
      }
    }).then(result => {
      return res.redirect('/admin/apps/' + req.params.id);
    });
  }
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
