require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');
var config = require('../src/config');
var host = config.host;
var port = (+process.env.PORT + 1) || 3001;
var HappyPack = require('happypack');

module.exports = {
  devtool: 'inline-eval-cheap-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel', 'eslint-loader'],
        happy: { id: 'js' }
      },
      { test: /\.json$/, include: path.resolve(__dirname, "../src/"), loader: 'json-loader' },
      {
        test: /\.css/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src/"),
        loader: "style-loader!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!postcss"
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src/"),
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
      },
      { test: /images/, include: path.resolve(__dirname, "../src/"),loader: 'url-loader?limit=10240' },
      { test: /svg/, include: path.resolve(__dirname, "../src/"),loader: 'url-loader?limit=10240' }
    ]
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new HappyPack({ id: 'js', threads: 5 })
  ]
};
