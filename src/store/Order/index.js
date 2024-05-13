import {reqOrderList} from '@/API'

const actions={
  // 获取订单列表
  async getOrderList({commit},page){
    console.log('index',page);
    let result = await reqOrderList(page)
    console.log(result);
    if(result.status == 200){
      commit('GetOrderList',result)
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
  }
}
const getters={
}
const state={
  orderList:[]
}
export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
