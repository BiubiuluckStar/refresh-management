<template>
  <div>
    <div>
      <!-- 面包导航屑 -->
      <!-- 产品搜索 -->
      <div class="header">
        <div class="form">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="产品名称">
              <el-input
                size="small"
                v-model="formInline.ProductName"
                @blur="blur"
                placeholder="产品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="添加时间">
              <el-date-picker
                size="small"
                v-model="formInline.date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="group">
          <el-button class="buttonOne" type="warning" icon="el-icon-plus"
            @click="aboutProduct">添加商品</el-button
          >
          <el-button class="buttonTwo" type="danger" icon="el-icon-delete"
            >批量删除</el-button
          >
        </div>
      </div>
      <!-- 产品列表 -->
      <div class="content">
        <el-table
          :data="tableData"
          border
          header-row-class-name="active-header"
          style="width: 100%"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="id"
            label="商品编号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="商品名称"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="商品价格"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="category"
            label="商品类目"
            width="130"
          ></el-table-column>
          <el-table-column prop="create_time" label="添加时间" width="150">
            <template slot-scope="scope">
              <span>{{
                dayjs(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sellPoint"
            label="商品卖点"
            width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ removeHTMLTag(scope.row.descs) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                class="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="handleDelete( scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <pagination></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dayjs from "dayjs";
import { removeHTMLTag } from "@/utils";
export default {
  name: "List",
  mounted() {
    this.getData(1);
    this.$bus.$on("receiveCurrentPage", this.getPagination);
  },
  computed: {
    ...mapState("product", ["productList", "searchList"]),
  },
  data() {
    return {
      formInline: {
        ProductName: "",
        date: "",
      },
      tableData: [],
      currentPage: 1,
      params: { search: "" },
    };
  },
  methods: {
    dayjs,
    removeHTMLTag,
    onSubmit() {
      this.search(this.formInline.ProductName);
    },
    handleEdit(index, row) {
      console.log(index, row);
      console.log(this.productList.total % this.productList.pageSize);
    },
    handleDelete( row) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.deleteProduct(row)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 产品列表
    async getData(page) {
      try {
        await this.$store.dispatch("product/getProductList", { page });
        sessionStorage.setItem(
          "productList",
          JSON.stringify(this.productList.data)
        );
        this.tableData = JSON.parse(sessionStorage.getItem("productList"));
      } catch (error) {
        console.warn(error);
      }
    },
    getPagination(page) {
      this.currentPage = page;
      this.getData(page);
    },
    blur() {
      if (!this.formInline.ProductName) {
        this.getData(1);
      }
    },
    // 搜索
    async search() {
      try {
        await this.$store.dispatch("product/getSearchList", {
          search: this.formInline.ProductName,
        });
        sessionStorage.setItem("searchList", JSON.stringify(this.searchList));
        this.tableData = JSON.parse(sessionStorage.getItem("searchList"));
      } catch (error) {
        this.tableData = [];
      }
    },
    // 删除单个商品
    async deleteProduct(row){
      try {
      await this.$store.dispatch('product/getDelProduct',{id:row.id})
      if(this.productList.total % this.productList.pageSize ){
        this.currentPage =this.currentPage - 1 > 0 ? this.currentPage :1
        this.getData(this.currentPage)
      }
      this.getData(this.currentPage)
      } catch (error) {
        console.warn(error);
      }
    },
    // 修改/新增商品
    aboutProduct(){
      this.$router.push('/product/aboutProduct')
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
  .active-header {
    color: black;
  }
}
.pagination {
  padding: 10px;
}
</style>