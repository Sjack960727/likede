<template>
  <el-card class="card">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item
        v-for="(value,item,index) in formInline"
        :key="index"
        :label="value"
        label-width="82px"
        :prop="item"
      >
        <slot :name="item" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" class="btn" @click="search">查询</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
export default {
  props: {
    formInline: {
      type: Object,
      required: true
    }
  },
  methods: {
    search() {
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" >
  .card{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    height: 64px;
    .el-card__body{
      height: unset;
      padding: 0;
    }
    .el-form-item{
      margin-bottom: 0;
    }
    .btn{
      min-width: 80px;
      height: 36px;
      padding: 0;
      background-color: #5f84ff;
    }
  }

</style>
