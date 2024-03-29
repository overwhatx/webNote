# AJAX
## 简介
- AJAX 全称为Asynchronous Javascript And XML，就是异步的 JS 和 XML(XML现在已经被JSON取代了)
- AJAX的优点
  - 可以无需刷新页面而与服务器端进行通信
  - 允许你根据用户事件来更新部分页面内容
- AJAX的缺点
  - 没有浏览历史，不能回退
  - 存在跨域问题
  - SEO不友好

## 原生AJAX
- 原生ajax 的使用
  - 1.创建 new XMLHttpRequest 对象
  -  判定当前浏览器是否支持 因为存在兼容性
  - 2.绑定一个事件监听xhr.onreadystatechange = function () {}
    - xhr对象状态发生改变才会触发
  - 3.调用xhr.open()方法设置请求信息   
  - 如果是post需要设置其独有的 请求头 并且需要写在请求信息后
  - 4.发送请求 xhr.send()
  - 5.接收响应 xhr.response
  
- demo1 案例 通过ajax get方式 向服务器获取数据
  ```js
  //get 请求方式 获取数据
  //1.创建 new XMLHttpRequest 对象
        var xhr;
        // 判断 当前浏览器 是否支持 XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
          //不支持 则使用 ie的
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
  //2.绑定一个事件监听
         xhr.onreadystatechange = function () {
            // 监听xhr对象 状态值的改变
            //xhr.readyState 为状态值 
            //xhr.status  为状态码   
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.response);
  //5.接收响应 xhr.response 响应成功 进行一系列的操作
                let datas = JSON.parse(xhr.response).datas
                //进行遍历 添加 
                for (let x of datas) {
                    document.body.innerHTML += `
                    <div class='title'>${x.bookname}</div>
                    <div class='text'>${x.author}</div>
                    <div class='publish'>${x.publisher}</div>
                    `
                }
            }
        }
  //3.调用xhr.open()方法设置请求信息       
      //对指定的地址进行访问 访问方式 post、get 访问地址  是否异步（默认异步true）
         xhr.open('get', 'http://www.liulongbin.top:3006/api/getbooks', true)
   //4.发送请求 xhr.send()
        xhr.send();
  ```
  
- demo2 案例 通过ajax post方式 向服务器添加数据
    ```js
  //get 请求方式 获取数据
  //1.创建 new XMLHttpRequest 对象
        var xhr;
        // 判断 当前浏览器 是否支持 XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
          //不支持 则使用 ie的
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
  //2.绑定一个事件监听
         xhr.onreadystatechange = function () {
            // 监听xhr对象 状态值的改变
            //xhr.readyState 为状态值 
            //xhr.status  为状态码   
            if (xhr.readyState == 4 && xhr.status == 200) {
  //6.接收响应 xhr.response
            console.log(xhr.response);  
            }
        }
  //3.调用xhr.open()方法设置请求信息       
      //对指定的地址进行访问 访问方式 post、get 访问地址  是否异步（默认异步true）
         xhr.open('post', 'http://www.liulongbin.top:3006/api/addbook', true)
  //4. 设置post 请求头 该请求头是post的特有 若不设置 服务器无法获取到参数
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  //5.发送请求 xhr.send()
        xhr.send('id=10&bookname=圆圈正义&author=张三&publisher=中国法制出版社');
  ```
  
- xhr对象 状态值 共有5种 
  
  - 0 初始化                xhr正在创建                                   创建xhr对象，没有调用open方法
    - 状态0 永远无法获取到 因为是创建时赋予的  onreadystatechange事件是状态发生改变才会触发
  - 1 对服务器进行连接       客服端对服务器进行访问                         open调用  
    - send方法还没有被调用，即：请求没有发出去，此时依然可以修改请求头
  - 2 请求已接收            服务器接收到客服端发送的请求                    send调用
    - send方法被调用了，即：请求已经发出去了，此时已经不可以再修改请求头
  - 3 请求处理中            对请求进行操作 （对于小数据 在此可以响应完）     接受到请求、 返回部分数据
    - 如果是比较小的数据，会在此阶段一次性接收完毕,较大数据，有待于进一步接收
  - 4 请求已完成            服务器响应数据 （对于大数据 ）                  ajax请求完成，得到 成功 或 失败
  
- JSON.parse()方法将JSON格式字符串转换为js对象(属性名没有双引号)。 解析前要保证数据是标准的JSON格式，否则会解析出错

