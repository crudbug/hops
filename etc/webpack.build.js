
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var helpers = require('../config/helpers');

module.exports = helpers.extend(
  'webpack.base.js',
  helpers.removeLoader.bind(null, 'css'),
  {
    entry: {
      vendor: 'hops',
      main: helpers.root
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&localIdentName=[name]-[local]-[hash:base64:5]&importLoaders=1!postcss'
        )
      }]
    },
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name]-[hash].js'
      }),
      new ExtractTextPlugin(
        '[name]-[contenthash].css',
        { allChunks: true }
      )
    ],
    extend: helpers.extend.bind(null, __filename)
  }
);
