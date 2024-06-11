import {reqLogin} from '@/API'
const actions = {
  async reqLogin({commit},params){
  let result = await reqLogin(params)
  console.log('login',result);
  if(result.status == 200){
    commit('getToken',result.token)
    return 'ok'
  }
  else {
    return Promise.reject(Error('faile'))
  }
  }
}
const mutations = {
  getToken(state,val){
state.token = val
sessionStorage.setItem('token',JSON.stringify(val))
  },
// 登录设置信息
setUser(state,val){
state.userInfo = val
sessionStorage.setItem('username',JSON.stringify(val))
},
// 退出清空数据
removeUser(state,val){
 state.username = ''
 state.token = ''
 sessionStorage.removeItem('token')
 sessionStorage.removeItem('username')
}
}
const getters = {}
const state = {
  username: JSON.parse(sessionStorage.getItem('username')) || '',
  token:JSON.parse(sessionStorage.getItem('token')) || ''
}
export default {
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
