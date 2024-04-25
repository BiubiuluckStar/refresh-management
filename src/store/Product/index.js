 import {reqProjectList} from '@/API'
const actions = {
  async getProductList({commit},page){
  let result = await reqProjectList(page)
  console.log(result);
  if(result.status == 200){
    commit('GetProductList',result.data)
  }
  }
}
const mutations = {
  GetProductList(state,val){
  state.productList = val
  }
}
const getters = {}
const state = {
  productList:[]
}
export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
