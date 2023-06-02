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

- **如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数**
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
- 在React更新DOM之前回调的一个函数，可以获取DOM更新前的一些信息（比如说滚动位置）

## **React 组件间的通信**

### 父传子
- 父组件在展示子组件，可能会传递一些数据给子组件
  - 父组件通过 属性=值 的形式来传递给子组件数据
  - 子组件通过 props 参数获取父组件传递过来的数据
- **如果 constructor 中没有需要操作的事项 可以不写 在render函数中直接使用 this.pros 可以拿到父组件传递的值**
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
    console.log(props);
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
  - 在使用前需要引入 `import PropTypes from 'prop-types'`
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
- this.props 逐级传递 不过显得很臃肿并不是不能用

#### Context

- 只能咋类组件中这样使用，在函数组件中需要换个方式
```js
// theme-context.js
import React from "react"
// 第一步 创建一个 context
const ThemeContext = React.createContext()
export default ThemeContext


// 2. App 父组件
import React, { Component } from 'react'
import Home from './Home'
// 导入 ThemeContext
import ThemeContext from './theme-context/theme-context.js'
export class App extends Component {
  constructor() {
    super()
    this.state = {
      info: {name:'李四',age:19}
    }
  }
  render() {
    const { info}=this.state
    return (
      <div>
        <h1>App</h1>
        {/* 如果你已经有了一个 props 对象，你可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象 */}
        {/* 一下三个方式是等价的 */}
        {/* <Home name='张三' age={ 18} /> */}
        {/* <Home name={info.name} age={ info.age} /> */}
        {/* <Home {...info} /> */}

        {/* 第二步 通过创建的ThemeContext 中 Provider中value属性为后代提供数据 */}
        {/* value 是固定写法不可以改 */}
        <ThemeContext.Provider value={{name:'小八嘎',age:18,city:'台州'}}>
        <Home {...info} />
        </ThemeContext.Provider>
      </div>
    )
  }
}
export default App

// 3. 子组件
import React, { Component } from 'react'
import HomeInfo from './HomeInfo';
export class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Home</h1>
        <HomeInfo/>
      </div>
    )
  }
}
export default Home

// 4.孙子组件
import React, { Component } from 'react'
import ThemeContext from './theme-context/theme-context.js'
export class HomeInfo extends Component {
  render() {
    // 第四步 获取数据 并且使用数据
    console.log(this.context);
    return (
      <div>HomeInfo</div>
    )
  }
}
// 第三步 设置组件的 contextType的类型 为某一个 Context
HomeInfo.contextType=ThemeContext

export default HomeInfo

```
- 使用多个 Context 使用 .Consumer方式
  ```js
  // 定义的 Context  （ThemeContext和UserContext 同理）
  import React from "react" 
  const UserContext = React.createContext()
  export default UserContext

  // 父组件
  import React, { Component } from 'react'
  import Home from './Home'
  import ThemeContext from './theme-context/theme-context.js'
  import UserContext from './theme-context/user-context'
  export class App extends Component {
    constructor() {
      super()
      this.state = {info: {name:'李四',age:19}}}
    render() {
      const { info}=this.state
      return (
        <div>
          <h1>App</h1>
          {/* 多个context 的写法 */}
          <UserContext.Provider value={{hobby:'唱跳rap篮球'}}>
            <ThemeContext.Provider value={{name:'小八嘎',age:18,city:'台州'}}>
              <Home {...info} />
            </ThemeContext.Provider>
          </UserContext.Provider>
        </div>
      )
    }
  }
  export default App

  //孙子组件
  import React, { Component } from 'react'
  import ThemeContext from './theme-context/theme-context.js'
  import UserContext from './theme-context/user-context.js';
  export class HomeInfo extends Component {
    render() {
      // 第四步 获取数据 并且使用数据
      console.log(this.context);
      return (
        <div>
          <span>HomeInfo</span>
          <UserContext.Consumer>
            {
              value => {
                return <h2>info user hobby:{value.hobby }</h2>
              }
            }
          </UserContext.Consumer>
        </div>
      )
    }
  }
  // 第三步 设置组件的 contextType的类型 为某一个 Context
  HomeInfo.contextType=ThemeContext
  export default HomeInfo

  ```
- 在函数组件中的使用方式
  ```js
    import React, { Component } from 'react'
    import UserContext from './theme-context/user-context.js';
    export class HomeInfo extends Component {
      render() {
        return (
          <div>
            <span>HomeInfo</span>
            // 
            <UserContext.Consumer>
              {
                value => {
                  return <h2>info user hobby:{value.hobby }</h2>
                }
              }
            </UserContext.Consumer>
          </div>
        )
      }
    }
    export default HomeInfo
  ```

##### Context 相关API
- React.createContext `const MyContext=React.createContext(defaultValue)`
  - 创建一个需要共享的Context对象
  - 如果一个组件订阅了Context，那么这个组件会从离自身最近的那个匹配的 Provider 中读取到当前的context值
  - defaultValue是组件在顶层查找过程中没有找到对应的Provider，那么就使用默认值

- Context.Provider `<MyContext.Provider value={值}>`
  - 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化
  - Provider 接收一个 value 属性，传递给消费组件
  - 一个 Provider 可以和多个消费组件有对应关系
  - 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据
  - 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染
