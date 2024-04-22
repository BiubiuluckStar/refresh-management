// 配置路由的地方

import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

import routes from './routes';
// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push与replace方法
// 第一个参数，告诉原来的push方法，往哪里跳（传递哪些参数）
// 第二个参数成功的回调
// 第三个参数失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
 if(resolve&&reject){
  // call||apply区别
  // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
  // 不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
  originPush.call(this,location,resolve,reject)
 }
 else{
  originPush.call(this,location,()=>{},()=>{})
 }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve&&reject){
    originReplace.replace(this,location,resolve,reject)
  }
  else{
    originReplace.replace(this,location,()=>{},()=>{})
  }
 }
export default new VueRouter({
  // 配置路由规则
  routes,
  scrollBehavior(to,from,savePosition){
    return {x:0,y:0}
  }
})