import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vconsole from 'vconsole';
import wpkReporter from 'wpk-reporter' // 导入基础sdk
import Vant from 'vant';

const __wpk = new wpkReporter({
  bid: 'x8ii0114-3vp6z95w', // 新建应用时确定
  spa: true,  // 单页应用开启后，可更准确地采集PV
  rel: 'v2023042401.release',  // 支持函数，需返回最终的版本字符串
  plugins: [
    
  ]
})
// __wpk.installAll(); // 初始化sdk 必须调用

const vConsole = new Vconsole();

Vue.use(vConsole);
Vue.use(Vant)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
