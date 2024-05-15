<template>
  <div class="category">
    <breadCrumb></breadCrumb>
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <!-- 一级按钮 -->
        <el-button type="warning" style="margin-bottom: 20px" @click="addFirstCategory"
          >新增一级导航类目</el-button
        >
        <!-- tree内容结构 -->
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
        >
        </el-tree>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" :visible="dialogVisible" width="30%" :before-close="handleClose">
       <strong>请输入类目名称</strong>
       <div style="height: 9px;"></div>
      <el-input v-model="messageInput" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "category",
  mounted() {
    this.getOneCategory();
  },
  data() {
    return {
      dialogVisible: false, //控制弹框的显示与否
      messageInput:'', 
      title:'',
      categoryData:'',
      data: [
        {
          id: 1,
          name: "一级 1",
          children: [
            {
              id: 4,
              name: "二级 1-1",
            },
          ],
        },
      ]
    };
 
  },
  computed: {
    oneCategory() {
      return this.$store.state.category.oneCategory;
    },
  },
  methods: {
    addFirstCategory(){
      this.dialogVisible =true
      this.title = `添加一级分类`
    },
    // 新增
    append(data) {
      this.categoryData = data
      this.messageInput= ''
      this.dialogVisible =true
      this.title = `新增【${data.name}】子级分类`
    },
    // 删除
    remove(node, data) {
        this.$confirm('确定删除吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 执行删除
          this.DeleteCategory({id:data.id})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 修改
    update(node, data) {
      this.categoryData = data
      this.messageInput = data.name
      this.dialogVisible =true
      this.title = `修改【${data.name}】名称`
    },
    // 树节点内容的渲染函数
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span class="name">{data.name}</span>
          {/* render函数，js语法，不涉及vue语法 */}
          {node.level == 1 ? (
            <span>
              <el-button
                class="mini"
                on-click={() => this.append(data)}
                icon="el-icon-plus"
              >
                新增
              </el-button>
              <el-button
                class="mini"
                on-click={() => this.update(node, data)}
                icon="el-icon-edit"
              >
                修改
              </el-button>
              <el-button
                class="mini"
                type="danger"
                on-click={() => this.remove(node, data)}
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </span>
          ) : (
            <span>
              <el-button
                class="mini"
                on-click={() => this.update(node, data)}
                icon="el-icon-edit"
              >
                修改
              </el-button>
              <el-button
                class="mini"
                type="danger"
                on-click={() => this.remove(node, data)}
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </span>
          )}
        </span>
      );
    },
    // 请求tree
    async getOneCategory() {
      try {
        await this.$store.dispatch("category/getOneCategory");
        // 获取一级目录
        let onArr = [],twArr = [];
        let result = this.oneCategory;
        result.forEach(item => {
          if (item.type == 1) {
            item.children = []
            onArr.push(item);
          } else {
            twArr.push(item);
          }
        });
         // 一级的cid等于二级的type就是一级下的二级分类
        onArr.forEach((item) => {
            twArr.forEach((ele) => {
              if (ele.type === item.cid) {
                item.children.push(ele)
              }
            });
          });
          this.data = onArr;
      } catch (error) {
        console.warn(error);
      }
    },
    // 保存修改
    submitHandle(data){
      console.log(this.title.slice(0,2));
      // 新增修改 1. 获取当前输入框的数据
    if(this.title.slice(0,2) == '新增'){
      console.log('新增');
      this.AddChildrenCategory({cid:this.categoryData.cid,name:this.messageInput})
    }
    if(this.title.slice(0,2) == '修改'){
      console.log('修改')
      this.UpdateCategory({id:this.categoryData.id,name:this.messageInput})
    }
    if(this.title.slice(0,2) == '添加'){
      console.log('添加');
      this.addOneCategory({name:this.messageInput})
    }
    },
    // 新增类目
   async AddChildrenCategory(params){
    try {
      await this.$store.dispatch('category/getAddChildrenCategory',params)
      this.dialogVisible = false
       this.getOneCategory()
       this.$message({
          message: '添加成功',
          type: 'success'
        });
    } catch (error) {
      console.warn(error);
      this.$message.error('添加失败');
    }
    },
    // 修改类目
    async UpdateCategory(params){
      try {
      await this.$store.dispatch('category/getUpdateCategory',params)
        this.dialogVisible =false
        this.getOneCategory()
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      } catch (error) {
        console.warn(error);
        this.$message.error('修改失败');
      }
    },
  //  删除类目
    async DeleteCategory(params){
    console.log(params);
    try {
      await this.$store.dispatch('category/getDeleteCategory',params)
        this.getOneCategory()
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (error) {
        console.warn(error);
        this.$message.error('删除失败');
      }
    },
    // 添加一级分类
    async addOneCategory(params){
      console.log(params);
      try {
      await this.$store.dispatch('category/getAddCategory',params)
      this.dialogVisible = false
       this.getOneCategory()
        this.$message({
          message: '添加成功',
          type: 'success'
        });
      } catch (error) {
        console.warn(error);
        this.$message.error('添加失败');
      }
    },
    // ×关闭
    handleClose(done) {
    done();
    this.dialogVisible = false
    }
  }
};
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.category {
  margin: 10px;
}

.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;

  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }

  .tree {
    margin: 10px;

    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    /deep/ .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  /deep/ .name {
    width: 300px;
    display: inline-block;
  }
}
</style>