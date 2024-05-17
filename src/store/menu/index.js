import {reqLoginPermission} from '@/API'
// 导入前端定义好的完整的路由信息
import menuRouter from '@/router/menuRouter';
// 导入路由和基本路由信息
import routes,{ baseRouter } from '@/router/routes';

const actions = {
// 定义请求动态路由信息导航
async getLoginPermission({commit,rootState}){
 let result = await reqLoginPermission({token:rootState.login.token })
 console.log(result);
 console.log('导航内容',menuRouter);
}
}
const mutations = {
// 设置菜单导航
setMenuList(state,val){
  state.dyMenuList = val
},
// 清空菜单导航
removeMenuList(state){
  state.dyMenuList = ''
}
}
const getters = {

}
const state = {
  // 定义动态导航容器 --- 存储动态导航
  dyMenuList:[]
}
export default {
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
