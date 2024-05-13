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
      this.$store.dispatch('order/getOrderList')
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
    },
    pageSize(){
      if(this.$route.path =='/product/list'){
        return this.productList.pageSize
      }
      if(this.$route.path =='/order/orderList'){
      return this.$store.state.order.orderList.pageSize
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