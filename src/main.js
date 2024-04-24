import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'  //还会保留标签字体样式
import '@/assets/css/base.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
beforeCreate(){
  Vue.prototype.$bus = this
},
  router,
  store,

}).$mount('#app')