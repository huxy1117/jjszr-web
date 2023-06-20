const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    hot: true,
    port: 8080,
    open: false,
    https: false,
    // disableHostCheck: true,
    // noInfo: false,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    proxy: {
      '/api': {
        target: 'http://124.207.4.197:8082/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // 路径重写
          //  "^/wecom": "/wecom" 
        }       
      },
    }
  }
});
