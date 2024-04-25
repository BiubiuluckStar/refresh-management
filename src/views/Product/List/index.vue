<template>
  <div>
    <div>
      <!-- 面包导航屑 -->
      <!-- 产品搜索 -->
      <div class="header">
        <div class="form">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input size="small"
                v-model="formInline.ProductName"
                placeholder="审批人"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-date-picker size="small" v-model="formInline.date" type="date" placeholder="选择日期">
          </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small"  @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="group">
          <el-button class="buttonOne" type= "warning" icon="el-icon-plus">警告按钮</el-button>
          <el-button class="buttonTwo" type="danger" icon="el-icon-delete" >危险按钮</el-button>
        </div>
      </div>
      <!-- 产品列表 -->
      <div class="content" >
        <el-table :data="tableData" border  header-row-class-name="active-header" 
        style="width: 100%" :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column  prop="id"  label="商品编号"  width="100"></el-table-column>
      <el-table-column  prop="title" label="商品名称" width="130"></el-table-column>
      <el-table-column  prop="price" label="商品价格" width="130"></el-table-column>
      <el-table-column  prop="category" label="商品类目" width="130"></el-table-column>
      <el-table-column  prop= "create_time" label="添加时间" width="150">
        <template slot-scope="scope">
          <span>{{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="sellPoint" label="商品卖点" width="130" show-overflow-tooltip></el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ removeHTMLTag(scope.row.descs) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" class="el-icon-edit"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button  icon="el-icon-delete"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
          </el-table>
      </div>
       <div class="pagination">
        <pagination />
       </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs';
import {removeHTMLTag} from '@/utils'
export default {
  name: "List",
  mounted(){
    this.getData()
    this.$bus.$on('receiveCurrentPage',this.currentPage)
  },
  computed:{
    ...mapState('product',['productList'])
  },
  data() {
    return {
      formInline: {
        ProductName: "",
        date: "",
      },
      tableData: JSON.parse(sessionStorage.getItem('productList'))
    };
  },
  methods: {
    dayjs,
    removeHTMLTag,
    onSubmit() {
      console.log("submit!");
    },
    handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      async getData(page){
      try {
        await this.$store.dispatch('product/getProductList',page)
        sessionStorage.setItem('productList',JSON.stringify(this.productList))
      } catch (error) {
        console.warn(error);
      }
      },
      currentPage(val){
       this.getData(val)
      }
  },
};
</script>

<style lang="less",scoped>
.header {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px;
  .group {
    border: 1px solid #eee;
    padding: 8px;
    el-button .buttonOne {
      background-color: #efa337;
    }
    el-button .buttonOne {
      background-color: #ff7a6a;
    }
  }
  .el-form-item {
    margin-bottom: 10p;
  }
}
.content {
  background-color: #fff;
  .active-header{
    color:black ;
  }
}
.pagination{
    padding:10px
  }
</style>