- Class.contextType `MyClass.contextType=MyContext`
  - 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象
  - 这能让你使用 this.context 来消费最近 Context 上的那个值
  - 你可以在任何生命周期中访问到它，包括 render 函数中
- Context.Consumer `<MyContext.Consumer>{value=>{return xxx}}</MyContext.Consumer>`
  - 这里，React 组件也可以订阅到 context 变更。这能让你在 函数式组件 中完成订阅 context
  - 这里需要 函数作为子元素（function as child）这种做法
  - 这个函数接收当前的 context 值，返回一个 React 节点

#### 事件总线 (eventBus) 待续

## React 插槽

### 实现方式1 通过 组件的children子元素 this.props.children 可以获取到 写在组件中的元素
- **当写入了多个 元素时候 children 为数组形式，当只写入了一个元素时 children 就是元素本身**
- 场景：例如移动端的头部
- 弊端：通过索引值获取传入的元素很容易出错，不能精准的获取传入的元素 
```js
// 父组件
import React, { Component } from 'react'
import NavBar from './nav-bar'

export class App extends Component {
  render() {
    return (
      <div>
        <NavBar>
          <button>按钮</button>
          <h1>标题</h1>
          <i>图标</i>
        </NavBar>
      </div>
    )
  }
}
export default App

// 子组件
import React, { Component } from 'react'
import './style.css'
import PropTypes from 'prop-types'

export class NavBar extends Component {
  render() {
    const { children } = this.props
    // 当写入了多个 元素时候 children 为数组形式
    // 当只写入了一个元素时 children 就是元素本身
    return (
      <div className='nav-bar'>
        <div className="left">{ children[0]}</div>
        <div className="middle">{ children[1]}</div>
        <div className="right">{ children[2]}</div>

       {/*  <div className="left">{ children}</div>
        <div className="middle">{ children}</div>
        <div className="right">{ children}</div> */}
      </div>
    )
  }
}
// 可以限制 需要传递 array 还是 element （element是一个元素）
NavBar.propTypes = {
  children:PropTypes.array
}
export default NavBar
```

### 实现方式2 通过 props属性传递React元素
- 通过具体的属性名，可以让我们在传入和获取时更加的精准
```js
// 父组件
import React, { Component } from 'react'
import NavBar from './nav-bar'
import NavBar2 from './nav-bar2'

export class App extends Component {
  render() {
    const title=<h1>标题</h1>
    return (
      <div>
        {/* 1.使用 children 实现插槽 */}
        <NavBar>
          <button>按钮</button>
          <h1>标题</h1>
          <i>图标</i>
        </NavBar>
        {/* 2.使用props实现插槽 */}
        <NavBar2
          leftSlot={<button>一个按钮</button>}
          middleSlot={ title}
          rightSlot={ '一个图标'}
        />
      </div>
    )
  }
}
export default App

// 子组件
import React, { Component } from 'react'
import './style.css'
export class NavBar2 extends Component {
  render() {
    const { leftSlot,middleSlot,rightSlot}=this.props
    return (
      <div className='nav-bar'>
        <div className="left">{ leftSlot}</div>
        <div className="middle">{ middleSlot}</div>
        <div className="right">{ rightSlot}</div>
      </div>
    )
  }
}
export default NavBar2
```

### React 中作用域插槽的实现
```js
// 父组件
import React, { Component } from 'react'
import TabControl from './TabControl'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      titles: ['流行', '新款', '精选'],
      tabIndex:0
    }
  }
  tabClick(tabIndex) {
    this.setState({tabIndex})
  }
  // 回调拿到的返回的参数 进行返回指定的 元素
  getItem(item) {
    if (item === '流行') {
      return <span className='text'>{ item}</span>
    } else if (item === '新款') {
      return <button className='text'>{ item}</button>
    } else {
      return <i className='text'>{ item}</i>
    }
  }
  render() {
    const { titles,tabIndex}=this.state
    return (
      <div>
        <TabControl
          titles={titles}
          tabClick={i => this.tabClick(i)}
          // itemType={<button>嘿嘿</button>}
          // itemType={item => <button>{ item}</button>}
          // 根据不同的返回值 传入不同的元素
          itemType={item => this.getItem(item)}
          
        />
        <h1>{ titles[tabIndex]}</h1>
      </div>
    )
  }
}
export default App

// 子组件
import React, { Component } from 'react'
import './style.css'
export class TabControl extends Component {
  constructor() {
    super()
    this.state = {
      currentIndex:0
    }
  }
  itemClick(index) {
    this.setState({
      currentIndex:index
    })
    this.props.tabClick(index)
    console.log( this.props.tabClick);
  }
  render() {
    const { titles,itemType}=this.props
    const { currentIndex}=this.state
    return (
      <div className='tab-control'>
          {  titles.map((item,index) =>{
            return <div key={item}
              className={`item ${index === currentIndex ? 'active' : ''}`}
              onClick={ e=>this.itemClick(index)}>
              {/* <span className='text'>{ item}</span> */}
              {/* 将item 回传给 父组件 */}
              {itemType(item)}

            </div>
        })}
      </div>
    )
  }
}
export default TabControl
```

