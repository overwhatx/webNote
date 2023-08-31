# Flutter

- 简介
  - 官网地址： https://flutter.dev/
## Dart  语言

- dart语言官网：https://dart.cn/
- dart环境配置参考：https://blog.csdn.net/weixin_48200589/article/details/130686784
- dart --version 查看dart-sdk的版本
### 输出
```dart
main() {
  print('Hello Dart');
}

```

### 注释
- 方式1 //
- 方式2 ///
- 方式3 /*  */

### Dart 变量
- 自动类型推导 （dart是一个强大的脚本类语言，可以不预定义变量类型）
- 类型关键词声明变量
  - String 字符串类型 `String str='hello Dart'`
  - int    数值整型   `int num=168`
- **var 与 类型声明关键字不能同时使用 类型不一致会导致报错**

### dart命名规则

- 1、变量名称必须由数字、字母、下划线和美元符($)组成
- 2.注意:标识符开头不能是数字
- 3.标识符不能是保留字和关键字。
- 4.变量的名字是区分大小写的如: age和Age是不同的变量。在实际的运用中,也建议,不要用一个
- 5、标识符(变量名称)一定要见名思意 : 变量名称建议用名词，方法名称建议用动词

### Dart 常量 final 和 const 修饰符

- const 值不变 一开始就得赋值 (必须赋值常量值，编译期间需要一个确定的值)
- final 可以开始不赋值 只能一次，最重要的他是运行时常量，并且final是惰性初始化，即子运行时第一次使用前才初始化 （运行期间来确定一个值）
```dart
// 最容易展示区别的例子
void main() {
  // const time1=new DateTime.now();
  // print(time1);
  final time2 = new DateTime.now();
  print(time2);
}
```

### 数据类型

//常用数据类型
- Number 数值
  - int
  - double
  ```dart
  main() {
  // int 整型 （只能定义整型）
  int price = 100;
  print(price);

  // double 浮点型 （可以定义整型也可以定义浮点型，返回都是浮点型）
  double price2 = 99.99;
  print(price2);

  double price3 = 99;
  print(price3);//99.0
  }
  ```
- String 字符串
  - String
  ```dart
  main() {
  var str = 'this is str1';
  print(str);
  String str2 = 'this is str2';
  print(str2);

  // 字符串拼接
  print("$str,$str2"); //this is str1,this is str2
  print(str+","+str2); //this is str1,this is str2

  //三种形式
  var str1='aaa';
  var str2="aaa";
  var str3="""
            aaa
            aaa
           """;
  
  var str4="aaa ${str1} ${str2}"; //类似于模板字符串
  var str5="aaa $str1 $str2 ${str1.runtimeType}" ;// 当拼接的值为普通变量时可以省略{}
  }
  ```
- Booleans 布尔
  - bool
  ```dart
  void main() {
  bool flag = false;
  print(flag);
  if (flag) {
    print('true');
  } else {
    print('false');
  }
  }
  ```
- List 数组
  - 在dart 中数组是列表对象，所有大多数人只是称他们为列表
  ```dart
  void main() {
  var arrs = ['张三', 18, false];
  print(arrs); //[张三, 18, false]
  print(arrs.length); //3
  print(arrs[0]); //张三

  // 指定数组类型
  var arrSt = <String>['a', 'b', 'c'];
  print(arrSt);
  var arrInt = <int>[1, 2, 3];
  print(arrInt);

  // 向数组中添加数据
  var arrNull = ['赵六'];
  print(arrNull);
  arrNull.add('王五');
  print(arrNull);

  // 创建一个固定长度的数组
  var lists = List.filled(2, "");
  print(lists);

  var listInt = List<String>.filled(2, '张三');
  print(listInt); //[张三, 张三]
  }
  ```
- Maps 字典 **键必须使用引号包裹**
  - 通常来说，Map是一个键值对相关的对象，键和值可以是任何类型的对象，每个键只会
  ```dart
  void main() {
  // 键必须使用引号包裹
  var person = {
    "name": '张三',
    "age": 18,
    "hobby": ['唱', '跳', 'rap']
  };
  print(person); //{name: 张三, age: 18}
  print(person["name"]); //张三

  // 使用 new Map() 创建maps

  var person2 = new Map();

  person2['name'] = '李四';
  print(person2); //{name: 李四}
  }
  ```

