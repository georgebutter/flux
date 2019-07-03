const path = require('path');
const { Navigation } = require('../models/navigation');

exports.getHome = (req, res) => {
  setViews(req.app);
  console.log('[route] /'.orange);
  Navigation.find({}, function(err, navigation) {
    const linklists = {};
    for (var i = 0; i < navigation.length; i++) {
      linklists[navigation[i].handle] = navigation[i];
    }
    if (req.app.get('installed')) {
      return res.render('index', {
        site: req.app.get('site'),
        page_title: 'Index',
        canonical_url: canoncalUrl(req),
        template: 'index',
        linklists: linklists
      });
    } else {
      return res.redirect('/install');
    }
  });
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
