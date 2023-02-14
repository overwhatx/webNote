# React
## 初识 react
- 开发React必须依赖三个库 有顺序要求 必须先引入 react在引入react-dom
  - react: 包含react所必须的核心代码口
  - react-dom: react渲染在不同平台所需要的核心代码口
  - babel:将jsx转换成React代码的工具
- 编写React的script代码中，必须添加 type="text/babel"，作用是可以让babel解析jsx的语法

### 创建第一个 react demo
- React 18 之前使用: `ReactDOM.render(渲染的内容,渲染到什么位置)`
- React 18: `const root = ReactDOM.createRoot(document.querySelector('#root')) root.render(<h2>hellow react18</h2>)`
- 案例
  ```html
    <body>
    <div id="root"></div>
    <div id="app"></div>

    <script src="lib/react.js"></script>
    <script src="lib/react-dom.js"></script>
    <script src="lib/babel.js"></script>
    <script type="text/babel">
      // 渲染HeLLo WorLd
      //·React18之前:ReactDOM.render(渲染的内容,渲染到什么位置)
      // 报错：ReactDOM.render在react 18中不再受支持。请改用 createRoot
      // ReactDOM.render(<h2>hellow react</h2>, document.querySelector('#root')) 

      // React18 后
      const root = ReactDOM.createRoot(document.querySelector('#root'))
      root.render(<h2>hellow react18</h2>)
      const app = ReactDOM.createRoot(document.querySelector('#app'))
      app.render(<h2>hellow XBG</h2>)
    </script>
  </body>
  ```
- 小案例 点击按钮改变文本
  ```js
    <script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector('#root'))
    let message = 'hello react18'
    function btnClick() {
      message = 'hello XBG'
      // 重新渲染
      rootRender()
    }
    rootRender()
    function rootRender() {
      root.render((
        <div>
          <h2>{message}</h2>
          <button onClick={btnClick}>btn</button>
        </div>
      ))
    }
    </script>
  ```
- 小案例 列表渲染
  ```js
    <script type="text/babel">
      const root = ReactDOM.createRoot(document.querySelector('#root'))
      class App extends React.Component {
        constructor() {
          super()
          this.state = {
            movies: ['狂飙', '人名的名义', '扫黑风暴', '觉醒年代', '红海行动']
          }
        }
        render() {
          // 方式1
          /*  const lis = []
           for(let i=0; i<this.state.movies.length;i++){
             const movie = this.state.movies[i]
             const li = <li>{movie}</li>
             lis.push(li)
           } */

          // 方式2 可以省略lis变量 直接将处理代码写在 渲染中
          const lis = this.state.movies.map(item => <li>{item}</li>);
          return (
            <div>
              <h2>电影列表</h2>
              <ul>
                {lis}
              </ul>
            </div>
          )
        }
      }
      root.render(<App />)
    </script>
  ```
- 小案例 计数器
  ```js
    <script type="text/babel">
    class App extends React.Component {
      constructor() {
        super()
        this.state = {
          counter: 0
        }
        this.add = this.add.bind(this)
        this.reduce = this.reduce.bind(this)
      }
      add() {
        this.setState({
          counter: this.state.counter + 1
        })
      }
      reduce() {
        this.setState({
          counter: this.state.counter - 1
        })
      }

      render() {
        return (
          <div>
            <h2>当前计数：{this.state.counter}</h2>
            <button onClick={this.add}> +1 </button>
            <button onClick={this.reduce}> -1 </button>
          </div>
        )
      }
    }
    const root = ReactDOM.createRoot(document.querySelector('#root'))
    root.render(<App />)
    </script>
  ```
