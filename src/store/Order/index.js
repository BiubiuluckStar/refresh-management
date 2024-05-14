import {reqOrderList,reqCollectList,reqOrderMaraize,reqCollectCancel} from '@/API'

const actions={
  // 获取订单列表
  async getOrderList({commit},{page}){
    // console.log('index',page);
    let result = await reqOrderList({page})
    console.log(result);
    if(result.status == 200){
      commit('GetOrderList',result)
      return 'ok'
    }
    else{
      return Promise.reject(Error('faile'))
    }
  },
  // 获取汇总清单
async getCollectList({commit},{page}){
  let result = await reqCollectList({page})
  console.log(result);
  if(result.status == 200){
    commit('GetCollectList',result)
    return 'ok'
  }
  else{
    return Promise.reject(Error('faile'))
  }
},
// 汇总
 async getOrderMaraize({commit},ids){
  // console.log(ids);
 let result = await reqOrderMaraize(ids)
 if(result.status == 200){
  return 'ok'
 }
 else{
  return Promise.reject(Error('faile'))
 }
},
async getCollectCancel({commit},id){
 let result = await reqCollectCancel(id)
 console.log(result);
 if(result.status == 200){
  return 'ok'
 }
 else{
  return Promise.reject(Error('faile'))
 }
}
}
const mutations={
  GetOrderList(state,val){
  state.orderList = val
  },
  GetCollectList(state,val){
    state.collectList = val
  }
}
const getters={
}
const state={
  orderList:[],
  collectList:[]
}
export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
