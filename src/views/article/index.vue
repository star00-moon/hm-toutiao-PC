<template>
  <div class="container_article">
    <!-- 筛选条件 -->
    <el-card>
      <!-- 面包屑 -->
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <!-- 文章状态 -->
        <el-form-item label="状态">
          <el-radio-group v-model="alticles.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 文章频道 -->
        <el-form-item label="频道">
          <my-channel v-model="alticles.channel_id"></my-channel>
          <!-- <my-channel :value="alticles.channel_id" @input="alticles.channel_id = $event"></my-channel> -->
        </el-form-item>
        <!-- 发布日期 -->
        <el-form-item label="日期">
          <div class="block">
            <!-- v-model：绑定的是【起始时间】【结束时间】 -->
            <!-- @change：回调会返回绑定的值——dateAll -->
            <!-- value-format：转换日期格式，后端需要的格式 -->
            <el-date-picker
              v-model="dateAll"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <!-- 筛选按钮 -->
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 筛选结果部分 -->
    <el-card style="margin-top:20px;">
      <div slot="header">
        <span>根据筛选条件共查询到{{total}}条结果</span>
      </div>
      <!-- 结果——表格展示 -->
      <!-- slot-scope="scope：可以用来获取表单的数据 -->
      <el-table :data="getArticle" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image style="width: 150px; height: 100px" :src="scope.row.cover.images[0]">
              <div slot="error" class="image-slot">
                <img src="./../../assets/error.gif" alt style="width: 150px; height: 100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="toEdit(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="delArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- layout="prev, pager, next"：当前组件的结构 -->
      <!-- total：总页数 -->
      <!-- page-size：每页显示条数 -->
      <!-- current-page：当前页数 -->
      <!-- @current-change：可以监听页数改变，并且会传入一个新值 -->
      <el-pagination
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="alticles.per_page"
        :current-page="alticles.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的参数对象
      alticles: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 当前页码
        page: 1,
        // 一页显示多少条
        per_page: 20
      },
      // 时间数组
      dateAll: [],
      // 频道信息
      channelOptions: [],
      // 表格数据
      getArticle: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // this.getChannels()
    this.getArticles()
  },
  methods: {
    // 获取频道信息
    // async getChannels () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 获取筛选结果信息
    async getArticles () {
    // get传参需要params
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.alticles })
      this.getArticle = data.results
      this.total = data.total_count
    },
    // 将新的值传给page，再通过page对分页的当前属性进行修改
    pager (newPage) {
      this.alticles.page = newPage
      this.getArticles()
    },
    search () {
      // 处理频道清空后为空字符串的错误
      if (this.alticles.channel_id === '') this.alticles.channel_id = null
      this.alticles.page = 1
      this.getArticles()
    },
    changeDate (dateAll) {
      // 如果日期被清空，dateAll为null那么begin和end也应该为null
      if (dateAll) {
        this.alticles.begin_pubdate = dateAll[0]
        this.alticles.end_pubdate = dateAll[1]
      } else {
        this.alticles.begin_pubdate = null
        this.alticles.end_pubdate = null
      }
    },
    // 跳往编辑
    toEdit (id) {
      // query传参
      // this.$router.push(`/publish?id=${id}`)
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除文章
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除成功')
        this.getArticles()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang='less'></style>
