const { Staff } = require('../models/staff');
const { App } = require('../models/app');

const { setAdminViews, canonicalUrl } = require('../helpers');

const validator = require('validator');
const uuidV4 = require('uuid/v4');

exports.getApps = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  App.find({}, function(err, apps) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('admin', {
            site: site,
            page_title: 'Apps',
            canonical_url: canonicalUrl(req),
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
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  App.findById(req.params.id, function(err, app) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('admin', {
            site: site,
            page_title: 'Apps',
            canonical_url: canonicalUrl(req),
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
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  const form = {};
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('admin', {
        site: site,
        page_title: 'Create a new app',
        canonical_url: canonicalUrl(req),
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
      setAdminViews(req.app);
      return res.render('admin', {
        site: site,
        page_title: 'Create a new app',
        canonical_url: canonicalUrl(req),
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
          setAdminViews(req.app);
          return res.render('admin', {
            site: site,
            page_title: 'Create a new app',
            canonical_url: canonicalUrl(req),
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
            setAdminViews(req.app);
            return res.render('admin', {
              site: site,
              page_title: 'Apps',
              canonical_url: canonicalUrl(req),
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
