import {reqLoginPermission} from '@/API'
// 导入前端定义好的完整的路由信息
import menuRouter from '@/router/menuRouter';
// 导入路由和基本路由信息
import routes,{ baseRouter } from '@/router/routes';
import {rulesMenu} from '@/utils/index'

const actions = {
// 定义请求动态路由信息导航
async getLoginPermission({commit,rootState}){
 let result = await reqLoginPermission({token:rootState.login.token })
 console.log(result);
 console.log('导航内容',menuRouter);
//处理前后端的菜单导航数组，根据后端返回的导航标识，匹配对应的真实的路由导航菜单导航
// 定义一个方法，处理数组---返回匹配好的菜单导航
let MyMenu =  rulesMenu(menuRouter,result.data)
// baseRouter.children.push(MyMenu)
console.log('base',MyMenu);

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
