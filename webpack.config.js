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
    path: path.resolve(__dirname, 'client/admin/assets/'),
    publicPath: '/'
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
