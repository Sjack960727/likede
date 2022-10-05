<template>
  <div><div class="home-user-task-stats  box" :class="style1.bg">
    <div class="header">
      <div class="title">
        {{ title }}
      </div>
    </div>
    <div class="body">
      <div class="stats">
        <div class="item">
          <div class="num textshadow1" :class="style1.color1">{{ count.total }}</div>
          <div class="text " :class="style1.color2">工单总数（个）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num textshadow1" :class="style1.color1">
            {{ count.completedTotal }}
          </div>
          <div class="text " :class="style1.color2">完成工单（个）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num  textshadow1" :class="style1.color1">{{ count.refuse }}</div>
          <div class="text " :class="style1.color2">拒绝工单（个）</div>
        </div>
      </div>
      <div class="stats">
        <div class="item">
          <div class="num  textshadow1" :class="style1.color1">
            {{ count.cancelTotal }}
          </div>
          <div class="text " :class="style1.color2">{{ describe }}</div>
        </div>
      </div>
    </div>
  </div></div>
</template>

<script>
export default {
  props: {
    count: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    describe: {
      type: String,
      required: true
    },
    style1: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped >
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
</style>
