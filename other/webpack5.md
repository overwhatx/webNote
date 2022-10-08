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
## 处理js资源
- Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理
- 其次开发中，团队对代码格式是有严格要求的，我们不能由肉眼去检测代码格式，需要使用专业的工具来检测。
- 针对 js 兼容性处理，可以使用 Babel 来完成
- 针对代码格式，可以使用 Eslint 来完成
- 先完成 Eslint，检测代码格式无误后，在由 Babel 做代码兼容性处理

### Eslint
- Eslint是用来检测 js 和 jsx 语法的工具，可以配置各项功能
- Eslint官网：`https://eslint.bootcss.com/docs/user-guide/configuring`
- 使用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查
#### 1. 配置文件
- 配置文件有很多种写法：
  - .eslintrc.*：新建文件，位于项目根目录
  - .eslintrc
  - .eslintrc.js
  - .eslintrc.json
- 区别在于配置格式不一样
  - package.json 中 eslintConfig：不需要创建文件，在原有文件基础上写
  - ESLint 会查找和自动读取它们，所以以上配置文件只需要存在一个即可
#### 2. 具体配置
- .eslintrc.js 配置文件为例：
```js
module.exports = {
  // 解析选项
  parserOptions: {},
  // 具体检查规则
  rules: {},
  // 继承其他规则
  extends: [],
  // ...
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};
```
- 1. parserOptions 解析选项
```js
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
    ecmaFeatures: { // ES 其他特性
      jsx: true // 如果是 React 项目，就需要开启 jsx 语法
    }
  }
```
- 2. rules 具体规则
  - "off" 或 0 - 关闭规则
  - "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  - "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  - 更多规则查阅官方文档:`https://eslint.bootcss.com/docs/rules/`
```js
  rules: {
    semi: "error", // 禁止使用分号
    'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
    'default-case': [
      'warn', // 要求 switch 语句中有 default 分支，否则警告
      { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
    ],
    eqeqeq: [
      'warn', // 强制使用 === 和 !==，否则警告
      'smart' // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
    ],
  }
```
#### 3. extends 继承
- 开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则
- 现有以下较为有名的规则：
  - Eslint 官方的规则：eslint:recommended  :`https://eslint.bootcss.com/docs/rules/`
  - Vue Cli 官方的规则：plugin:vue/essential :`https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint`
  - React Cli 官方的规则：react-app :`https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app`

```js
// 例如在React项目中，我们可以这样写配置
module.exports = {
  extends: ["react-app"], //继承规则的名字 需要下载后使用 （eslint官方 配置不需要下载）
  // 使用继承规则 有不需要的规则或需要改变的规则 可以在rules 中进行 覆盖设置
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    // 所以想要修改规则直接改就是了
    eqeqeq: ["warn", "smart"],
  },
};
```
#### 在 Webpack 中使用 Eslint
- 参考官方文档：https://webpack.docschina.org/plugins/eslint-webpack-plugin/
- 安装：`npm install eslint-webpack-plugin eslint  --save-dev` (eslint-webpack-plugin 和 eslint )
- 在 `webpack.config.js` 文件中进行引用 `const ESLintPlugin = require('eslint-webpack-plugin');`
```js
   // 插件
  plugins: [
    // plugins 配置
    // new 调用eslint插件
    new ESLintPlugin(
      // 设置需要被检测的文件
      {
        context: path.resolve(__dirname, "src")
      }
    )
  ],
```
- 在项目根目录创建文件 `.eslintrc.js` 进行eslint 配置
```js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,//es6
    sourceType: "module",//es module
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```
- 在项目根目录创建文件 `.eslintignore` 配置 eslint 检查时要忽略的文件
```js
dist
```
### Babel
- JavaScript 编译器
- 主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中
#### 1. 配置文件
- 配置文件由很多种写法：
 - babel.config.*：新建文件，位于项目根目录
    - babel.config.js
    - babel.config.json
 - .babelrc.*：新建文件，位于项目根目录
   - .babelrc
   - .babelrc.js
   - .babelrc.json
 - package.json 中 babel：不需要创建文件，在原有文件基础上写
   Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可
#### 2. 具体配置
```js
module.exports = {
  // 预设
  presets: [],
};
```
- presets 预设
  - 简单理解：就是一组 Babel 插件, 扩展 Babel 功能
  - @babel/preset-env: 一个智能预设，允许您使用最新的 JavaScript。
  - @babel/preset-react：一个用来编译 React jsx 语法的预设
  - @babel/preset-typescript：一个用来编译 TypeScript 语法的预
#### 在 Webpack 中使用 babel

- 1.安装：`npm install -D babel-loader @babel/core @babel/preset-env webpack` (安装多个  已安装的无需在次安装)
  - 地址：https://webpack.docschina.org/loaders/babel-loader#root
- 2.定义 Babel 配置文件 根目录创建 `babel.config.js`文件
  - 也可以写于 webpack.config.js 中 只是不利于修改
```js
module.exports = {
  // 智能预设：能够编译 ES6的语法
  presets: ["@babel/preset-env"],
};


```
###
###