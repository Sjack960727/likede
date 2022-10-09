<template>
  <el-card>
    <Banner :form-inline="formInline" @search="search">
      <template #partnerName>
        <el-select v-model="pageForm.partnerName" placeholder="请选择" clearable>
          <el-option
            v-for="item in partner"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </template>
      <template #sendTime>
        <el-date-picker
          v-model="pickerTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        />
      </template>
    </Banner>
    <div class="mid">
      笔数统计：<span>{{ salesTotal }} <span>个</span> </span>
      个收入统计： <span>{{ salesIncomInCurrentMonth }} <span>元</span></span>
      元分成统计：<span>{{ mouthNumber }} <span>元</span></span>
    </div>
    <lin-tabel
      :table-data="tableData"
      :labels="labels"
      :current-page="pageForm.pageIndex"
      :isoperation-show="false"
      :is-index-show="false"
    />

    <lin-page
      :total="total"
      :current-page.sync="pageForm.pageIndex"
      :total-page="totalPage"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import Banner from '@/components/Banner'
import LinTabel from '@/components/Table'
import LinPage from '@/components/Page'
import { summaryData, partnerSearch, getSaless, getIncomes, totalNumberOfDivisions } from '@/api'
import dayjs from 'dayjs'
export default {
  components: {
    Banner,
    LinTabel,
    LinPage
  },
  data() {
    return {
      formInline: {
        partnerName: '合作商：',
        sendTime: '选择日期：'
      },
      pickerTime: [dayjs(new Date().setDate(1)).format('YYYY-MM-DD'), dayjs(new Date()).format('YYYY-MM-DD')],
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        start: undefined,
        end: undefined,
        partnerName: undefined
      },
      tableData: [],
      labels: {
        'date': '订单日期',
        'ownerName': '合作商',
        'ratio': '分成比例',
        'orderTotalMoney': '收入（元）',
        'orderCount': '笔数',
        'totalBill': '分成金额（元）'
      },
      totalPage: 0,
      total: 0,
      pickerOptions: {
        disabledDate(time) {
          const date = new Date()
          return time.getTime() > date.getTime() // 禁止选取当天之后的日期（不包括静止当天）
        }
      },
      partner: [],
      salesTotal: '',
      salesIncomInCurrentMonth: '',
      mouthNumber: '',
      curPartnerId: 1
    }
  },
  watch: {
    'pageForm.partnerName'(val) {
      this.pageForm.pageIndex = 1
      this.partner.forEach(item => {
        if (item.name === val) { this.curPartnerId = item.id }
      })
    },
    pickerTime: {
      handler() {
        this.pageForm.pageIndex = 1
        if (this.pickerTime) {
          this.pageForm.start = this.pickerTime[0]
          this.pageForm.end = this.pickerTime[1]
        } else {
          this.pageForm.start = undefined
          this.pageForm.end = undefined
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.summaryData()
    this.partnerSearch()
    this.getSales()
  },
  methods: {
    async summaryData() {
      const { data } = await summaryData(this.pageForm)
      data.currentPageRecords.forEach(item => {
        item.ratio = item.ratio + '%'
        item.orderTotalMoney = '+' + item.orderTotalMoney
        item.totalBill = '+' + Number(item.totalBill / 100).toFixed(2)
      })
      this.tableData = data.currentPageRecords
      this.totalPage = +data.totalPage
      this.total = +data.totalCount
    },
    async partnerSearch() {
      const { data } = await partnerSearch()
      this.partner = data.currentPageRecords
    },
    search() {
      this.summaryData()
      this.getSales()
    },
    handleCurrentChange() {
      this.summaryData()
    },
    async getSales() {
      const { data } = await getSaless(this.pageForm.start + ' 00:00:00', this.pageForm.end + ' 23:59:59', this.curPartnerId)
      this.salesTotal = data
      const incomMonth = await getIncomes(this.pageForm.start + ' 00:00:00', this.pageForm.end + ' 23:59:59', this.curPartnerId)
      this.salesIncomInCurrentMonth = Number(incomMonth.data / 100).toFixed(2)
      const mouthNumber = await totalNumberOfDivisions(this.pageForm.start + ' 00:00:00', this.pageForm.end + ' 23:59:59', this.curPartnerId)
      this.mouthNumber = Number(mouthNumber.data / 100).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.status{
  .icon{
  font-size: 35px;
  margin-right: 16px;
  margin-left: 22px;
  }
  .el-icon-success{
    color: #79e192;
  }
 > div{
  display: flex;
  align-items: center;
 }
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  padding-right: 76px;
  background-color: hsla(0,0%,92.5%,.39)
}
.dialogFooter{
  display: flex;
  justify-content: center;
  align-items: center;
  .recreate{
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }
}
.mid{
  margin-bottom: 20px;
  >span{
    margin-right: 50px;
    font-size: 20px;
    color: #ff5757;
    font-weight: 500;
    >span{
      font-size: 14px;
    color: #000;
    font-weight: 400;
    }
  }
}
</style>