### 通过 is 判断类型
```dart
void main() {
  var str = 123;
  print(str is String); //false
}
```

### 运算符
- 算数运算符 `+ - * / ~/(取整) %(取余) `
  ```dart
  void main()  {
  print(10 ~/ 3); //3
  print(10 % 3); //1
  }
  ```
- 关系运算符 `== != > < >= <=`
- 逻辑运算符 `! && ||`
- 赋值运算符 
  - 基础赋值运算符 `= ??=(为空时进行赋值)`
  ```dart
  var num;
  num ??= 11; // num如果为空则赋值
  print(num);//11
  ```
  - 复合赋值运算符 `+= -= *= /= %= ~/=`

### 条件表达式
- Dart 中不能判断非0既真，或非空既真 举例：`var=message='hello dart' if(message){print(message)} //不会执行`
- if else
- switch case
  ```dart
  var sex = '张三';
  switch (sex) {
    case "张三":
      print('张三');
      break;
    case "李四":
      print('李四');
      break;
    default:
      print('某人');
      break;
  }
  ```
- 三目运算符
- ？？
  ```dart
  var a;
  var b = a ?? 100;
  print(b);//100
  ```

### 字符串与数值类型之间的转换
- int.parse() 将字符串类型转换成整型
- double.parse() 将字符串类型转换成浮点型
- toString() 将数值类型转换成字符串类型
```dart
void main() {
  String str = '123';
  var num = int.parse(str);
  print(num is int); //true

  var num_str = num.toString();
  print(num_str is String);
}
```

### 判断字符串是否为空、判断当前数据是否为NaN
```dart
// isEmpty 判断字符串是否为空 为空则返回true
  var str = '456';
  print(str.isEmpty); //false

// isNaN
  var myNum = 0 / 0;
  print(myNum.isNaN); //true
```

### dart中的循环语句
- for循环
  ```dart
  void main(){
    for(int i=1;i<=10;i++){
      print(i);
    }
  }

  var arrs=[{'userName':'张三'},{'userName':'李四'},{'userName':'王五'}];
    for(int i=0;i<arrs.length;i++){

      print(arrs[i]["userName"]);
    }
  ```
- fo in
  ```dart
  var hobby = ['唱', '跳', 'rap'];
  for (var item in hobby) {
    print(item);
  };
  ```
- while
  ```dart
  int i=1;
  while(i<=10){
    print(i);
    i++;
  }
  ```
- do while
  ```dart
  int i=1;
  do{
    print(i);
    i++;
  }while(i<=10);
  ```
- do while 和 while 的区别 **while先判断在执行 do while 无论是否满足条件都会执行一次**
- break语句功能
  - 在 switch 语句中使流程跳出switch结构
  - 在循环语句中使流程跳出当前循环，遇到break循环终止，后面代码也不会执行
  - 如果在循环中已经执行了break语句，就不会执行循环中位于break后的语句
  - 在多层循环中，一个break语句只能向外跳出一层
  - break可以用在switch case中 也可以用在for循环和while循环中
- continue 语句功能
  - 只能在循环语句中使用，使本次循环结束，既跳过玄幻体重下面尚未执行的语句，接着进行下面
  - continue可以用在for循环以及while循环中，但是不建议用在while循环中，容易死循环

- forEach 只能获取值，拿不到索引，只能传一个值
  ```dart
  var hobby = ['唱', '跳', 'rap'];
  hobby.forEach((value){
  print(value);
  });
  ```
- map
  ```dart
  var num = [1, 2, 3];
  var newNum = num.map((value) {
    return value * 2;
  });
  print(newNum.toList()); //[2, 4, 6]
  ```
- where 返回满足条件的值组成新的集合
  ```dart
  var num = [1, 2, 3,4,5,6];
  var newNum = num.where((value) {
    return value <= 3;
  });
  print(newNum.toList()); //[1, 2, 3]
  ```
