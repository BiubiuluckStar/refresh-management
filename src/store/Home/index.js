import {reqTotalInfo,reqOrderinfo,reqFormatInfo} from '@/API'

const actions = {
  // 销量
 async getHomeTotal({commit}){
    let result = await reqTotalInfo()
    if(result.success == true){
      commit('GetHomeTotal',result.data.list)
    }
  },
  // 订单
  async getorderinfo({commit}){
   let result = await reqOrderinfo()
   if(result.success == true){
    commit('Getorderinfo',result.list)
   }
  },
  // 图形
  async getFormatInfo({commit}){
  let result = await reqFormatInfo()
  if(result.status = true){
    commit('GetFormatInfo',result.result.data.sale_money)
  }
  }
}
const mutations = {
  GetHomeTotal(state,val){
  state.homeInfo =  val
  },
  Getorderinfo(state,val){
    state.orderinfo = val
  },
  GetFormatInfo(state,val){
    state.formatInfo = val
  }
}
const getters = {
  arrx() {
    let arrx = [];
    state.formatInfo.forEach((item) => {
      arrx.push(item.name);
    });
    return arrx
  },
  money() {
    let money = [];
    state.formatInfo.forEach((item) => {
      money.push(item.num);
    });
    return money
  },
  amount() {
    let amount = [];
    state.formatInfo.forEach((item) => {
      amount.push(item.total_amount);
    });
    return amount
  },
   saleMoney(){
    let saleMoney=[];
    state.formatInfo.forEach((item) => {
      let obj = {}
     obj.name = item.name;
     obj.value = item.total_amount
     saleMoney.push(obj)
    });
    return saleMoney
   }
}
const state = {
 homeInfo:{},
 orderinfo:{},
 formatInfo:[]
}
export default {
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}