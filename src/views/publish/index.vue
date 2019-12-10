<template>
  <div class="container_publish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id ? '修改' : '发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images = []">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 图片组件 -->
        <el-form-item>
          <!-- 完成父传子 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-for="item in 3" :key="item" v-model="articleForm.cover.images[item - 1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="primary" @click="updata(false)">修改</el-button>
          <el-button @click="updata(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本的引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import myImage from '@/views/publish/my-image'
export default {
  components: {
    // 对富文本进行挂载
    quillEditor,
    'my-image': myImage
  },
  data () {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      },
      articleForm: {
        title: null,
        channel_id: '',
        content: null,
        cover: {
          type: 1,
          images: []
        }
      }
    }
  },
  created () {
    const articleId = this.$route.query.id
    if (articleId) {
      this.getArticle(articleId)
    }
  },
  methods: {
    // 发布文章
    async create (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '存入成功')
      this.$router.push('/article')
    },
    // 获取文章数据用于修改文章
    async getArticle (id) {
      const { data: { data } } = await this.$http.get(`articles/${id}`)
      this.articleForm = data
    },
    // 修改文章
    updata (draft) {
      this.$http.put(`articles/${this.$route.query.id}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  },
  // 监听地址栏id变化，判断发布还是修改
  watch: {
    '$route.query.id': function (newVal, oldVal) {
      if (newVal) {
        this.getArticle(newVal)
      } else {
        this.articleForm = {
          title: null,
          channel_id: '',
          content: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  }
}
</script>
<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
</style>
