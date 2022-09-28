# webpack5
## 前言
### 为什么需要打包工具？
- 开发时，我们会使用框架（React、Vue），ES6 模块化语法，Less/Sass 等 css 预处理器等语法进行开发。
- 这样的代码要想在浏览器运行必须经过编译成浏览器能识别的 JS、Css 等语法，才能运行。
- 所以我们需要打包工具帮我们做完这些事。
- 除此之外，打包工具还能压缩代码、做兼容性处理、提升代码性能等。
### 有哪些打包工具？
- Webpack、Vite、Grunt、Gulp、Parcel、Rollup、...
- 目前市面上最主流的是 Webpack vue官方更提倡使用Vite
## 基本使用
- 初始化packge.json `npm init -y`
- 安装webpack依赖以及脚手架 `npm i webpack webpack-cli -D`
- webpack打包：`npx webpack ./src/main.js --mode=development`
- `npx webpack ./src/main.js --mode=production` 生产模式打包 代码会进行压缩
  - development 开发模式
  - production 生产模式
- 打包成功后的输出 `webpack 5.74.0 compiled successfully in 78 ms  ` 显示：版本号 编译成功 用时
- 将index.html 中引入的main.js 改为 dist下的main.js 进行查看
## webpack 5大核心
1. entry（入口）
指示 Webpack 从哪个文件开始打包

2. output（输出）
指示 Webpack 打包完的文件输出到哪里去，如何命名等

3. loader（加载器）
webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

4. plugins（插件）
扩展 Webpack 的功能

5. mode（模式）
- 主要由两种模式：
  - 开发模式：development
  - 生产模式：production
- webpack.config.js 文件 基础配置
```js
// nodejs核心模块 专门用来处理路径问题
const path = require('path')
module.exports = {
  // 入口 相对路径
  entry: "./src/main.js",
  // 输出
  output: {
    // 文件的输出路径 绝对路径 (path.resolve方法 返回一个绝对路径)
    // __dirname 是nodejs的变量 表示当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"),
    // 输出的文件 文件名 
    filename: 'main.js'
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
    ]
  },
  // 插件
  plugins: [
    // plugins 配置
  ],
  // 模式 开发模式
  mode: 'development'
}
```
### npx webpack 进行运行
- 当配置了 webpack.config.js 文件 后 进行打包的时候就不要去指定打包模式了
## 开发模式
- 开发模式顾名思义就是我们开发代码时使用的模式。
- 这个模式下我们主要做两件事：
  1. 编译代码，使浏览器能识别运行
    开发时我们有样式资源、字体图标、图片资源、html 资源等，webpack 默认都不能处理这些资源，所以我们要加载配置来编译这些资源

  2. 代码质量检查，树立代码规范
    提前检查代码的一些隐患，让代码运行时能更加健壮。
    提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观。
### 处理样式资源 Css、Less、Sass、Scss、Styl
- Webpack 本身是不能识别样式资源的，所以我们需要借助 Loader 来帮助 Webpack 解析样式资源
- 我们找 Loader 都应该去官方文档中找到对应的 Loader，然后使用
- 官方文档找不到的话，可以从社区 Github 中搜索查询
- webpack 官方文档：https://webpack.docschina.org/loaders/css-loader/
- 样式的处理
```js
module.exports = {
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        // 只检测 .css的文件 
        test: /\.css$/i,
        // 执行顺序 是从右到左 从上到下  （css-loader > style-loader > test: /\.css$/i）
        //  use: 和 loader: 的区别 use可以使用多个loader 而loader 只能使用一个loader
        use: [
          // 将js中css通过创建style标签添加html文件中生效
          "style-loader",
          // 将css资源编译成 commonjs的模块到js中
          "css-loader"
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // 同上
          'style-loader',
          'css-loader',
          // 将less 文件编译成css 文件
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader','css-loader','sass-loader',],
      },
      {
        test: /\.styl$/,
        use: ['style-loader','css-loader','stylus-loader',],
      },
    ]
  },
}
```
### 图片资源的处理
- 不需要额外下载 loader webpack能处理
```js
 // 处理图片资源
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转 base64格式 （优点 减少请求数量 缺点 图片体积会变大）
             maxSize: 10 * 1024 
          }
        }
      },
```
### 修改 文件输出的目录
- js文件存放地址
```js
  // 输出
  output: {
    // 所有文件的输出路径 绝对路径 (path.resolve方法 返回一个绝对路径)
    // __dirname 是nodejs的变量 表示当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"),
    // 入口文件 打包输出的文件名 
    filename: 'static/js/main.js'
  },
```
- 图片存放地址
```js
 // 处理图片资源
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转 base64格式 （优点 减少请求数量 缺点 图片体积会变大）
            maxSize: 10 * 1024
          }
        },
        generator: {
          // 图片打包存放地址
          // 生成输出图片的名字 （hash 唯一id名 ext扩展名 query url上携带的参数）
          // (hash:10 可以指定值的长度  表示取前10位)
          filename: 'static/images/[hash:10][ext][query]'
        }
      },
```
### 自动清空上次打包内容 
```js
output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'static/js/main.js',

    // 自动清空上次打包内容
    // 原理：在打包前将整个目录清空 在进行打包
    clean:true,
  },
```
##