- 模板 在html中的react模板
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>

    <body>
      <div id="root"></div>
    </body>

    </html>
    <script src="lib/react.js"></script>
    <script src="lib/react-dom.js"></script>
    <script src="lib/babel.js"></script>
    <script type="text/babel">
      // 定义 App 根组件
      class App extends React.Component {
        constructor() {
          super()
          this.state = {
            message: 'Hello React18'
          }
        }
        render() {
          const { message } = this.state
          return (
            <div>
              <h2>{message}</h2>
            </div>
          )
        }
      }
      // 创建 root 并渲染App组件
      const root = ReactDOM.createRoot(document.querySelector('#root'))
      root.render(<App />)
    </script>
  ```

### this指向 初步问题
- 默认绑定 this 是指向 window的 但在严格模式下this指向 undefined
- 在引用了 Babel库的scrip 中普通函数 的this指向 也是为undefined 因为Babel会默认转换为严格模式
- 在类里面的函数就是为严格模式 与Babel无关
```js
  <script type="text/babel">
    class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: 'hello react18'
      }
      // 方式2 提前改变this指向
      // this.btnClick = this.btnClick.bind(this)
    }
    btnClick() {
      console.log(this);
      // 当前this 并不能代表组件实例
      // 默认绑定 this 是指向 window的 但在严格模式下this指向 undefined
      // 在引用了 Babel库的scrip 中普通函数 的this指向 也是为undefined 因为Babel会默认转换为严格模式
      // 在类里面的函数就是为严格模式 与Babel无关
      this.setState({
        message: 'Hello XBG'
      })
    }
    render() {
      // 方式1 需要改变this指向  或者提前在构造函数中改变this指向
      return (
        <div>
          <h2>{this.state.message}</h2>
          <button onClick={this.btnClick.bind(this)}>btn</button>
        </div>
      )
    }
  }
  const root = ReactDOM.createRoot(document.querySelector('#root'))
  root.render(<App />)

  function bar() {
    console.log(this);
  }
  bar() //undefined

  </script>
```

## JSX
### JSX 是什么
- JSX是一种JavaScript的语法扩展 (eXtension)也在很多地方称之为JavaScript XML，因为看起就是一段XML语法
-  它用于描述我们的UI界面，并且其完成可以和JavaScript融合在一起使用
-  它不同于Vue中的模块语法，你不需要专门学习模块语法中的一些指令比如(v-for、v-if、v-else、 v-bind)

### JSX 中注意事项
- JSX的顶层只能有一个根元素，所以我们很多时候会在外层包裹一个div元素(或者使用Fragment)- 为了方便阅读，我们通常在jsx的外层包裹一个小括号()，这样可以方便阅读，并且jsx可以进行换行书写
- JSX中的标签可以是单标签，也可以是双标签 **注意:如果是单标签，必须以/>结尾**
- jsx 中的注释 `{/* xxxx */}`

### JSX 嵌入变量作为子元素 JSX 中插入内容
- 情况一: 当变量是Number、String、Array类型时，可以直接显示口 
- 情况二: 当变量是null、undefined、Boolean类型时，内容为空 （如果是标签包裹 标签会存在只是不显示内容）
    - 如果希望可以显示null、undefined、Boolean，那么需要转成字符串
    - 转换的方式有很多，比如toString方法、和空字符串拼接，String(变量)等方式
- 情况三: Object对象类型不能作为子元素 (not valid as a React child)
```js
<script type="text/babel">
  // 定义 App 根组件
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: 'Hello React18',
        arr: ['a', 'b', 'c'],
        num: 18,
        a: undefined,
        b: null,
        c: true,
        d: { name: '张三' },
      }
    }
    render() {
      const { a, b, c } = this.state
      const { message, arr, num } = this.state
      let liEls = arr.map(li => <li>{li}</li>)
      return (
        <div>
          {/* 1.String Number Array*/}
          <h2>{message}</h2>
          <h2>{arr}</h2>
          <h2>{num}</h2>

          {/* 2.null undefined Boolean*/}
          <h2>{a}</h2>
          <h2>{b}</h2>
          <h2>{c}</h2>
          <h2>{String(a)}</h2>
          <h2>{b + ""}</h2>
          <h2>{c.toString()}</h2>

          {/* 3. Object*/}
          {/* <h2>this.state.d</h2> 不要直接插入对象 会报错 */}
          <h2>{Object.keys(this.state.d)[0]}</h2>

          {/* 4. 表达式*/}
          <h2>{2022 + 1}</h2>
          {/* 5. 三元运算符*/}
          <h2>{num >= 18 ? '成年人' : '未成年人'}</h2>

          {/* 6. 调用方法获取结果*/}
          <ul>{liEls}</ul>
          <ul>{arr.map(li => <li>{li}</li>)}</ul>
          <ul>{this.getLi()}</ul>
        </div>
      )
    }
    getLi() {
      let liEls2 = this.state.arr.map(li => <li>{li}</li>)
      return liEls2
    }

  }

  // 创建 root 并渲染App组件
  const root = ReactDOM.createRoot(document.querySelector('#root'))
  root.render(<App />)

