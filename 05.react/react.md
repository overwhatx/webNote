# React
## react 简介
### 优点

- 声明式
  - 声明式编程是目前整个大前端开发的模式： Vue、 React、 Flutter、 SwiftUI
  - 它允许我们只需要维护自己的状态， 当状态改变时， React可以根据最新的状态去渲染我们的UI界面
- 组件化
  - 组件化开发页面目前前端的流行趋势，将复杂的界面拆分成一个个小的组件
  - 如何合理的进行组件的划分和设计是一个重点
- 一次学习跨平台使用
  - 2013年， React发布之初主要是开发Web页面
  - 2015年， Facebook推出了ReactNative，用于开发移动端跨平台
  - 2017年， Facebook推出ReactVR，用于开发虚拟现实Web应用程序

## 初识 react

### 框架引入

- 开发React必须依赖三个库 有顺序要求 必须先引入 react在引入react-dom
  - react: 包含react所必须的核心代码口
  - react-dom: react渲染在不同平台所需要的核心代码口
  - babel:将jsx转换成React代码的工具
- **引入形式下，编写React的script代码中，script标签上必须添加 `<script type="text/babel"></script>` 作用是可以让babel解析jsx的语法**

### 创建第一个 react demo

- React 18 之前使用: `ReactDOM.render(渲染的内容,渲染到什么位置)`
- React 18: `const root = ReactDOM.createRoot(document.querySelector('#root')) root.render(<h2>hellow react18</h2>)`
- 小案例
  ```html
    <body>
    <div id="root"></div>
    <div id="app"></div>

    <script src="lib/react.js"></>
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

## React 的组件化开发

### 组件化开发思想

- 将一个完整的页面分成很多个组件，每个组件都用于实现页面的一个功能块，而每一个组件又可以进行细分，而组件本身又可以在多个地方进行复用。
- 组件化提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用，任何的应用都会被抽象成一颗组件树。
- 有了组件化的思想，在之后的开发中就要充分的利用它尽可能的将页面拆分成一个个小的、可复用的组件，这样让我们的代码更加方便组织和管理，并且扩展性也更强。

### **React的组件相对于Vue更加的灵活和多样，按照不同的方式可以分成很多类组件**

- 根据组件的定义方式，可以分为:函数组件(Functional Component )和类组件(Class Component)
- 根据组件内部是否有状态需要维护，可以分成: 无状态组件(Stateless Component)和有状态组件(Stateful Component)
  - 一般函数式组件为无状态组件，类组件为有状态的组件
- 根据组件的不同职责，可以分成: 展示型组件(Presentational Component)和容器型组件(Container Component)!
- 这些概念有很多重叠，但是他们最主要是关注数据逻辑和UI展示的分离
  - 函数组件、无状态组件、展示型组件主要关注UI的展示
  - 类组件、有状态组件、容器型组件主要关注数据逻辑
- 异步组件(待填坑)
- 高阶组件(待填坑)

### 类组件
- 小案例
  ```js
    import { Component } from "react";
    class App extends Component {
      constructor() {
        super()
        this.state = {
          message:'hello xbg'
        }
      }
      render() {
        const { message}=this.state
        // return (
        //   // 1. react 元素 通过jsx编写的代码就会被编译成 react.createElement 所以返回的就是一个 react 元素
        //   <h2>{message}</h2>
        // )
        // 2.组件或者 fragments
        // return ['a','b','c']
        return [
          <h1>H1</h1>,
          <h2>H2</h2>,
          <h3>H3</h3>
        ]
      }
    }

    export default App;
  ```
- 类组件的定义有如下要求
  - 组件的名称是大写字符开头 (无论类组件还是函数组件)
  - 类组件需要继承自 React.Component
  - 类组件必须实现render函数
- 使用class定义一个组件:
  - constructor 是可选的，我们通常在 constructor 中初始化一些数据
  - this.state 中维护的就是我们组件内部的数据
  - render() 方法是 class 组件中唯一必须实现的方法
- 导出导入方式
  ```js
  // 导入方式1  引入时 只能使用默认导出
  import React from "react";
  class App extends React.Component{
  }
  export default App;

  // 导入方式2 引入时 可以使用默认导出也可以使用选择导出  （vscode 安装插件后 rce快捷生成）
  import React, { Component } from 'react'
  export class App_class extends Component {
    render() {
      return (
        <div>App_class</div>
      )
    }
  }
  export default App_class
  ```
#### 函数的返回值
- 当render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一:
  - React 元素 （通过jsx创建的元素就是 react元素 React.createElement()）
- 数组或 fragments:使得 render 方法可以返回多个元素
- Portals:可以渲染子节点到不同的 DOM子树中
- 字符串或数值类型:它们在 DOM 中会被染为文本节点
- 布尔类型或 null:什么都不渲染

### 函数组件
- 案例
  ```js
    function App () {
      // 返回值 和类组件中的render 函数返回的是一致
      return <h1>App_function</h1>
    }
    export default App
  ```
- 函数组件是使用function来进行定义的函数，只是这个函数会返回和类组件中 render 函数返回一样的内容
- 函数组件有自己的特点 **没有hooks前提下的函数组件** （没有hooks之前的函数 就是一种展示型的函数，复杂的东西都使用类组件）
  - 没有生命周期，也会被更新并挂载，但是没有生命周期函数
  - this关键字不能指向组件实例(因为没有组件实例)
  - 没有内部状态(state)

## React 组件生命周期

- 生命周期官方 图例：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
- 生命周期和生命周期函数的关系： 生命周期是一个抽象的概念，在生命周期 的整个过程，分成了很多个阶段
- **主要是类的生命周期，因为函数式组件是没有生命周期函数的** （当然也可以通过hooks来模拟一些生命周期的回调）

### React生命周期示例

```js
  // App父组件
  import React, { Component } from 'react'
  import HelloWorld from './HelloWorld'
  export class App extends Component {
    constructor() {
      super()
      this.state = {
        isShow:true
      }
    }
    changeIsShow() {
      this.setState({
        isShow:!this.state.isShow
      })
    }
    render() {
      const {isShow }=this.state
      return (
        <div>
       <button onClick={e=>this.changeIsShow()}>切换</button>
       { isShow && <HelloWorld/>}
        </div>
      )
    }
  }
  export default App

  // 子组件
  import React from 'react'
  export class HelloWorld extends React.Component {
    // 1.构造方法  constructor
    constructor() {
      console.log("1 constructor 构造方法");
      super()
      this.state={
      message:'Hello World'
      }
    }

    changeText() {
      this.setState({message:'阿里嘎多美羊羊桑'})
    }
    // 2.执行 render 函数
    render() {
      console.log("2 render 函数");
      const { message}=this.state
      return (
        <div>
          <h2>{message}</h2>
          <button onClick={e=> this.changeText()}>修改文本</button>
        </div>
      )
    }
    // 3. 组件被渲染到DOM 被挂载到 DOM
    componentDidMount() {
      console.log('3 componentDidMount 挂载到DOM');
    }

    // 4.组件被修改 DOM发生更新
    componentDidUpdate() {
      console.log('4 componentDidUpdate 组件被修改');
    }
    /* componentDidUpdate(a,b,c) {
      console.log(a,b,c);
    } */

    // 组件被销毁 组件从DOM中卸载 从DOM移除
    componentWillUnmount() {
      console.log('5 componentWillUnmount 组件被销毁');

    }

  // ---------其他生命周期-------------
  // 控制要不要重新执行render函数 返回false 就不会执行  返回true则反之
  shouldComponentUpdate() {
    return true
  }
  // 在 componentDidUpdate 之前执行 在更新之前将一些数据传递给更新后的组件componentDidUpdate(prevProps,PrevState,snapshot)
  getSnapshotBeforeUpdate() {
    return {
      hobby:'唱跳rap篮球'
    }
  }
  }
  export default HelloWorld
