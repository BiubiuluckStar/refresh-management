<template>
  <div>
    <breadCrumb></breadCrumb>
    <div class="content">
      订单合同：<el-button @click="checkAgreement">查看合同</el-button>
      <!-- PDF打印 查询关键词 ：vue实现PDF打印 -->
     
    </div>
    <el-dialog
        title="查看合同内容"
        :visible="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
  </div>
</template>

<script>
//  import pdf from 'vue-pdf'
export default {
  name: "OrderArgeement",
  // components: {pdf},
  data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      checkAgreement(){
      this.dialogVisible = true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
}
</style>