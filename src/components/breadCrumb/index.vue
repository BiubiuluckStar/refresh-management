<template>
  <div class="bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="match in matchPath" :key = match.path :to="{path:match.path}">{{match.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name:'breadCrumb',
  computed:{
    matchPath(){
      let matchPath =  this.$route.matched
      matchPath[0].path = '/'
      matchPath[0].meta.title = '首页'
      return matchPath
    }
  }
};
</script>

<style>
.bread{
  margin: 6px;
}
</style>