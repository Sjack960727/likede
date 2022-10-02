<template>
  <div class="dashboard-container">
    <el-row
      style="
        margin-left: -10px;
        margin-right: -10px;
        height: 538px;
        background-color: #f8fafd;
      "
      :gutter="20"
    >
      <el-col
        :span="18"
        style="padding-left: 10px; padding-right: 10px"
      ><div class="grid-content bg-purple">
        <el-row
          style="margin-left: -10px; margin-right: -10px; height: 166px"
          :gutter="20"
        >
          <!-- 工单统计 -->
          <el-col :span="13" style="padding-left: 10px; padding-right: 10px">
            <div class="home-user-task-stats bg1 box">
              <div class="header">
                <div class="title">
                  工单统计
                  <span
                    class="subtitle"
                  >{{ showStartTime }}~{{ showEndTime }}</span>
                </div>
              </div>
              <div class="body">
                <div class="stats">
                  <div class="item">
                    <div class="num color1 textshadow1">{{ total }}</div>
                    <div class="text color2">工单总数（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color1 textshadow1">
                      {{ completedTotal }}
                    </div>
                    <div class="text color2">完成工单（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color1 textshadow1">0</div>
                    <div class="text color2">进行工单（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color1 textshadow1">
                      {{ cancelTotal }}
                    </div>
                    <div class="text color2">取消工单（个）</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <!-- 销售统计 -->
          <el-col :span="11" style="padding-left: 10px; padding-right: 10px">
            <div class="home-user-task-stats bg2 box">
              <div class="header">
                <div class="title">
                  销售统计
                  <span
                    class="subtitle"
                  >{{ showStartTime }}~{{ showEndTime }}</span>
                </div>
              </div>
              <div class="body">
                <div class="stats">
                  <div class="item">
                    <div class="num color3 textshadow2">
                      {{ orderCount.data }}
                    </div>
                    <div class="text color4">订单量（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color3 textshadow2">
                      {{ (orderAmout.data / 10000).toFixed(2) }}
                    </div>
                    <div class="text color4">销售额（万元）</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <!-- 销售数据图形 -->
          <div class="box sku-sale-collect">
            <div class="header">
              <div class="title">
                销售数据
                <span
                  class="subtitle"
                >{{ showStartTime }}~{{ showEndTime }}</span>
              </div>
              <div class="week-month-year">
                <div class="item" :class="{isChecked:isChecked==1}" @click="getWeekData($event)">周</div>
                <div class="item" :class="{isChecked:isChecked==2}" @click="getMonthData($event)">月</div>
                <div class="item" :class="{isChecked:isChecked==3}" @click="getYearData($event)">年</div>
              </div>
            </div>

            <div class="charts">
              <div id="regionCollect" style="width:476px;height:278px;">折线图</div>
              <div id="amountCollect" style="width:476px;height:278px;">柱状图</div>
            </div>
          </div>
        </el-row>
      </div></el-col>
      <!-- 热销商品区 -->
      <el-col
        :span="6"
        style="padding-left: 10px; padding-right: 10px"
      ><div class="grid-content bg-purple-light">
        <div class="sku-sale-rank box">
          <div class="header">
            <div class="title">
              商品热榜
              <span
                class="subtitle"
              >{{ showStartTime }}~{{ showEndTime }}</span>
            </div>
          </div>
          <div class="body">
            <el-row
              v-for="(item, index) in hotSkuList"
              :key="index"
              style="width: 100%"
            >
              <el-col :span="5">
                <div class="top">{{ index + 1 }}</div></el-col>
              <el-col
                :span="13"
              ><div class="skuname">{{ item.skuName }}</div></el-col>
              <el-col
                :span="6"
              ><div class="count">{{ item.count }}单</div></el-col>
            </el-row>
          </div>
        </div>
      </div>
      </el-col>
    </el-row>
    <!-- 下半部分 -->
    <el-row
      style="
        margin-left: -10px;
        margin-right: -10px;
        margin-top: 20px;
        height: 353px;
        background-color: #f8fafd;
      "
    >
      <el-col :span="14" style="padding-left: 10px; padding-right: 10px">
        <div class="box partner-node-collect">
          <div class="header">
            <div class="title">合作商点位数TOP5</div>
          </div>
          <el-row class="body">
            <el-col
              :span="17"
              style="padding-left: 10px; padding-right: 10px"
            ><div id="echart3" style="width:509px;height:284px" /></el-col>
            <el-col :span="7" style="padding-left: 10px; padding-right: 10px">
              <div class="collect">
                <div class="count">16</div>
                <div class="name">点位数</div>
                <div class="count count2">5</div>
                <div class="name">合作商数</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 异常设备监控 -->
      <el-col
        :span="10"
        style="padding-left: 10px; padding-right: 10px"
      >
        <div class="box abnormal-equipment">
          <div class="header">
            <div class="title">设备异常监控</div>
            <div class="icon"><i class="el-icon-more" /></div>
          </div>
          <div class="empty">
            <img src="../../assets/common/empty.png" alt="">
            <div class="tips">暂无数据</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import {
  getOrderAmount,
  getOrderCount,
  getTaskReportInfo,
  getSkuTop,
  getNodeCollect,
  getRegionCollect,
  getAmountCollect
} from '@/api'
const weekday = require('dayjs/plugin/weekday.js')
export default {
  name: 'Dashboard',
  data() {
    return {
      isChecked: 1,
      orderAmout: '',
      orderCount: '',
      total: 0,
      cancelTotal: 0,
      completedTotal: 0,
      hotSkuList: [],
      nodeCollectList: [],
      regionCollect: {},
      amountCollect: {}
    }
  },
  computed: {
    ...mapGetters(['name']),
    start() {
      return dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
    },
    end() {
      return dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    },
    showStartTime() {
      return dayjs().startOf('month').format('YYYY-MM-DD')
    },
    showEndTime() {
      return dayjs().startOf('day').format('YYYY-MM-DD')
    }
  },
  created() {
    dayjs.extend(weekday)
  },
  mounted() {
    this.getOrderAmount()
    this.getOrderCount()
    this.getTaskReportInfo()
    this.getSkuTop()
    this.getNodeCollect()
  },
  methods: {
    async getOrderAmount() {
      this.orderAmout = await getOrderAmount(this.start, this.end)
      // console.log(this.orderAmout)
    },
    async getOrderCount() {
      this.orderCount = await getOrderCount(this.start, this.end)
      // console.log(this.orderCount)
    },
    async getTaskReportInfo() {
      const { data } = await getTaskReportInfo(this.start, this.end)
      // console.log(data)
      data.forEach((item) => {
        this.total += item.total
        this.cancelTotal += item.cancelTotal
        this.completedTotal += item.completedTotal
      })
    },
    async getSkuTop() {
      const { data } = await getSkuTop(
        10,
        this.showStartTime,
        this.showEndTime
      )
      this.hotSkuList = data
    },
    async getNodeCollect() {
      const { data } = await getNodeCollect()
      this.nodeCollectList = data
      // console.log(this.nodeCollectList)
      this.getEcharts3()
    },
    getEcharts3() {
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById('echart3'))
        myChart.setOption({
          series: [
            {
              name: 'Radius Mode',
              type: 'pie',
              radius: [20, 140],
              center: ['50%', '50%'],
              roseType: 'radius',
              label: {
                show: true,
                formatter: '{b}\n\r{d}%'
              },
              data: this.nodeCollectList
            }
          ]
        })
      })
    },
    // 设置一周的开始为周一???
    async getRegionCollect(start, end) {
      const { data } = await getRegionCollect(start, end)
      this.regionCollect = data
      console.log(this.regionCollect)
    },
    async getAmountCollect(collectType, start, end) {
      const { data } = await getAmountCollect(collectType, start, end)
      this.amountCollect = data
      console.log(this.amountCollect)
    },
    async  getWeekData() {
      console.log(dayjs().weekday(1).format('YYYY-MM-DD'))
      const start = dayjs().startOf('week').format('YYYY-MM-DD')
      const end = dayjs().startOf('day').format('YYYY-MM-DD')
      // console.log(start, end)
      this.getRegionCollect(start, end)
      this.getAmountCollect(1, start, end)

      this.isChecked = 1
    },
    getMonthData() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().startOf('day').format('YYYY-MM-DD')
      this.getRegionCollect(start, end)
      this.getAmountCollect(1, start, end)
      this.isChecked = 2
    },
    getYearData() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().startOf('day').format('YYYY-MM-DD')
      this.getRegionCollect(start, end)
      this.getAmountCollect(1, start, end)
      this.isChecked = 3
    }

  }
}
</script>

