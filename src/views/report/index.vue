<template>
  <div class="dashboard-container">
    <el-row type="flex" justify="space-between" :gutter="20">
      <el-col>
        <el-row type="flex" justify="space-between" align="middle" :gutter="20">
          <el-col :span="12">
            <div class="bg1 home-user-task box">
              <el-row>
                <el-col>
                  <span class="title">日销售统计</span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between" align="middle" style="flex: 1; width: 100%; margin: 0;" :gutter="80">
                <el-col :span="8">
                  <div class="flex-clunm">
                    <div class="num">{{ salesTotal }}</div>
                    <div class="text">当日销售量（个）</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex-clunm">
                    <div class="num"> {{ salesIncom }}</div>
                    <div class="text">当日销售额（元）</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex-clunm">
                    <div class="num">{{ dayNumber }}</div>
                    <div class="text">当日分成（元）</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="bg2 home-user-task box">
              <el-row>
                <el-col>
                  <span class="title">月销售统计</span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around" align="middle" style="flex: 1; width: 100%; margin: 0;" :gutter="80">
                <el-col :span="8">
                  <div class="flex-clunm">
                    <div class="num">{{ salesInCurrentMonth }}</div>
                    <div class="text">当月销售量（个）</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex-clunm">
                    <div class="num"> {{ salesIncomInCurrentMonth }}</div>
                    <div class="text">当月销售额（万元）</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="flex-clunm">
                    <div class="num"> {{ mouthNumber }}</div>
                    <div class="text">当月分成（元）</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <card-body />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import CardBody from './components/card-body.vue'
import { getSkuTop, getSales, getIncome, totalNumberOfDivisions } from '@/api'
export default {
  name: 'Dashboard',
  components: {
    CardBody
  },
  data() {
    return {
      workOrder: [],
      salesTop: [],
      salesTotal: '',
      salesIncom: '',
      salesInCurrentMonth: '',
      salesIncomInCurrentMonth: '',
      dayNumber: '',
      mouthNumber: ''
    }
  },
  computed: {
    workObj() {
      return (str) => {
        return this.workOrder.reduce((pre, cur) => (pre += cur[str]), 0)
      }
    }
  },
  async created() {
    await this.getSummaryInformation()
    await this.getSkuTop()
    await this.getSales()
  },
  methods: {
    async getSummaryInformation() {
      this.star = dayjs(new Date().setDate(1)).format('YYYY-MM-DD')
      this.end = dayjs(new Date()).format('YYYY-MM-DD')
    },
    async getSkuTop() {
      const { data } = await getSkuTop(10, this.star, this.end)
      this.salesTop = data
    },
    async getSales() {
      const star = dayjs(new Date()).format('YYYY-MM-DD')
      const end = dayjs(new Date()).format('YYYY-MM-DD')
      const { data } = await getSales(star + ' 00:00:00', end + ' 23:59:59')
      this.salesTotal = data
      const { data: res1 } = await getSales(this.star + ' 00:00:00', this.end + ' 23:59:59')
      this.salesInCurrentMonth = res1
      const income = await getIncome(star + ' 00:00:00', end + ' 23:59:59')
      this.salesIncom = income.data
      const incomMonth = await getIncome(this.star + ' 00:00:00', this.end + ' 23:59:59')
      this.salesIncomInCurrentMonth = Number(incomMonth.data / 1000000).toFixed(2)
      const dayNumber = await totalNumberOfDivisions(star + ' 00:00:00', end + ' 23:59:59')
      this.dayNumber = dayNumber.data
      const mouthNumber = await totalNumberOfDivisions(this.star + ' 00:00:00', this.end + ' 23:59:59')
      this.mouthNumber = Number(mouthNumber.data / 100).toFixed(2)
    }

  }
}
</script>

<style lang="scss" scoped>
.bg1{
    background: #e9f3ff;
    background-image: url('~@/assets/common/circle.png'),url('~@/assets/common/task.png');
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;

}
.bg2{
    background:#fbefe8  url('~@/assets/common/pinkpig.png') no-repeat calc(100% - 12px) 100%;

    .num{
    color: #ff5757 !important;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%) !important;
  }
  .text{
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #de9690 !important;
    line-height: 17px;
  }

    // background-repeat: no-repeat,no-repeat;
    // background-position: 0 0,calc(100% - 12px) 100%;
}
.home-user-task{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: calc(20vh - 24px);
  min-height: 166px;
  border-radius: 20px;
}
.box{
  padding: 20px;
  display: flex;
  flex-direction: column;
  .title{
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333;
    }
  .sub-title{
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #999;
  }
  .num{
    color: #072074;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%)
  }
  .flex-clunm{
    display: flex;
    flex-direction: column;
  }
  .text{
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #91a7dc;
    line-height: 17px;
  }
}

.sale-echarts{
    margin-top: 20px;
    height: calc(40vh - 68px);
    min-height: 352px;
    background: #fff;
    border-radius: 20px;
  }
</style>
