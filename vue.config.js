const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // 配置代理服务器解决代理跨域
  devServer: { // 请求前缀，如果有/api就走代理
    proxy: {
      '/api': {
        target: ' http://localhost:7080/',//目标地址
        pathRewrite: { '^/api': '' },  //检查代理服务器是否有/api若有将其替代为空字符串
      }, 
    },
  },
})
