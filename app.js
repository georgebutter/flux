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
const grid = require('gridfs-stream');
grid.mongo = mongoose.mongo;
const fs = require('fs-extra');
const path = require('path');

// Middleware
const bodyParser = require('body-parser');

// General
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

// Setup dev webpack compiling
console.log(`[status] Environment: ${env}`);
if (env === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

// Sessions for tracking logins
app.use(session({
  name: 'session_id',
  secret: 'oixfbodfijnluh8p934tnkjs',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
  }),
}));

// Allow large payloads for theme files and images and fonts
app.use(bodyParser({
  limit: '10mb',
}));
// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const assetPath = express.static(path.join(__dirname, `/client/theme/assets`));
app.use('/assets', assetPath);

// enabling CORS for all requests
// app.use(cors({ credentials: true,
//   origin: true
// }));

// Setup liquid rendering
const Liquid = require('liquidjs');
const Prism = require('prismjs');
const engine = new Liquid({
  root: `${__dirname}/client`,
  cache: env === 'development' ? false : true,
  extname: '.liquid',
});

// Register handlize filter
engine.registerFilter('handle', (str) => (
  str
    .toLowerCase()
    .replace(/[^\w\u00C0-\u024f]+/g, '-')
    .replace(/^-+|-+$/g, ''))
);
engine.registerFilter('handleize', (str) => (
  str
    .toLowerCase()
    .replace(/[^\w\u00C0-\u024f]+/g, '-')
    .replace(/^-+|-+$/g, ''))
);
// Register highlight tag
engine.registerTag('highlight', {
  parse: function(tagToken, remainTokens) {
    this.str = tagToken.args;
    this.tpl = [];
    const stream = engine.parser.parseStream(remainTokens)
      .on('start', () => {
        console.log(this);
      })
      .on('tag:endhighlight', () => stream.stop())
      .on('template', (tpl) => this.tpl.push(tpl))
      .on('end', () => {
        throw new Error(`tag ${tagToken.raw} not closed`);
      });

    stream.start();
  },
  render: async function(scope, hash) {
    const { highlight, languages } = Prism;
    let code = '';
    for (let i = 0; i < this.tpl.length; i++) {
      const block = this.tpl[i].raw;
      code += block;
    }
    const prismCode = highlight(code, languages[this.str], this.str);
    return `<pre><code class="language-${this.str}">${prismCode}</code></pre>`;
  },
});

app.engine('liquid', engine.express());
app.set('view engine', 'liquid');
app.set('views', [
  path.resolve(`./client/theme/layouts`),
  path.resolve(`./client/theme/templates`),
  path.resolve(`./client/theme/snippets`),
]);

// Import controllers
const adminViews = require('./controllers/admin-views');
const adminApi = require('./controllers/admin-api');
const themeController = require('./controllers/theme');
const installController = require('./controllers/install');

db.on('error', console.error.bind(console, 'connection error:'));
// Get theme files from grid fs on connection and store in normal fs
db.once('open', () => {
  console.log('[db] Connected to database'.green);
  const gfs = grid(db.db);
  app.set('gfs', gfs);
  gfs.files.find().toArray(function(err, files) {
    for (let i = 0; i < files.length; i++) {
      const readstream = gfs.createReadStream({
        filename: files[i].filename,
      });
      let file = [];
      readstream.on('data', function(chunk) {
        file.push(chunk);
      });
      readstream.on('error', (e) => {
        console.log(e);
      });
      readstream.on('end', function() {
        const repoDir = './client/theme';
        const filepath = path.join(path.resolve(repoDir), files[i].filename);
        file = Buffer.concat(file);
        fs.outputFile(filepath, file);
      });
    }
  });
});
// Get site data on server reboot
Site.findOne()
  .then((site) => {
    const { installed, name, handle, description, email } = site;
    app.set('site', {
      name,
      handle,
      description,
      email,
    });
    app.set('installed', installed);
    console.log(`[status] Installed: ${installed}`);
  }).catch((err) => {
    console.log(`[status] No site found`);
  });

