// Routing
var express = require('express');
var app = express();

// Authentication
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Rendering
var expressLiquid = require('express-liquid');

// Data
var mongoose = require('mongoose');
var Staff = require('./models/staff').Staff;

mongoose.connect('mongodb://localhost/testForAuth');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database');
});

// Middleware
var bodyParser = require('body-parser');

// General
var port = 49152;

// Sessions for tracking logins
app.use(session({
  secret: 'open up',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


// Global templating
var site = {
  name: 'George Butter',
}

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup liquid rendering
var options = {
  // the base context, optional
  context: expressLiquid.newContext(),
  // custom tags parser, optional
  customTags: {},
  // if an error occurred while rendering, show detail or not, default to false
  traceError: true
};
app.set('view engine', 'liquid');
app.set('views', __dirname + '/client');
app.engine('liquid', expressLiquid(options));
app.use(expressLiquid.middleware);


//  Routes
app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/admin', (req, res, next) => {
  Staff.findById(req.session.userId)
    .exec((error, user) => {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          res.render('admin-login', {
            site: site,
            page_title: 'Admin',
            canonical_url: `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`,
            template: 'admin-login'
          });
        } else {
          res.render('admin-dashboard', {
            site: site,
            page_title: 'Dashboard',
            canonical_url: `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`,
          });
        }
      }
    })
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

app.get('/install', (req, res, next) => {
  res.render('admin-install', {
    site: site,
    page_title: 'Install',
    canonical_url: `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`,
    errors: null
  });
})

app.post('/install', (req, res, next) => {
  // res.redirect('/admin');
  const { username, email, password, confirm } = req.body;
  const errors = [];
  if (!username) {
    errors.push('Username cannot be blank');
  }
  if (!email) {
    errors.push('Email cannot be blank');
  }
  if (!password) {
    errors.push('Password cannot be blank');
  } else {
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
  }
  if (password !== confirm) {
    errors.push('Passwords don\'t match');
  }

  if (errors.length) {
    return res.render('admin-install', {
      site: site,
      page_title: 'Install',
      canonical_url: `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`,
      errors: errors
    });
  } else {
    const userData = {
      email: email,
      password: password,
      username: username,
      confirm: confirm
    }
    Staff.create(userData, function (error, user) {
      if (error) {
        return res.render('admin-install', {
          site: site,
          page_title: 'Install',
          canonical_url: `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`,
          errors: [error]
        });
      } else {
        req.session.userId = user._id;
        return res.redirect('/admin');
      }
    });
  }
});

app.get('/admin/logout', (req, res, next) => {
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

// Listen on port
app.listen(port, () => console.log(`George Butter site is live! 🚀`));
