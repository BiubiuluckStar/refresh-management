<template>
  <div class="boxAdvert">
    <div class="advert">
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- Tree树 -->
          <el-tree
            @node-click="nodeClick"
            :data="data"
            show-checkbox
            node-key="(id,pid)"
            lazy
            :load="loadNode"
            :default-expand-all="false"
            :expand-on-click-node="false"
            :render-content="renderContent"
          >
          </el-tree>
          <!-- 弹框 -->
          <el-dialog
            :title="title"
            :visible="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>
              <h3>请输入广告名称:</h3>
              <br />
              <el-input type="text" size="small" v-model="advertName" />
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
        <el-col :span="14">
          <div class="content">
            <el-button @click="addContent"
              >{{ advertContent.name }}广告</el-button
            >
            <!-- 表格区域 -->
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column prop="pid" label="PID" width="130">
              </el-table-column>
              <el-table-column prop="name" label="名称" width="130">
              </el-table-column>
              <el-table-column
                prop="url"
                label="访问地址"
                min-width="140"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="image"
                label="图片地址"
                min-width="140"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 添加广告内容区域 -->
            <el-dialog
              title="新增广告内容"
              :visible="dialogVisible2"
              width="30%"
            >
              <el-form
                :model="formInline"
                class="demo-form-inline"
                size="small"
              >
                <el-form-item label="广告名称">
                  <el-input
                    v-model="formInline.name"
                    placeholder="审批人"
                  ></el-input>
                </el-form-item>
                <el-form-item label="广告图片地址">
                  <el-input
                    v-model="formInline.url"
                    placeholder="审批人"
                  ></el-input>
                </el-form-item>
                <el-form-item label="图片">
                  <el-input
                    v-model="formInline.image"
                    placeholder="审批人"
                  ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addContentSubmit"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      title: "", //存储Tree标题
      dialogVisible: false,
      dialogVisible2: false,
      advertName: "", //广告名称
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },      //Tree树配置项
      data: [], //tree树数据
      tableData: [], //table表格数据
      formInline: {
        image: "",
        url: "",
        name: "",
      },              //表单数据
      advertContent: "", //存储被点击节点的信息
    };
  },
  computed: {
    // 广告列表
    advertList() {
      return this.$store.state.advert.advertList;
    },
    // 广告详情
    advertContentList() {
      return this.$store.state.advert.advertContentList;
    },
  },
  methods: {
    // 进入懒加载Tree
    async http() {
      await this.$store.dispatch("advert/getAdvert");
      this.data = this.advertList;
    },
    // 添加
    append(data) {
      this.pid = data.pid;
      this.title = "新增广告";
      this.advertName = "";
      this.dialogVisible = true;
    },
    // 修改
    update(data) {
      this.pid = data.pid;
      this.title = "修改广告";
      this.advertName = data.name;
      this.dialogVisible = true;
    },
    // 删除
    remove(node, data) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.getDeleteAdvert({ pid: data.pid });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span class="name">{data.name}</span>
          {node.level == 1 ? (
            <span>
              <el-button
                size="small"
                on-click={() => this.append(data)}
                icon="el-icon-plus"
              >
                新增
              </el-button>
              <el-button
                size="mini"
                on-click={() => this.update(data)}
                icon="el-icon-edit"
              >
                修改
              </el-button>
              <el-button
                size="mini"
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
                size="mini"
                on-click={() => this.update(data)}
                icon="el-icon-edit"
              >
                修改
              </el-button>
              <el-button
                size="mini"
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
    // 获取广告清单
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.getAdveData(resolve);
      }
      if (node.level == 1) {
        this.getchildData(node, resolve);
      } else {
        return resolve([]);
      }
    },
    async getAdveData(resolve) {
      try {
        await this.$store.dispatch("advert/getAdvert");
        return resolve(this.advertList);
      } catch (error) {
        console.warn(error);
      }
    },
    async getchildData(node, resolve) {
      try {
        let params = { id: node.data.pid };
        await this.$store.dispatch("advert/getAdvert", params);
        return resolve(this.advertList);
      } catch (error) {
        console.warn(error);
      }
    },
    // 提交保存
    async submit() {
      if (this.title == "新增广告") {
        this.getAddAdvert({ pid: this.pid, name: this.advertName });
      }
      if (this.title == "修改广告") {
        this.getUpdateAdvert({ pid: this.pid, name: this.advertName });
      }
    },
    // 新增
    async getAddAdvert(params) {
      try {
        await this.$store.dispatch("advert/getAddAdvert", params);
        this.dialogVisible = false;
        this.http();
        this.$message({
          message: "添加成功",
          type: "success",
        });
      } catch (error) {
        this.$message.error("添加失败");
        console.warn(error);
      }
    },
    // 修改
    async getUpdateAdvert(params) {
      try {
        await this.$store.dispatch("advert/getUpdateAdvert", params);
        this.dialogVisible = false;
        this.http();
        this.$message({
          message: "修改成功",
          type: "success",
        });
      } catch (error) {
        this.$message.error("修改失败");
        console.warn(error);
      }
    },
    // 删除
    async getDeleteAdvert(params) {
      try {
        await this.$store.dispatch("advert/getDeleteAdvert", params);
        this.http();
        this.$message({
          message: "删除成功",
          type: "success",
        });
      } catch (error) {
        console.log(error);
        this.$message.error("删除失败");
      }
    },
    // 关闭弹窗
    handleClose(done) {
      done();
      this.dialogVisible = false;
    },

    // 广告内容管理.............................................................
    // 点击获取广告详情
    async getContentMangeAdvert() {
      try {
        await this.$store.dispatch("advert/getContentMangeAdvert", {
          pid: this.advertContent.pid,
        });
        this.tableData = this.advertContentList;
      } catch (error) {
        this.tableData = [];
      }
    },
    // tree节点被点击的函数
    nodeClick(data, node) {
      this.advertContent = data;
      this.getContentMangeAdvert();
    },
    // 添加
    addContent() {
      this.dialogVisible2 = true;
    },
    // 添加光告内容详情
    async addAdvertContent(params) {
      try {
        await this.$store.dispatch("advert/getAddContentAdvert", params);
        this.dialogVisible2 = false;
        this.getContentMangeAdvert();
        this.$message({
          message: "添加成功",
          type: "success",
        });
      } catch (error) {
        console.warn(error);
        this.$message.error("添加失败");
      }
    },
    // 保存表格中的内容
    addContentSubmit() {
      this.addAdvertContent({
        pid: this.advertContent.pid,
        name: this.formInline.name,
        url: this.formInline.url,
        image: this.formInline.image,
      });
    },
    // 删除按钮
    handleDelete(index,row){
   this.getDeleteContentAdvert({id:row.id})
    },
    // 删除
    async getDeleteContentAdvert(params){
    try {
      this.$store.dispatch('advert/getDeleteContentAdvert',params)
     this.getContentMangeAdvert()
     this.$message({
          message: "删除成功",
          type: "success",
        });
    } catch (error) {
      console.warn(error);
      this.$message.error("删除失败");
    }
    }
  },
};
</script>

<style lang="less" scoped>
.content {
  text-align: center;
  margin-left: 100px;
  > button {
    margin-bottom: 20px;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.advert {
  /deep/.name {
    width: 100px;
    display: inline-block;
    margin-bottom: 10px;
  }
  /deep/ .el-tree-node__content {
    height: 40px;
  }
}
</style>