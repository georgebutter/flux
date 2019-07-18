const { setAdminViews, canonicalUrl } = require('../helpers');
const { Staff } = require('../models/staff');

exports.getDashboard = (req, res, next) => {
  if (!req.app.get('installed')) {
    return res.redirect('/install')
  }
  setAdminViews(req.app);
  const errors = [];
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('dashboard', {
        site: req.app.get('site'),
        page_title: 'Dashboard',
        canonical_url: canonicalUrl(req),
        template: 'dashboard',
        errors: errors,
        user: user
      });
    } else {
      return res.render('login', {
        site: req.app.get('site'),
        page_title: 'Admin',
        canonical_url: canonicalUrl(req),
        template: 'login',
        errors: errors,
        user: false
      });
    }
  });
}
