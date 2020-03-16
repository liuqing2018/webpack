const path = require('path');
const HtmlWebPlug = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './build',
    compress: true,
    host: '0.0.0.0',
    port: 9090,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPlug({
      removeAttributeQuotes: true,
      collapseWhitespace: true,
    })
  ]
};
