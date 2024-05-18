<template>
  <div class="clearfix" id="login_wrap">
    <div id="login">
         <h2 class="title">登录页</h2>
           <div class="login--account">
               <span>账号：</span>
               <input
                   type="text"
                   placeholder="随便输"
                   name="account"
                   v-model.trim="username"
               />
           </div>
           <div class="login--password">
               <span>密码：</span>
               <input
                   type="password"
                   placeholder="随便输"
                   name="password"
                   v-model.trim="password"
                  
               />
           </div>
           <p class="login--btn">
               <el-button id="loginBtn" type="primary" @click="login" >登录</el-button>
           </p>
       </div>
   </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
 data() {
       return {
           username: "",
           password: "",
       };
   },
   computed:{
    ...mapState('login',['token'])
   },
methods:{
  ...mapMutations('login',['setUser']),
  login(){
    this.getLogin(this.username,this.password)
  },
  async getLogin(user,pwd){
    try {
    await this.$store.dispatch('login/reqLogin',{user,pwd})
    this.$router.push('/')
    // 将登陆信息存储在vuex里面，实现组件数据的共享
    this.setUser(this.username)
    } catch (error) {
      console.warn(error);
    }
  }
}
  
}
</script>

<style scoped lang="less">
.title {
   text-align: center;
   font-size: 22px;
}
#login_wrap {
   position: relative;
   background: rgba(64, 64, 194, 0.1);
   height: 100%;
   > div {
       background: #fff;
       width: 450px;
       height: 300px;
       padding: 30px 40px;
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       > div {
           padding: 10px 0;
           border-bottom: 1px solid #ddd;
           &.login--account {
               margin: 25px 0 30px;
           }
           span {
               color: #666;
               display: inline-block;
               width: 84px;
               font-size: 20px;
           }
           input {
               background: none;
               font-size: 16px;
               border: none;
               height: 30px;
               width: 280px;
               padding-left: 12px;
               box-sizing: border-box;
               color: #666;
               &.error {
                   border: 1px solid #f00;
               }
               &::-webkit-input-placeholder {
                   color: #aaa;
               }
           }
       }

       p {
           text-align: right;
           &.login--btn {
               button {
                   width: 100%;
                   height: 50px;
                   font-size: 18px;
                   margin-top: 30px;
            
               }
           }
           a {
               color: #fff;
               display: inline-block;
               padding: 0 15px;
               font-size: 14px;
           }
       }
   }
}
</style>
