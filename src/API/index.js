// 公共的请求方法
import requests from "@/API/request"

// 销量
export const reqTotalInfo=()=> requests.get('/home/dataCount')

// 今日订单 
export const reqOrderinfo=()=> requests.get('/home/orderinfo')

// 折线图,柱状图
export const reqFormatInfo=()=>requests.get('/home/format')