## jQuery的AJAX
- demo1 案例 jq方式1  基于jqajax通过get获取数据 通过 post 添加数据
  ```js
    //注意引入jq文件
    
    //get 获取数据
    $('button').click(function () {
      //$.get('http://www.liulongbin.top:3006/api/getbooks', { id: 1, bookname: '西游记' },(json, res) => {
       $.get('http://www.liulongbin.top:3006/api/getbooks', (json, res) => {
            console.log(json); //服务器返回数据
            console.log(res); //返回success 表示成功 
        })
    }
    // post 添加数据
    $('button').click(function () {
    $.post('http://www.liulongbin.top:3006/api/addbook', { bookname: 'aaa', author: 'ddd', publisher: 'ccc' }, (json, res) => {
            console.log(json);
            console.log(res);

        })
    }
  ```
- demo2 案例 jq方式2  
  ```js
    //注意引入jq文件
    $.ajax({
            type: 'get',//请求类型
            url: 'http://www.liulongbin.top:3006/api/getbooks',//请求的地址
            data: '',//携带到后端的参数  请求的数据 如果为空 则表示 没有数据传入到指定的 请求地址
            dataType: 'json',//期望后端返回的数据类型
            success: function (res) {  //成功后的回调函数  //成功的回调函数 res就是后端响应回来的数据
                console.log(res);
            },
            error: (err) => { //失败后的回调函数
                console.log(err);
            }
        })
  ```

## JQueryAjax 通过接口进行 增删改查  
- demo
  ```js
    // 查询图书
    function xrbook() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', (data) => {
            // 请求是否成功
            if (data.status !== 200) return console.log('获取失败');
            // 声明变量 接收响应返回的数据
            let reslut = data.data;
            // 声明一个空的数组
            let newArr = [];

            // 遍历返回的数据 index 为下标 i为值
            $.each(reslut, function (index, i) {
                // 使用push向 空数组中添加
                newArr.push(`
                <tr>
                    <td>${i.id}</td>
                    <td>${i.bookname}</td>
                    <td>${i.author}</td>
                    <td>${i.publisher}</td>
                    <td><a href='javascript:void(0)' class='del' csy_id=${i.id}>删除</a></td>
                </tr>
              `)
                //   <td><a href='javascript:void(0)' class='del' csy_id=${i.id}>删除</a></td>
                // 删除按钮  
                // href='javascript:void(0) 的含义  void(0)该操作符指定要计算一个表达式但是不返回值
                //  可以阻止链接跳转，URL不会有任何变化  与#的区别是 #符号包含了一个位置信息
                // csy_id=${i.id} 自定义 属性 在创建的时候 获取到id信息 将独有的id设置为自定义属性 用于后续的操作

                //  向父级中添加拼接好的数据 先将父级中的所有数据清空元素全部删除在添加
                // 将数组全部转为 字符串元素标签就可以使用了
                $('.jsonsdata').empty().append(newArr.join(''));
            })
        })
    }
    xrbook(); //调用查询图书

    // 删除图书
    // 通过父级去找后代绑定事件 
    // 直接使用del去触发事件无法获取到  因为先执行了js 请求的数据是后面加入的  
    // 请求的数据加入后 jsonsdata 中有数据了 通过其在找到子元素 也就可以拿到了
    $('.jsonsdata').on('click', '.del', function () {
        console.log($(this).attr('csy_id'));
        let id = $(this).attr('csy_id')
        $.get('http://www.liulongbin.top:3006/api/delbook', { id }, (data) => {
            console.log(data);
        })
    })

    // 添加图书
    $('#btnAdd').click(function () {
        let bookname = $('#booknames').val();
        let author = $('#authors').val();
        let publisher = $('#publishers').val();

        // 判断 数据是否 可以添加 没有填写完整不给提交请求
        if (bookname.length <= 0 || author.length <= 0 || publisher <= 0) {
            console.log('请填写完整');
        } else {
            $.ajax({
                url: 'http://www.liulongbin.top:3006/api/addbook',//请求的地址
                // type: 'post',//请求类型
                method: 'post',  //方法
                data: {         //发送的数据  对象的简写形式 （只有键和值的名相同的情况下才可以简写 并且省略的是 值名）
                    bookname,
                    author,
                    publisher
                },//携带到后端的参数  请求的数据 如果为空 则表示 没有数据传入到指定的 请求地址
                // dataType: 'json',//期望后端返回的数据类型
                success: function (res) {  //成功后的回调函数  //成功的回调函数 res就是后端响应回来的数据
                    console.log(res + '添加成功');
                },
                error: (err) => { //失败后的回调函数
                    console.log(err + '添加失败');
                }
            })
        }
    })

  ```