- any 查找是否存在该值 返回true或false
  ```dart
  var num = [1, 2, 3,4,5,6];

  var flags = num.any((value) {
    return value == 7;
  });
  print(flags); //false
  ```
- every 判断每一项是否都满足条件 返回true或false
  ```dart
  var num = [1, 2, 3,4,5,6];

  var flags = num.every((value) {
    return value <= 7;
  });
  print(flags); //true
  ```

### list
#### 常用属性
- length 长度
- reversed 翻转
- isEmpty 是否为空
- isNotEmpty 是否不为空
- 示例
  ```dart
  void main() {
  // 常用属性
  var hobby = ['唱', '跳', 'rap'];
  // length 长度
  print(hobby.length); //3
  // reversed 翻转
  print(hobby.reversed); //(rap, 跳, 唱)
  // isEmpty 是否为空
   print(hobby.isEmpty); //false
  // isNotEmpty 是否不为空
   print(hobby.isNotEmpty); //true
  }
  ```

#### 常用方法
- add 添加
- addAll 拼接数组
- indexOf 查找 传入具体值
- remove 删除 传入具体值
- removeAt 删除 传入索引
- fillRange(start,end,value) 替换 替换多个或单个
  ```js
  var hobby = ['唱', '跳', 'rap'];
  // hobby.fillRange(0,1,'哈哈哈');//[哈哈哈, 跳, rap]
  hobby.fillRange(0,2,'哈哈哈'); //[哈哈哈, 哈哈哈, rap]
  print(hobby);
  ```
- insert(index,value) 指定位置插入
- insertAll(index,list) 指定位置插入List
- toList() 其他类型转换成List
- join() List转换成字符串
- split() 字符串转换成list
- forEach
- map
- where
- any
- every

### Set 主要功能去除数组重复内容 **set是没有顺序且不能重复的集合，所以不能通过索引去获取值**
```dart
void main() {
  var s = new Set();
  s.add('张三');
  s.add('李四');
  s.add('张三');
  print(s); //{张三, 李四}

  //通过 toList()转换成list类型
  print(s.toList());//[张三, 李四]


  // 去重示例
  var hobby = ['唱', '跳', 'rap', '唱', '跳', 'rap'];
  var s2 = new Set();
  s2.addAll(hobby);
  print(s2.toList()); //[唱, 跳, rap]
}
```

### Map
- 属性
  - keys  获取所有key值
  - values 获取所有value值
  - isEmpty
  - isNotEmpty
- 方法
  - remove(key) 删除指定key的数据
  - addAll({})  合并映射 给映射内增加属性
  - containsValue 查找映射内的值 返回true/false
  - forEach
  - map
  - where
  - any
  - every
```dart
Map person = {"name": '张三', "age": 18};

//获取所有key 并转换成list
  print(person.keys.toList()); //[name, age]

//获取所有values 并转换成list
  print(person.values.toList()); //[张三, 18]

// 是否存在当前值
  print(person.containsValue('张三')); //true
```

### 方法函数
- 方法
  ```dart
  void printInfo() {
    print('这是一个自定义方法');
  }

  void main() {
    // 自定义方法
    // 返回类型 方法名称(value1,value2,...){方法体 return 返回值;}
    printInfo(); //这是一个自定义方法

    int getNum() {
      var myNum = 999;
      return myNum;
    }

    var res = getNum();
    print(res); //999
  }
  ```
- 函数
- 定义形参类型 `int sumNum(int n) {}`
- 定义形参可选类型 `String printUserInfo(String username, [int? age]) {}` **可选参数在定义类型后需要加 ?,没有定义类型可以不加**
- 定义形参默认参数 `String printUserInfo(String username, [String sex = '男', int? age]) {}`
- 命名形参 `String printUserInfo(String username, {int? age, String sex = '男'}) {}`
  ```dart
    // 设置返回类型以及传入参数的类型
    int sumNum(int n) {
    var sum = 0;
    for (var i = 0; i <= n; i++) {
      sum += i;
    }
    return sum;
  }

  print(sumNum(100)); //5050
  ```
