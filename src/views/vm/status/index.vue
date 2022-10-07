<template>
  <div class="dashboard-container">
    <Banner :form-inline="formInline" @search="search">
      <template #innerCode>
        <el-input v-model="pageForm.innerCode" size="medium" placeholder="请输入" />
      </template>
    </Banner>

    <el-card class="result">

      <lin-tabel :table-data="tableData" :labels="labels" :current-page="pageForm.pageIndex" operation-width="150px" last-width="300px">
        <template #vmStatus="{scope}">
          <div class="tags">
            <div :class="scope.status[10001]?'green':'yellow'">离线</div>
            <div :class="scope.status[10002]?'green':'yellow'">货道</div>
            <div :class="scope.status[10003]?'green':'yellow'">转动轴</div>
          </div>
        </template>
        <template #operation="{scope}">
          <div class="operation">
            <span class="details" @click="getDetails(scope)">查看详情</span>
          </div>
        </template>
      </lin-tabel>

      <lin-page
        :total="total"
        :current-page.sync="pageForm.pageIndex"
        :total-page="totalPage"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog
      title="货道设置"
      :visible="detailVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="630px"
    >
      <div class="contain-body">
        <el-row type="flex" justify="space-between" align="middle" class="contain-top">
          <el-col :span="6" class="col">销售量：<span>{{ salesTotal }} 个</span></el-col>
          <el-col :span="6" class="col">销售额：<span>{{ salesIncom }} 元</span></el-col>
          <el-col :span="6" class="col">补货次数：<span>{{ supplyCount }} 次</span></el-col>
          <el-col :span="6" class="col">维修次数：<span>{{ repairCount }} 次</span></el-col>
        </el-row>
        <div class="title-sku">商品销量（月）</div>
        <div class="row-bottom">
          <div v-for="(item,index) in skuCollect" :key="index">
            <div class="col-bottom">
              <span>{{ item.skuName }}</span><span>：{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div></el-dialog>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import LinTabel from '@/components/Table'
import LinPage from '@/components/Page'
import dayjs from 'dayjs'
import {
  vendingMachineList, getSales, getIncome,
  getReplenishmentTimes, getTheNumberVending, obtainTheSalesVolume
} from '@/api'
export default {
  components: {
    Banner,
    LinTabel,
    LinPage
  },
  data() {
    return {
      formInline: {
        innerCode: '设备编号：'
      },
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        innerCode: undefined
      },
      totalPage: 0,
      total: 0,
      tableData: [],
      labels: {
        'innerCode': '设备编号',
        'type.name': '设备型号',
        'node.name': '详细地址',
        'ownerName': '运营状态',
        'vmStatus': '设备状态'
      },
      detailVisible: false,
      salesTotal: '',
      salesIncom: '',
      supplyCount: '',
      repairCount: '',
      skuCollect: []
    }
  },
  watch: {
    'pageForm.innerCode': {
      handler(val) {
        this.pageForm.pageIndex = 1
      }
    }
  },
  created() {
    this.star = dayjs(new Date().setDate(1)).format('YYYY-MM-DD')
    this.end = dayjs(new Date()).format('YYYY-MM-DD')
    this.vendingMachineList()
  },
  methods: {
    async vendingMachineList() {
      const { data } = await vendingMachineList(this.pageForm)
      data.currentPageRecords.forEach(item => {
        if (item.vmStatus === 0) {
          item.vmStatus = '未投放'
        } else if (item.vmStatus === 1) {
          item.vmStatus = '运营'
        } else if (item.vmStatus === 3) {
          item.vmStatus = ' 撤机'
        }
      })
      this.totalPage = +data.totalPage
      this.total = +data.totalCount
      this.tableData = data.currentPageRecords
      console.log(data)
    },
    handleCurrentChange() {
      this.vendingMachineList()
    },
    handleClose() {
      this.detailVisible = false
    },
    async getDetails(scope) {
      const { data } = await getSales(this.star + ' 00:00:00', this.end + ' 23:59:59', scope.innerCode)
      this.salesTotal = data
      const income = await getIncome(this.star + ' 00:00:00', this.end + ' 23:59:59', scope.innerCode)
      this.salesIncom = Number(income.data / 100).toFixed(2)
      const { data: res1 } = await getReplenishmentTimes(scope.innerCode, this.star, this.end)
      const { data: res2 } = await getTheNumberVending(scope.innerCode, this.star, this.end)
      const { data: res3 } = await obtainTheSalesVolume(scope.innerCode, this.star, this.end)
      this.supplyCount = res1
      this.repairCount = res2
      this.skuCollect = res3
      console.log({ res3 })
      this.detailVisible = true
    },
    search() {
      this.vendingMachineList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .operation{
    span{
      margin-right: 10px;
    }
  }
  .tags{
    display: flex;
    div{

    }
    .yellow{
        margin-right: 10px;
        border-radius: 14px;
        text-align: center;
        padding: 0 12px;
        color: #fff;
        line-height: 23px;
        background: #ff665f linear-gradient(135deg,#ffb043,#ffc020);
      }
      .green{
        margin-right: 10px;
        height: 23px;
        padding: 0 12px;
        background: #ff665f linear-gradient(135deg,#3fc997,#4bda98);
        border-radius: 14px;
        text-align: center;
        color: #fff;
        line-height: 23px;
      }
  }
  .contain-body{
    margin: 0 auto;
    .contain-top{
      margin-bottom: 16px;
      background: #f3f6fb;
      height: 56px;
    }
  .col{
    margin-left: 20px;
    span{
      color: #5f84ff;
    }
  }
  .title-sku{
    padding: 5px 0;
  }
  .row-bottom{
    display: flex;
    flex-wrap: wrap;
  }

  .col-bottom{
    padding: 0 10px;
    line-height: 40px;
    border: 1px solid #d8dde3;
    display: flex;
    align-items: center;
    span:nth-child(1){
      display: inline-block;
      width: 72px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span:nth-child(2){
      width: 51px;
    }

  }
}
</style>
