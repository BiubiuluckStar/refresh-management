<template>
  <div class="layout">
    <!-- 左侧导航 -->
     <Menu></Menu>
    <!-- 右侧内容 -->
    <Content />
  </div>
</template>

<script>
import Menu from './Menu'
import Content from './Content'
export default {
name:'Layout',
components:{
  Menu,
  Content
},

}
</script>

<style lang="less" scoped>

</style>