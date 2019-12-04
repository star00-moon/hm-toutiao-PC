<template>
  <div class="container">
    <!-- 子组件获取父组件的值，只能读取无法修改所以使用value -->
    <el-select :value="value" placeholder="请选择" clearable @change="fn">
      <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    async getChannels () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 完成子传父
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style scoped lang='less'></style>
