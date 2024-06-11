<template>
  <div>
    <div>
      <!-- 面包导航屑 -->
      <breadCrumb></breadCrumb>
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
            @click="aboutProduct" size="small">添加商品</el-button
          >
          <el-button class="buttonTwo" type="danger" size="small" icon="el-icon-delete" @click="deleteAll"
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
          @select="selectHandler"
          @select-all="selectHandler"
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
          >
          <template slot-scope="scope">
              <span class="productName" @click="handleLook(scope.$index, scope.row)">{{ scope.row.title}}</span>
            </template>
        </el-table-column>
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
import { mapMutations, mapState } from "vuex";
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
      ids:[], //存储选中的id，
    };
  },
  methods: {
    dayjs,
    removeHTMLTag,
    ...mapMutations('product',['changeEditorData','changeTitle']),
    // 查看商品详情
    handleLook(index,row){
      this.changeEditorData(row)
      this.$router.push({
        name:'aboutProduct'
      })
      this.changeTitle('详情')
    },
    // 点击勾选选择框得到id数组
    selectHandler(selection){
     let arr = []
     selection.forEach(item => {
      arr.push(item.id)
     });
     this.ids = arr
    },
    onSubmit() {
      this.search(this.formInline.ProductName);
    },
    // 编辑
    handleEdit(index, row) {
      // 存储当前行的数据跳转到另一个页面
      this.changeEditorData(row)
      this.changeTitle('编辑')
      // 跳转编辑页面
      this.$router.push({
        name:'aboutProduct'
      })
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
        await this.$store.dispatch("product/getProductList", {page});
        this.tableData = this.productList.data
      } catch (error) {
        console.warn(error);
      }
    },
    // 分页器--当前页
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
        this.tableData = this.searchList
      } catch (error) {
        this.tableData = [];
      }
    },
    // 请求批量删除
    async deleteAllGoods(ids) {
      try {
       await this.$store.dispatch('product/getDeleProduct',{ids})
       this.$message({
          message: '删除成功',
          type: 'success'
        });
        // 重新渲染视图，如果是在最后一页删除的时候，删除的长度与页的长度相同，则回到前面一页，其余不变
      // 获取选中的个数
      let len = this.ids.length
      // 获取当前是否是最后一页,向上取整
      let maxPage = Math.ceil(this.productList.total / this.productList.pageSize)
      // 最后一页数据长度
      let lastLen = this.productList.total % this.productList.pageSize == 0 ? this.pageSize :this.productList.total % this.productList.pageSize
      // 判断数据是不是最后一页的数据，若是再比较选中的个数与当前最后一页的条数是否相同，若相同，向前一页渲染
      if( maxPage == this.currentPage && len == lastLen){
        this.currentPage = this.currentPage-1 >0 ? this.currentPage-1 : 1
      }
        this.getData(this.currentPage)
      } catch (error) {
        console.warn(error);
        this.$message.error('删除失败');
      }
    },
    // 删除单个商品
    async deleteProduct(row){
      try {
      await this.$store.dispatch('product/getDelProduct',{id:row.id})
      if(this.productList.total % this.productList.pageSize ){
        this.currentPage =this.currentPage - 1 > 0 ? this.currentPage-1 :1
        this.getData(this.currentPage)
      }
      this.getData(this.currentPage)
      } catch (error) {
        console.warn(error);
      }
    },
    // 添加商品
    aboutProduct(){
      this.$router.push('/product/aboutProduct')
      this.changeTitle('添加')
    },
    // 批量删除
  //     deleteAll(){
  //     this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       console.log('批量删除商品---------', this.ids);
  //       //执行删除操作----------------------------
  //       let idStr = this.ids.join(',');
  //       console.log('----ids----', idStr);
  //       this.deleteAllGoods(idStr)

  //     }).catch(() => {
  //       this.$message({
  //         type: 'info',
  //         message: '已取消删除'
  //       });
  //   })
  // },
    deleteAll(){
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {   //成功执行函数
        let ids = this.ids.join(',');
        this.deleteAllGoods(ids)
      }).catch(() => {  //失败回调函数
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
  },
}
};
</script>

<style lang="less",scoped>
.productName{
  color:blue;
  cursor: pointer;
}
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