// Admin Routes

// Admin API
// Themes
app.get('/admin/themes/:theme/:key/:file.json', adminApi.getFile);
app.get('/admin/themes/:theme.json', adminApi.getThemeFiles);
app.get('/admin/themes.json', adminApi.getThemes);
app.put('/admin/themes/:theme/:dir/:file.json', adminApi.putThemeFile);
// Collections
app.get('/admin/collections.json', adminApi.getCollection);
app.get('/admin/collections/:ids.json', adminApi.getCollection);
app.put('/admin/collections/:id.json', adminApi.updateCollection);
app.post('/admin/collections/create.json', adminApi.createCollection);
app.delete('/admin/collections/:id.json', adminApi.deleteCollection);
// Items
app.get('/admin/items.json', adminApi.getItem);
app.get('/admin/items/:ids.json', adminApi.getItem);
app.post('/admin/items/create.json', adminApi.createItem);
app.put('/admin/items/:id.json', adminApi.updateItem);

// Admin GET
app.get('/admin/style-guide', adminViews.getStyleGuide);
app.get('/admin', adminViews.getDashboard);
app.get('/admin/themes', adminViews.getThemes);
app.get('/admin/users', adminViews.getUsers);
app.get('/admin/navigation', adminViews.getNavigations);
app.get('/admin/navigation/create', adminViews.getNavigationCreate);
app.get('/admin/navigation/:id', adminViews.getNavigation);
app.get('/admin/collections', adminViews.sendAdmin);
app.get('/admin/collections/create', adminViews.sendAdmin);
app.get('/admin/collections/:id', adminViews.sendAdmin);
app.get('/admin/items', adminViews.sendAdmin);
app.get('/admin/items/create', adminViews.sendAdmin);
app.get('/admin/items/:id', adminViews.sendAdmin);
app.get('/admin/settings', adminViews.getSettings);
app.get('/admin/apps', adminViews.getApps);
app.get('/admin/apps/create', adminViews.getAppsCreate);
app.get('/admin/apps/:id', adminViews.getApp);
app.get('/admin/themes/:theme', adminViews.getTheme);
app.get('/admin/logout', adminViews.logout);
app.get('/admin/delete', adminViews.deleteSite);
app.get('/admin/themes/:theme/:key/:file', adminViews.getFile);

// Admin POST
// app.post('/admin', adminViews.postLogin);
// app.post('/admin/collections/create', adminViews.postCreateCollection);
// app.post('/admin/collections/:id/update', adminViews.postUpdateCollection);
// app.post('/admin/navigation/create', adminViews.postCreateNavigation);
// app.post('/admin/navigation/:id/update', adminViews.postUpdateNavigation);
// app.post('/admin/apps/create', adminViews.postCreateApp);
// app.post('/admin/apps/:id/update', adminViews.postUpdateApp);
// // app.post('/admin/items/create', adminViews.postCreateItem);
// app.post('/admin/items/:id/update', adminViews.postUpdateItem);

// Admin DELETE
app.delete('/admin/navigation/:id', adminViews.deleteNavigation);
app.delete('/admin/collections/:id', adminViews.deleteCollection);
app.delete('/admin/items/:id', adminViews.deleteItem);

// Installation Routes
app.get('/install', installController.getHome);
app.post('/install/site', installController.postSite);
app.post('/install/admin', installController.postAdmin);

// Theme Routes
app.get('/', themeController.getHome);
app.get('/:permalink/:handle', themeController.getItem);
app.get('/:permalink', themeController.getPermalink);

// 404
app.get('/admin/*', adminViews.get404);
app.get('*', themeController.get404);

// Listen on port
app.listen(port, () => (
  console.log(`[status] http://localhost:${port} 🚀`)
));
