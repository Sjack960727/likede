<template>
  <div class="app-container">
    <el-row style="margin-left: -10px; margin-right: -10px;" :gutter="30">
      <el-col :span="12">
        <user-task title="运营人员（当天）" describe="运营人员数(个)" :count="count1" :style1="style1" />
      </el-col>
      <el-col :span="12">
        <user-task title="运维人员（当天）" describe="运维人员数(个)" :count="count2" :style1="style2" />
      </el-col>
    </el-row>

    <el-row style="margin-left: -10px; margin-right: -10px;" :gutter="30">
      <el-col :span="18">
        <div class="box user-task-status">
          <div class="header">
            <div class="title">工单状态</div>
            <div class="rili">
              <el-date-picker
                v-model="value1"
                class="date-picker"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                size="small"
              /></div>
            <div class="week-month-year">
              <div class="item" :class="{isChecked:isChecked==1}" @click="getWeekData">周</div>
              <div class="item" :class="{isChecked:isChecked==2}" @click="getMonthData">月</div>
              <div class="item" :class="{isChecked:isChecked==3}" @click="getYearData">年</div>
            </div>

          </div>
          <div class="charts empty">
            <img src="../../../assets/common/empty.png" alt="">
            <div class="tips">暂无数据</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="box user-task-rank">
          <div class="header">
            <div class="title">人效排名（月度）</div>
            <div class="select">

              <el-select v-model="value" placeholder="全部" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select></div>
          </div>
          <div class="week-month-year" style="margin: 20px auto">
            <div style="width:74px;" class="item" :class="{isChecked:isChecked1==1}" @click="isChecked1=1">运营人员</div>
            <div style="width:74px;" class="item" :class="{isChecked:isChecked1==2}" @click="isChecked1=2">运维人员</div>
          </div>
          <div class="charts empty">
            <img src="../../../assets/common/empty.png" alt="">
            <div class="tips">暂无数据</div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import userTask from './components/userTask.vue'
import dayjs from 'dayjs'
import { getRegion, getTaskReportInfo } from '@/api'
export default {
  components: {
    userTask
  },
  data() {
    return {
      options: [],
      value: '',
      count1: {
        total: 0,
        completedTotal: 0,
        refuse: 0,
        cancelTotal: 0
      },
      count2: {
        total: 0,
        completedTotal: 0,
        refuse: 0,
        cancelTotal: 0
      },
      style1: {
        bg: 'bg1',
        color1: 'color1',
        color2: 'color2'
      },
      style2: {
        bg: 'bg2',
        color1: 'color3',
        color2: 'color4'
      },
      isChecked: 1,
      isChecked1: 1,
      value1: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.getWeekData()
    this.getRegion()
    this.getTaskReportInfo()
  },
  methods: {
    getWeekData() {
      this.isChecked = 1
      const start = dayjs().startOf('week').$d
      const end = dayjs().startOf('day').$d
      this.value1 = [start, end]
    },
    getMonthData() {
      this.isChecked = 2
      const start = dayjs().startOf('month').$d
      const end = dayjs().startOf('day').$d
      this.value1 = [start, end]
    },
    getYearData() {
      this.isChecked = 3
      const start = dayjs().startOf('year').$d
      const end = dayjs().startOf('day').$d
      this.value1 = [start, end]
    },
    async getRegion() {
      const { data: { currentPageRecords }} = await getRegion()
      // console.log(currentPageRecords)
      currentPageRecords.forEach(item => {
        this.options.push({
          value: item.id,
          label: item.name
        })
      })
    },
    async getTaskReportInfo() {
      const start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      // console.log(start, end)
      const { data } = await getTaskReportInfo(start, end)
      // console.log(data)
      this.count1.total = data[0].total
      this.count1.completedTotal = data[0].completedTotal
      this.count1.refuse = data[0].cancelTotal
      this.count1.cancelTotal = data[0].workerCount
      this.count2.total = data[1].total
      this.count2.completedTotal = data[1].completedTotal
      this.count2.refuse = data[1].cancelTotal
      this.count2.cancelTotal = data[1].workerCount
    }

  }

}
</script>

<style lang='scss' scoped>
.select{
  width: 90px;
  height: 32px;
  .el-select{
    width: 90px;
  height: 32px;
  }
}
.app-container{
  padding: 20px;
  position: relative;
  }
  .date-picker{
        width: 250px;
    margin-right: 21px;
:deep(.el-date-editor .el-range-input){
   font-size: 13px;
}
  }
  .box{
    padding: 20px;
    border-radius: 20px;
    .empty{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tips{
    margin-top: 25px;
    color: #20232a;
    font-size: 14px;
    }
    }
    .header{
      display: flex;
      .title{
    align-items: center;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333;
    line-height: 40px;
      }

    }
  }
   .week-month-year {
    float: right;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 129px;
    height: 34px;
    background: rgba(233, 243, 255, 0.37);
    border-radius: 10px;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 37px;
      height: 25px;
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;

    }
    .isChecked {
      background: #fff;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      border-radius: 7px;
      font-weight: 600;
      color: #333;
    }
  }
.user-task-status{
    display: flex;
    flex-direction: column;
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
}
.user-task-rank{

    display: flex;

    flex-direction: column;
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
}
</style>
