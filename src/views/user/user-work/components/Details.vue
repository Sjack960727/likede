<template>
  <div>
    <el-dialog
      class="dialog"
      title="人员详情"
      :visible="dialogVisible"
      :before-close="handleClose"
    >
      <div style="width: 579px; min-height: 277px; margin: 0px auto;">
        <el-row class="userInfo">
          <el-col :span="9">人员名称：{{ userInfo.userName }}</el-col>
          <el-col :span="7">角色：{{ userInfo.roleName }}</el-col>
          <el-col :span="8">联系电话：{{ userInfo.mobile }}</el-col>
          <el-col class="region-name" :span="24">负责区域：{{ userInfo.regionName }}</el-col>
        </el-row>
        <el-row class="user-work">
          <el-col class="item" :span="4"><span v-html="'\u00a0'" /></el-col>
          <el-col class="item" :span="5">总工单数</el-col>
          <el-col class="item" :span="5">拒绝工单</el-col>
          <el-col class="item" :span="5">完成工单</el-col>
          <el-col class="item" :span="5">进行中工单</el-col>
        </el-row>
        <el-row class="user-work">
          <el-col class="item" :span="4">本周</el-col>
          <el-col class="item" :span="5">{{ weekData.total }}</el-col>
          <el-col class="item" :span="5">{{ weekData.cancelCount }}</el-col>
          <el-col class="item" :span="5">{{ weekData.progressTotal }}</el-col>
          <el-col class="item" :span="5">{{ weekData.workCount }}</el-col>
        </el-row>
        <el-row class="user-work">
          <el-col class="item" :span="4">本月</el-col>
          <el-col class="item" :span="5">{{ monthData.total }}</el-col>
          <el-col class="item" :span="5">{{ monthData.cancelCount }}</el-col>
          <el-col class="item" :span="5">{{ monthData.progressTotal }}</el-col>
          <el-col class="item" :span="5">{{ monthData.workCount }}</el-col>
        </el-row>
        <el-row class="user-work" style="border-bottom: 1px solid #d8dde3;">
          <el-col class="item" :span="4">本年</el-col>
          <el-col class="item" :span="5">{{ yearData.total }}</el-col>
          <el-col class="item" :span="5">{{ yearData.cancelCount }}</el-col>
          <el-col class="item" :span="5">{{ yearData.progressTotal }}</el-col>
          <el-col class="item" :span="5">{{ yearData.workCount }}</el-col>
        </el-row>

      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    },
    userInfo: {
      type: Object,
      required: true
    },
    weekData: {
      type: Object,
      required: true
    },
    monthData: {
      type: Object,
      required: true
    },
    yearData: {
      type: Object,
      required: true
    }

  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style  scoped>
.dialog{
    height:800px;
}
.dialog>>>.el-dialog{
    border-radius: 10px;
}
.dialog>>>.el-dialog__header{
    background-color: #fff;
    border-radius: 10px;
}
.dialog>>>.el-dialog__title{
    color: #000;
}
.dialog>>>.el-icon-close:before{
    color: #000;

}
.userInfo{
    height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;
    margin-bottom: 20px;
}
.region-name {
    margin-top: 15px;
}
.user-work{
    border-top: 1px solid #d8dde3;
    border-left: 1px solid #d8dde3
}
.item{
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    text-align: center;
}

</style>
