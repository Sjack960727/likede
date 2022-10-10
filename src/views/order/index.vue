<template>
  <div class="dashboard-container">
    <Banner :form-inline="formInline" @search="search">
      <template #orderNo>
        <el-input v-model="pageForm.orderNo" size="medium" placeholder="请输入" clearable />
      </template>
      <template #sendTime>
        <el-date-picker
          v-model="pickerTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </template>
    </Banner>

    <el-card class="result">

      <lin-tabel
        :table-data="tableData"
        :labels="labels"
        :current-page="pageForm.pageIndex"
        operation-width="100px"
      >
        <template #createTime="{scope}">
          {{ scope.createTime|changeTime }}
        </template>
        <template #status="{scope}">
          {{ scope.status|shipmentStatus }}
        </template>
        <template #operation="{scope}">
          <div class="operation">
            <span class="details" @click="viewDetail(scope)">查看详情</span>
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

    <lin-form
      :form-labels="formLabel"
      :form-data="currentData"
      :inline="true"
      :visible.sync="viewDetailsVisible"
      title="工单详情"
    >
      <template #payType>
        {{ currentData.payType===1?'支付宝':'微信' }}
      </template>
      <template #createTime>
        {{ currentData.createTime|changeTime }}
      </template>
      <template #updateTime>
        {{ currentData.updateTime|changeTime }}
      </template>
      <template #dialogBodyTop>
        <div v-if="currentData.payStatus===1" class="status">
          <div> <span class="el-icon-success icon" /> <span>出货成功</span></div>
          <img src="@/assets/common/rwancheng.png" alt="">
        </div>
        <div v-else-if="currentData.payStatus===0" class="status">
          <div> <span class="el-icon-s-finance icon" /> <span>未支付</span></div>
          <img src="@/assets/common/rquxiao.png" alt="">
        </div>
      </template>
    </lin-form>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import LinTabel from '@/components/Table'
import LinPage from '@/components/Page'
import LinForm from '@/components/Form'
import { orderSearch } from '@/api/order'
export default {
  components: {
    Banner,
    LinForm,
    LinTabel,
    LinPage
  },
  filters: {
    changeTime(val) {
      return val.split('T').join(' ')
    },
    shipmentStatus(val) {
      if (val === 0) {
        return '订单状态'
      } else if (val === 1) {
        return '完成'
      } else if (val === 2) {
        return '出货成功'
      } else if (val === 3) {
        return '出货失败'
      }
    }
  },
  data() {
    return {
      formInline: {
        orderNo: '订单编号：',
        sendTime: '选择日期：'
      },
      pickerTime: [],
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        orderNo: undefined,
        startDate: undefined,
        endDate: undefined
      },
      tableData: [],
      labels: {
        'orderNo': '订单编号',
        'skuName': '商品名称',
        'price': '订单金额(元)',
        'innerCode': '设备编号',
        'status': '订单状态',
        'createTime': '订单日期'
      },
      totalPage: 0,
      total: 0,
      formLabel: {
        orderNo: '订单编号：',
        skuName: '商品名称：',
        price: '订单金额：',
        innerCode: '设备编号：',
        createTime: '创建时间：',
        updateTime: '完成时间：',
        payType: '支付方式：',
        addr: '设备地址：'
      },
      currentData: {},
      viewDetailsVisible: false
    }
  },
  watch: {
    'pageForm.orderNo'() {
      this.pageForm.pageIndex = 1
    },
    pickerTime: {
      handler() {
        this.pageForm.pageIndex = 1
        if (this.pickerTime) {
          this.pageForm.startDate = this.pickerTime[0]
          this.pageForm.endDate = this.pickerTime[1]
        } else {
          this.pageForm.startDate = undefined
          this.pageForm.endDate = undefined
        }
      },
      deep: true
    }
  },
  created() {
    this.orderSearch()
  },
  methods: {
    async orderSearch() {
      const { data } = await orderSearch(this.pageForm)
      this.tableData = data.currentPageRecords
      this.totalPage = +data.totalPage
      this.total = +data.totalCount
    },
    search() {
      this.orderSearch()
    },
    handleCurrentChange() {
      this.orderSearch()
    },
    viewDetail(scope) {
      this.viewDetailsVisible = true
      this.currentData = scope
      console.log(scope)
      console.log(this.currentData.status)
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
</style>
