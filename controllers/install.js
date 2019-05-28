const path = require('path');
const validator = require('validator');
const Site = require('../models/site').Site;
const Staff = require('../models/staff').Staff;

const colors = require('colors');

exports.getHome = (req, res) => {
  setViews(req.app);
  if (!req.app.get('site')) {
    res.render('install', {
      site: null,
      page_title: 'Install - Create site',
      canonical_url: canoncalUrl(req),
      template: 'install',
      suffix: 'site',
      errors: null,
    });
  } else {
    res.render('install-admin', {
      site: req.app.get('site'),
      page_title: 'Install - Create admin',
      canonical_url: canoncalUrl(req),
      template: 'install',
      suffix: 'admin',
      errors: null,
    });
  }
}

exports.postSite = (req, res, next) => {
  console.log('[route] POST /install/site'.orange)
  setViews(req.app);
  if (req.app.get('site')) {
    return res.render('error', {
      site: req.app.get('site'),
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
      site: req.app.get('site'),
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
          site: req.app.get('site'),
          page_title: 'Install',
          canonical_url: canoncalUrl(req),
          template: 'install',
          errors: errors
        });
      } else {
        req.app.set('site', site)
        return res.redirect('/install');
      }
    });
  }
}

exports.postAdmin = (req, res, next) => {
  setViews(req.app);

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
      site: req.app.get('site'),
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
          site: req.app.get('site'),
          page_title: 'Install',
          template: 'install',
          canonical_url: canoncalUrl(req),
          errors: [error]
        });
      } else {
        req.session.userId = user._id;
        req.app.set('installed', true)
        Site.updateOne({}, {$set: {"installed": true}}, () => {
          console.log('[db] Updated site to installed'.green);
          return res.redirect('/admin');
        })

      }
    });
  }
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