## setState 的使用
- 开发中我们并不能直接通过修改 state 的值来让界面发生更新
  - 因为我们修改了 state 之后，希望React根据最新的 state 来重新渲染界面，但是这种方式的修改React并不知道数据发生了变化
  - React并没有实现类似于Vue2中的 Object.defineProperty 或者Vue3中的 Proxy 的方式来监听数据的变化
  - 我们必须通过setState来告知React数据已经发生了变化
- **疑惑：在组件中并没有实现setState的方法，为什么可以调用呢？**
  - setState方法是从Component中继承过来的

### setState 三种使用方式
- 基本使用方式
- 传入回调函数
  - 1.可以在回调函数中编写新的state的逻辑
  - 2.当前的回调函数会将之前的state和props传递进来
  - 3.可以在回调里面编写一些对新的state处理逻辑 也可以获取之前的state和props值
- 第二个参数 回调函数
  - 首先 setState 在react的事件处理是一个异步调用 （修改后并不会立马拿到已经改变的值）
  - 场景 如果希望在数据更新后，立马获取到对应的结果执行一些逻辑代码 
  - `this.setState({ message: "法外狂徒张三" }, () => {console.log(this.state.message);});` 这样修改后就能立马获取到最新值
```js
import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "qnmd",
      counter: 0,
    };
  }
  changeText() {
    // 1.setState 的基本使用
    // this.setState({message:'wan'})

    // 2.setState 传入回调函数
    //  该方法优点：1.可以在回调函数中编写新的state的逻辑
    //            2.当前的回调函数会将之前的state和props传递进来
    /* this.setState((state, props) => {
      // 可以在此处编写一些对新的state处理逻辑 也可以获取之前的state和props值
      console.log(this.state.message, this.props);
      return {
        message: "hello",
      };
    }); */
    // 3.setState 在react的事件处理是一个异步调用
    // 如果希望在数据更新后，获取到对应的结果执行一些逻辑代码 可以在setState中传入第二个参数 callback 回调 （了解即可）
    // this.setState({ message: "法外狂徒张三" });
    // console.log("----------", this.state.message); //qnmd
    this.setState({ message: "法外狂徒张三" }, () => {
      console.log(this.state.message);
    });
  }
  changeCounter() {
    this.setState({ counter: this.state.counter++ });
    console.log(this.state.counter);
  }
  render() {
    const { message, counter } = this.state;
    return (
      <div>
        <h1>App</h1>
        <h2>{message}</h2>
        <button onClick={(e) => this.changeText()}>修改文本</button>
        <hr />
        <h2>{counter}</h2>
        <button onClick={(e) => this.changeCounter()}>++</button>
      </div>
    );
  }
}
export default App;
```

### **setState异步更新 为什么setState设计为异步呢？**
- 我们并不能在执行完setState之后立马拿到最新的state的结果 所以setState 更新是异步的
```js
this.setState({ message: "法外狂徒张三" });
console.log(this.state.message); //返回的值还是没有改变前的值
```
- 为什么setState设计为异步呢？ 
  - **setState设计为异步，可以显著的提升性能**
  - **如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；**
  - 最好的办法应该是获取到多个更新，之后进行批量更新；
- 如果变为同步
  - 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步；
  - state和props不能保持一致性，会在开发中产生很多的问题；



### 如何获取异步结果
- 方式1：setState接受两个参数：第二个参数是一个回调函数，这个回调函数会在更新后会执行
- 方式2：在生命周期函数 componentDidUpdate(){} 中获取改变后的值

### setState 一定是异步吗？
- React18 之前 分情况
  - 在组件生命周期或React合成事件中，setState是异步
  - 在setTimeout或者原生dom事件中，setState是同步
  ```js
    // 在setTimeout 中
     syncTest() {
    // 异步
    /* this.setState({ message: "法外狂徒张三" });
    console.log(this.state.message); //返回的还是之前的值*/
    // 在react 18之前 setTimeout中setState操作 是同步操作
    // 在react 18之后 setTimeout中setState操作 是异步操作
    setTimeout(() => {
      this.setState({ message: "法外狂徒张三" });
      console.log(this.state.message); //法外狂徒张三
    }, 0);
  }

  //在原生dom 事件中
  componentDidMount(){
    const btnEl=document.getElementById('btn')
    btnEl.addEventListener('click',()=>{this.setState({message:'改变后的值'})})
    console.log(this.state.message)//改变后的值
  }
  ```
- React18 之后 setState 默认是异步的
  - 希望变为同步的，则需要执行特殊的 flushSync 操作
    ```js
    yncTest() {
      // 在react 18之后 执意要变为同步的
      setTimeout(() => {
        flushSync(() => {
          this.setState({ message: "法外狂徒张三" });
        });
        console.log(this.state.message);
      }, 0);
    }
    ```

## React性能优化SCU （shouldComponentUpdate） **从这里开始使用 rpc生成 不在使用rec**
- React更新机制: jsx --> 虚拟DOM --> 真实DOM
- React的更新流程：props/state 改变 --> render函数重新执行 --> 产生DOM树 --> 新旧DOM树进行diff -->计算出差异进行更新 --> 更新到真实的DOM
- props或者state中的数据是否发生了改变，来决定shouldComponentUpdate返回true或者false
- React在props或state发生改变时，会调用React的render方法，会创建一颗不同的树
- React对这个算法进行了优化，将其优化成了O(n)
  - 同层节点之间相互比较，不会垮节点比较；
  - 不同类型的节点，产生不同的树结构；
  - 开发中，可以通过key来指定哪些节点在不同的渲染下保持稳定
