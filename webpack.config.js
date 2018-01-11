const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.jsx'

  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html', //  文件路径
      template: './index.html', //  文件模板
      minify: {
        removeComments: true, //  移除HTML中的注释
        collapseWhitespace: true //  删除空白符与换行符
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js', 
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
};