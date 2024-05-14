<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  mounted(){
    if(this.$route.path =='/product/list'){
      this.$store.dispatch('product/getProductList')
    }
    if(this.$route.path =='/order/orderList'){
      this.$store.dispatch('order/getOrderList',1)
    }
    if(this.$route.path =='/order/summaryList'){
      return this.$store.dispatch('order/getCollectList',1)
    }
  },
  computed:{
    ...mapState('product',['productList']),
    total(){
      if(this.$route.path =='/product/list'){
        return this.productList.total
      }
      if(this.$route.path =='/order/orderList'){
      return this.$store.state.order.orderList.total
      }
      if(this.$route.path =='/order/summaryList'){
      return this.$store.state.order.collectList.total
    }
    },
    pageSize(){
      if(this.$route.path =='/product/list'){
        return this.productList.pageSize
      }
      if(this.$route.path =='/order/orderList'){
      return this.$store.state.order.orderList.pageSize
      }
      if(this.$route.path =='/order/summaryList'){
      return this.$store.state.order.collectList.pageSize
      }
    }
  },
  methods: {
      handleCurrentChange(val) {
        this.$bus.$emit('receiveCurrentPage',val)
      }
    },
    data() {
      return {
        currentPage: 1,
      };
    }
}
</script>
<style>
</style> 