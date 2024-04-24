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

## 遇到难点一
刷新页面后echart图标数据会丢失，利用会话存储方式来解决