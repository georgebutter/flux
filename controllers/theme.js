// Debugging
const colors = require('colors');

const path = require('path');
const { Collection } = require('../models/collection');
const { Navigation } = require('../models/navigation');

exports.getHome = (req, res) => {
  setViews(req.app);
  console.log('[route] /'.cyan);
    if (req.app.get('installed')) {
      Navigation.find({}, function(err, navigation) {
        const linklists = {};
        for (var i = 0; i < navigation.length; i++) {
          linklists[navigation[i].handle] = navigation[i];
        }
        Collection.find({}, function(err, collection) {
          const collections = {};
          for (var i = 0; i < collection.length; i++) {
            collections[collection[i].handle] = collection[i];
          }
          return res.render('index', {
            site: req.app.get('site'),
            page_title: 'Index',
            canonical_url: canoncalUrl(req),
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
