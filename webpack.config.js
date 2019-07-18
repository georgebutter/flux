const path = require('path');
const webpack = require('webpack');
const mode = process.env.NODE_ENV || 'development';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: {
    'install': './src/install.js',
    'style-guide': './src/style-guide.js',
    'themes': './src/themes.js',
    'theme': './src/theme.js',
    'collection': './src/collection.js',
    'collections': './src/collections.js',
    'item': './src/item.js',
    'items': './src/items.js',
    'create-item': './src/create-item.js',
    'navigation': './src/navigation.js',
    'nav': './src/nav.js',
    'create-navigation': './src/create-navigation.js',
    'create-collection': './src/create-collection.js',
    'settings': './src/settings.js',
    'app': './src/app.js',
    'apps': './src/apps.js',
    'create-app': './src/create-app.js',
    'users': './src/users.js',
    'admin': './src/admin.js',
    'login': './src/login.js',
    'dashboard': './src/dashboard.js',
    '404': './src/404.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin()
  ],
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/client/admin/assets/'),
    publicPath: '/admin/assets/'
  },
  devServer: {
    contentBase: path.join(__dirname, '/client/admin/assets'),
    watchContentBase: true,
    proxy: [
      {
        context: ['/', '/admin'],
        target: 'http://localhost:3000', //server and port to redirect to
        secure: false //don't use https
      }
    ],
    overlay: {
      warnings: true, // default false
      errors: true, //default false
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};
