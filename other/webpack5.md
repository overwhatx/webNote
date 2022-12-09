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
# 版本二
### 安装配置 wepback
- 1.初始化项目 npm init -y 安装webpack相关的包 ` npm i webpack webpack-cli -D`
- 2.在项目根目录创建 webpack.config.js 的 webpack 配置文件
  - 在 webpack.config.js 初始化基本配置
    ```js
    module.exports = {
    // 编译模式
    mode: 'development', //development 开发模式   production 上线模式
    }
    ```
- 3.在package.json 配置文件中 scripts 节点下 新增 dev 脚本 dev并不是固定的 可以自定义的 但在运行的时候 也使用对应的名字
  ```json
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack" //
  },
  ```
- 4.运行 npm run dev  进行项目打包
- 5.配置打包的入口与出口 
  - 当不进行配置打包入口与出口的时候将使用默认的
  -  webpack.config.js中进行配置
    ```js
    //配置修改打包的入口与出口
    //首先需要在 module.exports 外引入 path 模块
    const path = require('path'); //导入nodejs 操作 路径的模块

    entry: path.join(__dirname, './src/index.js'), //打包入口文件路径
    output: {
        path: path.join(__dirname, './dist'), //输出文件路径
        filename: 'aaa.js', //输出文件的名称
    },
    ```
- 配置 自动打包功能
  - 1.安装自动打包的工具 `npm i webpack-dev-server -D`
  - 2.修改package.json 中scripts中的 dev 键名为 "webpack-dev-server" (将webpack 替换掉)
  - 3.运行 npm run dev 点击控制台中输出的打开地址  出现一片文件 点击入口文件打开
    - 打包生成的输出文件 默认放到了项目的根目录 但是虚拟的看不见
    - 运行成功但是浏览器报 Cannot GET / 不显示页面 
      - 解决方法：
        ```js
        //在webpack.config.js文件下的 module.exports中进行配置
        //devServer.static该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用。
        devServer: {
        static: {
            directory: path.join(__dirname, './'),
            watch: true
        }
        },
        ```
- 配置 生成预览页面
  - 1.安装插件 `npm html-webpack-plugin -D` 
  - 2.在webpack.config.js文件添加配置
    ```js
    //1. module.exports 外添加
    const plugin = require('html-webpack-plugin'); //生成预览页面的模块
    const htmlPlugin = new plugin({     //创建插件的实例对象
    template: './src/index.html',       //指定要用到的模板文件
    filename: 'index.html'      //指定生成的文件名 该文件存在于内存中，在目录中不显示
    })

    //2.module.exports 内添加
    //plugins 是 webpack打包用到的一系列插件列表
    module.exports = {plugins: [htmlPlugin], }
    ```
- 配置 自动打包后 自动打开页面
- 在 文件下 字段 值中 添加
  - --open 打包完成后自动打开浏览器
  - 配置IP地址
  - 配置端口
- demo
  ```js
     "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --port 8888"
  },
  ```
### package.json 文件 详情
- package.json **是对项目或者模块包的描述**,里面包含许多元信息
  - 文件里也包含里当前项目依赖了哪些第三方模块,这些项目依赖可分为项目依赖和开发依赖
    - 项目依赖:在项目的开发阶段和线上运营阶段，依赖的第三方包，称为项目依赖
      - 下载命令：npm install 包名 下载的文件会默认被添加到 package.json文件的dependencies 字段中 例如`npm install jquery`
      - package.json文件中 多了一个dependencies 字段 项目依赖包名存放于此处
    - 开发依赖：在项目的开发阶段需要依赖，线上运营阶段不需要依赖的第三方包，称为开发依赖
      - 使用npm install 包名 --save-dev命令将包添加到package.json文件的devDependencies字段中
      - package.json文件中 多了一个devDependencies 字段 开发依赖包名存放于此处
- package-lock.json文件的作用
  - 下载第三方依赖包时，会在项目根目录下生成一个package-lock.json文件package-lock.json这个文件会保存node_modules中所有包的信息
  - 这个文件的主要作用是 锁定包的版本，确保再次下载时不会因为包版本不同而产生问题 (保留 package.json文件形式的下载)
