import Vue from 'vue'

import pagination from '@/components/pagination'
import breadCrumb from '@/components/breadCrumb'
import JsonExcel from 'vue-json-excel'

// 注册
Vue.component('pagination',pagination)
Vue.component('breadCrumb',breadCrumb)
Vue.component('downloadExcel', JsonExcel)