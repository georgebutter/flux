const { Site } = require('../models/site');
const { Staff } = require('../models/staff');
const { App } = require('../models/app');
const { Collection } = require('../models/collection');
const { Navigation } = require('../models/navigation');
const { Item } = require('../models/item');

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

exports.getItems = (req, res) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Item.find({}, function(err, items) {
    console.log(items)
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('admin', {
            site: site,
            page_title: 'Items',
            canonical_url: canoncalUrl(req),
            template: 'items',
            errors: errors,
            user: user,
            items: items
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  })
}

exports.getItemsCreate = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  const form = {};
  console.log(`[status] GET item create`)
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('admin', {
        site: site,
        page_title: 'Create a new item',
        canonical_url: canoncalUrl(req),
        template: 'create-item',
        errors: errors,
        user: user,
        form: form
      });
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.postCreateItem = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
  } = req.body;
  const form = {
    title,
    handle
  }
  const collections = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (key !== 'title' && key !== 'handle') {
      const [colKey, i] = key.split('-');
      const index = Number(i);
      collections[index] = collections[index] || {};
      collections[index][colKey] = value;
      if (value === '') {
        errors.push({
          message: `${colKey.charAt(0).toUpperCase() + colKey.slice(1)} cannot be blank`,
          field: key
        });
      }
    }
  }
  form.collections = collections;
  if (!title) {
    errors.push({
      message: 'Please provide an item title',
      field: 'title'
    });
  }
  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setViews(req.app);
      return res.render('admin', {
        site: site,
        page_title: 'Create a new item',
        canonical_url: canoncalUrl(req),
        template: 'create-item',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    Item.create({
      title,
      handle,
      collections
    }, (error, item) => {
      if (error) {
        errors.push({ message: error.errmsg });
        Staff.findById(req.session.userId, (error, user) => {
          setViews(req.app);
          return res.render('admin', {
            site: site,
            page_title: 'Create a new item',
            canonical_url: canoncalUrl(req),
            template: 'create-item',
            errors: errors,
            user: user,
            form: form
          });
        });
      } else {
        return res.redirect('/admin/items');
      }
    });
  }
}

