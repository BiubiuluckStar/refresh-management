## 配置环境
1. "serve": "vue-cli-service serve --open", 自动打开页面
2. 给src配置别名
     "paths": {
      "@/*": [
        "src/*"
      ]
    },
3. 关闭语法检查
  lintOnSave:false
## 安装依赖
1. npm i element-ui -S   npm install babel-plugin-component -D
2. npm i vue-router@3
3. npm i vuex@3
4. npm i axios -S
5. npm i querystring -S
5. npm i normalize.css -S
6. npm i echarts -S

## 配置路由
1. layout布局界面
Element组件配合router路由，el-menu标签中直接设置router与default-active="/"，el-submenu 标签和el-menu-item 标签中设置好唯一标识index，index和path匹配
就不用再使用router-link标签了，页面跳转渲染组件用router-view标签
2. 登录界面

## 后台部分
nodejs +mysql +Express
下载后台依赖
1. npm i express mysql -S
2. npm i mockjs multer -S
3. npm i nprogress
4. npm install echarts --save

## 时间格式处理
使用 day.js
1.安装 npm i dayjs -S
2.使用 
## 遇到难点
刷新页面后echart图标数据会丢失，利用会话存储方式来解决
刚加载数据不返回刷新后数据返回，在获得数据之后初始化echarts图表实例

### 请求携带参数为对象格式
请求需要参数,参数格式为 params:{search:''},发请求时要用对象格式,使用store联系actions后的参数也要写成对象格式,其余正常

### 删除商品的时候,如果当前是最后一页的最后一条数据,应该获取当前页的上一页数据
计算当前商品是不是这一页的最后一条数据,利用total与pagsize取余判断==1
如果是则跳转上一页