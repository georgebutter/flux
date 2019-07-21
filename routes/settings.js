const { Staff } = require('../models/staff');
const { setAdminViews, canonicalUrl } = require('../helpers');

exports.getSettings = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('settings', {
        site: site,
        page_title: 'Settings',
        canonical_url: canonicalUrl(req),
        template: 'settings',
        errors: errors,
        user: user,
      });
    } else {
      return res.redirect('/admin');
    }
  });
}
