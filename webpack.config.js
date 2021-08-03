/**
 * webpack 打包配置文件
 */
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    //入口
    entry: {
        commonCSS: "./src/js/common.js",
        dom: "./src/js/common/dom.js",
        http: "./src/js/common/http.js",
        utils: "./src/js/common/utils.js",

        Swiper: "./src/lib/swiper/swiper-bundle.js",
        captcha: "./src/lib/captcha/captcha-mini.js",
        weui: "./src/lib/weui/weui.js",

        home: "./src/js/home.js",
        login: "./src/js/login.js",
        register: "./src/js/register.js",
        advertisement: "./src/js/advertisement.js",
        mine: "./src/js/mine.js",
        sports: "./src/js/sports.js",
        edit: "./src/js/edit.js",
        sportdata: "./src/js/sportdata.js",
        course: "./src/js/course.js",
        introduce: "./src/js/introduce.js"
    },
    //出口
    output: {
        path: path.resolve(__dirname, "dist"), //绝对路径
        filename: 'js/[name].js',
        publicPath: './',
    },
    //loader 
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, "css-loader", 'postcss-loader', "less-loader"]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/, //配置css中的图片打包
                loader: 'url-loader', //只有一个处理的loader的写法  
                //可以通过url-loader 将图片压缩为 base64编码格式的图片
                //大图就不压缩  小图可以压缩
                options: {
                    name: '[hash:16].[ext]', // 图片输出的名字hash长度16位 默认32位
                    limit: 30 * 1024, // 限制 小于30kb base64处理
                    esModule: false,
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/, //配置html文件打包
                loader: 'html-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/, //配置iconfont文件打包
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader', // loader 编译es6为es5
                exclude: /node_modules/ // 排除
            }
        ]
    },
    //plugin 插件
    plugins: [
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/home.html', //以哪个html文件作为打包的模板
            filename: 'home.html',
            chunks: ["home", "commonCSS", "dom", "Swiper", "http", "utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/login.html', //以哪个html文件作为打包的模板
            filename: 'login.html',
            chunks: ["login", "commonCSS", "dom", "http", "utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/register.html', //以哪个html文件作为打包的模板
            filename: 'register.html',
            chunks: ["register", "commonCSS", "dom", "captcha", "http", "utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/advertisement.html', //以哪个html文件作为打包的模板
            filename: 'advertisement.html',
            chunks: ["advertisement", "commonCSS", "dom"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/mine.html', //以哪个html文件作为打包的模板
            filename: 'mine.html',
            chunks: ["mine", "commonCSS", "dom", "http", "utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/sports.html', //以哪个html文件作为打包的模板
            filename: 'sports.html',
            chunks: ["sports", "commonCSS", "dom", "http", "utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/edit.html', //以哪个html文件作为打包的模板
            filename: 'edit.html',
            chunks: ["edit", "commonCSS", "dom", "http", "weui", "utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/sportdata.html', //以哪个html文件作为打包的模板
            filename: 'sportdata.html',
            chunks: ["sportdata", "commonCSS", "dom", "http"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/course.html', //以哪个html文件作为打包的模板
            filename: 'course.html',
            chunks: ["course", "commonCSS", "dom", "http", "utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/introduce.html', //以哪个html文件作为打包的模板
            filename: 'introduce.html',
            chunks: ["introduce", "commonCSS", "dom", "http", "utils"]
        }),



        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        //plugin 添加
        new CleanWebpackPlugin()
    ],
    //mode 环境   development:开发环境  production：生产环境（线上环境）
    mode: process.env.NODE_ENV,
    //webpack.config.js   
    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 999, // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'introduce.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器

}