### PureComponent 和 memo 的性能优化

#### PureComponent （针对类组件）
- class继承自 PureComponent
```js
// 父组件
import React, { PureComponent } from "react";
import Home from "./Home";
export class App extends PureComponent {
  constructor() {
    super();
    this.state = {message: "HelloWorld",};
    }

  // 手动做性能优化 较为繁琐 需要逐个去判断是否更新了源数据
  /* shouldComponentUpdate(nextProps, newState) {
    if (this.state.message !== newState) {return true;}
    return false;} */

  changeText() {
    this.setState({ message: "abc" });
    // this.setState({ message: "HelloWorld" });
  }

  render() {
    console.log("App render");
    const { message, counter } = this.state;
    // 使用 Component时 App的render() 执行后 子组件都会重新执行
    return (
      <div>
        <h1>App</h1>
        <div>
          {message} -- {counter}
        </div>
        <button onClick={(e) => this.changeText()}>修改文本</button>
        <hr />
        <Home message={message}></Home>
        <hr />
      </div>
    );
  }
}
export default App;

// 子组件
import React, { PureComponent } from 'react'
export class Home extends PureComponent {
 /*  shouldComponentUpdate() {return false} */
  render() {
    console.log('Home render');
    return (
      <div>
        <h2>Home</h2>
        <div>{ this.props.message}</div>
      </div>
    )
  }
}
export default Home
```
#### memo （针对函数式组件）
- 函数式组件不使用memo 时 父组件但凡 render()函数重新执行了，子组件的render也会重新执行一次 （无论子组件中数据是否有改变更新）
- 使用memo后 只有当 子组件中的数据有所变化时，render()函数才能重新执行
```js
// 父组件
import React, { PureComponent } from "react";
import Fn from "./Fn";
export class App extends PureComponent {
  constructor() {
    super();
    this.state = {message: "HelloWorld",};
  }
  changeText() {this.setState({ message: "abc" });}
  render() {
    console.log("App render");
    const { message, counter } = this.state;
    return (
      <div>
        <h1>App</h1>
        <div>{message} -- {counter}</div>
        <hr />
        {/* <Fn  message={message}></Fn> */}
        <Fn></Fn>
      </div>
    );
  }
}
export default App;

// 函数式 子组件
import { memo } from "react";

// 不使用memo 时 父组件但凡 render()重新执行子组件的render也会重新执行一次
/* function Profile(props) {
  console.log("Profile render");
  return <h2>Profile:{props.message}</h2>;
} */

// 使用 memo
const Profile = memo(function Profile(props) {
  console.log("Profile render");
  return <h2>Profile:{props.message}</h2>;
});
export default Profile;
```

## state 中的数据
- 不要直接去改变 state中的数据
```js
import React, { PureComponent } from "react";
export class App extends PureComponent {
  constructor() {
    super();
   this.state = {
      books: [
        {name: "javascript 权威指南",price: 99,count: 1,},
        {name: "React 权威指南",price: 100,count: 2,},
        {name: "Vue 权威指南",price: 80,count: 3,},
        {name: "Typescript 权威指南",price: 90,count: 4,},
      ],
    };
  }
  addBooks() {
    console.log(1);
    // 使用 Component 时可以成功添加数据 并且成功重新渲染
    // 但使用 PureComponent 时可以成功添加数据 但不会重新渲染
    const newBooks = { name: "CSS 权威指南", price: 50, count: 1 };
    // Component
    /* this.state.books.push(newBooks);
    this.setState({ books: this.state.books }); */

    // PureComponent
    // 浅拷贝一次
    const books = [...this.state.books];
    books.push(newBooks);
    this.setState({ books });
    console.log(this.state.books);
  }
  Addcount(index) {
    const books = [...this.state.books];
    books[index].count++;
    this.setState({ books });
  }
  render() {
    const { books } = this.state;
    return (
      <div>
        <h2>数据列表</h2>
        <ul>
          {books.map((item, index) => {
            return (
              <li key={index}>
                <span>
                  书名：{item.name} 价格：{item.price} 数量：{item.count}
                </span>
                <button onClick={(e) => this.Addcount(index)}>+1</button>
              </li>
            );
          })}
        </ul>
        <button onClick={(e) => this.addBooks()}>添加新书籍</button>
      </div>
    );
  }
}
export default App;
```

## 获取DOM方式ref
- 在React的开发模式中，通常情况下不需要、也不建议直接操作DOM原生，但是某些特殊的情况，确实需要获取到DOM进行某些操作
  - 管理焦点，文本选择或媒体播放；
  - 触发强制动画；
  - 集成第三方 DOM 库；
### 三种获取方式
- **不能在函数组件上使用 ref 属性，因为他们没有实例 （但有其他方式）**
- 原生方式去获取原生DOM是可以的但是不推荐这样使用
- 方式1 传入字符串
  - 使用时通过 this.refs.传入的字符串格式获取对应的元素； **refs 过期了**
