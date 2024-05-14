// 公共的请求方法
import requests from "@/API/request"

// 销量
export const reqTotalInfo=()=> requests.get('/home/dataCount')

// 今日订单 
export const reqOrderinfo=()=> requests.get('/home/orderinfo')

// 折线图,柱状图
export const reqFormatInfo=()=>requests.get('/home/format')

// 商品列表
export const reqProjectList=(params)=> requests.get('/goods/projectList', { params });

// 商品查询 
export const reqSearchList=(params)=> requests.get('/goods/search', { params });

// 商品单个删除
export const deleteProduct = (params)=>requests.get('/goods/deleteItemById',{params})

// 商品类目 params:{type:cid}
export const reqProductCategory = (params)=>requests.get('/goods/itemCategory/selectItemCategoryByParentId',{params})

// 添加商品 params：{}
export const reqAddProduct = (params)=>requests.get('/goods/item/insertTbItem',{params})

// 批量删除{ids:字符串}
export const reqDeleteCheckedAll = (params)=>requests.get('/goods/batchDelete',{params})

// 修改商品 id, title cid  category sellPoint price num descs paramsInfo image
export const reqUpdatedProduct = (params)=>requests.get('/goods/item/updateTbItem',{params})

// 产品一级分类
export const reqOneCategory = ()=>requests.get('/itemCategory')

// 新增一级分类名称 /itemCategory/insertCategory name
export const reqAddCategory = (params)=>requests.get('/itemCategory/insertCategory',{params})

// 新增子类分类名称 /itemCategory/insertItemCategory cid name
export const reqAddChildrenCategory = (params)=>requests.get('/itemCategory/insertItemCategory',{params})

// 修改操作 /itemCategory/updateCategory id name
export const reqUpdateCategory = (params)=>requests.get('/itemCategory/updateCategory',{params})

//删除操作 /content/deleteContentCategoryById  id
export const reqDeleteCategory = (params)=>requests.get('/content/deleteContentCategoryById',{params})

// 获取订单列表数据  page
export const reqOrderList = (params)=>requests.get('/order/list',{params})

//汇总清单  page
export const reqCollectList = (params)=>requests.get('/order/collect',{params})

// 订单汇总 ids 字符串
export const reqOrderMaraize = (params)=>requests.get('/order/changeStatus',{params})

// 撤销汇总/cancel id
export const reqCollectCancel = (params)=>requests.get('/order/cancel',{params})

// 导出图片上传的地址
export const reqUploadImage = './api/upload/'
//公共接口
export const host = ' http://localhost:7080'



