## 如何优化代码分支 （优化多 if else判断分支 ）
### 案例1
- 未优化前
```js
  function animal (name) {
    if (name == '小牛') {
      console.log('小牛xxxxx');
    } else if (name == '小马') {
      console.log('小马xxxxx');
    } else if (name == '小狗') {
      console.log('小狗xxxxx');
    } else {
      console.log('啥也不是');
    }
  }
  animal('小牛')
```
- 普通优化后 
```js
   function animal (name) {
     // 将所有可能的条件和返回进行存储起来
     const map = {
       小牛: '小牛xxxxx',
       小马: '小马xxxxx',
       小狗: '小狗xxxxx',
     }
     // 判断是否有匹配的 有则输出对应 value
     if (map[name]) {
       console.log(map[name]);
     } else {
       console.log('啥也不是');
     }
   }
   animal('小牛') 
```
- 进一步优化
```js
 // 每个匹配值做不同的操作 假设(发送请求、输出、等不同操作)
 function animal (name) {
     // 将所有可能的条件和返回进行存储起来
     const map = {
       小牛: () => {
         console.log('上传到服务器', '小牛xxxxx');
       },
       小马: () => console.log('写入文件', '小马xxxxx'),
       小狗: () => console.log('打开一个新页面', '小狗xxxxx'),
     }
     // 判断是否有匹配的 有则调用相对应的函数
     if (map[name]) {
       map[name]()
     } else {
       console.log('啥也不是');
     }
   }
   animal('小狗') 
```
### 案例2
- 未优化前
```js
  // includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
  // endsWith() 方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。
  function animal (name) {
      if (name.includes('牛')) {
        console.log('小牛xxxxx');
      } else if (name.endsWith('小马') && name.length <= 3) {
        console.log('小马xxxxx');
      } else if (name.endsWith('小狗') && !name.includes('小牛')) {
        console.log('小狗xxxxx');
      } else {
        console.log('啥也不是');
      }
    }
    animal('小马') 
```
- 优化后
```js
function animal (name) {
    // 将所有可能的条件和返回进行存储起来
    const map = [
      [
        // 第一个函数 返回布尔值 成立与否 ,第二个函数 返回成立所需要执行的一些列操作
        () => name.includes('牛'),
        () => console.log('小牛xxxxx')
      ],
      [
        () => name.endsWith('小马') && name.length <= 3,
        () => console.log('小马xxxxx')
      ],
      [
        () => name.endsWith('小狗') && !name.includes('小牛'),
        () => console.log('小狗xxxxx')
      ],
    ]
    // find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
    // const target = map.find(m => m[0]()) //同下
    // 查找的时候 通过依次调用 执行函数 找到第一个满足条件的 
    const target = map.find(m => {
      console.log(m[0]()); 
      return m[0]()
    })
    console.log(target);
    // 判断是否存在 将查找到 进行一系列操作
    if (target) {
      target[1]()
    } else {
      console.log('啥也不是');
    }
  }
  animal('小狗')
```
## 获取页面 滚动距离 可视区域 滚动条高度
- 滚动距离 距离顶部的距离 从0 开始
- 可视区域 浏览器可视窗口高度
- 滚动条高度 滚动条整个高度
  ```js
    window.addEventListener("scroll", this.handleScroll, true);
    function handleScroll() {
    let scrollTop = document.getElementsByTagName("html")[0].scrollTop;
    console.log("【滚动距离】", scrollTop);
    let ch = document.getElementsByTagName("html")[0].clientHeight;
    console.log("【可视区域】", ch);
    let sh = document.getElementsByTagName("html")[0].scrollHeight;
    console.log("【滚动条高度】", sh);
    }
  ```