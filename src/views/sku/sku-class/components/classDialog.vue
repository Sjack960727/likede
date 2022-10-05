<template>
  <el-dialog
    :before-close="handleClose"
    :visible="dialogVisible"
    width="46.5%"
  >
    <div slot="title" class="title">
      {{ title }}
    </div>
    <p
      v-if="title==='提示'"
      style="display: flex;
  justify-content: center;
  text-align: center;"
    >确定删除此商品类型？</p>
    <el-form
      v-else
      ref="classDialogForm"
      :model="formData"
      label-width="140px"
      :loadding="loadding"
    >
      <el-form-item
        prop="className"
        label="商品类型名称："
        :rules="[{required:true,message:'商品类型名称不能为空', trigger:'blur'}]"
      >
        <el-input v-model.trim="formData.className" placeholder="请输入" maxlength="10" show-word-limit />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="affirmDialog ">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updateSkuClassAPI, delectSkuClassAPI, addStuClassAPI } from '@/api/sku'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loadding: false,
      formData: {
        classId: '',
        className: '',
        parentId: ''
      }
    }
  },
  methods: {
    async  affirmDialog() {
      if (this.title === '修改商品类型') {
        try {
          this.$refs.classDialogForm.validate()
          await updateSkuClassAPI(this.formData.classId, this.formData.className)
          this.loadding = true
        } catch (error) {
          throw new Error(error)
        } finally {
          this.loadding = false
        }
      } else if (this.title === '新增商品类型') {
        try {
          this.$refs.classDialogForm.validate()
          await addStuClassAPI(this.formData.className)
          this.loadding = true
          this.formData = {
            classId: '',
            className: '',
            parentId: ''
          }
        } catch (err) {
          this.$message.error('已存在此名称的对象')
        } finally {
          this.loadding = false
        }
      } else {
        await delectSkuClassAPI(this.formData.classId, this.formData.parentId)
      }
      this.$emit('refreshList')
      this.handleClose()
    },
    handleClose() {
      if (this.title === '修改商品类型') {
        this.$refs.classDialogForm.resetFields()
      }
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-dialog__header{
  background-color: #fff!important;
}
.title {
     display: block;
     height: 24px;
     line-height: 24px;
     font-size: 18px;
     font-weight: 600;
     color: #333!important;
    }
::v-deep .el-dialog__header .el-icon-close:before {
   color: #909399;
}
::v-deep .el-form-item__label{
   width: 140px;
   line-height: 36px;
   text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    font-weight: normal;
}
::v-deep .el-form-item__content{
  margin-left: 140px;
  width: 396px;
    line-height: 36px;
    position: relative;
    font-size: 14px;
    .el-input{
      position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    }
}
.dialog-footer{
  display: flex;
  justify-content: center;
  padding-top: 0;
  text-align: center;
  .el-button--default{
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }
  .el-button--primary{
    margin-left: 30px;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
  }
}
</style>
