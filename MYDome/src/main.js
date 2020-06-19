// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import api from '../src/api/api2'
import req from '../src/api/req'
// normalize.css（css样式初始化）
import 'normalize.css/normalize.css'
import 'vant/lib/index.css';

// vue 使用vsconsole 手机端控制台
// import VConsole from 'vconsole/dist/vconsole.min.js'
// let vConsole = new VConsole()


var instance = axios.create({
  baseURL:'',
  timeout:5000,
  // headers:{"Content-Type":"multipart/form-data"}
});
 
Vue.prototype.axios = axios;
Vue.prototype.instance=instance;

Vue.config.productionTip = false
Vue.prototype.$req = req
window.api = api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
