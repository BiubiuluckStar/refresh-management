import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Product from '@/views/Product'
import List from '@/views/Product/List'
import Category from '@/views/Product/Category'
import Order from '@/views/Order'
import OrderList from '@/views/Order/OrderList'
import OrderReview from '@/views/Order/OrderReview'
import SummaryList from '@/views/Order/SummaryList'
import Advertisement from '@/views/Advertisement'
import AdverList from '@/views/Advertisement/AdverList'
import AboutProduct from '@/views/Product/List/AboutProduct'

export default [
  {
    path:'/',
    component:Layout,
    children:[
      {
        path:'/',
        name:'home',
        component:Home
      },
      {
        path:'/product',
        component:Product,
        children:[
          {
        name:'list',
        path:'list',
        component:List,
          },
          {
        name:'category',
        path:'category',
        component:Category
          },
          {
            name:'aboutProduct',
            path:'aboutProduct',
            component:AboutProduct,
          }
        ]
      },
      {
        path:'order',
        component:Order,
        children:[
          {
            path:'orderList',
            component:OrderList,
          },
          {
            path:'orderReview',
            component:OrderReview,
          },
          {
            path:'summaryList',
            component:SummaryList,
          },
        ]
      },
      {
        path:'advertisement',
        component:Advertisement,
        children:[
          {
            path:'adverList',
            component:AdverList,
          }
        ]
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  
]
