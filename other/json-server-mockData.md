# json-server 模拟数据 😉

## 安装 json-server
- 前置条件 安装 nodeJS、npm
1. 随意创建文件下 进行初始化包管理 `npm init -y`   （**千万别给文件夹取json-server 真的会谢😳**）
2. 下载包 当前文件中安装：`npm install json-server`  或全局安装：`npm install -g json-server`
3. 自动生成文件和数据  `npm json-server --watch db.json`  会生成一个db.json 的文件 （可以自定义文件名）
4. 该句话既是创建也是运行 控制台会输出默认访问的路径  简单的搭建就此结束
   - http://localhost:3000/posts
   - http://localhost:3000/comments
   - http://localhost:3000/profile


## 简单配置
- json-server 默认是 3000 端口，我们也可以自己指定端口
  - 修改端口号 `json-server --watch db.json --port 3004` (在创建运行时就进行修改)
- 启动服务和创建文件命令过于长 可以将其放入 package.json 中
```json
{
    "scripts": {
        "mock": "json-server db.json --port 3004"
    }
}
```
- 启动时只需要输入 `npm run mock` 即可

## db.json 中的结构
- `/db`就是整个的db.json数据包，`/posts` `/comment` `/profile` 分别是db.json里面的子对象
- 进行添加数据 也是可以依葫芦画瓢 如定义的person  定义完毕后 就会多出一个数据接口 `/person`
- json-server把db.json 根节点的每一个key，当作了一个router 我们可以根据这个规则来编写测试数据
```json
{
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  },
  "person": [
    {
      "id": 1,
      "name": "张三",
    },
    {
      "id": 2,
      "name": "李四",
    }
  ],
}
```
## json-server 的相关启动参数
