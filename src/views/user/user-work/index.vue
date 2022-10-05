<template>
  <div class="app-container">
    <Banner :form-inline="formInline" />
    <div class="result">
      <el-table v-loading="loading" :data="userWorkList">
        <el-table-column label="序号" type="index" />
        <el-table-column label="人员名称" prop="userName" />
        <el-table-column label="角色" prop="roleName" />
        <el-table-column label="联系电话" prop="mobile" />
        <el-table-column label="完成工单（本月）" prop="progressTotal" />
        <el-table-column label="进行中工单" prop="workCount" />
        <el-table-column label="拒绝工单（本月）" prop="cancelCount" />

        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button size="small" type="primary" @click="getDetails(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page :current-page.sync="currentPage" :page-size="pageSize" :total="total" :total-page="totalPage" @current-change="currentChange" />
    </div>
    <Details :dialog-visible.sync="dialogVisible" :user-info="userInfo" :week-data="weekData" :month-data="monthData" :year-data="yearData" />
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
import Page from '@/components/Page'
import { getUserWork, getUserInfo, getTaskReport } from '@/api'
import Details from './components/Details.vue'
import dayjs from 'dayjs'
export default {
  components: { Banner, Page, Details },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      formInline: {
        value: 'input',
        item: '<el-input>',
        index: '1'
      },
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      userWorkList: [],
      currentPage: 0,
      pageSize: 0,
      total: 0,
      totalPage: 0,
      userInfo: {},
      weekData: {},
      monthData: {},
      yearData: {}
    }
  },
  created() {
    this.getUserWork()
  },
  methods: {
    async getUserWork() {
      const { data } = await getUserWork(this.page)
      // console.log(data)
      this.currentPage = +data.pageIndex
      this.pageSize = +data.pageSize
      this.total = +data.totalCount
      this.totalPage = +data.totalPage
      this.userWorkList = data.currentPageRecords
    },
    async currentChange() {
      this.page.pageIndex = this.currentPage
      await this.getUserWork()
    },
    async getUserInfo(id) {
      const { data } = await getUserInfo(id)
      this.userInfo = data
      // console.log(this.userInfo)
    },
    async getTaskReport(id, start, end) {
      const { data } = await getTaskReport(
        { userId: id,
          start: start,
          end: end
        }
      )
      // console.log(data)
      return data
    },
    async getDetails(row) {
      // console.log('查看详情')
      // console.log(row)
      await this.getUserInfo(row.userId)
      const start1 = dayjs().startOf('week').format('YYYY-MM-DD HH:mm:ss')
      const start2 = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
      const start3 = dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss')
      const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.getTaskReport(row.userId, start1, end).then(value => {
        this.weekData = value
      })
      this.getTaskReport(row.userId, start2, end).then(value => {
        this.monthData = value
      })
      this.getTaskReport(row.userId, start3, end).then(value => {
        this.yearData = value
        console.log(value)
      })
      // this.monthData = this.getTaskReport(row.userId, start2, end)
      // this.yearData = this.getTaskReport(row.userId, start3, end)
      this.dialogVisible = true
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
}}
</style>
