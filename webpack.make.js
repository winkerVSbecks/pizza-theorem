var path = require('path');
var webpack = require('webpack');

var buildPlugins = [
  new webpack.NoErrorsPlugin()
];

var devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

var entries = {
  'DEV': [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  'BUILD': ['./src/index'],
  'TEST': [path.join(__dirname, 'webpack.test.bootstrap.js')]
};

module.exports = function makeWebpackConfig(options) {

  var BUILD = options.BUILD;
  var TEST = options.TEST;
  var DEV = options.DEV;

  return {

    devtool: BUILD ? 'source-map' : 'eval',

    entry: BUILD ? entries.BUILD : entries.DEV,

    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js'
    },

    plugins: BUILD ? buildPlugins : devPlugins,

    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: BUILD ? ['babel'] : ['react-hot', 'babel'],
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }
      ]
    }

  };

};


