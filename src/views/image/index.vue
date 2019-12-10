<template>
  <div class="container_image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div>
        <el-radio-group v-model="images.collect" @change="toggleList">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="addImage" style="float:right;" type="success" size="small">添加素材</el-button>
        <el-dialog title="添加素材" :visible.sync="flag" width="300px">
          <!-- action：图片上传地址 -->
          <!-- headers：设置请求头，用于携带token -->
          <!-- show-file-list：是否显示文件列表 -->
          <!-- heades：设置请求头 -->
          <!-- name：上传文件名 -->
          <!-- on-success：上传成功触发 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="upSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="flag = false">关闭</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 内容区域 -->
      <div class="img_list">
        <div class="img_item" v-for="item in image" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer">
            <span
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              @click="toggleStatus(item)"
            ></span>
            <span class="el-icon-delete" @click="delImg(item)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="images.per_page"
        :current-page="images.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      images: {
        collect: false,
        page: 1,
        per_page: 10
      },
      image: [],
      total: 0,
      collect: false,
      // 判断对话框显隐，true为显示，false为隐藏
      flag: false,
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 数据渲染
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.images })
      this.image = data.results
      this.total = data.total_count
    },
    // 获取分页信息
    pager (newPager) {
      this.images.page = newPager
      this.getImages()
    },
    // 切换时进行重新渲染
    toggleList () {
      this.images.page = 1
      this.getImages()
    },
    // 收藏方法
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    // 删除方法
    delImg (item) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${item.id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    // 上传图片按钮
    addImage () {
      this.flag = true
      this.imageUrl = ''
    },
    // 上传成功触发
    upSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功，2秒后关闭')
      setTimeout(() => {
        this.flag = false
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    position: relative;
    width: 160px;
    height: 140px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.7);
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
