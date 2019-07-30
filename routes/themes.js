const { Staff } = require('../models/staff');
const { setAdminViews, canonicalUrl } = require('../helpers');

exports.getThemes = (req, res, next) => {
  setAdminViews(req.app);
  const errors = [];
  const site = req.app.get('site');
  // Get files list
  const themes = ['master']
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.render('admin', {
        site: site,
        page_title: 'Themes',
        canonical_url: canonicalUrl(req),
        template: 'themes',
        errors: errors,
        user: user,
        themes: themes
      });
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.getTheme = (req, res, next) => {
  setAdminViews(req.app);
  const errors = [];
  const site = req.app.get('site');
  const fileTree = {
    assets: [],
    layouts: [],
    templates: [],
    snippets: [],
  };

  Staff.findById(req.session.userId, (error, user) => {
    if (error) {
      return next(error);
    } else {
      if (user) {
        return res.render('admin', {
          site: site,
          page_title: 'Theme',
          canonical_url: canonicalUrl(req),
          template: 'theme',
          errors: errors,
          user: user,
          theme: req.params.theme,
          fileTree: fileTree
        });
      }
      return res.redirect('/admin');
    }
  });
}

exports.getFile = (req, res, next) => {
  const { theme, key, file } = req.params;
  git.Repository.open(path.resolve(repoDir))
  .then(function(repo) {
    return repo.getMasterCommit();
  })
  .then(function(commit) {
    return commit.getEntry(`${key}/${file}`);
  })
  .then(function(entry) {
    _entry = entry;
    return _entry.getBlob();
  })
  .then(function(blob) {
    return res.send(blob.toString());
  })
  .done();
}
