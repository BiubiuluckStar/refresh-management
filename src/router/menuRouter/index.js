import Product from '@/views/Product'
import List from '@/views/Product/List'
import Category from '@/views/Product/Category'
import Order from '@/views/Order'
import OrderList from '@/views/Order/OrderList'
import OrderAgreement from '@/views/Order/OrderAgreement'
import SummaryList from '@/views/Order/SummaryList'
import Advertisement from '@/views/Advertisement'
import AdverList from '@/views/Advertisement/AdverList'
import AboutProduct from '@/views/Product/List/AboutProduct'
import SystemManage from '@/views/SystemManage'
import department from '@/views/SystemManage/department'
import role from '@/views/SystemManage/role'
export default  [
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
        title: '添加商品'
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
      path: 'OrderAgreement',
      component: OrderAgreement,
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
  meta:{title:'广告分类'},
  children: [
    {
      path: 'adverList',
      component: AdverList,
      meta: { title: '广告列表' },
    }
  ]
},
{
  path: 'systemManage',
  component: SystemManage,
  meta:{title:'系统管理'},
  children: [
    {
      path: 'department',
      component: department,
      meta: { title: '部门管理' },
    },
    {
      path: 'role',
      component: role,
      meta: { title: '角色管理' },
    }
  ]
}
]