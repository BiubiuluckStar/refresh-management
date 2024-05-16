<template>
   <div  class="content" :class="{small:isLeftLess}">
    <!-- 顶部 -->
  <Header @changeIsLeftLess="changeIsLeftLess"></Header>
  <!-- 内容 -->
 <div class="warpper">
  <router-view></router-view>
 </div>
   </div>
</template>

<script>
import Header from '@/views/Layout/Content/Header'
export default {
name:'Content',
data(){
  return{
  isLeftLess:false
  }
},
components:{
  Header,
},
methods:{
  changeIsLeftLess(){
  this.isLeftLess = !this.isLeftLess
  }
}
}
</script>

<style lang="less" scoped>
.content{
    padding-left:200px;
    transition: all 0.1s linear;
}
.small{
    padding-left:64px;
}
.warpper{
  padding: 10px;
}
</style>