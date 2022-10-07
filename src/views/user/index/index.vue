<template>
  <div class="app-container">
    <Banner :form-inline="formInline" @search="search">
      <template #userSearch>
        <el-input v-model="bannerForm.userSearch" placeholder="请输入" />
      </template>
    </Banner>
    <div class="result">
      <el-row :gutter="10" style="height:100px">
        <el-button
          style="margin-left:20px;background:#ff7b32;color:#fff;margin-top:40px"
          icon="el-icon-plus"
          size="small"
          @click="addRole"
        >新建</el-button>
      </el-row>
      <el-table v-loading="loading" :data="userList">
        <el-table-column label="序号" width="120" type="index" />
        <el-table-column label="人员名称" width="240" prop="userName" />
        <el-table-column label="归属区域" prop="regionName" />
        <el-table-column label="角色" prop="role.roleName" />
        <el-table-column label="联系电话" prop="mobile" />

        <el-table-column label="操作" width="240px">
          <template slot-scope="{row}">
            <el-button size="small" type="primary" @click="editRole(row)">修改</el-button>
            <el-button size="small" type="danger" @click="delRole(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page :current-page.sync="currentPage" :page-size="pageSize" :total="total" :total-page="totalPage" @current-change="currentChange" />
    </div>
    <add-role :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
import Page from '@/components/Page'
import addRole from './components/addRole.vue'
import { getUserList } from '@/api'
export default {
  components: { Banner, Page, addRole },
  data() {
    return {
      loading: false,
      formInline: {
        userSearch: '人员搜索'
      },
      bannerForm: {
        userSearch: ''
      },
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      userList: [],
      currentPage: 0,
      pageSize: 0,
      total: 0,
      totalPage: 0,
      dialogVisible: true
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data } = await getUserList(this.page)
      // console.log(data)
      this.currentPage = +data.pageIndex
      this.pageSize = +data.pageSize
      this.total = +data.totalCount
      this.totalPage = +data.totalPage
      this.userList = data.currentPageRecords
    },
    async currentChange() {
      // console.log(this.currentPage)
      this.page.pageIndex = this.currentPage
      // console.log(this.page)
      await this.getUserList()
    },
    delRole(row) {
      console.log('删除', row)
      this.$notify({
        title: '警告',
        message: '测试系统，暂不可以删除',
        type: 'warning'
      })
    },
    editRole(row) {
      console.log('编辑', row)
    },
    addRole() {
      console.log('新增')
      this.dialogVisible = true
    },
    search() {
      this.page.userName = this.bannerForm.userSearch
      this.getUserList()
    }
  }

}
</script>

<style lang='scss' scoped>
.app-container{
  padding: 20px;
  position: relative;
.result{
  background-color: #fff;
}
}
</style>
