require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var autoprefixer = require('autoprefixer');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, '../public/dist/');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [strip.loader('debug', 'console.log'), 'babel', 'eslint-loader']
      },
      { test: /\.json$/, loader: 'json-loader'},
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss")
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
      },
      { test: /images/, loader: 'url-loader?limit=10240'},
      { test: /svg/, loader: 'url-loader?limit=10240' },
    ]
  },
  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions'] })]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    new webpack.EnvironmentPlugin(['NODE_ENV']),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("styles.css", {
        allChunks: true
    })
  ]
};