```
- 执行流程 5个阶段
  - 第一大阶段挂载：constructor 构造方法 --> render 函数 --> componentDidMount 挂载到DOM
  - 第二大阶段更新：render 函数 --> componentDidUpdate 组件被修改
  - 第三大阶段卸载：componentWillUnmount 组件被销毁

### Constructor

- 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数
- constructor中通常只做两件事情
  - 通过给 this.state 赋值对象来初始化内部的state
  - 为事件绑定实例（this）

### render
### componentDidMount

- 会在组件挂载后（插入 DOM 树中）立即调用
- 在此生命周期中通常进行的操作
  - 依赖于DOM的操作可以在这里进行
  - 在此处发送网络请求就最好的地方；（官方建议）
  - 可以在此处添加一些订阅（会在componentWillUnmount取消订阅）

### componentDidUpdate

- 会在更新后会被立即调用，首次渲染不会执行此方法
- 当组件更新后，可以在此处对 DOM 进行操作
- 如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求；（例如，当 props 未发生变化时，则不会执行网络请求）

### componentWillUnmount

- 会在组件卸载及销毁之前直接调用
- 在此方法中执行必要的清理操作
- 例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等

### 其他生命周期
#### shouldComponentUpdate
#### getDerivedStateFromProps
- state 的值在任何时候都依赖于 props时使用；该方法返回一个对象来更新state
#### getSnapshotBeforeUpdate
- 在React更新DOM之前回调的一个函数，可以获取DOM更新前的一些信息（比如说滚动位置）；

## React 组件间的通信
- 父组件在展示子组件，可能会传递一些数据给子组件
  - 父组件通过 属性=值 的形式来传递给子组件数据
  - 子组件通过 props 参数获取父组件传递过来的数据
### 父传子
- 如果 constructor 中没有需要操作的事项 可以不写 在render函数中直接使用 this.pros 可以拿到父组件传递的值
```js
// 父组件
import React, { Component } from 'react'
import MainBanner from './MainBanner'
import MainList from './MainList'
export class Main extends Component {
  constructor() {
    super()
    this.state = {
      banners: ['唱', '跳', 'rap'],
      productList:['张三','李四','王五']
    }
  }
  render() {
    const {banners,productList}=this.state
    return (
      <div>
        <MainBanner banners={ banners} title='这是标题'/>
        <MainList productList={ productList} title='卧龙凤雏'/>
      </div>
    )
  }
}
export default Main
// 子组件
import React, { Component } from 'react'

