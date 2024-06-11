// 路由懒加载
export default  [
  // 产品
  {
  path: '/product', //产品管理
  component:()=> import ('@/views/Product'),
  meta: { title: '产品管理' },
  redirect:'/product/list',
  children: [
    {
      name: 'list',
      path: '/product/list',
      component:()=> import ('@/views/Product/List'),
      meta: { title: '产品列表' },
    },
    {
      name: 'category',
      path: '/product/category',
      component: ()=> import ('@/views/Product/Category'),
      meta: { title: '产品分类' },
    },
    {
      name: 'aboutProduct', //商品添加与编辑与查看
      path: '/product/aboutProduct',
      component:  ()=> import ('@/views/Product/List/AboutProduct'),
      meta: {
        //配置高亮标识
        activeMenu: '/product/list',
        title: '添加商品'
      }
    }
  ]
},
// 订单
{
  name:'order',
  path: 'order',
  component:()=> import('@/views/Order'),
  meta: { title: '订单管理' },
  redirect:'/order/orderList',
  children: [
    {
      name: 'orderList',
      path: '/order/orderList',
      component: ()=> import('@/views/Order/OrderList'),
      meta: { title: '订单管理' },
      meta: { title: '订单列表' },
    },
    {
      name: 'OrderAgreement',
      path: '/order/OrderAgreement',
      component: ()=> import('@/views/Order/OrderAgreement'),
      meta: { title: '订单审核' },
    },
    {
      name: 'summaryList',
      path: '/order/summaryList',
      component: ()=> import('@/views/Order/SummaryList'),
      meta: { title: '汇总清单' },
    },
  ]
},
// 广告
{
  name: 'advertisement',
  path: 'advertisement',
  component: ()=> import('@/views/Advertisement'),
  meta:{title:'广告分类'},
  children: [
    {
      name: 'adverList',
      path: '/advertisement/adverList',
      component: ()=> import('@/views/Advertisement/AdverList'),
      meta: { title: '广告列表' },
    }
  ]
},
// 系统
{
  name: 'systemManage',
  path: 'systemManage',
  component: ()=> import('@/views/SystemManage'),
  meta:{title:'系统管理'},
  children: [
    {
      name: 'department',
      path: '/systemManage/department',
      component: ()=> import('@/views/SystemManage/department'),
      meta: { title: '部门管理' },
    },
    {
      name: 'role',
      path: '/systemManage/role',
      component: ()=> import('@/views/SystemManage/role'),
      meta: { title: '角色管理' },
    }
  ]
}
]