## 常见HTTP状态值
- 1开头   服务器正在接受请求
- 2开头  请求成功
  - 200        第一次页面正常得到数据 进行展示（数据没有任何的更新）  OK 指示客服端的请求已经成功收到，解析，接受
  - 201        创建了新的资源 请求已经完成并有一个新的返回资源被创建
  - 204、205   请求成功，但是未返回任何内容             
- 3开头  重定向   A用户--->/login--->/rej
  - 301   永久重定向
  - 302 303   临时重定向
  - 304       页面发送请求上一次的地址 未发生任何变化（返回的地址 和 输入的地址 不是同一个）
- 4开头  请求出错 前端的锅    
  - 404       前端页面找不到
  - 401       访问被拒绝/错误
- 5开头  服务器问题 后端的锅
  - 500       服务器报错
  - 504       网关超时
  - 505       HTTP 版本不受支持
- 状态代码有三位数字组成，第一个数字定义了响应的类别，且有五种可能取值：
  - 1xx：指示信息--表示请求已接收，继续处理
  - 2xx：成功--表示请求已被成功接收、理解、接受
  - 3xx：重定向--要完成请求必须进行更进一步的操作
  - 4xx：客户端错误--请求有语法错误或请求无法实现
  - 5xx：服务器端错误--服务器未能实现合法的请求

## 模板引擎 art-template
- 模板引擎的好处
  - 减少 字符串的拼接
  - 使代码结构更清晰
  - 使代码更利于阅读和维护
- 地址 
- 使用步骤
  - 1. 下载并引入 art-template 文件
  - 2. 定义数据  或者接口数据
  - 3. 定义模板   **script 的type类型 必须是 text/html**  
  - 4. 调用template
  - 5. 渲染html结构
- demo 模板引擎的简单使用
  ```html
    <body>
    <div id="con"></div>
    </body>
    <script src="jquery-3.6.0.js"></script>
    <!-- 1.导入 -->
    <script src="template-web.js"></script>
    <!-- 3.定义模板 -->
    <script type="text/html" id="test_art">
    <h1>姓名:{{name}}</h1>
    <h1>年龄:{{age}}</h1>
    </script>

    <script>
        $(function () {
            // 2. 定义数据
            var data = { name: '张三', age: 18 };
            // 4.调用 template 函数
            var art = template('test_art', data)
            console.log(art);
            // 5.渲染html结构
            $('#con').html(art)
        })
      </script>
    </html>
  ```
- 模板引擎的语法
- 原文输出
  ```
  {{value}} ===（了解 原始语法：<%- value %> ） 
  ```
- 循环
  ```html 
      {{each value}} //开始  value是遍历的数据
      <!-- {{$index}}下标{{$value}} 值 -->
    <li> {{$value}}</li>   //输出遍历的数据
        {{/each}} //结束标签 必须要写否则无法使用
  ```
- 判断
  ```html
        {{if flag==0}} //判断 第一个条件
        flag=0          //如上判断成立则返回该条数据
        {{else if  flag == 1}}  // 第二个条件
        flag=1
        {{else}}
        flag=嘚嘚
        {{/if}} //结束标签
  ```
- 过滤器
  - 语法 ：
    - {{@tim 原始数据值 | filterName 定义的过滤器名}}
    - template.defaults.imports.filterName = (date) => {过滤后的结果}
  ```js
    <span class="tims">{{@tim | abc}}</span>

    template.defaults.imports.abc = (date) => {
            let y = date.getFullYear()
            let m = date.getMonth() + 1
            let d = date.getDate()
            let ho = date.getHours()
            let mi = date.getMinutes()
            let se = date.getSeconds()
            <!-- 返回值 -->
            return `${y}-${m}-${d} ${ho}:${mi}:${se}`
        }
  ```
- 标准语法和原始语法
  ```js

    //标准语法
    {{value}}
    {{data.key}}
    {{data['key']}}
    {{a ? b : c}}
    {{a || b}}
    {{a + b}}

    //原始语法
    <%= value %>
    <%= data.key %>
    <%= data['key'] %>
    <%= a ? b : c %>
    <%= a || b %>
    <%= a + b %>
  ```

