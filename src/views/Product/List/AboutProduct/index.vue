<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="nav">
        <div class="title1">产品类型列表</div>
     <TreeProduct />
      </div>
    </el-col>
    <el-col :span="20">
      <div class="wrapper">
        <div class="title2">商品添加</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TreeProduct from '../TreeProduct'
export default {
  name: "AboutProuct",
  components:{
    TreeProduct
  }
};
</script>

<style lang="less" scoped >
.nav {
  height: 600px;
  background-color: #f4f4f4;
  .title1 {
    background-color: skyblue;
    color: #fff;
    padding: 20px;
    border-radius: 20px;
  }
}
.wrapper {
  height: 800px;
  background-color: #f4f4f4;
  .title2 {
    background-color: #fff;
    color: #333;
    font-weight: bold;
    padding: 14px;
  }
}
</style>