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
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        },
      },
      {
        path: '/product', //产品管理
        component: Product,
        meta: { title: '产品管理' },
        redirect:'/product/list',
        children: [
          {
            name: 'list',
            path: 'list',
            component: List,
            meta: { title: '产品列表' },
          },
          {
            name: 'category',
            path: 'category',
            component: Category,
            meta: { title: '产品分类' },
          },
          {
            name: 'aboutProduct', //商品添加与编辑与查看
            path: 'aboutProduct',
            component: AboutProduct,
            meta: {
              //配置高亮标识
              activeMenu: '/product/list',
              title: '产品详情'
            }
          }
        ]
      },
      {
        path: 'order',
        component: Order,
        meta: { title: '订单管理' },
        redirect:'/order/orderList',
        children: [
          {
            path: 'orderList',
            component: OrderList,
            meta: { title: '订单列表' },
          },
          {
            path: 'orderReview',
            component: OrderReview,
            meta: { title: '订单审核' },
          },
          {
            path: 'summaryList',
            component: SummaryList,
            meta: { title: '汇总清单' },
          },
        ]
      },
      {
        path: 'advertisement',
        component: Advertisement,
        children: [
          {
            path: 'adverList',
            component: AdverList,
            meta: { title: '广告列表' },
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

]
