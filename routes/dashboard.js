const { getAdmin, getLogin } = require('../helpers');
const { Staff } = require('../models/staff');

exports.getDashboard = (req, res, next) => {
  if (!req.app.get('installed')) {
    return res.redirect('/install')
  }
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.send(getAdmin({
        site: req.app.get('site'),
        page_title: 'Dashboard',
      }))
    } else {
      return res.send(getLogin({
        site: req.app.get('site'),
        page_title: 'Login',
        template: 'login',
        
      }))
      // return res.render('admin/templates/login', {
      //   site: req.app.get('site'),
      //   page_title: 'Admin',
      //   canonical_url: canonicalUrl(req),
      //   template: 'login',
      //   user: false
      // });
    }
  });
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

exports.get404 = (req, res) => {
  setAdminViews(req.app);
  return res.render('404', {
    site: req.app.get('site'),
    page_title: '404',
    canonical_url: canonicalUrl(req),
    template: '404',
    errors: ['404 - Page not found']
  });
}
