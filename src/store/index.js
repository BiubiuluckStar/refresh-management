import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './Home'
import product from './Product'
export default new Vuex.Store({
  modules:{
    home,
    product
  }
})