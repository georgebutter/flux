// Debugging
const colors = require('colors');
// Routing
const path = require('path');
const express = require('express');
const app = express();

// Authentication
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// File management
const fs = require('fs-extra');
const git = require('nodegit');
const repoDir = './client/theme';
const repoPath = path.resolve(repoDir);
const gitDir = 0;
var repo;
var gitIndex;

// Rendering
const Liquid = require('liquidjs');
const engine = Liquid({
  root: __dirname,
  extname: '.liquid'
});

// Data
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const Staff = require('./models/staff').Staff;
const Site = require('./models/site').Site;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/cms';
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('[db] Connected to database'.green);
});

// Middleware
const bodyParser = require('body-parser');
const validator = require('validator');

// General
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const siteHandle = process.env.SITE_HANDLE || 'georgebutter';

// Ensure that git has been setup for Themes
git.Repository.open(path.resolve(__dirname, repoDir))
.then(function(repoResult) {
  console.log('[git] Repository found'.blue);
  repo = repoResult;
})
.catch(function() {
  console.log('[git] Creating repository'.blue);
  // Create themes git
  // Ensure we have a themes directory
  fs.ensureDir(path.resolve(__dirname, repoDir))
  .then(function() {
    // Initialize repository
    return git.Repository.init(path.resolve(__dirname, repoDir), 0);
  })
  .then(function(repoResult) {
    repo = repoResult;
    return fs.writeFile(path.join(repo.workdir(), 'log.md'), `theme created: ${Date.now()}`);
  })
  .then(function(){
    return repo.refreshIndex();
  })
  .then(function(idx) {
    gitIndex = idx;
  })
  .then(function() {
    return gitIndex.addAll(['.']);
  })
  .then(function() {
    return gitIndex.write();
  })
  .then(function() {
    return gitIndex.writeTree();
  })
  .then(function(oid) {
    var author = git.Signature.now('George Butter',
      'threeninenineone@gmail.com');
    var committer = git.Signature.now('George Butter',
      'butsandcats@github.com');

    // Since we're creating an inital commit, it has no parents. Note that unlike
    // normal we don't get the head either, because there isn't one yet.
    return repo.createCommit("HEAD", author, committer, ":sparkles: Initial commit", oid, []);
  })
  .then(function(commitId) {
    console.log(`[git] New Commit: ${commitId}`.blue);
    repo.createBranch('master', commitId, true);
  })
});

console.log(`[status] Environment: ${env}`.grey)
if (env === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
}

