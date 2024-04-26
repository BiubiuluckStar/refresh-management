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
