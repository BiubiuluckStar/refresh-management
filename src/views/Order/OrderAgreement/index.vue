<template>
  <div>
    <breadCrumb></breadCrumb>
    <div class="content">
      订单合同：<el-button @click="checkAgreement">查看合同</el-button>
    </div>
       <!-- <Vuepdf >
       <el-dialog
        title="查看合同内容"
        :visible="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <img src="/public/agreement.pdf" />
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </Vuepdf>  -->
    <Vuepdf :dialogVisible="dialogVisible" @changeDialog="changeDialog"></Vuepdf>

  
  </div>
</template>

<script>
import Vuepdf from './Vuepdf.vue'
export default {
  name: "OrderArgeement",
  components: {
    Vuepdf
  },
  data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      checkAgreement(){
      this.dialogVisible = true
      },
    changeDialog(){
      this.dialogVisible = false;
    }
    }
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
}
</style>