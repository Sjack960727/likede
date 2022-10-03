<template>
  <el-dialog
    title="工单配置"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose"
    custom-class="order-set"
  >
    <el-row type="flex" justify="center" align="center" class="select">
      <span class="value">补货预警值：</span>
      <el-input-number v-model="alertValue" controls-position="right" />
    </el-row>
    <el-row justify="center" type="flex" class="button">
      <el-button type="primary" size="medium" class="allocationbtn" style="background-color: #fbf4f0;border:none;color: #655b56" @click="handleClose">取消</el-button>
      <el-button type="primary" size="medium" style="background: linear-gradient(135deg,#ff9743,#ff5e20);border:none" @click="confirmAlertVal">确认</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getSupplyAlert, setOrderAlertValue } from '@/api/workorder'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      alertValue: null
    }
  },
  created() {
    this.getSupplyAlert()
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
      this.alertValue = null
    },
    async getSupplyAlert() {
      const { data } = await getSupplyAlert()
      this.alertValue = data
    },
    async confirmAlertVal() {
      try {
        await setOrderAlertValue({ alertValue: this.alertValue })
        this.$message.success('设置补货阈值成功')
        this.handleClose()
        this.$emit('refreshOrder')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss">
.order-set{
   border-radius: 8px;
  padding-left: 25px;
  padding-right: 25px;
  .el-dialog__header{
      padding-left: 0;
      .el-dialog__title{
      font-size: 16px;
      color: #333;
      font-weight: bold;
  }
  }
  .el-dialog__body{
    padding-top:0;
    padding-bottom: 0;
    .select{
      margin-bottom: 20px;
        .value{
          line-height:40px;
        }
    }
    .button{
      padding-bottom: 20px;
    }
  }
}
</style>
