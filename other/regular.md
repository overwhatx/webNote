# 正则 Regular Expression
## 简介
- 用于匹配字符串中字符组合的模式
- 在js中正则表达式也是对象

## 创建
- 两种方式
  - 1.利用 new RegExp 对象来创建正则表达式 `let regexp = new RegExp(/123/);`
  - 2. 直接利用字面量创建正则表达式 `let regexp = /123/`

- .test() 方法用来检测字符串是否符合正则表达式要求的规范

## 边界符
- ^ 匹配行首的文本 以谁开始
- $ 匹配行尾的文本 以谁结束
  - demo
    ```js
    var a = /^abc/; //必须以 abc字符串开头的 数据
     console.log(a.test('abc')); //true
     console.log(a.test('a1bc')); //false
 
     var b = /abc$/;//必须以 abc字符串结尾的 数据
     console.log(a.test('abc')); //true
     console.log(a.test('ab1c')); //false
 
     var c = /^abc$/; //匹配开头和结尾都必须为 abc 的数据
     console.log(c.test('abcabc'));//false */
    ```
## [] 的使用
## [-] 范围符 [a-z] [A-Z] [0-9] []
### 字符组合
- demo
      ```js
      // 表示：匹配的数据中只能是这个范围里面的一个 小写a-z   A-Z 数字 0-9 以及 一些符号
      var a = /^[a-zA-Z0-9*&-^%$]$/
      console.log(a.test('*'));//true
      console.log(a.test('-'));//true
      console.log(a.test('$'));//true
      console.log(a.test(123));//false 

      //去除了尾部边界 表示 只要是其中一个是匹配数据的开头即可
      var a = /^[a-zA-Z0-9*&%]/
      console.log(a.test('123'));//true
      console.log(a.test('@123'));//false
      console.log(a.test('!123'));//false  
   
      ```
##  [^] 当中括号中出现 ^ 代表的是取反 而不在是边界
- demo
  ```js
        // 表示 匹配数据中 不包含正则中的数据 既为true
        // 只要不是小写a-z 大写A-Z 数字 0-9 以及 规定的一些符号 既为true
        var a = /^[^a-zA-Z0-9*&%$]$/
        console.log(a.test('@'));
  ```
## 量词符
- * 表示 重复0 次 或更多的次数  匹配前面的子表达式零次或多次
- + 表示 重复1 次 或更多的次数  匹配前面的子表达式一次或多次
- ? 表示 重复0 次 或 1次       匹配前面的子表达式零次或一次
- {n}  表示 重复 n次
- {n,} 表示 重复 n次 或更多次数
- {n,m} 表示 重复 n次 到 m次
  
## 三种括号
- {} 大括号 量词符  里面表示重复的次数
- [] 中括号 字符集和 匹配中括号中的任意字符
- () 小括号 表示优先级

### 需要注意的是 当{}大括号前 是单纯的数据 重复的是大括号前的一个字符符 而不是全部
- demo
  ```js
    var a = /^abc {3}$/;
    console.log(a.test('abccc')); //true
    console.log(a.test('abc')); //false
  ```

## 预定义类
- \d 匹配0-9之间的任意数字     相同于[0-9]
- \D 匹配0-9以外的字符         相同于[^0-9]
- \w 匹配任意字母、数字、下划线_ 相同于[a-zA-Z0-9_]
- \W 匹配任意字母、数字、下划线_ 以外的字符   相同于[^a-zA-Z0-9_]
- \s 匹配空格 包含换行符 制表符 空格符等  相同于[\t\r\n\v\f]
- \S 匹配非空格的字符 相同于 [^\t\r\n\v\f]

## 其他符号
- | 代表或者
  - demo
    ```js
     var a = /^([0-9]{3}-[0-9]{8})|(\d{4}-\d{7})$/
     console.log(a.test('113-12345678'));
    ```

## 正则表达式参数
- g 全局匹配
- i 忽略大小写
- gi 全局匹配 和忽略大小写 
  
### replace 的替换
- demo
  ```js
  var a = 'abfuckabcFUCKfuck'
  console.log(a);
  console.log(a.replace(/fuck/gi, '**'));
  ```