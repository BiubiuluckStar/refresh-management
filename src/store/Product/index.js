
import { reqProjectList, reqSearchList,deleteProduct,reqAddProduct,reqDeleteCheckedAll,reqUpdatedProduct } from '@/API'
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
  },

  // 添加商品
  async getAddProduct({commit},params){
    let result =await  reqAddProduct(params)
    if( result.status == 200) {
      return 'ok' 
    }
    else{
      return Promise.reject(Error('faile'))
    }
  },
  async getDeleProduct({commit},params){
    let result = await reqDeleteCheckedAll(params)
    if(result.status == 200){
      return 'ok'
    }
    else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改商品
  async getUpdatedProduct({commit},params){
    let result = await reqUpdatedProduct(params)
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
  },
  // 编辑
  changeEditorData(state,val){
    state.rowData =val
  sessionStorage.setItem("rowData", JSON.stringify(val))
  },
  // 改变标题名
  changeTitle(state,val){
  state.title = val
  sessionStorage.setItem("title", JSON.stringify(val))
  },
  // 
}
const getters = {}
const state = {
  productList: [],
  searchList: [],
  rowData:JSON.parse(sessionStorage.getItem("rowData")) || {}  ,//编辑当前行的数据
  title:JSON.parse(sessionStorage.getItem("title")) 
}
export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