</script>
```

### JSX 绑定属性
- 绑定class 属性应该使用 className 直接使用class 会出现警告
- 绑定style 属性 设置 style样式使用 {{}} 短斜杠属性转为小驼峰
```js
<script type="text/babel">
  // 定义 App 根组件
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: 'Hello React18',
        title: 'abc',
        imgUrl: 'https://i1.hdslb.com/bfs/archive/319789fa8f007a7aa7a646c12816e97b70288998.jpg@672w_378h_1c_!web-home-common-cover.avif',
        href: 'https://www.baidu.com',
        isActive: true,
        objStyle: { color: 'red', fontSize: '40px' }
      }
    }
    render() {
      let { title, imgUrl, href, isActive, objStyle } = this.state
      // 方式1 字符串拼接方式
      let className = `a b ${isActive ? 'c' : ''}`
      // 方式2 数组方式
      let classList = ['a', 'b']
      if (isActive) classList.push('c')
      //方式3 绑定第三方库 classnames
      return (
        <div>
          <h2 title={title}>{this.state.message}</h2>
          <img src={imgUrl} alt="" />
          <a href={href}>跳转</a>

          {/* 绑定class 属性应该使用 className 直接使用class 会出现警告 */}
          <h2 className={isActive ? 'a b c' : 'a b'}></h2>
          <h2 className={`a b ${isActive ? 'c' : ''}`}></h2>
          <h2 className={className}></h2>
          <h2 className={classList.join(" ")}></h2>

          {/* 绑定style 属性 设置 style样式使用 {{}}  */}
          <h2 style={{ color: 'red', fontSize: '40px' }}>设置样式</h2>
          <h2 style={objStyle}>设置样式</h2>
        </div >
      )
    }
  }
  // 创建 root 并渲染App组件
  const root = ReactDOM.createRoot(document.querySelector('#root'))
  root.render(<App />)

  </script>
```

### 传递参数
```js
  <script type="text/babel">
  // 定义 App 根组件
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: 'Hello React18'
      }
    }
    btn1Click(a, b, event) {
      // event 一定在最后一项
      console.log(a, b, event);
    }
    btn2Click(event, a, b,) {
      // 一一对应
      console.log(event, a, b);
    }
    render() {
      const { message } = this.state
      return (
        <div>
          <h2>{message}</h2>
          {/* event 参数传递 */}
          <button onClick={this.btn1Click.bind(this, 1, 2)}>btn1</button>
          <button onClick={(event) => this.btn2Click(event)}>btn2</button>

          {/* 额外的参数传递 */}
          <button onClick={(event) => this.btn2Click(event, 3, 4)}>btn2</button>
        </div>
      )
    }
  }

  // 创建 root 并渲染App组件
  const root = ReactDOM.createRoot(document.querySelector('#root'))
  root.render(<App />)

  </script>
```
### 条件渲染
```js
<script type="text/babel">
  // 定义 App 根组件
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: 'Hello React18',
        isReady: true,
        person: { name: '小八嘎', age: 18 }
      }
    }

    render() {
      const { message, isReady, person } = this.state

      let showElement = null
      if (isReady) {
        showElement = <h2>显示第一条数据</h2>
      } else {
        showElement = <h2>显示第二条数据</h2>
      }

      return (
        <div>
          {/* 方式1 根据条件给变量赋值不同的内容*/}
          <div>{showElement}</div>
          {/* 方式2 三元运算符*/}
          <div>{showElement ? <h2>张三</h2> : <h2>李四</h2>}</div>
          {/* 方式3 &&逻辑与运算 存在则显示 不存在则不会渲染 场景：当某一个值有可能为undefined时*/}
          {person && <h2>{`姓名：${person.name} 年龄：${person.age}`}</h2>}
        </div>
      )
    }
  }

  // 创建 root 并渲染App组件
  const root = ReactDOM.createRoot(document.querySelector('#root'))
  root.render(<App />)