<style lang="scss" scoped>
.abnormal-equipment{
    display: flex;
    flex-direction: column;
    height: calc(40vh - 48px);
    min-height: 353px;
    background: #fff;
    border-radius: 20px;
    .header{
      display: flex;
    }
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
}
.partner-node-collect {
  display: flex;
  flex-direction: column;
  height: calc(40vh - 48px);
  min-height: 353px;
  background: #fff;
  border-radius: 20px;
  .body {
    .collect {
      width: 154px;
      height: 230px;
      padding-top: 47px;
      padding-left: 38px;
      background: linear-gradient(135deg, transparent, #f8f8f9 0) 0 0,
        linear-gradient(-135deg, transparent 12px, #f8f8f9 0) 100% 0,
        linear-gradient(-45deg, transparent, #f8f8f9 0) 100% 100%,
        linear-gradient(45deg, transparent 12px, #f8f8f9 0) 0 100%;
      background-size: 50% 50%;
      background-repeat: no-repeat;
      .count {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #072074;
        line-height: 33px;
      }
      .count2 {
        margin-top: 20px;
      }
      .name {
        height: 17px;
        margin-top: 6px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000412;
        line-height: 17px;
      }
    }
  }
}
.sku-sale-collect {
  .charts{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .header {
    display: flex;
  }
  display: flex;
  flex-direction: column;
  height: calc(40vh - 68px);
  min-height: 352px;
  margin-top: 186px;
  background: #fff;
  border-radius: 20px;
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
}
.sku-sale-rank {
  display: flex;
  flex-direction: column;
  height: calc(60vh - 72px);
  min-height: 538px;
  background: #fff;
  border-radius: 20px;
  .body {
    display: flex;
    flex-direction: column;
  }
  .top{
    width: 16px;
    height: 20px;
    margin-left: 10px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAo0lEQVQ4T2P8/f7FfwYKAOOoAQyjYcAwGgYMgz8MGBl+gHP6fwYOXDkeX1Le8JeRsRikkeX//97/DAwB2AzBZsBVBkbGAlYB8T3IGn5/eOnC8P//BAYGBm1kcSQD/r9nYmKuZ+ITnc7IyPgHm23///9n+f3hZRYjA2MDA8N/QZAaxj/vXzxiYGTc8u3b3zo+Kak3xJRu/z89E/n7j7np////VgAGUHY6vIpVhgAAAABJRU5ErkJggg==);
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #e9b499;
    line-height: 14px;
  }
  .skuname {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .count {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #737589;
    line-height: 20px;
    text-align: right;
  }
}
.body {
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  .stats {
    align-items: center;
    justify-content: space-evenly;
    .item {
      display: inline-flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      .num {
        height: 50px;
        font-size: 36px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        line-height: 50px;
      }
      .color1 {
        color: #072074;
      }
      .textshadow1 {
        text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
      }
      .text {
        height: 17px;
        margin-top: 3px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #91a7dc;
        line-height: 17px;
      }
      .color2 {
        color: #91a7dc;
      }
      .color3 {
        color: #ff5757;
      }
      .color4 {
        color: #de9690;
      }
      .textshadow2 {
        text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
      }
    }
  }
}
.box {
  padding: 20px;
  .title {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333;
  }
  .subtitle {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999;
  }
}
.home-user-task-stats {
  display: flex;
  flex-direction: column;
  height: calc(20vh - 24px);
  min-height: 166px;
  border-radius: 20px;
}
.bg1 {
  background: #e9f3ff;
  background-image: url("http://likede2-admin.itheima.net/img/task.66b715b7.png");
  background-repeat: no-repeat, no-repeat;
  background-position: 90% 90%;
}
.bg2 {
  background: #fbefe8
    url("http://likede2-admin.itheima.net/img/sale.606b0d8c.png") no-repeat
    calc(100% - 12px) 100%;
}
.dashboard {
  background-color: #f8fafd;
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  .bg-purple {
    background-color: green;
  }
  .bg-purple-light {
    background-color: red;
  }
}
</style>
