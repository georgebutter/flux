const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    admin: './src/admin.js',
    dashboard: './src/dashboard.js',
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
