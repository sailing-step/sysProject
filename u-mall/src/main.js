// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 全局安装 mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
// 导入mint-ui的样式
import 'mint-ui/lib/style.css'

// 全局安装 Vant
import Vant from 'vant'
Vue.use(Vant)
// 导入Vant的样式
import 'vant/lib/index.css'

// 引入清除默认样式文件
import './assets/css/reset.css'

import './assets/js/remScale.js'

// 引入全局过滤器
import gFilter from './filter'
console.log(gFilter)
for (let i in gFilter) {
  Vue.filter(i, gFilter[i])
}
// 引入全局的组件
import gCom from './common' // /index 可以不写，webpack会自动找到并加载 index 。如果是其他的名字就需要写上。
// console.log(gCom)
for (let i in gCom) {
  Vue.component(i, gCom[i])
}
// 设定一个服务器地址，用于文件上传
Vue.prototype.$imgUrl = 'http://localhost:3000'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
