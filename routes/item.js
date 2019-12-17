const { Item } = require('../models/item');
const { Staff } = require('../models/staff');
const { Collection } = require('../models/collection');

const { setAdminViews, canonicalUrl } = require('../helpers');

exports.getItems = (req, res) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Item.getManyFlat({}, function(err, items) {
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


exports.getItem = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Item.getFlat({ _id: req.params.id}, function(err, item) {
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

exports.postUpdateItem = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle,
    excerpt,
    description
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
  const tags = [];

  for (let [key, value] of Object.entries(req.body)) {
    if (key !== 'title' && key !== 'handle') {
      const [colKey, i] = key.split('-');
      const index = Number(i);
      if (colKey === 'collections') {
        collections[index] = value;
      } else if (colKey === 'tags') {
        tags[index] = value;
      }
    }
  }
  if (errors.length) {
    setAdminViews(req.app);
    Item.findById({ _id: req.params.id }, function(err, item) {
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
              item,
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
        excerpt,
        description,
        collections,
        tags
      }
    }).then(result => {
      for (var i = 0; i < collections.length; i++) {
        console.log(collections[i])
        Collection.updateOne(
          { _id: collections[i] },
          {
            $addToSet: {
              items: req.params.id
            },
          },
          {
            new: true,
            upsert: true
          },
          function (err, result) {
            if (err) {
              console.error(`Could not update collection ${collections[i]} with items`)
            }
            console.log(result)
          }
        )
      }
      return res.redirect('/admin/items');
    }).catch(error => {
      return console.error(error);
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