exports.getCollections = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Collection.find({}, function(err, collections) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('collections', {
            site: site,
            page_title: 'Collections',
            canonical_url: canoncalUrl(req),
            template: 'collections',
            errors: errors,
            user: user,
            collections: collections
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getCollection = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  console.log(`[status] GET collection`)

  Collection.findById({ _id: req.params.id}, function(err, collection) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('admin', {
            site,
            page_title: 'Collection',
            canonical_url: canoncalUrl(req),
            template: 'collection',
            errors,
            user,
            collection
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getCollectionsCreate = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  const form = {};
  console.log(`[status] GET collection create`)
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('create-collection', {
        site: site,
        page_title: 'Create a new collection',
        canonical_url: canoncalUrl(req),
        template: 'create-collection',
        errors: errors,
        user: user,
        form: form
      });
    } else {
      return res.redirect('/admin');
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
    setViews(req.app);
    Collection.findById({ _id: req.params.id}, function(err, collection) {
      if (err) {
        throw err;
      } else {
        Staff.findById(req.session.userId, (error, user) => {
          if (user) {
            return res.render('admin', {
              site,
              page_title: 'Collection',
              canonical_url: canoncalUrl(req),
              template: 'collection',
              errors,
              user,
              collection
            });
          } else {
            return res.redirect('/admin');
          }
        });
      }
    });
  } else {
    Collection.updateOne({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        handle: req.body.handle,
        permalink: req.body.permalink
      }
    }).then(result => {
      return res.redirect('/admin/collections');
    });

  }
}

exports.getNavigations = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Navigation.find({}, function(err, navigation) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('navigation', {
            site: site,
            page_title: 'Navigation',
            canonical_url: canoncalUrl(req),
            template: 'navigation',
            errors: errors,
            user: user,
            navigation: navigation
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getNavigation = (req, res, next) => {
  setViews(req.app);
  console.log(req.params.id)
  const site = req.app.get('site');
  const errors = [];
  Navigation.findById(req.params.id, function(err, navigation) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('navigation', {
            site: site,
            page_title: 'Navigation',
            canonical_url: canoncalUrl(req),
            template: 'nav',
            errors: errors,
            user: user,
            navigation: navigation
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getNavigationCreate = (req, res, next) => {
  setViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  const form = {};
  console.log(`[status] GET navigation create`)
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('create-navigation', {
        site: site,
        page_title: 'Create a new navigation',
        canonical_url: canoncalUrl(req),
        template: 'create-navigation',
        errors: errors,
        user: user,
        form: form
      });
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.postCreateNavigation = (req, res) => {
  console.log('[route] POST /admin/navigation/create'.cyan)
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle
  } = req.body;
  const form = {
    title,
    handle
  }
  const links = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (key !== 'title' && key !== 'handle') {
      const [linkKey, i] = key.split('-');
      const index = Number(i);
      links[index] = links[index] || {};
      links[index][linkKey] = value;
      if (value === '') {
        errors.push({
          message: `${linkKey.charAt(0).toUpperCase() + linkKey.slice(1)} cannot be blank`,
          field: key
        });
      }
    }
  }
  form.links = links;
  if (!title) {
    errors.push({
      message: 'Please provide an navigation title',
      field: 'title'
    });
  }
  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setViews(req.app);
      return res.render('create-navigation', {
        site: site,
        page_title: 'Create a new navigation',
        canonical_url: canoncalUrl(req),
        template: 'create-navigation',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    Navigation.create({
      title,
      handle,
      links
    }, (error, navigation) => {
      if (error) {
        errors.push({ message: error });
        Staff.findById(req.session.userId, (error, user) => {
          setViews(req.app);
          return res.render('create-navigation', {
            site: site,
            page_title: 'Create a new navigation',
            canonical_url: canoncalUrl(req),
            template: 'create-navigation',
            errors: errors,
            user: user,
            form: form
          });
        });
      } else {
        return res.redirect('/admin/navigation');
      }
    });
  }
}

exports.deleteNavigation = (req, res) => {
  Staff.findById(req.session.userId, (error, user) => {
    setViews(req.app);
    if (user) {
      Navigation.deleteOne({ _id: req.params.id}, (err) => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    } else {
      return res.redirect('/admin');
    }
  })
}

exports.postUpdateNavigation = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle
  } = req.body;
  const form = {
    title,
    handle
  }
  if (!title) {
    errors.push({
      message: 'Please provide an navigation title',
      field: 'title'
    });
  }

  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setViews(req.app);
      return res.render('create-navigation', {
        site: site,
        page_title: 'Create a new navigation',
        canonical_url: canoncalUrl(req),
        template: 'create-navigation',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    console.log('[status] Updating navigation'.grey)
    const links = [];
    for (let [key, value] of Object.entries(req.body)) {
      if (key !== 'title' && key !== 'handle') {
        const [linkKey, i] = key.split('-');
        const index = Number(i);
        links[index] = links[index] || {};
        links[index][linkKey] = value;
      }
    }
    Navigation.updateOne({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        handle: req.body.handle,
        links: links
      }
    }).then(result => {
      return res.redirect(`/admin/navigation/${req.params.id}`);
    });
  }
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

exports.postCreateCollection = (req, res) => {
  console.log('[route] POST /admin/collecions/create'.cyan)
  console.log(req.body)
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
    permalink
  } = req.body;
  console.log(req.body)
  const form = {
    title,
    handle,
    permalink
  }
  if (!title) {
    errors.push({
      message: 'Please provide an collection name',
      field: 'name'
    });
  }
  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setViews(req.app);
      return res.render('create-collection', {
        site: site,
        page_title: 'Create a new collection',
        canonical_url: canoncalUrl(req),
        template: 'create-collection',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    console.log('[status] Creating new collection'.grey)
    Collection.create(req.body, (error, app) => {
      console.error(error)
      if (error) {
        errors.push({ message: error });
        Staff.findById(req.session.userId, (error, user) => {
          setViews(req.app);
          return res.render('create-collection', {
            site: site,
            page_title: 'Create a new collection',
            canonical_url: canoncalUrl(req),
            template: 'create-collection',
            errors: errors,
            user: user,
            form: form
          });
        });
      } else {
        return res.redirect('/admin/collections');
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
