<template>
  <div class="container_home">
    <el-container class="container_home">
      <!-- 侧边栏 -->
      <el-aside :width="isOpen?'200px':'64px'">
        <!-- logo -->
        <div class="logo" :class="{smallLogo:!isOpen}"></div>
        <!-- 导航菜单 -->
        <!-- el-menu：整个菜单容器 -->
        <!-- default-active="2"：当前激活菜单的 index 菜单项的index的值和default-active的值相等 当前菜单想被选中 -->
        <!-- background-color="#002033"：菜单背景色 -->
        <!-- text-color="#fff"：默认的文本颜色 -->
        <!-- active-text-color="#ffd04b"：激活时的文本颜色 -->
        <el-menu
          default-active="/"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border-right:none"
          :collapse="!isOpen"
          :collapse-transition="false"
          router
        >
          <!-- el-submenu：拥有子级菜单 -->
          <!-- el-menu-item：没有子级菜单 -->
          <!-- index：当前菜单的标识，用于激活菜单 -->
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-postcard"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- 字体图标 -->
          <span class="el-icon-s-fold" @click="toggleMenu"></span>
          <!-- 文字 -->
          <span class="text">江苏传智播客科技教育有限公司</span>
          <el-dropdown class="dropdown" @command="handleClick">
            <span class="el-dropdown-link">
              <img :src="photo" alt class="headIcon" />
              <span class="userName">{{name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" command="logout">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      isOpen: true,
      photo: '',
      name: ''
    }
  },
  methods: {
    // 侧边栏展开和收起
    toggleMenu () {
      this.isOpen = !this.isOpen
    },
    // 跳往设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出
    logout () {
      local.delUser()
      this.$router.push('/login')
    },
    handleClick (command) {
      // command：setting / logout
      // this[command]  对象[]赋值写法，[]里面可以写变量
      this[command]()
    }
  },
  created () {
    const user = local.getUser() || {}
    this.photo = user.photo
    this.name = user.name
  }
}
</script>

<style scoped lang='less'>
.container_home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("./../../assets/logo_admin.png") no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url("./../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
    }
    .headIcon {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-right: 5px;
      border-radius: 50%;
    }
    .userName {
      font-weight: bold;
      vertical-align: middle;
    }
  }
}
</style>
