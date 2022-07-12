# 微信小程序
## 简介

## 基础文件配置
- app.js 小程序逻辑 主入口文件 
- app.wxss 样式文件 在最外层的为全局样式
- .wxml	页面结构
- app.json 对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等
  - demo
    ```json
    {
      "pages": [ //文件路径  
        "pages/index/index",
        "pages/logs/logs"
      ],
      "window": {
        "navigationBarBackgroundColor": "#008c8c", //顶部 背景颜色  只能使用 16进制的颜色
        "navigationBarTextStyle": "white",    //顶部 文字颜色  只能选择 white 或 black 黑白色
        "navigationBarTitleText": "he_tui"    //顶部 当前页面标题
      },
    }
    ```
- project.config.json 项目配置文件
- sitemap.json 配置其小程序页面是否允许微信索引 （进行爬取）

## 事件
- 普通事件绑定
  - bindtap='事件处理函数名' 事件为冒泡事件
  - catchtap='事件处理函数名' 会阻止事件向上冒泡

## 路由
- 以 Promise 风格 调用：支持
  - success 接口调用成功的回调函数
  - fail 接口调用失败的回调函数
  - complete 接口调用结束的回调函数（调用成功、失败都会执行）
- wx.switchTab ({url:'***'}) 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面  （tabBar 页面 表示nav中的页面）
  - url 必填
- wx.reLaunch () 关闭所有页面，打开到应用内的某个页面   **没有返回上一页只有回到主页的按钮**
  - url 必填
  - 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 `path?key=value&key2=value2`
- wx.redirectTo () 关闭当前页面，跳转到应用内的某个页面。**但是不允许跳转到 tabbar 页面** **没有返回上一页只有回到主页的按钮**
  - url 必填
  - 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 `path?key=value&key2=value2`
- wx.navigateTo () 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面 **有返回上一页的按钮**
  - url 必填  
  - events  页面间通信接口，用于监听被打开页面发送到当前页面的数据。基础库 2.7.3 开始支持
- wx.navigateBack(Object object) 关闭当前页面，返回上一页面或多级页面 （不是填url）
  - delta 默认为1  **返回的页面数，如果 delta 大于现有页面数，则返回到首页。**
- **小程序中页面栈最多十层**
# 