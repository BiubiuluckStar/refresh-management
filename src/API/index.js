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

// 添加商品 params = {}
export const reqAddProduct = (params)=>requests.get('/goods/item/insertTbItem',{params})


// 导出图片上传的地址
export const reqUploadImage = './api/upload/'
//公共接口
export const host = ' http://localhost:7080'



