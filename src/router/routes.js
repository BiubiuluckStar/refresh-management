import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
export default [
  {
    path:'/',
    component:Layout,
    children:[
      {
        path:'/',
        name:'home',
        component:Home
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]
