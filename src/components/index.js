// 注册一个插件，注册所有的全局组件
import MyBread from '@/components/my-bread'
// 引入封装的频道组件
import MyChannel from '@/components/my-channel'
export default {
  install (vue) {
    // 可以基于vue做任何事情（注册全局组件、指令、过滤器、挂载原型函数）
    vue.component(MyBread.name, MyBread)
    vue.component(MyChannel.name, MyChannel)
  }
}
