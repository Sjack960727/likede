<template>
  <el-row class="search">
    <el-col :span="2.5"><label>{{ title }}</label></el-col>
    <el-col :span="4"><el-input v-model.trim="search" placeholder="请输入" style="margin-right: 10px;" /></el-col>
    <el-col :span="3"><el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="searchBtn">查询</el-button></el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async searchBtn() {
      this.$emit('refreshList', this.search)
      this.search = ''
    }
  }

}
</script>

<style scoped lang='scss'>
  .search{
    display: flex;
    height: 64px;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    label{
        text-align: right;
        vertical-align: middle;
        font-size: 14px;
        color: #606266;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        font-weight: normal;
    }
    .el-button--primary {
    background-color: #5f84ff;
    border: none;
}
  }
</style>
