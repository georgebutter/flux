const { Staff } = require('../models/staff');
const { setAdminViews, canonicalUrl } = require('../helpers');

exports.getUsers = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('users', {
        site: site,
        page_title: 'Users',
        canonical_url: canonicalUrl(req),
        template: 'users',
        errors: errors,
        user: user,
      });
    } else {
      return res.redirect('/admin');
    }
  });
}
