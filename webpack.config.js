const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const public = path.resolve(__dirname, './public');
const src = path.resolve(__dirname, './src');
const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties'
        ],
    }
};
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', `${src}/index.js`],
    output: {
        path: public,
        filename: `[name].bundle.js`,
    },
    devServer: {
        contentBase: public,
        open: true,
        compress: true,
        hot: true,
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.m?jsx?$/i,
                exclude: /node_modules/,
                use: babelLoader
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    },
                    'sass-loader'
                ]
            },
        ],
    },
};