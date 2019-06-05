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
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('[db] Connected to database'.green);
});

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
const adminController = require('./controllers/admin');
const themeController = require('./controllers/theme');
const installController = require('./controllers/install');

const git = require('./git');
git.init(app);

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
app.get('/admin/themes/:theme/:key/:file.json', adminController.getFileJson);
app.get('/admin/themes/:theme.json', adminController.getThemeFilesJson);
app.get('/admin/themes.json', adminController.getThemesJson);
// Admin GET
app.get('/admin/style-guide', adminController.getStyleGuide);
app.get('/admin', adminController.getDashboard);
app.get('/admin/themes', adminController.getThemes);
app.get('/admin/users', adminController.getUsers);
app.get('/admin/settings', adminController.getSettings);
app.get('/admin/apps', adminController.getApps);
app.get('/admin/apps/create', adminController.getAppsCreate);
app.get('/admin/apps/:id', adminController.getApp);
app.get('/admin/themes/:theme', adminController.getTheme);
app.get('/admin/logout', adminController.logout);
app.get('/admin/delete', adminController.deleteSite);
app.get('/admin/themes/:theme/:key/:file', adminController.getFile);

// Admin POST
app.post('/admin', adminController.postLogin);
app.post('/admin/apps/create', adminController.postCreateApp);
app.post('/admin/apps/:id/update', adminController.postUpdateApp);


// Theme Routes
app.get('/', themeController.getHome);

// Installation Routes
app.get('/install', installController.getHome);
app.post('/install/site', installController.postSite);
app.post('/install/admin', installController.postAdmin);

// 404
app.get('/admin/*', adminController.get404);
app.get('*', themeController.get404);

// Listen on port
app.listen(port, () => console.log(`[status] Site is live! 🚀`.grey));
