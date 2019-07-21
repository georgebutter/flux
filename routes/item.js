const { Item } = require('../models/item');
const { Staff } = require('../models/staff');
const { Collection } = require('../models/collection');

const { setAdminViews, canonicalUrl } = require('../helpers');

exports.getItems = (req, res) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Item.find({}, function(err, items) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('admin', {
            site: site,
            page_title: 'Items',
            canonical_url: canonicalUrl(req),
            template: 'items',
            errors: errors,
            user: user,
            items: items
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  })
}

exports.getItemsCreate = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  const form = {};
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('admin', {
        site: site,
        page_title: 'Create a new item',
        canonical_url: canonicalUrl(req),
        template: 'create-item',
        errors: errors,
        user: user,
        form: form
      });
    } else {
      return res.redirect('/admin');
    }
  });
}


exports.getItem = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Item.findById({ _id: req.params.id}, function(err, item) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('admin', {
            site,
            page_title: 'Item',
            canonical_url: canonicalUrl(req),
            template: 'item',
            errors,
            user,
            item
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.postCreateItem = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
  } = req.body;
  const form = {
    title,
    handle
  }
  const collections = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (key !== 'title' && key !== 'handle') {
      const [colKey, i] = key.split('-');
      const index = Number(i);
      collections[index] = value;
    }
  }
  form.collections = collections;
  if (!title) {
    errors.push({
      message: 'Please provide an item title',
      field: 'title'
    });
  }
  console.log(errors)
  console.log(errors.length)
  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setAdminViews(req.app);
      return res.render('admin', {
        site: site,
        page_title: 'Create a new item',
        canonical_url: canonicalUrl(req),
        template: 'create-item',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    Item.create({
      title,
      handle,
      collections
    }, (error, item) => {
      if (error) {
        errors.push({ message: error.errmsg });
        Staff.findById(req.session.userId, (error, user) => {
          setAdminViews(req.app);
          return res.render('admin', {
            site: site,
            page_title: 'Create a new item',
            canonical_url: canonicalUrl(req),
            template: 'create-item',
            errors: errors,
            user: user,
            form: form
          });
        });
      } else {
        for (var i = 0; i < collections.length; i++) {
          console.log(collections[i])
          Collection.updateOne({ _id: collections[i] }, {
            $push: {
              items: item._id
            },
          },
          {
            new: true,
            upsert: true
          },
          function (err, result) {
            console.log(result)
          })
        }
        return res.redirect('/admin/items');
      }
    });
  }
}

exports.postUpdateItem = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
  } = req.body;
  if (!title) {
    errors.push({
      message: 'Please provide a title',
      field: 'title'
    });
  }
  if (!handle) {
    errors.push({
      message: 'Handle cannot be blank',
      field: 'handle'
    });
  }
  const collections = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (key !== 'title' && key !== 'handle') {
      const [colKey, i] = key.split('-');
      const index = Number(i);
      collections[index] = value;
    }
  }

  if (errors.length) {
    setAdminViews(req.app);
    Item.findById({ _id: req.params.id}, function(err, item) {
      if (err) {
        throw err;
      } else {
        Staff.findById(req.session.userId, (error, user) => {
          if (user) {
            return res.render('admin', {
              site,
              page_title: 'Item',
              canonical_url: canonicalUrl(req),
              template: 'item',
              errors,
              user,
              item
            });
          } else {
            return res.redirect('/admin');
          }
        });
      }
    });
  } else {
    Item.updateOne({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        handle: req.body.handle,
        collections: collections
      }
    }).then(result => {
      for (var i = 0; i < collections.length; i++) {
        console.log(collections[i])
        Collection.updateOne(
          { _id: collections[i] },
          {
            $push: {
              items: req.params.id
            },
          },
          {
            new: true,
            upsert: true
          },
          function (err, result) {
            console.log(result)
          }
        )
      }
      return res.redirect('/admin/items');
    });
  }
}

exports.deleteItem = (req, res) => {
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      Item.deleteOne({ _id: req.params.id}, (err) => {
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