## form 补充
- form 常用属性
  - action    提交地址
  - method    提交方式
    - get （默认） 明文
    - post 暗文
  - target 
  - _self （默认） 当前页面打开
  - _blank  新窗口打开
  - enctype 属性规定在发送表单数据之前如何对数据进行编码
    - application/x-www-form-unlemcoded （默认） 在发送前编码所有字符
    - multipart/form-data 不对字符编码 在使用包含文件上传控件表单时 必须使用该值
    - text/plain 空格转换为 "+" 加号 但不对特殊字符编码 （了解）
- **表单提交 通过 submit提交  是同步**
  - 页面会发生跳转
  - 进行提交后再次回到页面之前的数据和状态 会丢失
  - 解决方案: 表单用于收集数据，ajax负责提交数据到服务器
### form 表单 jq获取数据
- .submit() 监听form 表单中 submit的提交事件
-  from.serialize()  快速获取表单中的所有数据  **每个表单元素必须要添加name属性** 获取到的格式 a=xxx&b=xxx
- demo
  ```js
    <body>
    <form action="/login" method="get" class="form">
        <input type="text" name="nam">
        <input type="password" name="pwd">
        <input type="submit" value="提交">
    </form>
    </body>
    <script>
    $(function () {
        // 监听submit提交事件 进行触发 或者使用  on('submit')
        $('.form').submit(function (e) {
            // 阻止默认行为
            e.preventDefault();
            // 快速获取表单中的所有数据   nam=123&pwd=123 每个表单元素必须要添加name属性 
            let data = $(this).serialize()
            console.log(data);
        })
     })
    </script>
  ```


## 数据的交换格式
- JSON代替 XML原因： XML格式比较混乱，跟数据无关的代码比较多，解析起来比较麻烦
- 服务器和客户端之间需要进行 数据传输和交互的格式
- JSON格式  "{"a":["sd":{}]}"  JSON是字符串对象    
  - JSON的作用：用来 前后端数据交互
  - JSON的本质：字符串对象或者 字符串数组
- 注意事项：
  - 1. key   必须是 ""包裹的字符串 而不是单引号
  - 2. value 如果是字符串类型 必须使用 ""双引号 包裹字符串
  - 3. JSON  **不允许使用单引号表示字符串**
  - 4. JSON  不允许写注释
  - 5. JSON  **最外层必须是对象或者数组格式**
  - 6. **不允许使用 undefined 和 函数作为 value 值**
  - 7. value的数据类型：数字、字符串、布尔、null、Array、Object
- 序列化和反序列化
  - 将JSON转换成字符串的过程：  序列化  JSON.stringify()
    - demo
      ```js
      var a = {
      "data": {
        "titile": "标题",
        "content": "内容",
        "footer": "页脚"
      },
      "status": 200
      }
      console.log(JSON.stringify(a));
      //{"data":{"titile":"标题","content":"内容","footer":"页脚"},"status":200}
      ```
  - 将字符串转换成JSON的过程：反序列化  JSON.parse()
    - demo
     ```js
       var a = {
        "data": {
            "titile": "标题",
            "content": "内容",
            "footer": "页脚"
        },
        "status": 200
    }
    var b = JSON.stringify(a)
    console.log(b);

    console.log(JSON.parse(b));
    // { data: { titile: '标题', content: '内容', footer: '页脚' } , status: 200}
     ```

## 原生 AJAX的封装
- demo
  ```js
    <!-- 发送请求 -->
    <!-- get -->
     ajaxFn({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/getbooks',
        data: { bookname: '一二三' },
        success: (res) => {
            console.log(res);
        }
    })
    // post
     ajaxFn({
         method: 'Post',
         url: 'http://www.liulongbin.top:3006/api/addbook',
         data: {
             bookname: '一二三',
             author: '一二三',
             publisher: '123'
         },
         success: (res) => {
             console.log(res);
         }
      })
      // ajax 封装
      //将对象转为字符串格式提交给服务器 因为服务器不会接收对象
        function datas(datass) {
            var arr = [];
            for (let k in datass) {
                arr.push(k + '=' + datass[k])
            }
            return arr.join('&')
            // 例如：{name: '张三',age: 18}
            //将上面的对象转为字符串形式传给服务器 name=张三&age=18
        }
        
        function ajaxFn(result) {
        // 定义xhr对象
        var xhr;
        // 判断 当前浏览器 是否支持 XMLHttpRequest
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            //不支持 则使用 ie的
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        // 将对象进行字符串拼接
        // result.data 值 传给 datas() 函数进行拼接 拼接完return值赋值给qs 进行下一步操作
        let qs = datas(result.data)
        //事件监听
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //6.接收响应 xhr.response
                let res = JSON.parse(xhr.responseText)
        
                result.success(res)
            }
        }
        // 判断请求方式 gt post   使用toUpperCase() 获取方式时 统一将 请求方式变为大写 
        if (result.method.toUpperCase() == 'GET') {
            // 地址路径 拼接传参数
            xhr.open(result.method, result.url + '?' + qs)
            xhr.send();
        } else if (result.method.toUpperCase() == "POST") {
            xhr.open(result.method, result.url)
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(qs);
        }
        }
        ```

