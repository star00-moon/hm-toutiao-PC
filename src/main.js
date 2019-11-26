import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入router
import router from '@/router'
Vue.config.productionTip = false
// 使用element-ui
Vue.use(ElementUI)

new Vue({
  // 进行router挂载
  router,
  render: h => h(App)
}).$mount('#app')