</script>
```
### 列表渲染
```js
  <script type="text/babel">
  // 定义 App 根组件
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: 'Hello React18',
        students: [
          { id: 1, name: '张三', score: 99 },
          { id: 2, name: '李四', score: 90 },
          { id: 3, name: '王五', score: 80 },
          { id: 4, name: '赵六', score: 66 },
        ]
      }
    }

    render() {
      const { students } = this.state
      // let select1 = students.filter(item => item.score >= 80)
      // let select2 = students.filter(item => item.score >= 80).splice(0, 2)
      return (
        <div>
          <h2>学生列表数据</h2>
          <button>只展示大于等于80分的信息</button>
          <div className="list">
            {
              students.filter(item => item.score >= 80).map(item => {
                return (
                  <div className="item" key={item.id}>
                    <h2>id:  {item.id}</h2>
                    <h2>姓名: {item.name}</h2>
                    <h2>分数: {item.score}</h2>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  // 创建 root 并渲染App组件
  const root = ReactDOM.createRoot(document.querySelector('#root'))
  root.render(<App />)

</script>
```

## React 事件绑定 以及 this指向 问题
- React 事件绑定 采用小驼峰方式 例如点击事件 `onClick`
- 通过{}传入一个事件处理函数 这个函数会在事件发生时被执行
### this指向 问题
- 场景：在事件执行后，我们可能需要获取当前类的对象中相关的属性，这个时候需要用到this
  - 如果我们这里直接打印this，也会发现它是一个undefined
  - 点击按钮 对counter 进行操作 但是 处理函数中的this此时为undefined 无法获取 
    ```js
      <script type="text/babel">
      // 定义 App 根组件
      class App extends React.Component {
        constructor() {
          super()
          this.state = {
            message: 'Hello React18',
            counter: 100
          }
        }
        btn1Click() {
          console.log(this); //undefined
          // this.setState({
          //   counter: this.state.counter + 1
          // })
        }
        render() {
          const { message, counter } = this.state
          return (
            <div>
              <h2>{message}</h2>
              <button onClick={this.btn1Click}>btn1</button>
              <h2>{counter}</h2>
            </div>
          )
        }
      }
      // 创建 root 并渲染App组件
      const root = ReactDOM.createRoot(document.querySelector('#root'))
      root.render(<App />)

      </script>
    ```
- this的四种绑定规则:
  1.默认绑定· 独立执行 foo()
  2.隐式绑定· 被一个对象执行 obj.foo()->obj
  3.显式绑定: call/apply/bind foo.call("aaa")->String("aaa")
  4.new绑定: newFoo()-创建一个新对象，并且赋值给this
### 解决this指向问题 this绑定方式
- 方案一: bind给btnClick显示绑定this
- 方案二: 使用 ES6 class fields 语法
- 方案三: 事件监听时传入箭头函数 (**推荐方式**)
```js
  <script type="text/babel">
  // 定义 App 根组件
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: 'Hello React18',
        counter: 100
      }
      this.btn1Click = this.btn1Click.bind(this)
    }

    btn1Click() {
      // console.log('btn1Click',this); //没有改变this指向前 this为 undefined
      this.setState({
        counter: this.state.counter + 1
      })
    }
    btn2Click = () => {
      console.log('btn2Click', this); //undefined
      this.setState({
        counter: 1000
      })
    }
    btn3Click() {
      console.log('btn3Click', this); //undefined
      this.setState({
        counter: this.state.counter + 10
      })
    }

    render() {
      const { message, counter } = this.state
      return (
        <div>
          <h2>{message}</h2>
          {/* this绑定方式1 bind绑定 */}
          <button onClick={this.btn1Click}>btn1</button>

          {/* this绑定方式2 es6 fields */}
          <button onClick={this.btn2Click}>btn2</button>

          {/* this绑定方式3 直接传入一个箭头函数 */}
          {/*  <button onClick={() => console.log('btn3Click')}>btn3</button> */}
          <button onClick={() => this.btn3Click()}>btn3</button>

          <h2>{counter}</h2>
        </div>
      )
    }
  }
  // 创建 root 并渲染App组件
  const root = ReactDOM.createRoot(document.querySelector('#root'))
  root.render(<App />)

  </script>
```


## React 脚手架
### 安装创建脚手架
- 全局安装脚手架 `npm i create-react-app -g`
- 创建 `create-react-app projectName `
  - 项目名称不能包含大写字母

## 其他 
### 虚拟 DOM **（待补充）**
- 虚拟dom的作用
  - 虚拟DOM diff
  - 跨平台渲染
  - 声明式编程
  - 
### PWA 介绍
- 概念
  - PWA全称Progressive Web App，即渐进式WEB应用
  - 一个 PWA 应用首先是一个网页可以通过 Web 技术编写出一个网页应用
  - 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能
  - 这种Web存在的形式，我们也称之为是 Web App
- PWA解决了哪些问题呢?
  - 可以添加至主屏幕点击主屏幕图标可以实现启动动画以及隐藏地址栏
  - 实现离线缓存功能即使用户手机没有网络，依然可以使用一些离线功能
  - 实现了消息推送
  - 等等一系列类似于Native App相关的功能

### React 脚手架中的 webpack
- React脚手架将webpack相关的配置隐藏起来了
- 如果希望看到webpack的配置信息
  - 执行 package.json 文件中的一个脚本: `"eject":"react-scripts eject"`
  - 执行命令: `yarn eject | npm eject`
  - 这个操作是不可逆的，所以在执行过程中会给与我们提示 输入yes 进行抽取出来