## 同源 同源策略跨域
- 什么是同源： 如果两个页面的url 协议、域名、端口 都相同，则两个页面具有相同的源。
- 什么是同源策略：Same origin policy 是浏览器提供的一个安全功能。
  - 通俗的理解:浏览器规定，A网站的JavaScript，不允许和非同源的网站B之间，进行资源的交互，
    - 1.无法读取非同源网页的Cookie、LocalStorage和IndexedDB
    - 2.无法接触非同源网页的DOM
    - 3.无法向非同源地址发送Ajax请求
- 什么是跨域：两个url 协议 域名 端口 存在一项不一致的 就是跨域  （同源的对立面）
  - 出现跨域的根本原因是 浏览器的同源策略不允许非同源的URL之间进行资源的交互
  - 浏览器允许发起跨域请求，但是，跨域请求回来的数据，会被浏览器拦截，无法被页面获取到
- 两种实现跨域数据请求方案 JSONP和CORS.
    - JSONP:(兼容低版本IE)  只支持GET请求，不支持POST请求
    - CORS:(兼容性差)W3C标准，属于跨域 Ajax请求的根本解决方案。支持GET和POST请求
- 注意点
  - form 跨域 不拦截 form表单不受同源策略的限制 原因页面跳转了
  - ajax发的请求  使用的是ajax引擎  受同源策略  ajax跨域 拦截
  - form发请求 使用的是浏览器其他模块 不受同源策略的限制
- form表单 浏览器地址栏 <img>  <link> <script src> 都不受同源策略的影响
### JSONP
- jsonp的实现原理
  - 由于浏览器同源策略的限制，网页中无法通过Ajax请求非同源的接口数据。
  - 但是<script>标签不受浏览器同源策略的影响，可以通过src属性，请求非同源的js 脚本。
  - 因此，JSONP的实现原理，就是通过<script>标签的 src属性，请求跨域的数据接口，并通过函数调用的形式，接收跨域接口响应回来的数据。
### CORS 解决跨域问题
- 解决方法 给服务器设置响应头 ` res.setHeader('Access-Control-Allow-Origin', '发送请求的地址url')`
- demo
  ```js
    //请求页
    <body>
    <button class="btn">获取数据</button>
    </body>
    <script src="jquery-3.6.0.js"></script>
    <script>
    $(function () {
        $('.btn').click(function () {
            $.ajax({
                url: "http://localhost:3000/test",
                method: 'GET',
                success: function (response) {
                    console.log(response);
                }
            });
        })
    })
    </script>

    //服务器
    const express = require('express')
    const {
        get
    } = require('http')
    const app = express()
    const port = 3000
    app.get('/test', (req, res) => {
    // 设置响应头 url是发送请求的地址
    // 允许（当前这个url地址）远程跨域
    // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    // url设置为* 表示任何一个请求地址都允许远程跨域获取到数据
    res.setHeader('Access-Control-Allow-Origin', '*'); //cors核心代码

    let { callback } = req.query
    let data = [{name: '张三',age: 18}, {name: '李四',age: 19}]
    res.send(data)
    })


    app.listen(port, (err) => {
        if (!err) console.log(`Example app listening on port ${port}! 成功`);
        else console.log('失败');
    })
  ```

