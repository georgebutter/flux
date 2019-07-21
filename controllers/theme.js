const { Collection } = require('../models/collection');
const { Navigation } = require('../models/navigation');
const { setClientViews, canonicalUrl } = require('../helpers');

exports.getHome = (req, res) => {
  setClientViews(req.app);
  if (req.app.get('installed')) {
    Navigation.find({}, function(err, navigation) {
      const linklists = {};
      for (var i = 0; i < navigation.length; i++) {
        linklists[navigation[i].handle] = navigation[i];
      }
      Collection.getFullCollection((err, collection) => {
        if (err) {
          return console.error(err);
        }
        const collections = {};
        for (var i = 0; i < collection.length; i++) {
          collections[collection[i].handle] = collection[i];
        }
        return res.render('index', {
          site: req.app.get('site'),
          page_title: 'Index',
          canonical_url: canonicalUrl(req),
          template: 'index',
          linklists: linklists,
          collections: collections
        });
      })
    });
  } else {
    return res.redirect('/install');
  }
}

exports.get404 = (req, res) => {
  setClientViews(req.app);
  return res.render('error', {
    site: req.app.get('site'),
    page_title: '404',
    canonical_url: canonicalUrl(req),
    error: '404 - Page not found'
  });
}
