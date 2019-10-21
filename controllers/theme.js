const { Collection } = require('../models/collection');
const { Navigation } = require('../models/navigation');
const { Permalink } = require('../models/permalink');
const { Item } = require('../models/item');
const { setClientViews, canonicalUrl } = require('../helpers');

exports.getHome = (req, res) => {
  if (req.app.get('installed')) {
    Navigation.find({}, function(err, navigation) {
      const linklists = {};
      for (var i = 0; i < navigation.length; i++) {
        linklists[navigation[i].handle] = navigation[i];
      }
      Collection.getFullCollections({}, (err, collection) => {
        if (err) {
          return console.error(err);
        }
        const collections = {};
        for (var i = 0; i < collection.length; i++) {
          console.log(collection)
          collections[collection[i].handle] = collection[i];
          collections[collection[i].handle].url = collection[i].permalink.permalink;
        }
        console.log('index')
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

exports.getPermalink = (req, res, next) => {
  if (req.app.get('installed')) {
    Permalink.getFull(
      { permalink: `/${req.params.permalink}` },
      (err, permalink) => {
        if (!permalink) {
          return next()
        }
        const template = permalink.objectModel.toLowerCase();
        permalink.object.url = permalink.permalink;
        Navigation.find({}, function(err, navigation) {
          const linklists = {};
          for (var i = 0; i < navigation.length; i++) {
            linklists[navigation[i].handle] = navigation[i];
          }
          Collection.getFullCollections({}, (err, collection) => {
            if (err) {
              return console.error(err);
            }
            const collections = {};
            for (var i = 0; i < collection.length; i++) {
              collections[collection[i].handle] = collection[i];
              collections[collection[i].handle].url = collection[i].permalink.permalink;
            }
            const renderObject = {
              site: req.app.get('site'),
              page_title: 'Index',
              canonical_url: canonicalUrl(req),
              template: 'index',
              linklists: linklists,
              collections: collections,
              [template]: permalink.object
            }
            return res.render(template, renderObject);
          })
        });
      }
    )
  } else {
    return res.redirect('/install');
  }
}

exports.getItem = (req, res, next) => {
  if (req.app.get('installed')) {
    Permalink.getFull(
      { permalink: `/${req.params.permalink}` },
      (err, permalink) => {
        if (!permalink) {
          return next()
        }
        const template = permalink.objectModel.toLowerCase();
        permalink.object.url = permalink.permalink;
        Item.getFront({ handle: req.params.handle}, (err, item) => {
          if (err) {
            return next();
          }
          Navigation.find({}, function(err, navigation) {
            const linklists = {};
            for (var i = 0; i < navigation.length; i++) {
              linklists[navigation[i].handle] = navigation[i];
            }
            Collection.getFullCollections({}, (err, collection) => {
              if (err) {
                return console.error(err);
              }
              const collections = {};
              for (var i = 0; i < collection.length; i++) {
                collections[collection[i].handle] = collection[i];
              }
              const renderObject = {
                site: req.app.get('site'),
                page_title: 'Index',
                canonical_url: canonicalUrl(req),
                template: 'index',
                linklists: linklists,
                collections: collections,
                [template]: permalink.object,
                item: item
              }
              return res.render('item', renderObject);
            })
          });
        })
      }
    )
  } else {
    return res.redirect('/install');
  }
}

exports.get404 = (req, res) => {
  Navigation.find({}, function(err, navigation) {
    const linklists = {};
    for (var i = 0; i < navigation.length; i++) {
      linklists[navigation[i].handle] = navigation[i];
    }
    Collection.getFullCollections({}, (err, collection) => {
      if (err) {
        return console.error(err);
      }
      const collections = {};
      for (var i = 0; i < collection.length; i++) {
        collections[collection[i].handle] = collection[i];
      }
      return res.render('error', {
        site: req.app.get('site'),
        page_title: '404',
        canonical_url: canonicalUrl(req),
        error: '404 - Page not found',
        template: 'index',
        linklists: linklists,
        collections: collections
      });
    })
  });
}
