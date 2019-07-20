const { Collection } = require('../models/collection');
const { Staff } = require('../models/staff');

const { setAdminViews, canonicalUrl } = require('../helpers');

exports.getCollections = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Collection.find({}, function(err, collections) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('collections', {
            site: site,
            page_title: 'Collections',
            canonical_url: canonicalUrl(req),
            template: 'collections',
            errors: errors,
            user: user,
            collections: collections
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getCollection = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];

  Collection.findById({ _id: req.params.id}, function(err, collection) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('admin', {
            site,
            page_title: 'Collection',
            canonical_url: canonicalUrl(req),
            template: 'collection',
            errors,
            user,
            collection
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getCollectionsCreate = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  const form = {};
  console.log(`[status] GET collection create`)
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('create-collection', {
        site: site,
        page_title: 'Create a new collection',
        canonical_url: canonicalUrl(req),
        template: 'create-collection',
        errors: errors,
        user: user,
        form: form
      });
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.postCreateCollection = (req, res) => {
  console.log('[route] POST /admin/collecions/create'.cyan)
  console.log(req.body)
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
    permalink
  } = req.body;
  console.log(req.body)
  const form = {
    title,
    handle,
    permalink
  }
  if (!title) {
    errors.push({
      message: 'Please provide an collection name',
      field: 'name'
    });
  }
  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setAdminViews(req.app);
      return res.render('create-collection', {
        site: site,
        page_title: 'Create a new collection',
        canonical_url: canonicalUrl(req),
        template: 'create-collection',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    console.log('[status] Creating new collection'.grey)
    Collection.create(req.body, (error, app) => {
      console.error(error)
      if (error) {
        errors.push({ message: error });
        Staff.findById(req.session.userId, (error, user) => {
          setAdminViews(req.app);
          return res.render('create-collection', {
            site: site,
            page_title: 'Create a new collection',
            canonical_url: canonicalUrl(req),
            template: 'create-collection',
            errors: errors,
            user: user,
            form: form
          });
        });
      } else {
        return res.redirect('/admin/collections');
      }
    });
  }
}

exports.postUpdateCollection = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
    permalink
  } = req.body;
  const form = {
    title,
    handle,
    permalink
  }
  if (!title) {
    errors.push({
      message: 'Please provide a collection title',
      field: 'title'
    });
  }
  if (!handle) {
    errors.push({
      message: 'Handle cannot be blank',
      field: 'handle'
    });
  }
  if (!permalink) {
    errors.push({
      message: 'Permalink cannot be blank',
      field: 'permalink'
    });
  }

  if (errors.length) {
    setAdminViews(req.app);
    Collection.findById({ _id: req.params.id}, function(err, collection) {
      if (err) {
        throw err;
      } else {
        Staff.findById(req.session.userId, (error, user) => {
          if (user) {
            return res.render('admin', {
              site,
              page_title: 'Collection',
              canonical_url: canonicalUrl(req),
              template: 'collection',
              errors,
              user,
              collection
            });
          } else {
            return res.redirect('/admin');
          }
        });
      }
    });
  } else {
    Collection.updateOne({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        handle: req.body.handle,
        permalink: req.body.permalink
      }
    }).then(result => {
      return res.redirect('/admin/collections');
    });

  }
}

exports.deleteCollection = (req, res) => {
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      Collection.deleteOne({ _id: req.params.id}, (err) => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    } else {
      return res.redirect('/admin');
    }
  })
}
