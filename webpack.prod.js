const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].bundle.css",
      chunkFilename: "[id].bundle.css"
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: '',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
});