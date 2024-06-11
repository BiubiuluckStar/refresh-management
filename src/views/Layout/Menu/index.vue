<template>
  <div class="menu">
    <el-menu
      default-active="active"
      class="el-menu-vertical-demo"
      background-color="#0f2e52"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <!-- 使用router在el-menu开启路由模式，此后的每个index为路径 -->
      <el-menu-item>
        <span slot="title">生鲜采购系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 动态渲染导航 -->
      <MenuList :dyMenuList="dyMenuList"/>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MenuList from './MenuList.vue'
export default {
  name: "Menu",
components:{MenuList},
computed:{
...mapState('menu',['dyMenuList'])
},
  mounted() {
    this.$bus.$on("receiveIsCollapse", this.changeIsCollapse);
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu;
    } else {
      this.active = this.$route.path;
    }
  },
  data() {
    return {
      isCollapse: false,
      active: "/",
    };
  },
  methods: {
    // 左侧导航菜单折叠效果
    changeIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  watch: {
    // 监听路由的变化---切换路由组件
    $route(to, from) {
      //  判断当前路由是否有meta标识
      let { meta, path } = to;
      if (meta.activeMenu) {
        this.active = meta.activeMenu;
      } else {
        this.active = path;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.menu {
  background-color: #0f2e52;
  // background-color: #035403;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: all 0.01s linear;
  .el-menu {
    border-right: 0px;
    .is-active {
      // background-color: #1574c2 !important;
      color: #fff !important;
    }
    /deep/ .el-menu-item-group__title {
    line-height: normal;
    font-size: 12px;
    color: #909399;
}
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>