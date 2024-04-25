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
    console.log(this.total);
  },
  computed:{
  ...mapState('product',['productList']),
  // 总条数
  total(){
   return this.productList.length
  },
  // 每页多少条
  pageSize(){
    return this.productList.pageSize
  },

  },
  methods: {
      handleCurrentChange(val) {
        this.$bus.$emit('receiveCurrentPage',val)
      }
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