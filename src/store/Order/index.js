import {reqOrderList,reqCollectList,reqOrderMaraize,reqCollectCancel,reqOrderDetail} from '@/API'

const actions={
  // 获取订单列表
  async getOrderList({commit},{page}){
    let result = await reqOrderList({page})
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
// 取消汇总
async getCollectCancel({commit},id){
 let result = await reqCollectCancel(id)
 console.log(result);
 if(result.status == 200){
  return 'ok'
 }
 else{
  return Promise.reject(Error('faile'))
 }
},
// 订单详情
 async getOrderDetail({commit},params){
  let result = await reqOrderDetail(params)
  if(result.status == 200){
    commit('GetOrderDetail',result.result)
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
  },
  GetOrderDetail(state,val){
    state.orderdesc = val
  },
}
const getters={
}
const state={
  orderList:[],
  collectList:[],
  orderdesc:{}
}
export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