- 将方法当做参数
  ```dart
  // 将方法当做参数

  fn1() {
    print('fn1');
  }

  fn2(fn) {
  //等于 fn=fn1
    fn();
  }

  //把fn1方法当做参数传入
  fn2(fn1); //fn1
  ```

### dart中的箭头函数
- 只能写一句话函数体内也是如此
```dart
  List list = ['唱', '跳', 'rap'];
  list.forEach((value) => print(value));
```

### 函数闭包
1、全局变量特点: 全局变量常驻内存、全局变量污染全局
2、局部变量的特点： 不常驻内存会被垃圾机制回收、不会污染全局
- 闭包：当内部函数被返回到外部并保存时，一定会产生闭包，闭包会产生原来的作用域链不释放，过度的闭包可能会导致内存泄露，或加载过慢。
- 这时候闭包可以解决这个问题，闭包: 函数嵌套函数, 内部函数会调用外部函数的变量或参数, 变量或参数不会被系统回收(不会释放内存)
```dart
main() {
  fn() {
    var a = 123; /*不会污染全局   常驻内存*/
    return () {
      a++;
      print(a);
    };
  }
 
  var b = fn();
  b();//124
  b();//125
  b();//126
}
```

### 对象
- 面向对象编程(OOP)的三个基本特征是: 封装、继承、多态
  - 封装: 封装是对象和类概念的主要特性。封装，把客观事物封装成抽象的类，并且把自己的部分属性和方法提供给其他
  - 继承:面向对象编程(OOP)语言的一个主要功能就是“继承”。继承是指这样一种能力: 它可以使用现有类的功能，并
  - 多态:允许将子类类型的指针赋值给父类类型的指针，同一个函数调用会有不同的执行效果
- Dart所有的东西都是对象，所有的对象都继承自object类
- Dart是一门使用类和单继承的面向对象语言，所有的对象都是类的实例，并且所有的类都是object的子类
- 个类通常由属性和方法组成，

### 级联语法
- 对一个对象进行连续的操作，这个时候可以使用级联语法
  ```dart
  class Person {
    String name='';

    void run() {
      print("${name} is running");
    }

    void eat() {
      print("${name} is eating");
    }

    void swim() {
      print("${name} is swimming");
    }
  }

  main(List<String> args) {
    final p1 = Person();
    p1.name = 'hello';
    p1.run();
    p1.eat();
    p1.swim();

    final p2 = Person()
    ..name = "hello"
    ..run()
    ..eat()
    ..swim();
  }

  ```

### 待处理
- identical(obj1,obj2)  检查两个引用是否指向同一个对象
## adb
- adb devices 查看在线的设备列表
- adb root
- adb remount
- adb shell ls /data/data 查看根目录文件
- adb push C:\Users\Administrator\Desktop\test.html /data/data 往根目录添加文件
## flutter 常用命令
- flutter create projectName 创建flutter项目
- flutter run 运行当前项目
- flutter run -d all 运行到所有端
- flutter run -d xxx 运行到指定端
- flutter devices 查看在线的设备列表
- 启动后调试快捷键
  - r 键: 点击后热加载，也就算是重新加载吧
  - R 键: 热重启项目
  - p 键: 显示网格，这个可以很好的掌握布局情况，工作中很有用。
  - o 键: 切换android和ios的预览模式
  - q 键: 退出调试预览模式

## Flutter

### 颜色 Color 和Colors
```dart
Color c1 = Color(0xFF0099ff);
Color c2 = Color.fromRGBO(60, 170, 250, 1);
Color c3 = Color.fromARGB(255, 60, 170, 250);
Color c4 = Colors.blue;
Color c5 = Colors.red[300];
```
### 去除右上角 debug图标
```dart
MaterialApp(
  debugShowCheckedModeBanner: false,
);
```
## 其他

### Gradle
- Gradle是一个构建工具，它是用来帮助我们构建app的，构建包括编译、打包等过程。
- gradle是以Groovy语言为基础，面向Java应用为主，基于DSL语法的第一个构建集成工具，与ant、maven、ivy有良好的相容相关性。gradle整体设计是以作为一种语言为导向的，而非成为一个严格死板的框架

### SDK 
- 全称为Software Development Kit，意思是软件开发工具包