# MockJs
- 官网地址：`http://mockjs.com/examples.html#Name`
  - dithub:`https://github.com/nuysoft/Mock/wiki/Mock.mock()`
## 在 vue 项目中使用 Mockjs
- 安装依赖：`yarn add mockjs`
- 创建文件、文件夹：src/mock/mock.js
- mock.js 中进行抒写
  ```js
  //引入mockjs
  const Mock = require("mockjs");

  // 获取 mock.Random 对象
  const Random = Mock.Random;

  //使用mockjs模拟数据
  Mock.mock("/api/data", () => {

    //当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
    let list = [];

    for (let i = 0; i < 10; i++) {
      let listObject = {
        title: Random.csentence(5, 10),   //随机生成一段中文文本
        company: Random.csentence(5, 10), //随机生成一段中文文本
        attention_degree: Random.integer(100, 9999), //返回一个随机的整数
        photo: Random.image("114x83", "#008c8c", "#FFF", "Mock.js"), //返回一张图片
      };

      list.push(listObject);
    }

    return {
      data: list,
    };

  });


  Mock.mock("/api/login", "post", () => {
  let list = {
    name: Random.cname(),
    city: Random.city(),
    token: Random.guid(),
  };
  return {
    data: list,
  };
  });

  ```
- 在任意 vue页面中调用 获取mock数据
  ```js
  <script>
    // 引入 axios
  import axios from "axios";
  export default {
    name: "HelloWorld",
    data() {
      return {
        data: [],
      };
    },
    mounted() {
      axios
        .get("/api/data")
        .then((res) => {
          this.data = res.data.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  };
  </script>
  ```
## 
- Mock.mock( rurl? , rtype? , template|function( options )  )
  - Mock.mock( 拦截的请求地址 ?, 请求类型? , 返回的数据模板两种类型)
- Mock.Random 是一个工具类，用于生成各种随机数据