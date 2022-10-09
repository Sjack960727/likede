<template>
  <div class="sku-class">
    <!-- 搜索 -->
    <search title="商品类型搜索" @refreshList="searchSkuClass" />
    <div class="result">
      <!-- 新建按钮 -->
      <el-row style="margin-bottom: 20px;">
        <el-col :span="24"><el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible=true">新建</el-button></el-col>
      </el-row>
      <!-- 商品类型的表格 -->
      <el-table
        :header-cell-style="{
          background:'#f3f6fb',color:'#666',fontWeight:'500'}"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="classId"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="className"
          label="商品类型名称"
          width="980"
        />
        <el-table-column
          prop="parentId"
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button type="text" class="update-btn" @click="updateSku(row)">修改</el-button>
            <el-button type="text" class="delect-btn" @click="delectSku(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pageNation
        :total="totalCount"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        :total-page="totalPage"
        @current-change="searchSkuClass"
      />
    </div>
    <!-- 新增商品类型弹出框 -->
    <class-dialog :dialog-visible.sync="addDialogVisible" title="新增商品类型" @refreshList="searchSkuClass" />
    <!-- 删除商品类型提示框 -->
    <class-dialog ref="delectSku" :dialog-visible.sync="delectDialogVisible" title="提示" @refreshList="searchSkuClass" />
    <!-- 编辑商品类型弹出框 -->
    <class-dialog ref="updateSku" :dialog-visible.sync="updateDialogVisible" title="修改商品类型" @refreshList="searchSkuClass" />
  </div>
</template>

<script>
import pageNation from '@/components/Page'
import search from '../components/search.vue'
import classDialog from './components/classDialog.vue'
import { searchSkuClassAPI } from '@/api/sku'
export default {
  components: {
    search,
    classDialog,
    pageNation
  },
  data() {
    return {
      addDialogVisible: false,
      updateDialogVisible: false,
      delectDialogVisible: false,
      tableData: [],
      // 商品类型搜索请求参数
      params: {
        pageIndex: 1,
        pageSize: 10,
        className: ''
      },
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0

    }
  },
  created() {
    this.searchSkuClass()
  },
  methods: {
    // searchList(searchIpt) {
    //   this.tableData = this.tableData.filter(item => {
    //     return item.className.indexOf(searchIpt) >= 0
    //   })
    // },
    async searchSkuClass(searchIpt) {
      this.params.className = searchIpt
      try {
        const { data } = await searchSkuClassAPI(this.params)
        this.tableData = data.currentPageRecords
        // this.pageIndex = data.pageIndex * 1
        // this.pageSize = data.pageSize * 1
        this.totalCount = data.totalCount * 1
        this.totalPage = data.totalPage * 1
      } catch (error) {
        throw new Error(error)
      }
    },
    updateSku(rows) {
      this.updateDialogVisible = true
      this.$refs.updateSku.formData = { ...rows }
    },
    delectSku(rows) {
      this.delectDialogVisible = true
      this.$refs.delectSku.formData = { ...rows }
    }
  }
}
</script>

<style scoped lang='scss'>
.update-btn{
  color: #6480e3;
}
.delect-btn{
  color: #ff5a7f;
}
.sku-class{
  margin: 20px;
  .result{
     padding: 20px 15px 19px 17px;
    background-color: #fff;
    .el-button--primary{
      display: flex;
      justify-content: center;
      width: 80px!important;
      height: 36px;
      border: none;
      background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    }
::v-deep .el-table__header-wrapper {
    color: #666;
    font-weight: 500;
    background-color: #f3f6fb;
}
  }
}
</style>