- 方式2 传入一个对象
  - 对象是通过 React.createRef() 方式创建出来的；
  - 使用时获取到创建的对象其中有一个current属性就是对应的元素；
- 方式3.传入一个函数
  - 该函数会在DOM被挂载时进行回调，这个函数会传入一个 元素对象，我们可以自己保存；
  - 使用时，直接拿到之前保存的元素对象即可；
```js
import React, { PureComponent, createRef } from "react";
export default class App extends PureComponent {
  constructor() {
    super();

    // 方式2.引入createRef 提前创建好ref对象，createRef()将创建出来的对象绑定到元素
    this.titleRef = createRef();
    // 方式3
    this.titleEl = null;
  }
  getNativeDOM() {
    // 不建议使用这种方式获取DOM元素
    /*   const h2El = document.querySelector("h2");
    console.log(h2El); */
    // 方式1.在react元素上绑定一个ref字符串
    // console.log(this.refs.xxx);
    // 方式2.推荐使用方式2官方用法
    // console.log(this.titleRef.current);
    // 方式3.传入一个回调函数，在对应的元素被渲染之后，回调函数被执行，并且将元素传入
    console.log(this.titleEl);
  }
  render() {
    return (
      <div>
        <h1>App</h1>
        <h2 ref="xxx">Hello world</h2>
        <h2 ref={this.titleRef}>Hello 张三</h2>
        <h2 ref={el => this.titleEl = el}>Hello 李四</h2>
        <button onClick={(e) => this.getNativeDOM()}>获取DOM</button>
      </div>
    );
  }
}
```

## 获取组件实例

### 获取类组件中的DOM
- 使用 createRef
```js
import React, { PureComponent, createRef } from "react";
// 子组件
class HelloWorld extends PureComponent {
  FnTest() {
    console.log("子组件的函数");
  }
  render() {
    return (
      <div>
        <h2>HelloWorld</h2>
      </div>
    );
  }
}

// 父组件
export default class App extends PureComponent {
  constructor() {
    super();
    this.hwRef = createRef();
  }
  getComponent() {
    console.log(this.hwRef.current)
    // 拿到子组件后可以调用子组件中的方法
    this.hwRef.current.FnTest();
  }
  render() {
    return (
      <div>
        <h1>App</h1>
        <button onClick={(e) => this.getComponent()}>获取组件实例</button>
        {/* 组件 */}
        <HelloWorld ref={this.hwRef}></HelloWorld>
      </div>
    );
  }
}
```

### 获取函数组件中的DOM （ref的转发）
- 函数式组件是没有实例的，所以无法通过ref获取他们的实例
- 使用 forwardRef 同时需要在 要获取的元素上设置 ref
```js
import React, { PureComponent, createRef, forwardRef } from "react";
const HelloWorld = forwardRef(function (props, ref) {
  return (
    <div>
      <h2 ref={ref}>HelloWorld</h2>
    </div>
  );
});
export default class App extends PureComponent {
  constructor() {
    super();
    this.hwRef = createRef();
  }
  getComponent() {
    console.log(this.hwRef.current);
  }
  render() {
    return (
      <div>
        <h1>App</h1>
        <button onClick={(e) => this.getComponent()}>获取组件实例</button>
        {/* 组件 */}
        <HelloWorld ref={this.hwRef}></HelloWorld>
      </div>
    );
  }
}

```

## 受控组件 和 非受控组件

#### 非受控组件
- 在React中， HTML表单的处理方式和普通的DOM元素不太一样：表单元素通常会保存在一些内部的state
- **不推荐使用非受控组件**
```js
import React, { PureComponent } from "react";
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {username: "",};
  }
  inputChange(e) {
    console.log(e.target.value);
    this.setState({username: e.target.value,});
  }
  render() {
    const { username } = this.state;
    return (
      <div>
        <h1>App</h1>
        <input type="text" onChange={(e) => this.inputChange(e)} />
        <h2>username: {username}</h2>
      </div>
    );
  }
}
```
- 在非受控组件中通常使用defaultValue来设置默认值
- `<input type="checkbox"> 和 <input type="radio">` 支持 defaultChecked
- `<select> 和 <textarea>` 支持 defaultValue。
- 案例
  ```js
  import React, { createRef, PureComponent } from "react";
  export default class App extends PureComponent {
    constructor() {
      super();
      this.state = {message: "大小姐尿尿统统闪开",};
      this.messageRef = createRef();
    }
    handleSubmit(event) {
      // 阻止默认事件
      event.preventDefault();
      console.log(this.messageRef.current.value);
    }

    render() {
      const { message } = this.state;
      return (
        <div>
          <h1>App</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            {/* 非受控 */}
            <div>
              <input type="text" defaultValue={message} ref={this.messageRef} />
            </div>
            <div>
              <button type="submit">注册</button>
            </div>
          </form>
        </div>
      );
    }
  }

  ```

