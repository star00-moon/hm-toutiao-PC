import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入router
import router from '@/router'
// 引入axios配置文件
import axios from '@/api'
// 在Vue的原型上挂载axios
Vue.prototype.$http = axios
// 生产模式提示还是开发模式提示，false为开发模式提示，区别在于开发模式提示更详细
Vue.config.productionTip = false
// 使用element-ui
Vue.use(ElementUI)

new Vue({
  // 进行router挂载
  router,
  render: h => h(App)
}).$mount('#app')
