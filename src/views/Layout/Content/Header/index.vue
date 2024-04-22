<template>
  <div class="header" :class="{small:isLeftLess}">
    <div class="open">
      <button  class="icon-indent iconfont" @click="changeMenu"></button>
    </div>
  </div>
</template>

<script>
export default {
name:'Header',
data(){
  return{
    isLeftLess:false
  }
},
methods:{
  changeMenu(){
   this.$bus.$emit('receiveIsCollapse')
   this.$emit('changeIsLeftLess')
  }
}
}
</script>

<style lang="less" scoped>
.header{
  height: 50px;
  background: #1574C2;
  color:#fff;
  line-height: 50px;
  .open{
    .iconfont{
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>