'use strict';

const webpack = require('webpack');
const path = require('path');
const env = (process.env.NODE_ENV || '').toLowerCase();
const dependencies = require('./package.json').dependencies;

const basehost = (() => {
  let host = '';
  switch (env) {
    case 'production':
      host = '';
      break;
    case 'pre':
      host = '';
      break;
    default:
      host = 'https://api.xtreamr.com/xtreamr/v1';
      break;
  }

  return `"${host}"`;
})();

const variableSubstitution = new webpack.DefinePlugin({
  __BASEHOST__: basehost
});

const vendorModules = Object.keys(dependencies);

const plugins = [];
plugins.push(variableSubstitution);
plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.bundle.js'
}));

const HappyPack = require('happypack');
plugins.push(new HappyPack({
  loaders: ['babel-loader'],
  threads: 2
}));

let devtool = 'source-map';

module.exports = {
  devtool,
  entry: {
    app: './src/App.jsx',
    vendor: vendorModules
  },
  output: {
    path: path.join(__dirname, '/www/js'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'happypack/loader',
        exclude: [/www/]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /www/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [/node_modules/, /www/]
      }
    ]
  }
};