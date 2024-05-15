import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// 引入全局组件pagination
import pagination from '@/components/pagination'
import '@/plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'  //还会保留标签字体样式
import *  as API from  '@/API'
import JsonExcel from 'vue-json-excel'
Vue.config.productionTip = false
// 注册
Vue.component('pagination',pagination)
Vue.component('downloadExcel', JsonExcel)


new Vue({
  render: h => h(App),
beforeCreate(){
  Vue.prototype.$bus = this
  Vue.prototype.$API = API
},
  router,
  store,

}).$mount('#app')
