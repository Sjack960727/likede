<template>
  <el-dialog

    :title="title"
    width="45%"
    :visible="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formData"
    >
      <el-form-item
        prop="userName"
        label="人员名称"
        :rules="[{required:true,message:'人员名称必填',trigger:'blur'}]"
      >
        <el-input v-model="formData.userName" placeholder="请输入" maxlength="5" show-word-limit />
      </el-form-item>
      <el-form-item label="角色" prop="roleId" :rules="[{required:true,message:'角色必填',trigger:'blur'}]">
        <el-select v-model="formData.roleId" clearable placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile" :rules="[{required:true,message:'联系电话必填',trigger:'blur'}]">
        <el-input v-model="formData.mobile" placeholder="请输入" maxlength="11" show-word-limit />
      </el-form-item>
      <el-form-item label="负责区域" prop="regionId" :rules="[{required:true}]">
        <el-select v-model="formData.regionId" clearable placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="image" :rules="[{required:true}]">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          accept="image/*"
        >
          <img v-if="formData.image" :src="formData.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">支持扩展名：jpg、png，文件不得大于100kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-checkbox v-model="formData.status">是否启用</el-checkbox>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button style="backgroun:#fbf4f0" @click="handleClose">取 消</el-button>
      <el-button v-loading="loading" type="warning" @click="handleAdd">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRegion, uploadFile, addUser, editUser } from '@/api'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        userName: '',
        roleName: '',
        regionId: '',
        roleId: '',
        mobile: '',
        status: false,
        image: ''

      },
      options: [{
        value: 1,
        label: '运营员'
      },
      {
        value: 2,
        label: '维修员'
      }],
      options1: [],
      imageUrl: ''
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getRegion()
  },
  methods: {
    handleClose() { // 关闭前处理
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formData = {
        userName: '',
        roleName: '',
        regionId: '',
        roleId: '',
        mobile: '',
        status: false,
        image: ''
      }
      this.imageUrl = ''
    },
    async handleAdd() {
      try {
        this.loading = true
        await this.$refs.roleDialogForm.validate()
        const index = this.options1.findIndex(item => item.value === this.formData.regionId)
        this.formData.roleName = this.options1[index].label
        if (this.formData.id) {
          await editUser(this.formData.id, this.formData)
          this.$message.success('修改成功')
        } else {
          await addUser(this.formData)
          this.$message.success('添加成功')
        }

        this.$emit('refreshList')
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 < 100
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
        return false
      }

      const fs = new FormData()
      fs.append('fileName', file)
      const { data } = await uploadFile(fs)
      this.formData.image = data
    },
    async getRegion() {
      const { data: { currentPageRecords }} = await getRegion()
      // console.log(currentPageRecords)
      currentPageRecords.forEach(item => {
        this.options1.push({
          value: item.id,
          label: item.name
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>

  ::v-deep .el-dialog{
    border-radius: 20px;
   .el-dialog__header{
    background-color: #fff;
    border-radius: 20px;
     .el-dialog__title{
      color: #333;
      line-height: 22px;
      font-size: 16px;
     font-weight: 600;
    border-radius: 20px;
     }
    .el-icon-close:before{
      color: #333;
    }
  }
  }
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 50px;
    text-align: center;
    border: #777 5px solid;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
.el-upload__tip{
  font-size: 14px;
}
</style>
