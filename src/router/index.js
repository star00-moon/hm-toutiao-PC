// 导入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入login组件
import Login from '@/views/login'
// 引入home组件
import Home from '@/views/home'
// 引入welcome组件
import Welcome from '@/views/welcome'
// 引入404组件
import NotFount from '@/views/404'
// 使用vue-router
Vue.use(VueRouter)

// 实例化router
const router = new VueRouter({
// 路由配置对象
// 关键选中：routes，配置路由规则
  routes: [
    // 登陆
    { path: '/login', component: Login },
    // 404  *匹配所有未处理的页面
    { path: '*', component: NotFount },
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        { path: '/', component: Welcome }
      ]
    }
  ]
})

// 导出router
export default router
