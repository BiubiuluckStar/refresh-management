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

## 
vuex对于编辑页面的持久化存储
## 
商品编辑与添加携带不同的参数向mutations发请求，改变数值，然后在页面挂载的时候通过title判断是添加还是修改，若是修改将仓库中的值赋给data中的变量，然后进行图片回显，遍历图片回显，接着进行富文本编译器回显
商品保存功能，通过标题判断是添加还是修改，向服务器传递不同的参数
## 
不足：当编辑商品的时候将商品删除之后，还是存在，编辑之后进行添加操作，富文本编译器中的内容还是一直存在
导出excel表编号过长在excel表中显示的问题(已解决)

## 导出excel 
1. 安装模块
   npm install vue-json-excel -S 

2. 配置使用
   ```js 
      import JsonExcel from 'vue-json-excel'
      Vue.component('downloadExcel', JsonExcel)
   ```
3. 使用
   ```vue
       <download-excel 
         style="display:inline-block;margin-left:10px;"
         :data="DetailsForm" 
         :fields="json_fields" 
         :header="title"
         :name="title">
          <el-button class="order-btn" type="warning" size="small" @click="download">导出</el-button>
        </download-excel>
   ```
   ## 面包屑
   element ui 组件库
   ## PDF 
   vue-pdf插件
   ## 国际化
   1.vue-i18n 国际化
   1.安装 npm install vue-i18n@9
   2.使用
   
   2.element-ui 库国际化

   ## 登录
   1.用户输入账号密码----加密操作
   2.请求后台接口
   3.接口返回数据{token:'大概30字符左右'，username:''}
   请求拦截器配置封装token
   4.某些接口里面，发送token标识，查看当前用户是否登录，有效范围内
   基本功能已经实现了，二次开发，实现距离的页面
   ## 用户路由权限
   1. 根据用户身份不同，登录进入界面后，看到的不同的路由界面
   2. 功能：
    1. 登录信息，查看身份 
      超级管理员 admin
      普通管理员 任意账号
    2. 后台管理系统   
    进入系统之前必须要先登录，才有权限查看系统
    使用导航守卫进行路由拦截 
    3. 登录的数据信息存储vuex，实现组件数据信息的共享
      vuex持久化，退出登录
    4. 配置导航守卫
     1. 配置路由元信息meta字段，标识哪些界面需要登录才可以进入
     2. 导航守卫判断当前是否需要登录，以及校验登录状态，token标识
     2. 登录成功后需要获取动态导航目录----用户权限，身份不同导航界面也不同  
        1. 获取动态导航目录，存储到哪里 ---vuex ,只有登录成功才去请求后端动态导航接口，放在路由导航守卫里面
        2. 创建vuex文件，定义空的菜单导航容器，定义获取导航和清空导航的方法
        3. 拆分前端定义好的完整的菜单导航 --- 不显示前端导航，先请求后台，要显示哪些导航
        4. 渲染匹配好的导航菜单

      ## lodash 深拷贝
      使用 cloneDeep
      ## 给路由规则追加路由
      router.addRoute
      添加一条新的路由规则，如果该路由有name，并且已经存在一个与之相同的名字，则会覆盖他
      

    

