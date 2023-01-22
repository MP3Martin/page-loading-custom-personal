const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: {
      name: 'PageLoading',
      type: 'umd'
    }
  },
  target: 'node', // use require() & use NodeJs CommonJS style
  externals: [nodeExternals()]
};
