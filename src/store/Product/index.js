import { reqProjectList, reqSearchList,deleteProduct } from '@/API'
const actions = {
  // 商品列表
  async getProductList({ commit }, page) {
    let result = await reqProjectList(page)
    if (result.status == 200) {
      commit('GetProductList', result)
      return 'ok'
    }
  },
  // 商品查询
  async getSearchList({ commit }, params) {
    let result = await reqSearchList(params)
    console.log(result.result);
    if (result.status == 200) {
      commit('getSearchList', result.result)
      return 'ok'
    }
  },
  // 单个商品删除
  async getDelProduct({commit},id){
  let result = await deleteProduct(id)
  console.log(result);
  if(result.status == 200){
    return 'ok'
  }
  else{
    return Promise.reject(Error('faile'))
  }
  }
}
const mutations = {
  GetProductList(state, val) {
    state.productList = val
  },
  getSearchList(state, val) {
    state.searchList = val
  }
}
const getters = {}
const state = {
  productList: [],
  searchList: []
}
export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
