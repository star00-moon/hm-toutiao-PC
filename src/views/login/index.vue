<template>
  <!-- 全屏容器 -->
  <div class="container_login">
    <!-- 卡片容器 -->
    <el-card>
      <img src="./../../assets/logo_index.png" alt />
      <!-- status-icon属性为输入框添加了表示校验结果的反馈图标。 -->
      <!-- 通过ref获取el-form组件的dom -->
      <el-form :model="LoginForm" :rules="loginRules" status-icon ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px;"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 使用value是直接赋值无法修改，v-model是双向绑定可以来回修改 -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%;">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    // 自定义校验函数
    // rule  当前字段的校验规则   value 当前字段的值   callback 校验完毕后的回调函数
    const validatoMobile = (rule, value, callback) => {
      if (!(/^1[3-9]\d{9}$/.test(value))) {
        callback(new Error('手机号格式错误'))
      }
      callback()
    }
    return {
      LoginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 添加校验规则
      loginRules: {
        mobile: [
          // required：是否必填   message：提示信息   trigger：失去焦点触发
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validatoMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          // len：固定长度    max：最大位数   min：最小位数
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 使用el-form的实例调用validate
      // valid为true代表校验成功，false为失败
      this.$refs.loginForm.validate(async valid => {
      // this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // post传参，参数为对象
          // promise，then处理成功，catch处理失败
          // this.$http.post('authorizations', this.LoginForm).then(res => {
          // 成功
          // res是响应对象，res.data是响应主体
          // 保存用户信息-token
          //   local.setUser(res.data.data)
          //   this.$router.push('/')
          // }).catch(() => {
          // 失败
          // this.$message.error('手机号或验证码错误')
          // })
          // 以下代码可能会出现异常（报错） 使用try{ 可能报错代码 }catch(e){ 处理错误 }
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.LoginForm)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            // e：exception异常，报错
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>
<style scoped lang='less'>
.container_login {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("./../../assets/login_bg.jpg") no-repeat center / cover;
  .el-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 350px;
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
