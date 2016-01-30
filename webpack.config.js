var path = require('path'),
    libPath = path.join(__dirname, 'lib'),
    wwwPath = path.join(__dirname, 'www'),
    pkg = require('./package.json'),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        vendors: path.join(libPath, 'vendors.js'),
        index: path.join(libPath, 'index', 'index.js'),
        about: path.join(libPath, 'about', 'index.js'),
        style: path.join(libPath, 'scss', 'index.scss')
    },
    output: {
        path: path.join(wwwPath, 'js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file?name=img/[name].[ext]'
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "babel",
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.scss$/,
            loader: "style!css!autoprefixer!sass"
        }, {
            test: [/MaterialIcons-Regular.eot/, /MaterialIcons-Regular.woff2/, /MaterialIcons-Regular.woff/, /MaterialIcons-Regular.ttf/],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss', '.html', '.ts'],
        root: [
            libPath,
            path.join(__dirname, 'node_modules')
        ],
        moduleDirectories: [
            'node_modules'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: pkg.title,
            chunks: ['vendors', 'style', 'index'],
            inject: 'body',
            hash: true,
            pkg: pkg,
            template: path.join(libPath, 'index', 'index.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'about/index.html',
            title: pkg.title,
            chunks: ['vendors', 'style', 'about'],
            inject: 'body',
            hash: true,
            pkg: pkg,
            template: path.join(libPath, 'about','index.html')
        })
    ]
};
