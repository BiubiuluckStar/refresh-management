<template>
  <div class="menu">
    <el-menu
      default-active="active"
      class="el-menu-vertical-demo"
      background-color="#0F2E52"
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
      <el-submenu index="/product">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product/list">产品列表</el-menu-item>
          <el-menu-item index="/product/category">产品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/orderList">订单列表</el-menu-item>
          <el-menu-item index="/order/summaryList">汇总清单</el-menu-item>
          <el-menu-item index="/order/OrderAgreement">订单审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/advertisement">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>广告分类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advertisement/AdverList">广告列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",

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
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: all 0.01s linear;
  .el-menu {
    border-right: 0px;
    .is-active {
      background-color: #1574c2 !important;
      color: #fff !important;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>