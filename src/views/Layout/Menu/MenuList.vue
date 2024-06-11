<template>
  <div>
    <!-- 得到的菜单导航可能是一级的可能是多级的，要用到下面的判断 -->
    <template  v-for="item in dyMenuList" >
      <template v-if="item.children">
         <!-- 多级菜单 -->
         <el-submenu :index="item.path" :key="item.path" >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.meta.title}}</span>
        </template>
        <!-- <el-menu-item-group v-for="child in item.children" :key="child.path">
          <el-menu-item index="/product/list">{{ child.meta.title}}</el-menu-item> 
         </el-menu-item-group>  -->
        <el-menu-item-group>
        <MenuList :dyMenuList="item.children"></MenuList>
        </el-menu-item-group>
        </el-submenu>
   </template>
    <!-- 只有一级菜单 -->
   <template v-else>
    <el-menu-item :index="item.path" :key="item.path" >
        <i class="el-icon-menu" ></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
   </template>
    </template>

  </div>
</template>

<script>

export default {
name:'MenuList', //组件的名称name，如果使用name就是在调用当前的组件
props:['dyMenuList']
}
</script>

<style lang="css" scoped>
</style>