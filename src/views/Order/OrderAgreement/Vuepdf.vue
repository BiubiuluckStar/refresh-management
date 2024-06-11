<template>
  <el-dialog title="查看合同内容"  :visible="dialogVisible"  @close="close">
<iframe ref="mainiframe" :src="url" class="iframe"></iframe>
      <br/><br/>
  </el-dialog>

</template>

<script>
export default {
  props: ['dialogVisible'],
  data() {
      return {
        url:'https://file3.renrendoc.com/fileroot_temp3/2022-1/26/822eff45-b9a2-4e4b-b387-28458344d9f4/822eff45-b9a2-4e4b-b387-28458344d9f41.gif',
  
      }
  },
  methods: {
      //关闭
      close() {
          this.$emit('changeDialog')
      }
  }
}
</script>

<style lang="less" scoped>
.iframe{
height: 500px;
width: 100%;
}
</style>