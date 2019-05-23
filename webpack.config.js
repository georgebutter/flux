const path = require('path');
const webpack = require('webpack');
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')
const mode = process.env.NODE_ENV || 'development';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: {
    'install': './src/install.js',
    'style-guide': './src/style-guide.js',
    'themes': './src/themes.js',
    'theme': './src/theme.js',
    'admin': './src/admin.js',
    'login': './src/login.js',
    'dashboard': './src/dashboard.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin(),
    new MonacoEditorPlugin({
      // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      // Include a subset of languages support
      // Some language extensions like typescript are so huge that may impact build performance
      // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
      // Languages are loaded on demand at runtime
      languages: ['javascript', 'css', 'html', 'liquid']
    })
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
