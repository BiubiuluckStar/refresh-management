<template>
  <div class="orderdesc">
      <!-- <Breadcrumb></Breadcrumb> -->
      <!-- 2. 列表展示 -->
      <div class='header'>
          <el-row :gutter="20">
              <el-col :span="14">
                  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                      <el-form-item label="订单编号" label-width="100px">
                          <el-input v-model="formInline.user" placeholder="输入品牌名称"></el-input>
                      </el-form-item>
                      <el-form-item label="预定时间" label-width="100px">
                          <el-col :span="11">
                              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                                  style="width: 100%;"></el-date-picker>
                          </el-col>
                          <el-col class="line" :span="2">至</el-col>
                          <el-col :span="11">
                              <el-time-picker placeholder="选择时间" v-model="formInline.date2"
                                  style="width: 100%;"></el-time-picker>
                          </el-col>
                      </el-form-item>
                      <el-form-item label="下单人" label-width="100px">
                          <el-input v-model="formInline.user" placeholder="输入"></el-input>
                      </el-form-item>
                      <el-form-item label="所属单位" label-width="100px">
                          <el-input v-model="formInline.user" placeholder="输入"></el-input>
                      </el-form-item>
                      <el-form-item label="汇总状态" label-width="100px">
                          <el-select v-model="formInline.region" placeholder="全部">
                              <el-option label="全部" value="shanghai"></el-option>
                              <el-option label="未汇总" value="shanghai"></el-option>
                              <el-option label="已汇总" value="beijing"></el-option>
                          </el-select>
                      </el-form-item>

                  </el-form>
              </el-col>
              <el-col :span="10">
                  <el-button type="primary">查询</el-button>
              </el-col>
          </el-row>
      </div>

      <!-- 4. 表格展示数据 -->
      <div class="list-content">
          <el-table :data="tableData" border style="width: 100%"
              :header-cell-style="{ background: '#fafafa', color: '#333', textAlgin: 'center' }">
              <el-table-column prop="title" label="产品名称">
              </el-table-column>
              <el-table-column prop="price" label="价格"></el-table-column>
              <el-table-column prop="guige" label="规格"></el-table-column>
              <el-table-column prop="num" label="数量"></el-table-column>
              <el-table-column prop="sum" label="小计（元）"></el-table-column>
          </el-table>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          formInline: {},
          tableData: []
      }
  },
  mounted(){
    this.getOrderDetail()
  },
  computed:{
    orderdesc() {
      return this.$store.state.order.orderdesc;
    },
  },
  methods:{
    async getOrderDetail(){
      await this.$store.dispatch('order/getOrderDetail')
      this.tableData = this.orderdesc.list
    }
  }
}
</script>

<style lang="less" scoped>
.orderdesc {
  padding: 10px;
  margin: 20px;
}

.header {
  margin-top: 20px;

  .el-form--inline .el-form-item {
      margin-right: 20px;
  }
}
</style>