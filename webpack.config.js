const path = require('path')
const phtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        filename: path.resolve(__dirname,'src/index.js')
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'index.js',
        assetModuleFilename: '[name][ext]'
    },
    devServer:{
        port:9000,
        compress: true,
        hot: true,
        static:{
            directory: path.join(_dirname, 'dist')
        }
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Museum',
            filename: 'index.html'
        })
    ]
}