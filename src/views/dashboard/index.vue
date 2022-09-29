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
          <el-col :span="13" style="padding-left: 10px; padding-right: 10px">
            <div class="home-user-task-stats bg1 box">
              <div class="header">
                <div class="title">工单统计
                  <span class="subtitle">{{ showStartTime }}~{{ showEndTime }}</span>
                </div>
              </div>
              <div class="body">
                <div class="stats">
                  <div class="item">
                    <div class="num color1 textshadow1">xxx</div>
                    <div class="text color2">工单总数（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color1 textshadow1">xxx</div>
                    <div class="text color2">完成工单（个）</div>
                  </div>
                </div>
                <div class="stats">
                  <div class="item">
                    <div class="num color1 textshadow1">xxx</div>
                    <div class="text color2">进行工单（个）</div>
                  </div>
                </div><div class="stats">
                  <div class="item">
                    <div class="num color1 textshadow1">xxx</div>
                    <div class="text color2">取消工单（个）</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="11" style="padding-left: 10px; padding-right: 10px">
            <div class="home-user-task-stats bg2 box">
              <div class="header">
                <div class="title">销售统计
                  <span class="subtitle">{{ showStartTime }}~{{ showEndTime }}</span>
                </div>
              </div>
              <div class="body">
                <div class="stats">
                  <div class="item">
                    <div class="num color3 textshadow2">{{ orderCount.data }}</div>
                    <div class="text color4">订单量（个）</div>
                  </div>
                </div><div class="stats">
                  <div class="item">
                    <div class="num color3 textshadow2">{{ (orderAmout.data/1000000).toFixed(2) }}</div>
                    <div class="text color4">销售额（万元）</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div></el-col>

      <el-col
        :span="6"
        style="padding-left: 10px; padding-right: 10px"
      ><div class="grid-content bg-purple-light">
        <div class="sku-sale-rank  box">
          <div class="header">
            <div class="title">商品热榜
              <span class="subtitle">{{ showStartTime }}~{{ showEndTime }}</span>
            </div>
          </div>
          <div class="body">
            <el-row style="width:100%;">
              <el-col :span="5">1</el-col>
              <el-col :span="13"><div class="skuname">青梅绿茶</div></el-col>
              <el-col :span="6"><div class="count">999单</div></el-col>
            </el-row>
          </div>
        </div>
      </div>
      </el-col>
    </el-row>
    <el-row
      style="
        margin-left: -10px;
        margin-right: -10px;
        margin-top: 20px;
        height: 353px;
        background-color: #333;
      "
    >
      <el-col
        :span="14"
        style="padding-left: 10px; padding-right: 10px"
      ><div class="grid-content bg-purple">789</div></el-col>
      <el-col
        :span="10"
        style="padding-left: 10px; padding-right: 10px"
      ><div class="grid-content bg-purple-light">987</div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import { getOrderAmount, getOrderCount } from '@/api'
export default {
  name: 'Dashboard',
  data() {
    return {
      orderAmout: '',
      orderCount: ''
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
  mounted() {
    this.getOrderAmount()
    this.getOrderCount()
  },
  methods: {
    async getOrderAmount() {
      this.orderAmout = await getOrderAmount(this.start, this.end)
      console.log(this.orderAmout)
    },
    async getOrderCount() {
      this.orderCount = await getOrderCount(this.start, this.end)
      console.log(this.orderCount)
    }
  }
}
</script>

<style lang="scss" scoped>
.sku-sale-rank{
  display: flex;
  flex-direction: column;
    height: calc(60vh - 72px);
    min-height: 538px;
    background: #fff;
    border-radius: 20px;
    .skuname{
      height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: #333;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    }
    .count{
      height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #737589;
    line-height: 20px;
    text-align: right;
    }
}
.body{
  display:flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  .stats{
    align-items: center;
    justify-content: space-evenly;
    .item{
      display: inline-flex;
      flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .num {
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    line-height: 50px;
      }
      .color1{
        color: #072074;
      }
      .textshadow1{
        text-shadow: 2px 4px 7px rgb(85 132 255 / 50%)
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
      .color2{
        color: #91a7dc;
      }
      .color3{
          color: #ff5757;
      }
      .color4{
        color: #de9690;
      }
      .textshadow2{
        text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
      }
    }
  }
}
.box{
  padding: 20px;
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
  .subtitle{
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #999;
  }
}
.home-user-task-stats{
    display: flex;
    flex-direction: column;
    height: calc(20vh - 24px);
    min-height: 166px;
    border-radius: 20px;
}
.bg1{

    background: #e9f3ff;
     background-image: url('http://likede2-admin.itheima.net/img/task.66b715b7.png');
    background-repeat: no-repeat,no-repeat;
    background-position: 90% 90%;

}
.bg2{
  background: #fbefe8 url('http://likede2-admin.itheima.net/img/sale.606b0d8c.png') no-repeat calc(100% - 12px) 100%;
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
