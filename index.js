// Routing
var express = require('express');
var app = express();

// Authentication
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// Rendering
var expressLiquid = require('express-liquid');

// General
var port = 49152;

// Global templating
var site = {
  name: 'George Butter',
}

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
  console.log(req.parsed);
  res.render('admin-login', {
    site: site,
    page_title: 'Admin',
    canonical_url: `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`,
  });
});

app.post('/admin', (req, res, next) => {
  console.log('admin login attempt')
  res.redirect('/admin');
})

app.get('/install', (req, res, next) => {
  res.render('admin-install', {
    site: site,
    page_title: 'Install',
    canonical_url: `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`,
  });
})

app.post('/install', (req, res, next) => {
  console.log('attempting to create admin account')
  res.redirect('/install');
})

// Listen on port
app.listen(port, () => console.log(`George Butter site is live! 🚀`));
