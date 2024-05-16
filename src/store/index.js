import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './Home'
import product from './Product'
import category from './Category'
import order from './Order'
import advert from './Advert'

export default new Vuex.Store({
  modules:{
    home,
    product,
    category,
    order,
    advert
  }
})