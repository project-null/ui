const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = webpackMerge(commonConfig, {
    entry: {
        main: './src/index.jsx', // 程序入口
        vendor: ['react', 'react-dom', 'react-router', 'prop-types'], // 常用组件分拆        
        antd: ['antd'],
    },
    output: {
        path: resolve('dist'),
        publicPath: '/',
        filename: 'js/[name].[hash].[id].js',
        chunkFilename: 'js/[name].[hash].[id].js'
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin([resolve('dist')]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            sourceMap: true,
            mangle: true
        })
    ]
});