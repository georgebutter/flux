const { setAdminViews, canonicalUrl } = require('../helpers');

exports.getStyleGuide = (req, res, next) => {
  setAdminViews(req.app);
  res.render('style-guide', {
    site: req.app.get('site'),
    page_title: 'Style guide',
    canonical_url: canonicalUrl(req),
    template: 'style-guide'
  });
}