## XMLHttpRequest XHR level2 的新特性
- 1.可以设置http请求的时间限制
  - `xhr.timeout=1000` 设置请求时限
  - demo
    ```js
       let xhr = new XMLHttpRequest()
       //设置请求时限 10毫秒内未得到响应 则直接返回请求超时
       xhr.timeout = 10; 
       xhr.ontimeout = function () {
           console.log('请求超时');
       }
       xhr.open('get', 'http://www.liulongbin.top:3006/api/getbooks', true)
       xhr.onreadystatechange = function () {
           // 监听xhr对象 状态值的改变
           if (xhr.readyState == 4 && xhr.status == 200) {
               console.log(xhr.response);
           }
       }
       xhr.send()
  ```
- 2.可以使用FormData对象管理表单数据
  - demo
   ```js
     let fd = new FormData();
    // 向 FormData 中添加新的属性值
    fd.append('bookname', 123)
    fd.append('author', 456)
    fd.append('publisher', 789)
    console.log(fd);

    let xhr = new XMLHttpRequest()
    xhr.open('post', 'http://www.liulongbin.top:3006/api/formdata', true)
    xhr.onreadystatechange = function () {
        // 监听xhr对象 状态值的改变
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
        }
    }
    xhr.send()
   ```
- 3.可以上传文件
  - demo
    ```js
       <body>
       <button class="btn">上传</button>
       <input type="file" name="author" class="inp">
       <img src="" alt="" class="imgs">
       </body>
       <script>
        let btn = document.querySelector('.btn')
        btn.addEventListener('click', () => {
        let files = document.querySelector('.inp').files;
        console.log(files);
        // 判断是否上传了文件到缓存
        if (files.length <= 0) {
            console.log('请上传文件');
        }
        // 拿到 文件名
        console.log(files[0].name);

        // 进行处理
        let fd = new FormData();
        // 向 FormData 中添加新的属性值
        fd.append('username', files[0])

        let xhr = new XMLHttpRequest()
        xhr.open('post', 'http://www.liulongbin.top:3006/api/upload/avatar ')
        xhr.onreadystatechange = function () {
            // 监听xhr对象 状态值的改变
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 拿到的原始数据时字符串类型的数据
                console.log(xhr.response);
                // 转换为对象
                let data = JSON.parse(xhr.responseText)
                console.log(data);
                // 拿到url
                console.log(data.url);
                // 使用 服务器地址拼接上上传图片的url地址
                document.querySelector('.imgs').src = 'http://www.liulongbin.top:3006' + data.url
            }
        }
        xhr.send(fd)
        });

        </script>
    ```
- 4.可以获取传输的进度信息
  - demo
    ```js
        <body>
        <button class="btn">上传</button>
        <input type="file" name="author" class="inp">
        <!-- 展示上传的图片 -->
        <img src="" alt="" class="imgs">
        <!-- bootstrap进度条组件 -->
        <div class="progress" style="width: 500px;">
            <div class="progress-bar progress-bar-striped active " role="progressbar" aria-valuenow="45"    aria-valuemin="0"
                aria-valuemax="100">
            </div>
        </div>
        </body>
        <script>

        let btn = document.querySelector('.btn')
        btn.addEventListener('click', () => {
        let files = document.querySelector('.inp').files;
        console.log(files);

        if (files.length <= 0) {
            console.log('请上传文件');
        }
        console.log(files[0].name);

        // 进行处理
        let fd = new FormData();
        fd.append('aaa', files[0])

        let xhr = new XMLHttpRequest()
        // upload.onprogress	数据传输进行中
        xhr.upload.onprogress = function (e) {
            // lengthComputable 是个只读的布尔属性，表示ProgressEvent 所关联的资源是否具有可以计算的长度
            if (e.lengthComputable) {
                // 计算上传的速度 向上取整   (e.loaded 已传输的字节 / e.total总字节)*100= 已上传进度
                let res = Math.ceil((e.loaded / e.total) * 100)
                console.log(res);
                // 上传进度关联进度条 
                document.querySelector('.progress-bar').style.width = res + '%';
            }
        }

        xhr.open('post', 'http://www.liulongbin.top:3006/api/upload/avatar ')
        xhr.onreadystatechange = function () {
            // 监听xhr对象 状态值的改变
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 拿到的原始数据时字符串类型的数据
                console.log(xhr.response);
                // 转换为对象
                let data = JSON.parse(xhr.responseText)
                console.log(data);
                // 拿到url
                console.log(data.url);
                // 使用 服务器地址拼接上上传图片的url地址
                document.querySelector('.imgs').src = 'http://www.liulongbin.top:3006' + data.url
            }
        }
        xhr.send(fd)
        });
        </script>
    ```