### 受控组件
- 由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源
- 当绑定了value属性时 该组件就是react的受控组件，只能通过绑定onChange事件去修改值
  ```js
  import React, { PureComponent } from "react";
  export default class App extends PureComponent {
    constructor() {
      super();
      this.state = {username: "张三",};
      }
    inputChange(e) {
      console.log(e.target.value);
      this.setState({username: e.target.value});
    }
    render() {
      const { username } = this.state;
      return (
        <div>
          <h1>App</h1>
          <input
            type="text"
            onChange={(e) => this.inputChange(e)}
            value={username}
          />
          <h2>username: {username}</h2>
        </div>
      );
    }
  }
  ```

- 多个表单共用同一个处理函数 **案例**
  ```js
    import React, { PureComponent } from "react";
    export default class App extends PureComponent {
      constructor() {
        super();
        this.state = {username: "",password: "",};
      }
      /* inputChangeUsn(e) {
        // console.log(e.target.value);
        this.setState({
          username: e.target.value,
        });
      }
      inputChangePwd(e) {
        // console.log(e.target.value);
        this.setState({
          password: e.target.value,
        });
      } */
      // 将多个表单 放到同一个事件中进行处理
      handelInputChange(event) {
        // 获取input 绑定的name属性
        // const keyName = event.target.name;
        this.setState({
          // [keyName]: event.target.value,
          [event.target.name]: event.target.value,
        });
      }
      handleSubmit(event) {
        // 阻止默认事件
        event.preventDefault();
        console.log(event);
        // 拿到值 将数据传递给服务器
        console.log(event.target.username.value, event.target.password.value);
      }
      render() {
        const { username, password } = this.state;
        return (
          <div>
            <h1>App</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
               <label htmlFor="username">
                用户：
                <input id="username" type="text" name="username" value={username} onChange={(e) => this.handelInputChange(e)} />
              </label>
              <label htmlFor="password">
                密码：
                <input id="password" type="text" name="password" value={password} onChange={(e) => this.handelInputChange(e)} />
              </label>
              <button type="submit">注册</button>
            </form>
            <h2>username: {username}</h2>
            <h2>password: {password}</h2>
          </div>
        );
      }
    }
  ```

- 实现单选多选 **案例**
  - 获取选框是否被选中 event.target.checked
  ```js
  import React, { PureComponent } from "react";
  export default class App extends PureComponent {
    constructor() {
      super();
      this.state = {
        username: "",
        password: "",
        isAgree: true,
        hobbies: [
          { value: "sing", text: "唱", isChecked: false },
          { value: "jump", text: "跳", isChecked: false },
          { value: "rap", text: "rap", isChecked: false },
          { value: "basketball", text: "篮球", isChecked: false },
        ],
      };
    }

    //单选
    handelAgree(e) {
      console.log(e.target.checked);
      this.setState({
        isAgree: e.target.checked,
      });
    }
    //多选
    handerHobby(e, index) {
      const hobbies = [...this.state.hobbies];
      hobbies[index].isChecked = e.target.checked;
      this.setState({ hobbies });
    }

    handleSubmit(event) {
      // 阻止默认事件
      event.preventDefault();
      console.log(event);
      // 获取单选 拿到值 将数据传递给服务器
      console.log(event.target.username.value, event.target.password.value);
      // 获取多选
      // 获取选框被选中的
      const hobbies = this.state.hobbies.filter((item) => item.isChecked);
      // 将被选中进行下一步处理
      const hobbiesValue = hobbies.map((item) => item.value);
      console.log(hobbies);
      console.log(hobbiesValue);
    }
    render() {
      const { username, password, isAgree, hobbies } = this.state;
      return (
        <div>
          <h1>App</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            {/* 单选 */}
            <label htmlFor="agree">
              <input type="checkbox" id="agree" checked={isAgree} onChange={(e) => this.handelAgree(e)} />
              同意协议
            </label>

            {/* 多选 */}
            <div>
              hobby：
              {hobbies.map((item, index) => {
                return (
                  <label htmlFor={item.value} key={index}>
                    <input type="checkbox" id={item.value} checked={item.isChecked} onChange={(e) => this.handerHobby(e, index)} />
                    {item.text}
                  </label>
                );
              })}
            </div>
            <div>
              <button type="submit">注册</button>
            </div>
          </form>
        </div>
      );
    }
  }

  ```

- 实现下拉框的多选
  ```js
  import React, { PureComponent } from "react";
  export default class App extends PureComponent {
    constructor() {
      super();
      this.state = {
        fruit: [],
      };
    }
    handelSelect(event) {
      // console.log(event);
      // console.log(event.target.value);
      // Array.from() 将一个类数组转换为 真数组

      // const options = Array.from(event.target.selectedOptions);
      // const fruit = options.map((item) => item.value);
      // 上同下
      const fruit = Array.from(event.target.selectedOptions,(item) => item.value);
      console.log(fruit);
      this.setState({ fruit });
    }

    handleSubmit(event) {
      // 阻止默认事件
      event.preventDefault();
      console.log(event);
      console.log(this.state.fruit);
    }
    render() {
      const { fruit } = this.state;
      return (
        <div>
          <h1>App</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            {/* 下拉框 */}
            <div>
              {/* multiple 多选 */}
              <select
                id=""
                value={fruit}
                onChange={(e) => this.handelSelect(e)}
                multiple
              >
                <option value="apple">苹果</option>
                <option value="origin">橘子</option>
                <option value="banner">香蕉</option>
              </select>
            </div>
            <div>
              <button type="submit">注册</button>
            </div>
          </form>
        </div>
      );
    }
  }
  ```

