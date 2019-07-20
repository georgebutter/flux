const { Navigation } = require('../models/navigation');
const { Staff } = require('../models/staff');

const { setAdminViews, canonicalUrl } = require('../helpers');

exports.getNavigations = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  Navigation.find({}, function(err, navigation) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('navigation', {
            site: site,
            page_title: 'Navigation',
            canonical_url: canonicalUrl(req),
            template: 'navigation',
            errors: errors,
            user: user,
            navigation: navigation
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getNavigation = (req, res, next) => {
  setAdminViews(req.app);
  console.log(req.params.id)
  const site = req.app.get('site');
  const errors = [];
  Navigation.findById(req.params.id, function(err, navigation) {
    if (err) {
      throw err;
    } else {
      Staff.findById(req.session.userId, (error, user) => {
        if (user) {
          return res.render('navigation', {
            site: site,
            page_title: 'Navigation',
            canonical_url: canonicalUrl(req),
            template: 'nav',
            errors: errors,
            user: user,
            navigation: navigation
          });
        } else {
          return res.redirect('/admin');
        }
      });
    }
  });
}

exports.getNavigationCreate = (req, res, next) => {
  setAdminViews(req.app);
  const site = req.app.get('site');
  const errors = [];
  const form = {};
  console.log(`[status] GET navigation create`)
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('create-navigation', {
        site: site,
        page_title: 'Create a new navigation',
        canonical_url: canonicalUrl(req),
        template: 'create-navigation',
        errors: errors,
        user: user,
        form: form
      });
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.postCreateNavigation = (req, res) => {
  console.log('[route] POST /admin/navigation/create'.cyan)
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle
  } = req.body;
  const form = {
    title,
    handle
  }
  const links = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (key !== 'title' && key !== 'handle') {
      const [linkKey, i] = key.split('-');
      const index = Number(i);
      links[index] = links[index] || {};
      links[index][linkKey] = value;
      if (value === '') {
        errors.push({
          message: `${linkKey.charAt(0).toUpperCase() + linkKey.slice(1)} cannot be blank`,
          field: key
        });
      }
    }
  }
  form.links = links;
  if (!title) {
    errors.push({
      message: 'Please provide an navigation title',
      field: 'title'
    });
  }
  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setAdminViews(req.app);
      return res.render('create-navigation', {
        site: site,
        page_title: 'Create a new navigation',
        canonical_url: canonicalUrl(req),
        template: 'create-navigation',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    Navigation.create({
      title,
      handle,
      links
    }, (error, navigation) => {
      if (error) {
        errors.push({ message: error });
        Staff.findById(req.session.userId, (error, user) => {
          setAdminViews(req.app);
          return res.render('create-navigation', {
            site: site,
            page_title: 'Create a new navigation',
            canonical_url: canonicalUrl(req),
            template: 'create-navigation',
            errors: errors,
            user: user,
            form: form
          });
        });
      } else {
        return res.redirect('/admin/navigation');
      }
    });
  }
}

exports.postUpdateNavigation = (req, res) => {
  const site = req.app.get('site');
  const errors = [];
  const {
    title,
    handle
  } = req.body;
  const form = {
    title,
    handle
  }
  if (!title) {
    errors.push({
      message: 'Please provide an navigation title',
      field: 'title'
    });
  }

  if (errors.length) {
    Staff.findById(req.session.userId, (error, user) => {
      setAdminViews(req.app);
      return res.render('create-navigation', {
        site: site,
        page_title: 'Create a new navigation',
        canonical_url: canonicalUrl(req),
        template: 'create-navigation',
        errors: errors,
        user: user,
        form: form
      });
    });
  } else {
    console.log('[status] Updating navigation'.grey)
    const links = [];
    for (let [key, value] of Object.entries(req.body)) {
      if (key !== 'title' && key !== 'handle') {
        const [linkKey, i] = key.split('-');
        const index = Number(i);
        links[index] = links[index] || {};
        links[index][linkKey] = value;
      }
    }
    Navigation.updateOne({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        handle: req.body.handle,
        links: links
      }
    }).then(result => {
      return res.redirect(`/admin/navigation/${req.params.id}`);
    });
  }
}

exports.deleteNavigation = (req, res) => {
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      Navigation.deleteOne({ _id: req.params.id}, (err) => {
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
