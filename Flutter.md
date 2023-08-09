# Flutter

- 简介
  - 官网地址： https://flutter.dev/
## Dart  语言

- dart语言官网：https://dart.cn/

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

- const 值不变 一开始就得赋值
- final 可以开始不赋值 只能一次，最重要的他是运行时常量，并且final是惰性初始化，即子运行时第一次使用前才初始化
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
- Maps 字典
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
