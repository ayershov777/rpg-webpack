const path = require('path');

module.exports = {
  mode: 'development',
  stats: 'errors-warnings',
  context: __dirname,
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    proxy: {
      target: 'http://localhost:3000',
      context: ['/'],
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
