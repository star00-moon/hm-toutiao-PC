// 导入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入local
import local from '@/utils/local'

// 引入login组件
import Login from '@/views/login'
// 引入home组件
import Home from '@/views/home'
// 引入welcome组件
import Welcome from '@/views/welcome'
// 引入404组件
import NotFount from '@/views/404'
// 引入article组件
import Article from '@/views/article'
// 引入image
import Image from '@/views/image'
// 引入publish
import Publish from '@/views/publish'
// 引入comment
import Comment from '@/views/comment'
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
        { path: '/', component: Welcome },
        // 内容管理
        { path: '/article', component: Article },
        // 素材管理
        { path: '/image', component: Image },
        // 文章发布
        { path: '/publish', component: Publish },
        // 评论管理
        { path: '/comment', component: Comment }
      ]
    }
  ]
})
// 设置路由导航守卫 ｜ 路由前置导航守卫
router.beforeEach((to, from, next) => {
  // to：即将要进入的目标 路由对象
  // from： 当前导航正要离开的路由
  // next：next()放行   next('/login')跳转登陆
  // next：如果你访问的不是登录页面，且又没有登录，跳转到登录页面。
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

// 导出router
export default router
