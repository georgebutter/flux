// Debugging
const colors = require('colors');
// Routing
const express = require('express');
const app = express();
// const cors = require('cors');

// Authentication
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Data
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const Site = require('./models/site').Site;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/cms';
mongoose.connect(mongoURI);
const db = mongoose.connection;
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const fs = require('fs-extra');
const path = require('path');

// Middleware
const bodyParser = require('body-parser');

// General
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const siteHandle = process.env.SITE_HANDLE || 'georgebutter';

// Setup dev webpack compiling
console.log(`[status] Environment: ${env}`.grey)
if (env === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
}

// Sessions for tracking logins
app.use(session({
  name: 'session_id',
  secret: 'oixfbodfijnluh8p934tnkjs',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Allow large payloads for themes
app.use(bodyParser({limit: '5mb'}));
// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(`${__dirname}/client/theme/assets`));
app.use('/admin/assets', express.static(`${__dirname}/client/admin/assets`));

// enabling CORS for all requests
// app.use(cors({ credentials: true,
//   origin: true
// }));

// Setup liquid rendering
const Liquid = require('liquidjs');
const engine = Liquid({
  root: __dirname,
  extname: '.liquid'
});
app.engine('liquid', engine.express());
app.set('view engine', 'liquid');

// Import controllers
const adminViews = require('./controllers/admin-views');
const adminApi = require('./controllers/admin-api');
const themeController = require('./controllers/theme');
const installController = require('./controllers/install');

db.on('error', console.error.bind(console, 'connection error:'));
//Get theme files from Grid fs on connection and store in normal fs
db.once('open', () => {
  console.log('[db] Connected to database'.green);
  const gfs = Grid(db.db)
  app.set('gfs', gfs);
  gfs.files.find().toArray(function (err, files) {
    for (let i = 0; i < files.length; i++) {

      var readstream = gfs.createReadStream({
        filename: files[i].filename
      });
      let file = [];
      readstream.on('data', function (chunk) {
        file.push(chunk);
      });
      readstream.on('error', e => {
        console.log(e);
      });
      readstream.on('end', function () {
        const repoDir = './client/theme';
        const filepath = path.join(path.resolve(repoDir), files[i].filename)
        file = Buffer.concat(file);
        fs.outputFile(filepath, file)
      });
    }
  })
});
// Get site data on server reboot
Site.findOne()
.then(site => {
  app.set('site', site);
  app.set('installed', site.installed);
  console.log(`[status] Installed: ${site.installed}`.grey)
}).catch(err => {
  console.log(`[status] No site found`.grey)
});

// Admin Routes

// Admin API
// Themes
app.get('/admin/themes/:theme/:key/:file.json', adminApi.getFileJson);
app.get('/admin/themes/:theme.json', adminApi.getThemeFilesJson);
app.get('/admin/themes.json', adminApi.getThemesJson);
app.put('/admin/themes/:theme/:dir/:file.json', adminApi.putThemeFileJson);

// Admin GET
app.get('/admin/style-guide', adminViews.getStyleGuide);
app.get('/admin', adminViews.getDashboard);
app.get('/admin/themes', adminViews.getThemes);
app.get('/admin/users', adminViews.getUsers);
app.get('/admin/navigation', adminViews.getNavigation);
app.get('/admin/navigation/create', adminViews.getNavigationCreate);
app.get('/admin/collections', adminViews.getCollections);
app.get('/admin/collections/create', adminViews.getCollectionsCreate);
app.get('/admin/settings', adminViews.getSettings);
app.get('/admin/apps', adminViews.getApps);
app.get('/admin/apps/create', adminViews.getAppsCreate);
app.get('/admin/apps/:id', adminViews.getApp);
app.get('/admin/themes/:theme', adminViews.getTheme);
app.get('/admin/logout', adminViews.logout);
app.get('/admin/delete', adminViews.deleteSite);
app.get('/admin/themes/:theme/:key/:file', adminViews.getFile);

// Admin POST
app.post('/admin', adminViews.postLogin);
app.post('/admin/collections/create', adminViews.postCreateCollection);
app.post('/admin/navigation/create', adminViews.postCreateNavigation);
app.post('/admin/apps/create', adminViews.postCreateApp);
app.post('/admin/apps/:id/update', adminViews.postUpdateApp);


// Theme Routes
app.get('/', themeController.getHome);

// Installation Routes
app.get('/install', installController.getHome);
app.post('/install/site', installController.postSite);
app.post('/install/admin', installController.postAdmin);

// 404
app.get('/admin/*', adminViews.get404);
app.get('*', themeController.get404);

// Listen on port
app.listen(port, () => console.log(`[status] Site is live! 🚀`.grey));
