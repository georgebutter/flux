const path = require('path');
const webpack = require('webpack');
// const mode = process.env.NODE_ENV || 'development';
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    'install': ['babel-polyfill', './src/install.js'],
    'style-guide': ['babel-polyfill', './src/style-guide.js'],
    'theme': ['babel-polyfill', './src/theme.js'],
    'nav': ['babel-polyfill', './src/nav.js'],
    'create-navigation': ['babel-polyfill', './src/create-navigation.js'],
    'app': ['babel-polyfill', './src/app.js'],
    'create-app': ['babel-polyfill', './src/create-app.js'],
    'admin': ['babel-polyfill', './src/admin.js'],
    'login': ['babel-polyfill', './src/login.js'],
    '404': ['babel-polyfill', './src/404.js'],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin(),
  ],
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/client/admin/assets/'),
    publicPath: '/admin/assets/',
  },
  devServer: {
    contentBase: path.join(__dirname, '/client/admin/assets'),
    watchContentBase: true,
    proxy: [
      {
        context: ['/', '/admin'],
        target: 'http://localhost:3000', // server and port to redirect to
        secure: false, // don't use https
      },
    ],
    overlay: {
      warnings: true, // default false
      errors: true, // default false
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
};