// Sessions for tracking logins
app.use(session({
  secret: 'open up',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(`${__dirname}/client/theme/assets`));
app.use('/admin/assets', express.static(`${__dirname}/client/admin/assets`));

// Setup liquid rendering
app.engine('liquid', engine.express());
app.set('view engine', 'liquid');

// Get site data
Site.findOne(null, (err, site) => {
  this.site = site;
  this.installed = null;
  if (this.site) {
    this.installed = this.site.installed;
  }
  console.log(`[status] Installed: ${this.installed}`.grey)
  app.get('/admin/style-guide', (req, res, next) => {
    setViews('admin');

    res.render('style-guide', {
      site: this.site,
      page_title: 'Style guide',
      canonical_url: canoncalUrl(req),
      template: 'style-guide'
    });
  });

  if (this.installed) {
    app.get('/', (req, res) => {
      setViews('theme');

      res.render('index', {
        site: this.site,
        page_title: 'Index',
        canonical_url: canoncalUrl(req),
        template: 'index'
      });
    });

    app.get('/admin', (req, res, next) => {
      setViews('admin');
      const errors = [];
      Staff.findById(req.session.userId, (error, user) => {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            return res.render('login', {
              site: this.site,
              page_title: 'Admin',
              canonical_url: canoncalUrl(req),
              template: 'login',
              errors: errors,
              user: false
            });
          } else {
            return res.render('dashboard', {
              site: this.site,
              page_title: 'Dashboard',
              canonical_url: canoncalUrl(req),
              template: 'dashboard',
              errors: errors,
              user: user
            });
          }
        }
      });
    });

    app.post('/admin', (req, res, next) => {
      setViews('admin');
      const errors = [];
      Staff.authenticate(req.body.username, req.body.password, (error, user) => {
        if (error || !user) {
          errors.push({
            message: 'Username or password could not be found.'
          })
          return res.redirect('/admin');
        } else {
          req.session.userId = user._id;
          console.log('Logging in');
          return res.redirect('/admin');
        }
      });
    })

    app.get('/admin/themes', (req, res, next) => {
      setViews('admin');
      const errors = [];
      const site = this.site;
      // Get files list
      repo.getReferenceNames(1).then(function(branchRefs) {
        const themes = branchRefs.map((branchRef) => branchRef.replace('refs/heads/', ''))
        console.log(`[status] ${themes.join(', ')}`.grey);
        Staff.findById(req.session.userId, (error, user) => {
          if (error) {
            return next(error);
          } else {
            if (user === null) {
              return res.redirect('/admin');
            } else {
              return res.render('themes', {
                site: site,
                page_title: 'Themes',
                canonical_url: canoncalUrl(req),
                template: 'themes',
                errors: errors,
                user: user,
                themes: themes
              });
            }
          }
        });
      })
    })

    app.get('/admin/themes/:theme', (req, res, next) => {
      setViews('admin');
      const errors = [];
      const fileTree = {
        assets: [],
        layouts: [],
        templates: [],
        snippets: [],
      };
      git.Repository.open(path.resolve(__dirname, repoDir))
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
            if (user === null) {
              return res.redirect('/admin');
            } else {
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
          }
        });
      });
    });

    app.get('/admin/themes/:theme/:key/:file.json', (req, res, next) => {
      setViews('admin');
      const { theme, key, file } = req.params;
      console.log({ theme, key, file })
      git.Repository.open(path.resolve(__dirname, repoDir))
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

    })

    app.get('/admin/logout', (req, res, next) => {
      setViews('admin');

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
    });

  } else {
    app.get('/', (req, res) => {
      setViews('admin');
      res.redirect('/install');
    });

    app.get('/install', (req, res, next) => {
      setViews('admin');
      if (!this.site) {
        res.render('install', {
          site: this.site,
          page_title: 'Install - Create site',
          canonical_url: canoncalUrl(req),
          template: 'install',
          suffix: 'site',
          errors: null,
        });
      } else {
        res.render('install-admin', {
          site: this.site,
          page_title: 'Install - Create admin',
          canonical_url: canoncalUrl(req),
          template: 'install',
          suffix: 'admin',
          errors: null,
        });
      }
    });

    app.post('/install/site', (req, res, next) => {
      setViews('admin');
      if (this.site) {
        return res.render('error', {
          site: this.site,
          page_title: 'Install',
          canonical_url: canoncalUrl(req),
          errors: ['Site already created']
        });
      }
      const {
        name,
        description,
        email
      } = req.body;

      const form = {
        name,
        description,
        email
      };
      const errors = [];
      if (!name) {
        errors.push({
          message: 'Name cannot be blank',
          field: 'name',
        });
      }
      if (!description) {
        errors.push({
          message: 'Description cannot be blank',
          field: 'description',
        });
      }
      if (!email) {
        errors.push({
          message: 'Site email cannot be blank',
          field: 'email'
        });
      } else {
        if (!validator.isEmail(email)) {
          errors.push({
            message: 'Please provide a valid email address',
            field: 'email'
          });
        }
      }
      if (errors.length) {
        return res.render('install', {
          site: this.site,
          page_title: 'Install',
          canonical_url: canoncalUrl(req),
          template: 'install',
          suffix: 'site',
          errors: errors,
          form: form
        });
      } else {
        const siteData = {
          name: name,
          handle: name,
          description: description,
          email: email,
          form: form
        }

        console.log('[db] Saving site to database'.green)
        Site.create(siteData, (error, site) => {
          if (error) {
            errors.push({ message: error });
            return res.render('install', {
              site: this.site,
              page_title: 'Install',
              canonical_url: canoncalUrl(req),
              template: 'install',
              errors: errors
            });
          } else {
            this.site = site;
            return res.redirect('/install');
          }
        });
      }
    });

    app.post('/install/admin', (req, res, next) => {
      setViews('admin');

      const {
        username,
        email,
        password,
        confirm
      } = req.body;
      const form = {
        username,
        email,
        password,
        confirm
      };
      const errors = [];
      if (!username) {
        errors.push({
          message: 'Username cannot be blank',
          field: 'username'
        });
      }
      if (!email) {
        errors.push({
          message: 'Email cannot be blank',
          field: 'email'
        });
      } else if (!validator.isEmail(email)) {
        errors.push({
          message: 'Please provide a valid email address',
          field: 'email'
        });
      }
      if (!password) {
        errors.push({
          message: 'Password cannot be blank',
          field: 'password'
        });
      } else {
        if (password.length < 6) {
          errors.push({
            message: 'Password must be at least 6 characters',
            field: 'password'
          });
        }
      }
      if (password !== confirm) {
        errors.push({
          message: `Passwords don't match`,
          field: 'confirm'
        });
      }
      if (errors.length) {
        return res.render('install', {
          site: this.site,
          page_title: 'Install - Create admin',
          canonical_url: canoncalUrl(req),
          template: 'install',
          suffix: 'admin',
          errors: errors,
          form: form
        });
      } else {
        const userData = {
          email: email,
          password: password,
          username: username,
          confirm: confirm
        }
        Staff.create(userData, (error, user) => {
          if (error) {
            return res.render('install', {
              site: this.site,
              page_title: 'Install',
              template: 'install',
              canonical_url: canoncalUrl(req),
              errors: [error]
            });
          } else {
            req.session.userId = user._id;
            this.installed = true;
            Site.updateOne({}, {$set: {"installed": true}}, () => {
              console.log('[db] Updated site to installed'.green);
              return res.redirect('/admin');
            })

          }
        });
      }
    });
  }

  app.get('/admin/delete', (req, res, next) => {
    setViews('admin');

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
          this.site = null;
          this.installed = null;
          return res.redirect('/install');
        })

      })

    })
  });

  app.get('*', (req, res) => {
    setViews('theme');
    return res.render('error', {
      site: this.site,
      page_title: '404',
      canonical_url: canoncalUrl(req),
      error: '404 - Page not found'
    });
  })
});

// Listen on port
app.listen(port, () => console.log(`[status] Site is live! 🚀`.grey));

function canoncalUrl(req) {
  return `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`;
}

function setViews(v) {
  app.set('views', [
    `${__dirname}/client/${v}/layouts`,
    `${__dirname}/client/${v}/templates`,
    `${__dirname}/client/${v}/snippets`
  ]);
}
