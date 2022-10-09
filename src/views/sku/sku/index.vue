<template>
  <div class="sku">
    <!-- 搜索 -->
    <search title="商品搜索" @refreshList="searchSku" />
    <div class="result">
      <!-- 新建按钮 -->
      <el-row style="margin-bottom: 20px;">
        <el-col :span="2"><el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible=true">新建</el-button></el-col>
        <el-col :span="5"><el-button class="import-date" size="medium" type="primary" @click="importDateVisible=true">导入数据</el-button></el-col>
      </el-row>
      <!-- 商品管理的表格 -->
      <el-table
        :header-cell-style="{
          background:'#f3f6fb',color:'#666',fontWeight:'500'}"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="skuName"
          label="商品名称"
          width="160"
        />
        <el-table-column
          label="商品图片"
          width="140"
        >
          <template slot-scope="{row}">
            <img :src="row.skuImage" alt="" class="sku-image">
          </template>

        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌"
          width="150"
        />
        <el-table-column
          prop="unit"
          label="规格"
          width="130"
        />
        <el-table-column
          prop="price"
          label="商品价格"
          width="120"
        />
        <el-table-column
          prop="skuClass.className"
          label="商品类型"
          width="120"
        />
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="230"
        />
        <el-table-column
          prop="address"
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button type="text" class="update-btn" @click="updateSku(row)">修改</el-button>
          </template>
        </el-table-column>

      </el-table>
      <pageNation
        :total="totalCount"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        :total-page="totalPage"
        @current-change="searchSku"
      />
    </div>
    <!-- 新增商品弹出框 -->
    <sku-dialog title="新增商品" :dialog-visible.sync="addDialogVisible" @refreshList="searchSku" />
    <!-- 编辑商品弹出框 -->
    <sku-dialog ref="updateSku" title="修改商品" :dialog-visible.sync="updateDialogVisible" @refreshList="searchSku" />
    <!-- 数据导入弹出框 -->
    <sku-dialog title="数据导入" :dialog-visible.sync="importDateVisible" @refreshList="searchSku" />

  </div>
</template>

<script>
import { searchSkuAPI } from '@/api/sku'
import search from '../components/search.vue'
import pageNation from '@/components/Page'
import skuDialog from './components/skuDialog.vue'
export default {
  components: {
    search,
    pageNation,
    skuDialog
  },
  data() {
    return {
      addDialogVisible: false,
      updateDialogVisible: false,
      importDateVisible: false,
      // 商品搜索请求参数
      params: {
        pageIndex: 1,
        pageSize: 10,
        skuName: '', // 商品名称
        classId: ''// 商品类别Id
      },
      tableData: [],
      // table分页
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0

    }
  },
  created() {
    this.searchSku()
  },
  methods: {
    async searchSku(searchIpt) {
      this.params.skuName = searchIpt
      try {
        const { data } = await searchSkuAPI(this.params)
        this.tableData = data.currentPageRecords
        this.totalCount = data.totalCount * 1
        this.totalPage = data.totalPage * 1
      } catch (error) {
        throw new Error(error)
      }
    },
    updateSku(rows) {
      this.updateDialogVisible = true
      this.$refs.updateSku.formData = { ...rows }
    }
  }
}
</script>

<style scoped lang='scss'>
.update-btn{
  color: #6480e3;
}
.sku-image{
    display: block;
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 50%;
    background: #f3f6fb;
    border: 1px solid #f3f6fb;
}
.sku{
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
      background: linear-gradient(135deg,#ff9743,#ff5e20);
    }
    .import-date{
      z-index: 999;
    display: flex;
    justify-content: center;
    line-height: 36px;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: #fbf4f0!important;
    border: none;
    color: #655b56!important;
    }
  }
}
</style>
