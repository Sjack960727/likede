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
                  <span class="subtitle">time</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="11" style="padding-left: 10px; padding-right: 10px">
            <div class="home-user-task-stats bg2 box">
              <div class="header">销售统计</div>
            </div>
          </el-col>
        </el-row>
      </div></el-col>
      <el-col
        :span="6"
        style="padding-left: 10px; padding-right: 10px"
      ><div class="grid-content bg-purple-light">
        <div class="home-user-task-stats bg2 box">
          <div class="header">销售统计</div>
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

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.box{
  padding: 20px;
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