export class MainBanner extends Component {
  constructor(props) {
    // console.log(props);
    super(props)
  }
  render() {
    // 在这里也可以拿到 this.props
    console.log(this.props);
    const {banners,title}=this.props
    return (
      <div>
        <h1>{ title}</h1>
        <ul>
          {
            banners.map(item => {
              return <li key={item}>{ item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
export default MainBanner


// 子组件
import React, { Component } from 'react'
export class MainList extends Component {
  // 其实也可以不写 constructor 直接使用 this.pros 使用父组件传递的值
  render() {
    const { productList,title}=this.props
    return (
      <div>
        <h1>{ title}</h1>
        <ul>
          {
            productList.map(item => {
              return <li key={item}>{ item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
export default MainList
```
#### propTypes 类型校验

- 对于传递给子组件的数据，有时候我们可能希望进行验证
- 在没有使用Flow或者TypeScript 情况下 也可以通过 prop-types 库来进行类型验证
- 从 React v15.5 开始，React.PropTypes 已移入另一个包中：prop-types 库
  - 在使用前需要引入
- 更多的验证方式，可以参考官网：https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html
- 当类型校验不通过时会报警告
  - Warning: Failed prop type: Invalid prop `title` of type `number` supplied to `MainBanner`, expected `string`
- 校验示例
  ```js
  import React, { Component } from 'react'
  // 1.引入校验
  import PropTypes from 'prop-types'
  export class MainBanner extends Component {
    render() {
      // 在这里也可以拿到 this.props
      console.log(this.props);
      const {banners,title}=this.props
      return (
        <div>
          <h1>{ title}</h1>
          <ul>
            {
              banners.map(item => {
                return <li key={item.acm}>{ item.title}</li>
              })
            }
          </ul>
        </div>
      )
    }
  }
  // 2.对类型进行限制
  MainBanner.propTypes = {
  // array 类型  isRequired 为必填
  banners: PropTypes.array.isRequired,
  title:PropTypes.string.isRequired
  }
  export default MainBanner
  ```
- 设置默认参数
  - **从 ES2022 开始，你也可以在 React 类组件中将 defaultProps 声明为静态属性**
  ```js
  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  export class MainList extends Component {
  // 方式2 新特性
  // 从 ES2022 开始，你也可以在 React 类组件中将 defaultProps 声明为静态属性。
    static defaultProps= {
      productList: [],
      title:'默认标题'
    }
    render() {
      const { productList,title}=this.props
      return (
        <div>
          <h1>{ title}</h1>
          <ul>
            {
              productList.map(item => {
                return <li key={item.acm}>{ item.title}</li>
              })
            }
          </ul>
        </div>
      )
    }
  }

  // 限制类型
  MainList.propTypes = {
    productList: PropTypes.array,
    title:PropTypes.string
  }

  // 方式1 设置默认值 (当没有传递值的时候使用默认值)
  // MainList.defaultProps = {
  //   productList: [],
  //   title:'默认标题'
  // }

  export default MainList
  ```

### 子传父
- 在React中同样是通过props传递消息，只是让父组件给子组件传递一个回调函数，在子组件中调用这个函数即可
```js
// 父组件
import React, { Component } from 'react'
import Header from './page/Header'
import Footer from './page/Footer'
export class App extends Component {
  constructor() {
    super()
    this.state = {
      counter:100
    }
  }
  // 触发函数拿到返回的参数进行操作
  changeCounter(count) {
    this.setState({
      counter:this.state.counter+count
    })
  }
  reduceCounter(count) {
    this.setState({
      counter:this.state.counter-count
    })
  }
  render() {
    const { counter}=this.state
    return (
      <div>
        <h1>计数：{ counter}</h1>
        {/* 给子组件传递一个函数 触发函数并接收返回的值 */}
        <Header AddClick={ (count)=>{this.changeCounter(count)}} />
        <Footer reduceClick={(count) => { this.reduceCounter(count)}} />
      </div>
    )
  }
}
export default App

// Header 子组件
import React, { Component } from 'react'

export class Header extends Component {
addCount = (value) => {
  this.props.AddClick(value)
  }
  render() {
    return (
      <div>
        <button onClick={e=>this.addCount(1)}>+1</button>
        <button onClick={e=>this.addCount(5)}>+5</button>
        <button onClick={e=>this.addCount(10)}>+10</button>
      </div>
    )
  }
}

export default Header

// Footer子组件
import React, { Component } from 'react'
export class Footer extends Component {
  reduceCount=(count)=> {
    this.props.reduceClick(count)
  }
  render() {
    return (
      <div>
        <button onClick={e=>this.reduceCount(1)}>-1</button>
        <button onClick={e=>this.reduceCount(5)}>-5</button>
        <button onClick={e=>this.reduceCount(10)}>-10</button>
      </div>
    )
  }
}
export default Footer
```

### 非父子的通信

## setState 的使用

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