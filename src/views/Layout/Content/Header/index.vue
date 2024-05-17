<template>
  <div class="header" :class="{ small: isLeftLess }">
    <!-- 左侧折叠内容 -->
    <div class="open">
      <button class="icon-indent iconfont" @click="changeMenu"></button>
    </div>
    <!-- 右侧内容 -->
    <div class="right">
      <span>{{ time }}</span>
      <span>|</span>
      <el-dropdown>
  <span class="el-dropdown-link">
    语言环境<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>中文</el-dropdown-item>
    <el-dropdown-item>English</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
  <span>欢迎{{ username }}</span>
  <span>|</span>
      <span @click="logOut" >
        <i class="iconfont icon-tuichu"></i>
      </span>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      isLeftLess: false,
    };
  },
  computed: {
    time() {
      return dayjs(new Date()).format("YYYY年MM月DD日 ");
    },
  username(){
  return JSON.parse(sessionStorage.getItem('username'))
}
  },
  methods: {
    ...mapMutations('login',['removeUser']),
    dayjs,
    // 折叠
    changeMenu() {
      this.$bus.$emit("receiveIsCollapse");
      this.$emit("changeIsLeftLess");
    },
    // 退出登录
    logOut(){
      // 跳转到登录页
      this.$router.push('/login')
      this.removeUser()
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  background: #1574c2;
  color: #fff;
  line-height: 50px;
  .open {
    flex: 1;
    .iconfont {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .right {
    width:350px;
    font-size: 13px;
    span{
      padding:0 4px;
      i{
        font-size:16px ;
      }
    }
    .el-dropdown-link {
    cursor: pointer;
    color: #FFF;
    margin-right:5px;
    font-size: 13px;

  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  }
}
</style>