#### package.json 文件基础配置 详情
```js
    {
  "name": "packss",     //项目名称  （名称和版本一起构成一个标识符，该标识符被认为是完全唯一的。）
  "version": "1.0.0",   //版本号   （每次发布时version版本号不能与 已存在的版本号相同  否则服务器无法识别！！！）
  "description": "",    //是一个字符串，用于编写描述信息。有助于人们在npm库中搜索的时候发现你的模块
  "main": "index.js",   //指定了加载的入口文件，require导入的时候就会加载这个文件。这个字段的默认值是模块根目录下面的index.js
  "scripts": {          // scripts：指定了运行脚本命令的npm命令行缩写
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server"
  },
  "keywords": [],       //keywords是一个字符串组成的数组，有助于人们在npm库中搜索的时候发现你的模块
  "author": "",         //author是具体一个人 contributors表示一群人，他们都表示当前项目的共享者
  "license": "ISC",     //是当前项目的协议，让用户知道他们有何权限来使用你的模块，以及使用该模块有哪些限制
  "dependencies": {     //指定了项目运行所依赖的模块
    "jquery": "^3.6.0"
  },
  "devDependencies": { //指定项目开发所需要的模块
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0"
  }
}
```
# vue 打包
## yarn bulid 打包命令执行后的问题
- 在没进行配置之前 打包的好的dist文件 直接进行运行 index.html 会出现404 问题
- 原因：
  - 默认打包 index.html 引入其他打包的文件使用的是绝对地址
  - 地址是以/开头 （要找到当前index.html 打开时所在服务器的根地址 （文件夹））（使用vscode liserver打开时候 vscode根目录一定要是 dist）
  - 但是因为 服务器上不可能只要一个项目 根目录不止一个项目
- 解决：
  - webpack 配置 publicPath - 控制index.html引入其他资源前缀地址
  - 通过在 vue.config.js  脚手架配置文件 webpack配置文件
  - publicPath 默认值为 '/'  在开发环境下一定是这个值，因为开发服务器会把所有打包放在内存里面 作为服务器的根目录文件夹， 绝对地址
    - 当然也可以使用 ./ 但是为了严谨 就该在什么环境下使用什么方式
  - 生产环境 上线 使用相对路径  publicPath:'./'
  - 进行配置后 不会再以 / 开头  不写./ 表示为 相对路径 
- 合理解决方式
  - 场景：当生产环境和开发环境需要来回切换时 会显得格外麻烦
  - 通过 node内置的环境变量  process.env.NODE_ENV  来判断当前 输入的命令
  - 当输入命令为 yarn serve 那么 process.env.NODE_ENV的值就是 'development' 字符串
  - 当输入命令为 yarn build 那么 process.env.NODE_ENV的值就是 'production' 字符串
  - publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
## 如何减小 打包的体积
- 打包时排除掉第三方包 使用CDN进行引入 使用
  - 1.排除第三方配置  在 vue.config.js 中进行设置
     ```js
      configureWebpack: {
      externals: {
      // '包名':'在项目中引入的名字'
      echarts: 'echarts',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      // dayjs: 'dayjs',
      'element-ui': 'ELEMENT',
      // 'vue-quill-editor': 'VueQuillEditor',
      // 'vuex-persistedstate': 'createPersistedState'
      },
    }
     ```
  - CDN
    - 中文名为 内容分发网络 用于提高访问速度
    - 把一些静态资源 css 、js 、图片、视频放在 第三方的CDN服务器上 可以加速访问速度
    - 免费CDN 进行测试 地址：https://unpkg.com/
    - 例子：https://unpkg.com/vue-router@3.5.1   https://unpkg.com/包名@版本号 回车查找获取整条路径
      - `<script src="https://unpkg.com/vue-router@3.5.1/dist/vue-router.js"></script>` 存放于 index.html 文件中 在进行打包
  - 当使用 CDN后  在生产环境下使用 也会进行引入在执行  比较缓慢 
    - 解决：通过 判断 当前开发环境 是否使用 CDN加速  使用node内置的环境变量进行判断 ` process.env.NODE_ENV === 'production'`
       ```js
          //需要排除的包
          let externals = {}
          // 判断是否是生产环境
          const isProduction = process.env.NODE_ENV === 'production'


           // 如果是生产环境，组要执行以下逻辑
            if (isProduction) {
              externals = {
                // '包名':'在项目中引入的名字'
                // echarts: 'echarts',
                // vuex: 'Vuex',
                // dayjs: 'dayjs',
                // 'vue-quill-editor': 'VueQuillEditor',
                // 'vuex-persistedstate': 'createPersistedState',
                'element-ui': 'ELEMENT',
                'vue-router': 'VueRouter',
                vue: 'Vue',
                axios: 'axios',
              }
            }

       ```
