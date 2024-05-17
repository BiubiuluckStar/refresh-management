import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// element ui 样式
import '@/plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'  //还会保留标签字体样式
import *  as API from  '@/API'
// 引入路由权限文件

// 引入全局组件
import '@/utils/use'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // 全局事件总线
 beforeCreate(){
   Vue.prototype.$bus = this
   Vue.prototype.$API = API
},
  router,
  store,

}).$mount('#app')
