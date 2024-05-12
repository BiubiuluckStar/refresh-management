import {reqOneCategory,reqAddChildrenCategory,reqUpdateCategory,reqDeleteCategory,reqAddCategory} from '@/API'
const actions={
  // 获取一级分类
  async getOneCategory({commit}){
  let data = await reqOneCategory()
  if(data.status == 200){
  commit('GetOneCategory',data.result)
    return 'ok'
  }
  else{
    return Promise.reject(Error('faile'))
  }
  },
  // 新增类别名称
  async getAddChildrenCategory({commit},params){
   let result = await reqAddChildrenCategory(params)
   console.log(result);
   if(result.status == 200){
    return 'ok'
   }else{
    return Promise.reject(Error('faile'))
   }
  },
  // 修改类别名称
  async getUpdateCategory({commist},params){
    let result = await reqUpdateCategory(params)
     if(result.status == 200){
      return 'ok'
     }
     else{
      return Promise.reject(Error('faile'))
     }
  },
  // 删除类别名称
  async getDeleteCategory({commit},params){
   let result = await reqDeleteCategory(params)
   if(result.status == 200){
    return 'ok'
   }
   else{
    return Promise.reject(Error('faile'))
   }
 },
 async getAddCategory({commit},params){
  let result = await reqAddCategory(params)
  console.log(result);
 }
}
const mutations={
   GetOneCategory(state,val){
   state.oneCategory = val
 }
}
const getters={

}
const state={
  oneCategory:[]
}
export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
