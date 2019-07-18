const { Item } = require('../models/item');
const { Staff } = require('../models/staff');

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

exports.postCreateItem = (req, res) => {
  const site = req.app.get('site');
  console.log(req.body)
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
      collections[index] = collections[index] || {};
      collections[index][colKey] = value;
      if (value === '') {
        errors.push({
          message: `${colKey.charAt(0).toUpperCase() + colKey.slice(1)} cannot be blank`,
          field: key
        });
      }
    }
  }
  console.log(collections)
  form.collections = collections;
  if (!title) {
    errors.push({
      message: 'Please provide an item title',
      field: 'title'
    });
  }
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
        return res.redirect('/admin/items');
      }
    });
  }
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
