// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入状态管理仓库
import store from './store'
// 引入全局elementUI
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入全局过滤器
import gFilter from './filter'
console.log(gFilter)
for (let i in gFilter) {
  Vue.filter(i, gFilter[i])
}
import './assets/css/reset.css'
// 引入全局axios
// import axios from 'axios'
// 挂载到Vue原型上
// Vue.prototype.$http = axios
// 全局引入eChart
// import ehhart from 'echarts'
// Vue.prototype.$echart = echart
// 设定一个服务器地址，用于文件上传
Vue.prototype.$imgUrl = 'http://localhost:3000'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
