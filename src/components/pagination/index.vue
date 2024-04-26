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
   this.$store.dispatch('product/getProductList')
   this.$bus.$emit('changePagination',this.changePagination)
  },
  computed:{
    ...mapState('product',['productList','searchList']),
    total(){
      return this.productList.total
    },
    pageSize(){
      return this.productList.pageSize
    }
  },
  methods: {
      handleCurrentChange(val) {
        this.$bus.$emit('receiveCurrentPage',val)
      },
    },
    data() {
      return {
        currentPage: 1
      };
    }
}
</script>

<style>

</style>