const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']


module.exports = {
    chainWebpack: config => {
        config
            .module
            .rule("images")
            .test(/\.(jpg|png|gif)$/)
            .use("url-loader")
            .loader("url-loader")
            .options({
                limit: 10,
                // 以下配置项用于配置file-loader
                // 根据环境使用cdn或相对路径
                // publicPath: process.env.NODE_ENV === 'production' ? 'https://static.dragonmainland.io/img' : 'https://static.dragonmainland.com/img', // https://static.dragonmainland.com/img
                publicPath: 'https://static.dragonmainland.io/img',
                // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
                outputPath: 'img',
                // 配置打包后图片文件名
                //  name: '[name].[hash].[ext]',
            })
            .end();
    },
    lintOnSave: false,
    runtimeCompiler: true,
    publicPath: './', // 设置打包文件相对路径
    productionSourceMap: false,
    devServer: {
        port: 8023,
        open: true,
        proxy: {
            //以'/api'开头的接口会转接到下面的target的ip
            '/lbp-api/': {
                target: 'http://abcd12348888test.dragonmainland.com', // target host
                changeOrigin: true, // needed for virtual hosted sites
                ws: false, // proxy websockets
                pathRewrite: {
                    //路径重写
                    '^/lbp-api/': '', // rewrite path
                },

            },

        }
    },
    configureWebpack: (config) => {
        // plugins: [
        //     // 下面是下载的插件的配置
        //     new CompressionWebpackPlugin({
        //         algorithm: 'gzip',
        //         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        //         threshold: 10240,
        //         minRatio: 0.8
        //     }),

        // ]
        if (process.env.NODE_ENV === 'production') {
            config.plugins = [
                ...config.plugins,
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            ]
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }



    }


}