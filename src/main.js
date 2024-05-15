import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import '@/plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'  //还会保留标签字体样式
import *  as API from  '@/API'
// 引入全局组件
import '@/utils/use'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
beforeCreate(){
  Vue.prototype.$bus = this
  Vue.prototype.$API = API
},
  router,
  store,

}).$mount('#app')
