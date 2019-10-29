const { Staff } = require('../models/staff');
const { getAdmin } = require('../helpers');

const {
  getStyleGuide,
} = require('../routes/style-guide');

const {
  getDashboard,
  logout,
  postLogin,
  deleteSite,
  get404,
} = require('../routes/dashboard');

const {
  getCollections,
  getCollection,
  getCollectionsCreate,
  postCreateCollection,
  postUpdateCollection,
  deleteCollection
} = require('../routes/collection');

const {
  getItems,
  getItem,
  getItemsCreate,
  postCreateItem,
  postUpdateItem,
  deleteItem
} = require('../routes/item');

const {
  getNavigations,
  getNavigation,
  getNavigationCreate,
  postCreateNavigation,
  postUpdateNavigation,
  deleteNavigation
} = require('../routes/navigation');

const {
  getUsers
} = require('../routes/users');

const {
  getApps,
  getApp,
  getAppsCreate,
  postCreateApp,
  postUpdateApp,
} = require('../routes/apps');

const {
  getSettings,
} = require('../routes/settings');

const {
  getThemes,
  getTheme,
  getFile
} = require('../routes/themes')

const sendAdmin = (req, res, next) => {
  const site = req.app.get('site');
  const errors = [];
  Staff.findById(req.session.userId, (error, user) => {
    if (user) {
      return res.send(getAdmin({
        site: req.app.get('site'),
        page_title: 'Dashboard',
      }))
    } else {
      return res.redirect('/admin');
    }
  });
}

exports.sendAdmin = sendAdmin;
exports.getStyleGuide = getStyleGuide;

exports.getDashboard = getDashboard;
exports.logout = logout;
exports.postLogin = postLogin;
exports.deleteSite = deleteSite;
exports.get404 = get404;

exports.getCollections = getCollections;
exports.getCollection = getCollection;
exports.getCollectionsCreate = getCollectionsCreate;
exports.postCreateCollection = postCreateCollection;
exports.postUpdateCollection = postUpdateCollection;
exports.deleteCollection = deleteCollection;

exports.getItems = getItems;
exports.getItem = getItem;
exports.getItemsCreate = getItemsCreate;
exports.postCreateItem = postCreateItem;
exports.postUpdateItem = postUpdateItem;
exports.deleteItem = deleteItem;

exports.getNavigations = getNavigations;
exports.getNavigation = getNavigation;
exports.getNavigationCreate = getNavigationCreate;
exports.postCreateNavigation = postCreateNavigation;
exports.postUpdateNavigation = postUpdateNavigation;
exports.deleteNavigation = deleteNavigation;

exports.getUsers = getUsers;

exports.getApps = getApps;
exports.getApp = getApp;
exports.getAppsCreate = getAppsCreate;
exports.postCreateApp = postCreateApp;
exports.postUpdateApp = postUpdateApp;

exports.getSettings = getSettings;

exports.getThemes = getThemes;
exports.getTheme = getTheme;

exports.getFile = getFile;
