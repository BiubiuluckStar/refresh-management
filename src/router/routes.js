import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
// 基础路径首页
export const baseRouter =  [ {
  path: '/',
  component: Layout,
  meta:{title:'首页',
  isLogin:true , // 是否需要登录
  },
  children: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      },
    },
    // 首页下的菜单导航内容 ----- 通过动态请求获取添加
  ],
}]
export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },

]

