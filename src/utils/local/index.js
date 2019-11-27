// 导出一个本地操作用户信息的模块（设置用户信息 / 获取用户信息 / 清除用户信息）
// 设置一个唯一的key
const KEY = 'hm-toutiao-pc-key'
const local = {
  // 设置用户信息
  setUser (user) {
    // 存储使用sessionStorage的setItem(key,value) key需要设置为唯一值，将来获取还需要使用
    // value 为josn字符串格式
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取用户信息
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    // 需要返回一个json对象格式
    return JSON.parse(jsonStr)
  },
  // 清除用户信息
  delUser () {
    // removeItem()清除当前数据
    window.sessionStorage.removeItem(KEY)
    // 也可以使用setItem(key,'')
    // clear()清除所有数据
  }
}
export default local
