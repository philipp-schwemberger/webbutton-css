var path = require('path')
var config = require('../config/index')
var webpack = require('webpack')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')


var program = require('commander')
program
  .option('-t, --target [value]', 'bundle target.')
  .parse(process.argv)

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    // this causes absolute path in builds, which makes them non-distribuable on an other machine
    // we may not need this in nd at all
    // so let's remove it on august, 22th 2016 if no one complains
    //publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  target: program.target || 'electron-renderer',
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.vue'],
    modules: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  // resolveLoader: {
  //   fallback: [path.join(__dirname, '../node_modules')]
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders(),
          autoprefixer: {
            browsers: ['last 2 versions']
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
}
