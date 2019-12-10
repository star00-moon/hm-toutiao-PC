<template>
  <div class="my-image">
    <div class="btn_box" @click="open">
      <!-- 当后端返回图片地址为空时，使用默认地址 -->
      <img :src="value || defaultPng" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="images.collect" @change="toggleList">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in image"
              :key="item.id"
              @click="selectImage(item.url)"
              :class="{selected:selectImageUrl===item.url}"
            >
              <img :src="item.url" />
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
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
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confimImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
import defaultPng from '@/assets/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      images: {
        collect: false,
        page: 1,
        per_page: 8
      },
      image: [],
      total: 0,
      selectImageUrl: '',
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      defaultPng
    }
  },
  // 使用props接收值
  props: ['value'],
  created () {
    this.getImages()
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    toggleList () {
      this.images.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.images })
      this.image = data.results
      this.total = data.total_count
    },
    pager (newPager) {
      this.images.page = newPager
      this.getImages()
    },
    selectImage (imageUrl) {
      this.selectImageUrl = imageUrl
    },
    upSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
    },
    confimImage () {
      if (this.activeName === 'image') {
        if (!this.selectImageUrl) {
          return this.$message.success('请选择图片')
        }
        this.dialogVisible = false
        // this.defaultPng = this.selectImageUrl
        // 将素材库的图片传值至父组件
        this.$emit('input', this.selectImageUrl)
      } else {
        if (!this.imageUrl) {
          return this.$$message.success('请上传图片')
        }
        this.dialogVisible = false
        // this.defaultPng = this.imageUrl
        // 将用户上传图片传至父组件
        this.$emit('input', this.imageUrl)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.img_list {
  margin-top: 20px;
  .img_item {
    position: relative;
    width: 160px;
    height: 140px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../../assets/selected.png) no-repeat
        center / 50px 50px;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
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
