// 引入axios
import axios from 'axios'
// 引入lcoal
import local from '@/utils/local'
import router from '@/router'

// 引入json-bigint
import JSONBIGINT from 'json-bigint'
// 对axios进行配置
// baseURL    作用：设置基准地址（前面一段相同的地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置json-bigint
axios.defaults.transformResponse = [(data) => {
  // 对 data 进行任意转换处理
  try {
    const result = JSONBIGINT.parse(data)
    return result
  } catch (err) {
    return data
  }
}]
// 配置请求头携带token
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }

// 配置请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 获取token
  const user = local.getUser() || {}
  // 头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  // 对请求错误做些什么
  // 约定：如果出错一定要返回一个错误promise对象
  // Promise.reject(error)：创建一个promise对象且一定失败
  return Promise.reject(err)
})

// 配置响应拦截器
// response：响应对象包含响应行，响应头，响应体
axios.interceptors.response.use(res => res, err => {
  // 对响应错误做点什么
  // 获取响应状态码 判断是否为401 然后进行跳转
  // 通过err获取响应对象  err.response
  // err.response.status
  if (err.response.status === 401) {
    // 跳转登陆页面
    return router.push('/login')
  }
  return Promise.reject(err)
})

// 其他配置...

// 导出axios
export default axios
