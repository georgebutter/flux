const path = require('path');

exports.getHome = (req, res) => {
  setViews(req.app);
  console.log('[route] /'.orange);
  if (req.app.get('installed')) {
    return res.render('index', {
      site: req.app.get('site'),
      page_title: 'Index',
      canonical_url: canoncalUrl(req),
      template: 'index'
    });
  } else {
    return res.redirect('/install');
  }
}

exports.get404 = (req, res) => {
  setViews(req.app);
  return res.render('error', {
    site: req.app.get('site'),
    page_title: '404',
    canonical_url: canoncalUrl(req),
    error: '404 - Page not found'
  });
}

function canoncalUrl(req) {
  return `${req.protocol}${req.protocol ? '://' : '' }${req.hostname}${req.path}`;
}

function setViews(app) {
  app.set('views', [
    path.resolve(`./client/theme/layouts`),
    path.resolve(`./client/theme/templates`),
    path.resolve(`./client/theme/snippets`),
  ]);
}
