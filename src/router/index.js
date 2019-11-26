// 导入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入login组件
import Login from '@/views/login'
// 使用vue-router
Vue.use(VueRouter)

// 实例化router
const router = new VueRouter({
// 路由配置对象
// 关键选中：routes，配置路由规则
  routes: [
    { path: '/login', component: Login }
  ]
})

// 导出router
export default router
