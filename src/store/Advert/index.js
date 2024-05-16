import  {reqAdvert,reqAddAdvert,reqUpdateAdvert,reqDeleteAdvert,
  reqContentMangeAdvert,reqAddContentAdvert,reqDeleteContentAdvert
} from '@/API'
const actions = {
  // 获取广告列表
  async getAdvert({commit},params){
    let result = await reqAdvert(params)
    if(result.status == 200){
      commit('GetAdvert',result.result)
    }
  },
  // 增加广告子导航
  async getAddAdvert({commit},params){
   let result = await reqAddAdvert(params)
   if(result.status == 200){
    return 'ok'
   }
   else{
    return Promise.reject(Error('faile'))
   }
  },
  // 修改子导航
  async getUpdateAdvert({commit},params){
   let result = await reqUpdateAdvert(params)
   if(result.status == 200){
    return 'ok'
   }
   else{
    return Promise.reject(Error('faile'))
   }
  },
  // 删除
 async getDeleteAdvert({commit},params){
  let result = await reqDeleteAdvert(params)
  console.log(result);
  if(result.status == 200){
    return 'ok'
   }
   else{
    return Promise.reject(Error('faile'))
   }
 },
//  广告内容获取
async getContentMangeAdvert({commit},params){
  let result = await reqContentMangeAdvert(params)
  console.log(result);
  if(result.status == 200){
    commit('GetContentMangeAdvert',result.result)
    return 'ok'
  }
  else{
  return Promise.reject(Error('faile'))
  }
},
// 添加广告内容
async getAddContentAdvert({commit},params){
let result = await reqAddContentAdvert(params)
 if(result.status == 200){
  return 'ok'
 }
 else{
  return Promise.reject(Error('faile'))
 }
},
// 删除内容
async getDeleteContentAdvert({commit},params){
let result =await reqDeleteContentAdvert(params)
if(result.status == 200){
  return 'ok'
}
else{
  return Promise.reject(Error('faile'))
}
}
}
const mutations = {
  GetAdvert(state,val){
    state.advertList = val
  },
  GetContentMangeAdvert(state,val){
    state.advertContentList = val
  }
}
const getters = {}
const state = {
  advertList:[],
  advertContentList:[]
}

export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
