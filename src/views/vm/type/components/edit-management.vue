<template>
  <lin-form
    title="新增设备类型"
    :form-data="formData"
    :form-labels="formLabels"
    :visible="visible"
    :rules="rules"
    @update:visible="$emit('update:visible', $event)"
    @confirm="confirm"
  >
    <template #name>
      <el-input v-model="formData.name" size="medium" />
    </template>
    <template #model>
      <el-input v-model="formData.model" size="medium" />
    </template>
    <template #vmRow>
      <el-input-number v-model="formData.vmRow" controls-position="right" :min="0" :max="10" placeholder="请输入" />
    </template>
    <template #vmCol>
      <el-input-number v-model="formData.vmCol" controls-position="right" :min="0" :max="10" placeholder="请输入" />
    </template>
    <template #channelMaxCapacity>
      <el-input-number v-model="formData.channelMaxCapacity" controls-position="right" :min="0" :max="10" placeholder="请输入" />
    </template>
    <template #image>
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :http-request="beforeAvatarUpload"
      >
        <img v-if="formData.image" :src="formData.image" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
      <div>支持扩展名：jpg、png，文件不得大于100kb</div>
    </template>
  </lin-form>
</template>

<script>
import LinForm from '@/components/Form'
import { uploadImg, vendingMachineTypeModification } from '@/api'
export default {
  components: {
    LinForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

      formLabels: {
        name: '型号名称：',
        model: '型号编码：',
        vmRow: '货道行数：',
        vmCol: '货道列数：',
        channelMaxCapacity: '货道容量：',
        image: '设备图片：'
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        model: [{ required: true, message: '请输入', trigger: 'blur' }],
        vmRow: [{ required: true, message: '请输入', trigger: 'blur' }],
        vmCol: [{ required: true, message: '请输入', trigger: 'blur' }],
        channelMaxCapacity: [{ required: true, message: '请输入', trigger: 'blur' }],
        image: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async  beforeAvatarUpload(files) {
      const fd = new FormData()
      fd.append('fileName', files.file)
      const { data } = await uploadImg(fd)
      this.formData.image = data
    },
    async confirm() {
      try {
        await vendingMachineTypeModification(this.formData.typeId, this.formData)
        this.$parent.vendingMachineTypeList()
      } catch (error) {
        this.$message({
          message: error.response.data,
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" >
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
    width: 86px;
    height: 86px;
    line-height: 86px;
    text-align: center;
  }
  .avatar {
    margin: 2px 4px;
    width: 76px;
    height: 76px;
    display: block;
  }
</style>
