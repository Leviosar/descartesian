const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js?[chunkhash]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.scss$/,
                use: [
                  "style-loader",
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader"
                ]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'app.css?[contenthash]',
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin(
                {
                    test: /\.js(\?.*)?$/i,
                }
            ),
        ],
    },
}