## React的高阶组件
- 高阶函数的定义
  - 接受一个或多个函数作为输入
  - 输出一个函数
  - JavaScript中比较常见的filter、 map、 reduce都是高阶函数
- 高阶组件的定义
  - 高阶组件的英文是 Higher-Order Components，简称为 HOC；
  - 官方的定义： 高阶组件是参数为组件，返回值为新组件的函数；
  - 首先， 高阶组件 本身不是一个组件，而是一个函数；
  - 其次， 这个函数的参数是一个组件，返回值也是一个组件；
  - 高阶组件并不是React API的一部分，它是基于React的组合特性而形成的设计模式；
  - 高阶组件在一些React第三方库中非常常见
- 组件的名称问题
  - 在ES6中，类表达式中类名是可以省略的；
  - 组件的名称都可以通过displayName来修改；
- 高阶组件的优点
  - 利用高阶组件可以针对某些React代码进行更加优雅的处理
- 高阶组件的缺点
  - HOC需要在原组件上进行包裹或者嵌套， 如果大量使用HOC，将会产生非常多的嵌套，这让调试变得非常困难
  - HOC可以劫持props，在不遵守约定的情况下也可能造成冲突

### props的增强

### 高阶组件应用案例 登录鉴权
- 场景描述：在用户没有登录前 很多页面是不进行展示的，逐个去判断略显繁琐，编写高阶组件，在需要进行判断的页面进行调用该组件，控制当前页面是否展示
```jsx
// App.jsx 
import React, { PureComponent } from "react";
import Cart from "./page/Cart";
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }
  loginClick() {
    localStorage.setItem("token", "登录的模拟tokenValue");
    // this.setState({ isLogin: true });
    // 强制进行更新 重新渲染render
    this.forceUpdate();
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div>
        <h1>App</h1>
        <button onClick={(e) => this.loginClick()}>登录</button>
        <Cart />
      </div>
    );
  }
}

// Cart.jsx 子组件
import React, { PureComponent } from "react";
import loginAuth from "../hoc/login_auth";
export class Cart extends PureComponent {
  render() {
    return <h2>Cart 判定登录后的显示</h2>;
  }
}
// 在导出之前进行判断 是否是登录状态
// 登录鉴权
export default loginAuth(Cart);

// login_auth.js
// 定义的高阶组件
function loginAuth(Assembly) {
  return props => {
    // 模拟登录成功后 从localStorage 中获取token
    const token = localStorage.getItem('token')
    if (token) {
      return <Assembly {...props} />
    } else {
      return <h2>请先登录，在进行跳转到对应的页面中</h2>
    }
  }
}
export default loginAuth
```

## React中编写css
- react 中引入的样式文件都会成为全局的，当两个不同组件中使用了同一个类名会导致冲突
### 内联方式
- 内联样式的优点：
  1.内联样式，样式之间不会有冲突
  2.可以动态获取当前state中的状态
- 内联样式的缺点：
  1.写法上都需要使用驼峰标示识
  2.某些样式没有提示
  3.大量的样式，代码混乱
  4.某些样式无法编写（比如伪类/伪元素）
```js
import React, { PureComponent } from "react";
export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      h1Size: 30,
      h2Color: "#008c8c",
    };
  }
  addH1Size() {
    this.setState({
      h1Size: this.state.h1Size + 2,
    });
  }
  render() {
    const { h1Size, h2Color } = this.state;
    return (
      <div>
        <button onClick={(e) => this.addH1Size()}>增加H1Size</button>
        <h1 style={{ color: "red", fontSize: `${h1Size}px` }}>App</h1>
        <h2 style={{ color: h2Color }}>#008c8c</h2>
      </div>
    );
  }
}
export default App;
```

### 普通方式
- 普通的css我们通常会编写到一个单独的文件，之后再进行引入
- 这样的编写方式和普通的网页开发中编写方式是一致的：
  - 如果我们按照普通的网页标准去编写，那么也不会有太大的问题；
  - 但是组件化开发中我们总是希望组件是一个独立的模块，即便是样式也只是在自己内部生效，不会相互影响；
  - 但是普通的css都属于全局的css,样式之间会相互影响；
- **这种编写方式最大的问题是样式之间会相互层叠掉；**
```js
// App.jsx
import React, { PureComponent } from "react";
import "./App.css"; // 引入css
export class App extends PureComponent {
  render() {
    return (
      <div>
        <h1 className="title">标题</h1>
        <h2 className="content">Lorem ipsum dolor sit amet.</h2>
      </div>
    );
  }
}
export default App;

// App.css
.title{
  color:#008c8c;
  font-size: 30px;
}
.content{
  color: lightpink;
}
```

### css modules
- css modules并不是React特有的解决方案，而是所有使用了类似于webpack配置的环境下都可以使用的：
  - 如果在其他项目中使用它，那么我们需要自己来进行配置，比如配置webpack.config,js中的modules:true等
- React的脚手架已经内置了css modules的配置：
  - .css/.less/.scss等样式文件都需要修改成.module.css/.module.less/.module.scss等；
  - 之后就河以引用并且进行使用了：