- 比较与老版本
  - 老版本只支持本文数据的传输,无法读取和上传文件
  - 老版本传输和接受数据的时候，是无法查取进度展示，只能通过提示回调函数 来知道是否进行完成
- demo 实现文件的上传以及进度条的关联
  
  
## axios
- axios的简单使用
  - demo 使用 axios 发送get 和post请求
   ```js
    //get
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js"></script>
    axios({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/getbooks',
    }).then((result) => {
        console.log(result.data);

    }).catch((err) => {
        console.log(err);
    });

    //post 添加一条数据
    axios.post(
      'http://www.liulongbin.top:3006/api/addbook',
      {
          bookname: "测试数据",
          author: 'dddd',
          publisher: '测试',
      })
      .then(res => {
          console.log(res)
      })
      .catch(err => {k
          console.error(err);
      })

      // get获取获取指定数据
      axios.get('http://www.liulongbin.top:3006/api/getbooks', { params: { id: 1 } }).then((res) => {
          console.log(res.data);
      }).catch((err) => {
          console.log(err);
      });

      //自选配置形式使用 axios
      axios({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/getbooks',
      }).then((result) => {
          console.log(result.data);

      }).catch((err) => {
          console.log(err);
      });
   ```
- axios 设置默认配置
  - demo
    ```js
    axios.defaults.method = 'GET'; //设置默认请求类型
    axios.defaults.baseURL = 'http://localhost:3000';//设置基础url
    axios.defaults.params = { id: 2 };//设置默认请求数据
    axios.defaults.timeout = 3000;//设置默认请求时间 超过该时间未得到响应 取消响应

    axios.request({
            method: 'GET',
            url: '/comments',
        }).then(res => {
            console.log(res.data);
        })
    ```
- axios 拦截器
  - 拦截器分为响应拦截和请求拦截  
  - demo
    ```js
       // 设置请求拦截器
    axios.interceptors.request.use(function (config) {
        console.log('请求拦截器 成功 1');
        return config;
    }, function (error) {
        console.log('请求拦截器 失败 1');

        return Promise.reject(error);
    });
    axios.interceptors.request.use(function (config) {
        console.log('请求拦截器 成功 2');

        return config;
    }, function (error) {
        console.log('请求拦截器 失败 2');

        return Promise.reject(error);
    });

    // 设置响应拦截器
    axios.interceptors.response.use(function (response) {
        console.log('响应拦截器 成功 -1');

        return response.data;
    }, function (error) {
        console.log('响应拦截器 失败 -1');
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
        console.log('响应拦截器 成功 -2');

        return response;
    }, function (error) {
        console.log('响应拦截器 失败 -2');
        return Promise.reject(error);
    });

    // 发送请求
    axios({
        method: 'get',
        url: 'http://localhost:3000/posts/2',
    }).then((res) => {
        console.log(res)
    }).catch((err) => {

    });
    ```
  - **设置多个拦截器时 请求拦截器越靠后的 越先执行   响应拦截器越靠前的 越先执行**
- axios 取消请求
  - demo
    ```js
      <body>
      <button class="btn btnget">发送请求</button>
      <button class="btn btnpost">取消请求</button>
      </body>
      <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js"></script>
      <script>
        // 设置本地服务器 json-server 延迟响应  json-server --watch db.json -d 2000
        let btn = document.querySelectorAll('.btn')
        // 2.声明一个全局变量
        let cancel = null;
        btn[0].onclick = () => {
        // 检测上一次请求是否成功 没成功 则将上一次的请求给取消掉 （举例 抢购的响应 疯狂点击只响应最后一次点击的）
        if (cancel !== null) {
            cancel();
        }
        axios({
            method: 'get',
            url: 'http://localhost:3000/posts',
            // 1.添加配置对象
            cancelToken: new axios.CancelToken((c) => {
                // 3.将 c 的值赋值给 cancel
                cancel = c;
            })
        }).then((res) => {
            console.log(res);
            cancel = null;
        }).catch((err) => {
            console.log(err);
        });
      }
      // 设置取消按钮
      btn[1].onclick = () => {
        cancel();
      }
      </script>
    ```
- axios 设置实例化对象
### axios Get与Post请求格式梳理
#### GET


