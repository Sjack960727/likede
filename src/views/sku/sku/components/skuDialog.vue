<template>
  <el-dialog
    :before-close="handleClose"
    :visible="dialogVisible"
    width="46.5%"
  >
    <div slot="title" class="title">
      {{ title }}
    </div>
    <el-form
      v-if="title=='数据导入'"
      ref="classDialogForm"
      label-width="140px"
      :v-loadding="loadding"
    >
      <el-form-item
        label="标题："
      >
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :on-change="handleFiileChange"
        >
          <el-button size="small" type="primary" icon="el-icon-upload">上传文件</el-button>
          <div slot="tip" class="el-upload__tip">支持扩展名：xls、xlsx，文件不得大于1M</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-form
      v-else
      ref="classDialogForm"
      :model="formData"
      label-width="140px"
      :v-loadding="loadding"
    >
      <el-form-item
        prop="skuName"
        label="商品名称："
        :rules="[{required:true,message:'请输入商品名称', trigger:'blur'}]"
      >
        <el-input v-model.trim="formData.skuName" placeholder="请输入" maxlength="15" show-word-limit />
      </el-form-item>
      <el-form-item
        prop="brandName"
        label="品牌："
        :rules="[{required:true,message:'请输入品牌名称', trigger:'blur'}]"
      >
        <el-input v-model.trim="formData.brandName" placeholder="请输入" maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item
        prop="price"
        label="商品价格(元)："
        :rules="[{required:true,message:'请输入商品价格(元)', trigger:'blur'}]"
      >
        <el-input-number
          v-model="formData.price"
          controls-position="right"
          :min="0.5"
          :step="0.5"
          :precision="2"
          placeholder="请选择"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="商品类型" prop="skuClass" :rules="[{required:true,message:'请输入商品类型', trigger:'change'}]">
        <el-select v-model="formData.className" placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in skuClass" :key="item.classId" v-model="item.className" :label="item.className" />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="unit"
        label="规格："
        :rules="[{required:true,message:'请输入规格名称', trigger:'blur'}]"
      >
        <el-input v-model.trim="formData.unit" placeholder="请输入" maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item
        prop="skuImage"
        label="商品图片："
        :rules="[{required:true,message:'请上传商品图片', trigger:'blur'}]"
      >
        <el-upload
          ref="upload"
          class="avatar-uploader"
          action="http://likede2-admin.itheima.net/likede/api/vm-service/sku/fileUpload"
          :show-file-list="false"
          :http-request="beforeAvatarUpload"
        >
          <img v-if="formData.skuImage" :src="formData.skuImage" class="avatar">
          <i v-else class="el-icon-upload" />
        </el-upload>
        <div class="el-upload__tip">
          支持扩展名：jpg、png，文件不得大于100kb
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="affirmDialog ">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { searchSkuClassAPI, addStuAPI, updatedStuAPI, uploadPic, updatedSkuList } from '@/api/sku'
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
        skuName: '',
        brandName: '',
        price: undefined,
        className: '',
        unit: '',
        skuImage: '',
        classId: 0
      },
      // 商品类型信息
      skuClass: {},
      fileList: [],
      fileName: ''

    }
  },
  created() {
    this.searchSkuClass()
  },
  methods: {
    // 获取商品类型
    async searchSkuClass() {
      const { data } = await searchSkuClassAPI()
      this.skuClass = data.currentPageRecords
    },
    async affirmDialog() {
      this.$refs.classDialogForm.validate()
      if (this.title === '新增商品') {
        try {
          await addStuAPI(this.formData)
        } catch (error) {
          throw new Error(error)
        } finally {
          this.loadding = false
        }
      } else if (this.title === '修改商品') {
        try {
          await updatedStuAPI(this.formData)
        } catch (error) {
          throw new Error(error)
        } finally {
          this.loadding = false
        }
      } else if (this.title === '数据导入') { // 数据导入
        try {
          const res = await updatedSkuList(this.fileName)
          console.log(res)
        } catch (error) {
          throw new Error(error)
        }
      }
      this.$emit('refreshList')
      this.handleClose()
    },
    handleClose() {
      this.$refs.classDialogForm.resetFields()
      this.$emit('update:dialogVisible', false)
    },
    async beforeAvatarUpload(files) {
      // console.log(files)
      const fd = new FormData()
      fd.append('fileName', files.file)
      const { data } = await uploadPic(fd)
      this.formData.skuImage = data
      const isJPG = files.file.type === 'image/jpeg' || 'image/png'
      const isLt2M = files.file.size / 1024 < 100

      if (!isJPG) {
        this.$message.error('上传头像图片只能是jpg、png格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }
      return isJPG && isLt2M
    },
    // 数据导入
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleFiileChange(files, fileList) {
      this.fileName = files.name
      console.log(files)
      console.log(fileList)
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
// 商品图片上传
::v-deep .avatar-uploader .el-upload {
    width: 86px;
    height: 86px;
    position: relative;
    overflow: hidden;
    background: #f3f6fb;
    border: 1px dashed #d8dde3;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 86px;
    cursor: pointer;
    .el-icon-upload{
    width: 16px;
    height: 16px;
    font-size: 20px;
    fill: currentColor;
    stroke: none;
    color: inherit;
}
    }
.el-upload__tip{
    font-size: 14px;
    color: #bac0cd;
    margin-top: 7px;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 76px;
    height: 76px;
    display: block;
    margin: 4px;
  }
::v-deep  .el-button--primary{
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 80px;
    height: 36px;
    padding: 0;
    background-color: #5f84ff;
    border: none;
    width: 221px;
    height: 36px;
    font-size: 16px;
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
