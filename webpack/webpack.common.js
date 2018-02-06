const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    disable: process.env.NODE_ENV === 'development',
    filename: 'css/[name].[hash].[id].css'
});

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            $utils: path.resolve(__dirname, '../src/utils'),
            $models: path.resolve(__dirname, '../src/models'),
        }
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: extractSass.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }],
                fallback: 'style-loader'
            }),            
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    plugins: [
        extractSass,
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', //  文件路径
            template: './index.html', //  文件模板
            minify: {
                removeComments: true, //  移除HTML中的注释
                collapseWhitespace: true //  删除空白符与换行符
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};