## 缓存 Cookie、sessionStorage、localStorage
- **缓存特点 不存在跨浏览器获取缓存  缓存的数据格式必须是字符串的形式**
- 缓存是暂时性的存储  不能永久化的保存
- Cookie 
  - 可以设置失效时间,默认情况关闭浏览器 Cookie自动被清除
  - 储存大小4kb左右  存储量较小
  - 可以与服务器通信 一般用于携带 会话秘钥token值 等一些简短的字符串
  -**只有服务器中才有Cookie 同一浏览器中可以跨页面获取 但不能跨服务器**
  - Cookie 的增删改查
    ```js
      // 增 储存形式以键值对的形式存储 
       document.cookie = 'a=测试测试1'
       document.cookie = 'b=测试测试2'
       let a=document.cookie = 'd=测试测试3'
      //查 打印出所有的cookie
       console.log(document.a);

      //删
      //不设置过期时间 默认关闭浏览器 清除所有cookie
      //给coolie 设置时间 设为过去式的时间 当前coikie就此删除
      //expires世界标准时间 UTC 
      //new Date() 获取到的是中国标准时间 GMT 
      //new Date().toUTString() 将中国标准时间转换位世界标准时间
      document.cookie = "a=测试测试1; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    ```
- demo 定义某时间后自动删除 cookie
  ```js
    document.cookie = 'age=18'
    const date = new Date()
    // 当前时间 加 2000 后进行删除 数据
    date.setTime(date.getTime() + 2000)
    document.cookie = 'age=18;expires=' + date.toGMTString();

  ```
- sessionStorage
  - 只能保存在当前页面，关闭页面或者浏览器 清除 SessionStorage 不能跨域获取
  - 储存大小 5MB 左右 视浏览器决定
  - 单纯的前端储存不参与服务器通信
  - 数据不共享 仅保存在当前页面
  - demo
    ```js
      // 添加一条
    sessionStorage.setItem('abc', '123');
    sessionStorage.setItem('b', '456');
    sessionStorage.setItem('c', '789');

    // 读取一条数据 getItem('属性名');
    let data = sessionStorage.getItem('abc');
    console.log(data);

    // 删除一条
    sessionStorage.removeItem('数据名');

    // 删除所有
    sessionStorage.clear();
    ```
- localStorage
  - 只要不进行手动删除，就会永久有效 关闭浏览器关闭页面依然存在 
  - 储存大小 5MB 左右 视浏览器决定
  - 单纯的前端储存不参与服务器通信
  - 数据共享 打开同域名下的页面可以获取到值
  - demo
    ```js
      localStorage.setItem('a', '1');
        localStorage.setItem('b', '2');
        localStorage.setItem('c', '3');
    
        // 读取一条数据
        let data = localStorage.getItem('a');
        console.log(data);
    
    
        // 删除一条
        localStorage.removeItem('a');
    
        // 删除所有
        localStorage.clear();
    ```

## 其他
### 服务器 与 客户端的理解
- 服务器 存放资源 或对外提供资源的存储空间（电脑）
- 客户端 获取和消费资源的电脑
### url 地址概念 
- url 称为 统一资源定位符 
- 组成部分例如：http://www.baidu.com
  - http:  客户端和服务器之间的通信协议  http协议
  - www.baidu.com  服务器名称
    - baidu.com      域名
    - .com 域名
- 后缀不同 地址不同 http://www.baidu.com和http://www.baidu.cn 不是同一个域名

### get post
- get 用于湖区服务器资源
- post 用于向服务器发送资源

### 网页的开开过程
- 1.打开浏览器
- 2.输入需要访问的地址
- 3.回车、向服务器发送请求
- 4.服务器接受到客户端发送的请求
- 5.服务器在内部进行请求处理，找到对应的内容
- 6.服务器将找到的资源，响应给客户端
- 客户端发送请求  -----  服务端处理请求 ----- 服务端响应客户端
- **一次请求 一次响应**

### 服务器提供的资源
- html  网页的架构
- css   网页的样式
- js    网页的行为
- 数据  网页的灵魂

### 小知识点
- void(0)
- <a href='javascript:void(0)'  >删除</a>
  - href='javascript:void(0) 的含义  void(0)该操作符指定要计算一个表达式但是不返回值
  - 可以阻止链接跳转，URL不会有任何变化  与#的区别是 #符号包含了一个位置信息



###  转码 解码
- encodeURI()  ---- 将编码进行 转码
- decodeURI()  ---- 将编码进行 解码


### json-server 插件包 快速搭建服务器
- `json-server`  控制台运行