- css modulesi确实解决了局部作用域的问题，也是很多人喜欢在Reactt中使用的一种方案。
  - 但是这种方案也有自己的缺陷：
  - **引用的类名，不能使用连接符(.home-title),在javaScript中是不识别的**
  - 所有的className都必须使用{style.className}的形式来编写；
  - 不方便动态来修改某些样式，依然需要使用内联样式的方式：
```js
// App.jsx
import React, { PureComponent } from "react";
import appStyle from "./App.module.css";
export class App extends PureComponent {
  render() {
    return (
      <div>
        <h1 className={appStyle.title}>标题</h1>
        <h2 className={appStyle.content}>Lorem ipsum dolor sit amet.</h2>
      </div>
    );
  }
}
export default App;

// App.module.css
.title{
  color:#008c8c;
  font-size: 30px;
}
.content{
  color: lightpink;
}
```

### CSS-in-JS
- 官方文档也有提到过CSS in JS这种方案："CSS-in-JS”是指一种模式，其中CSS由JavaScript生成而不是在外部文件中定义；
  - 注意此功能并不是React的一部分，而是由第三方库提供；React对样式如何定义并没有明确态度；
- 在传统的前端开发中，我们通常会将结构(HTML)、样式(CSS)、逻辑(JavaScript)进行分离。
  - 但是在前面的学习中，我们就提到过，Ract的思想中认为逻辑本身和UI是无法分离的，所以才会有了JSX的语法。
  - 样式呢？样式也是属于ui的一部分：
  - 事实上CSS-in-JS的模式就是一种将样式(CSS)也写入到javaScriptr中的方式，并且可以方便的使用javaScript的状态；
  - 所以React?有被人称之为All in JS;
- 批评声音虽然有，但是在我们看来很多优秀的CSS-i-JS的库依然非常强大、方便：
- CSS-in-JS通过JavaScript来为CSS赋予一些能力，包括类似于CSS预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等；
- 虽然CSS预处理器也具备某些能力，但是获取动态状态依然是一个不好处理的点；
- 所以，目前可以说CSS-in-JS是React编写CSS最为受欢迎的一种解决方案，
- 目前比较流行的CSS-in-JS的库
  - styled-components
  - emotion
  - glamorous
#### styled-components 的使用
- 安装 `npm i styled-components`
- 安装vscode插件 vscode-styled-components 用于在引入 styled-components的js文件中更好的使用css
```js
//App.jsx
import React, { PureComponent } from "react";
import { AppWrapper } from "./style";
export class App extends PureComponent {
  render() {
    return (
      <AppWrapper>
        <div>
          <h1 className="title">标题</h1>
          <h4 className="content">内容：Lorem ipsum dolor sit amet.</h4>
        </div>
      </AppWrapper>
    );
  }
}
export default App;

//style.js
import styled from "styled-components";
export const AppWrapper = styled.div`
.title{
  color:#008c8c;
}
.content{
  color:lightpink;
}
`
// styled.div`` 的含义===styled.div（） 调用该函数 如下案例
<script>
  const name = "张三";
  const age = 18;
  function foo(...args) {
    console.log(args);  // ['my name is ', ',age is ', ''] "张三" 18
  }
  foo`my name is ${name},age is ${age}`;
</script>
```
- 基础用法
  ```js
  //App.jsx
  import React, { PureComponent } from "react";
  import { AppWrapper, UlLists, Button1, Button2 } from "./style";
  export class App extends PureComponent {
    constructor() {
      super();
      this.state = {
        size: "50px",
        color: "red",
      };
    }
    render() {
      const { size, color } = this.state;
      return (
        <AppWrapper>
          <div>
            <h1 className="title">标题</h1>
            <h4 className="content">内容：Lorem ipsum dolor sit amet.</h4>
          </div>
          {/* 传递动态样式参数 */}
          <UlLists size={size} color={color}> 
          <li> 1</li> <li> 2</li> <li> 3</li> <li> 4</li> <li> 5</li>
          </UlLists>
          <button onClick={(e) => this.setState({ color: "lightpink" })}>
            修改组件样式
          </button>
          <div>
            <Button1>button1</Button1>
          </div>
          <div>
            <Button2>button2</Button2>
          </div>
        </AppWrapper>
      );
    }
  }
  export default App;

  //style.js 样式
  import styled from "styled-components";
  export const AppWrapper = styled.div`
  .title{
    color:#008c8c;
  }
  .content{
    color:lightpink;
  }
  `
  // 单独抽离一个样式组件
  // 接收外部传入的样式参数 例如：${props => props.color}px
  // 在接收外部传入样式参数时，设置默认样式参数
  export const UlLists = styled.div.attrs(props => ({
    Tcolor: props => props.color || 'lightblue',
    Tsize: props => props.size || '20px'
  }))`
  li{
  list-style: none; 
  color: ${props => props.Tcolor};
  size: ${props => props.Tsize};
  background-color: #999;
  }
  `

  // 继承
  export const Button1 = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid #008c8c;
  background-color: lightblue;
  `
  export const Button2 = styled(Button1)`
  border-radius: 20px;
  `
  ```

## portals和fragment

## StrictMode严格模式

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