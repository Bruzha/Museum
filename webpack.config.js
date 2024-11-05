const path = require('path')
module.exports = {
    entry: {
        filename: path.resolve(__dirname,'src/index.js')
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'index.js'
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}