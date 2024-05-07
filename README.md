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

## el-tree的使用
props	配置选项，	object
load	加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)
show-checkbox	节点是否可被选择	boolean	—	false
lazy:是否为懒加载,层层加载
label	指定节点标签为节点对象的某个属性值	string, function(data, node)	—	—
children	指定子树为节点对象的某个属性值	string	—	—
disabled	指定节点选择框是否禁用为节点对象的某个属性值	boolean, function(data, node)	—	—
isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	boolean, function(data, node)
## 图片回显
## 富文本编译器
1. wangEditor富文本编译器
2. 使用
2.1 安装  npm install @wangeditor/editor --save
npm install @wangeditor/editor-for-vue --save
2.2 模板语法
2.3 js代码
2.4引入css样式
