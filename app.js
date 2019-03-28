// Routing
const path = require('path');
const express = require('express');
const app = express();

// Authentication
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Rendering
const Liquid = require('liquidjs');
const engine = Liquid({
  root: __dirname,
  extname: '.liquid'
});

// Data
const mongoose = require('mongoose');
const Staff = require('./models/staff').Staff;
const Site = require('./models/site').Site;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/cms';
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database');
});

// Middleware
const bodyParser = require('body-parser');

// General
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const siteHandle = process.env.SITE_HANDLE || 'georgebutter';
console.log(`Environment: ${env}`)
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
  console.log(`installed; ${this.installed}`)
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

      console.log(`installed: ${this.installed}`);
      console.log(req.session.userId);
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
              user: false
            });
          } else {
            console.log(user)
            return res.render('dashboard', {
              site: this.site,
              page_title: 'Dashboard',
              canonical_url: canoncalUrl(req),
              template: 'dashboard',
              user: user
            });
          }
        }
      });
    });

    app.post('/admin', (req, res, next) => {
      Staff.authenticate(req.body.username, req.body.password, (error, user) => {
        if (error || !user) {
          var err = new Error('Wrong username or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/admin');
        }
      });
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
      res.redirect('/install');
    });

    app.get('/install', (req, res, next) => {
      setViews('admin');

      if (!this.site) {
        console.log('install');
        res.render('install', {
          site: this.site,
          page_title: 'Install - Create site',
          canonical_url: canoncalUrl(req),
          template: 'install',
          errors: null,
        });
      } else {
        console.log('install-admin');
        res.render('install-admin', {
          site: this.site,
          page_title: 'Install - Create admin',
          canonical_url: canoncalUrl(req),
          template: 'install',
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
      }
      console.log(errors)
      if (errors.length) {
        return res.render('install', {
          site: this.site,
          page_title: 'Install',
          canonical_url: canoncalUrl(req),
          template: 'install',
          errors: errors
        });
      } else {
        const siteData = {
          name: name,
          handle: name,
          description: description,
          email: email
        }

        console.log('saving site to database')
        Site.create(siteData, (error, site) => {
          if (error) {
            errors.push({ message: error });
            return res.render('install', {
              site: this.site,
              page_title: 'Install',
              canonical_url: canoncalUrl(req),
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
        console.log('errors');
        console.log(errors);
        return res.render('install-admin', {
          site: this.site,
          page_title: 'Install - Create admin',
          canonical_url: canoncalUrl(req),
          errors: errors
        });
      } else {
        const userData = {
          email: email,
          password: password,
          username: username,
          confirm: confirm
        }
        Staff.create(userData, (error, user) => {
          console.log(user)
          if (error) {
            return res.render('install-admin', {
              site: this.site,
              page_title: 'Install',
              canonical_url: canoncalUrl(req),
              errors: [error]
            });
          } else {
            req.session.userId = user._id;
            console.log('setting installed to true')
            this.installed = true;
            Site.updateOne({}, {$set: {"installed": true}}, () => {
              console.log('updated site to installed')
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
      console.log('staff deleted')
      if (err) {
        console.error(err);
        return res.send(JSON.stringify(err));
      }
      console.log('deleting site')
      Site.deleteMany({}, (error) => {
        console.log('site deleted')
        if (error) {
          return res.send(JSON.stringify(error));
        }
        Site.findOne({}, (err, site) => {
          if (err) {
            return res.send(JSON.stringify(err));
          }
          console.log('redirecting to /install')
          this.site = null;
          return res.redirect('/install');
        })

      })

    })
  });

  app.get('*', (req, res) => {
    setViews('theme');
    console.log(req.url)
    return res.render('error', {
      site: this.site,
      page_title: '404',
      canonical_url: canoncalUrl(req),
      error: '404 - Page not found'
    });
  })
});

// Listen on port
app.listen(port, () => console.log(`George Butter site is live! 🚀`));

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
