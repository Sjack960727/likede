<template>
  <el-dialog
    v-if="visible"
    :title="title"
    :visible="visible"
    :before-close="handleClose"
    :close-on-click-modal="false"
    class="dialog"
  >
    <slot name="dialogBodyTop" />
    <slot name="dialogBody">
      <el-form ref="formRef" :model="formData" :inline="inline" class="form" :rules="rules">
        <template v-if="inline">
          <el-row>
            <el-col v-for="(value,item,index) in formLabels" :key="index" :span="12">
              <el-form-item :label="value" label-width="110px" class="col-row-form">
                <slot :name="item"><div>{{ label(formData,item) }}</div></slot>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-form-item
            v-for="(value,item,index) in formLabels"
            :key="index"
            :label="value"
            label-width="140px"
            :prop="item"
            class="modfiy-item"
          >
            <slot :name="item"><div class="form-item">{{ label(formData,item) }}</div></slot>
          </el-form-item>
        </template>
      </el-form>
    </slot>
    <template #footer>
      <template v-if="inline || isFooterShow">
        <slot name="dialogFooter" />
      </template>
      <template v-else>
        <div class="footer-bottom">
          <el-button type="primary" class="cancel" @click="handleClose">取消</el-button>
          <el-button type="primary" class="confirm" @click="onConfirm">确认</el-button>
        </div>
      </template>
    </template>

  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    formLabels: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    inline: {
      type: Boolean,
      default: false
    },
    isFooterShow: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      required: false
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      return (row, item) => {
        if (item.includes('.')) {
          const keys = item.split('.')
          return keys.reduce((pre, cur, index) => pre[cur], row)
        } else {
          return row[item]
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
      this.$refs.formRef?.resetFields()
    },
    async onConfirm() {
      try {
        await this.$refs.formRef?.validate()
        await this.$emit('confirm')
        this.$nextTick(this.handleClose)
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style lang="scss" >
.el-form-item__label{
  font-weight: 400;
  float: left !important;
}
.el-form--inline .el-form-item__content{
  display: block;
}
.form .modfiy-item .el-form-item__content{
  width: 396px;
  line-height: 36px;
}
.col-row-form{
  margin-bottom:0px;
}
.col-row-form .el-form-item__content{
  margin-left: 110px;
}
.footer-bottom{
  text-align: center;
}

.el-button{
    border: none;
  }
  .confirm{
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    margin-left: 34px!important;
  }
  .cancel{
  margin-left: 10px;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }
  // .form-item{
  //   height: 40px;
  //   line-height: 40px;
  // }
  // .el-dialog .el-dialog__body .el-form-item .el-form-item__label{
  //   line-height: 36px;
  // }
</style>
