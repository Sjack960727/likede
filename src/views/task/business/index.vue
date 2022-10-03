<template>
  <div class="orderbus">
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
        <el-form-item label="工单编号">
          <el-input v-model="formInline.taskCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="工单状态">
          <el-select v-model="formInline.status" placeholder="请选择" :clearable="true">
            <el-option
              v-for="item in oderStatus"
              :key="item.statusId"
              :label="item.statusName"
              :value="item.statusId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-circle-plus-outline"
        style="background: linear-gradient(135deg,#ff9743,#ff5e20);border:none"
        @click="dialogVisible=true"
      >新建</el-button>
      <el-button
        type="primary"
        size="medium"
        class="allocationbtn"
        style="background-color: #fbf4f0;border:none;color: #655b56"
        @click="orderSetShow=true"
      >工单配置</el-button>

      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="83px"
        />
        <el-table-column
          prop="taskCode"
          label="工单编号"
        />
        <el-table-column
          prop="innerCode"
          label="设备编号"
        />
        <el-table-column
          prop="taskType.typeName"
          label="工单类型"
        />
        <el-table-column
          prop="createType"
          label="工单方式"
        />
        <el-table-column
          prop="taskStatusTypeEntity.statusName"
          label="工单状态"
        />
        <el-table-column
          prop="userName"
          label="运营人员"
        />
        <el-table-column
          prop="createTime"
          label="创建日期"
          width="180px"
        />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" @click="ViewDetails(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <page
        :total="totalCount"
        :page-size="getListData.pageSize"
        :current-page="getListData.pageIndex"
        @changePageEvent="getOrderList"
      />
    </el-card>

    <!-- 新建工单 -->
    <add-new-order :dialog-visible.sync="addOrderShow" @refreshOrder="getOrderList" />

    <!-- 工单配置 -->
    <order-set ref="orderSetAlert" :dialog-visible.sync="orderSetShow" @refreshOrder="getOrderList" />

    <!-- 查看详情 -->
    <order-detail ref="orderDetail" :dialog-visible.sync="orderDetailShow" @refreshOrder="getOrderList" />
  </div>
</template>

<script>
import { getOrderStatus, getOrderList, searchOrder } from '@/api/workorder'
import page from './components/page.vue'
import AddNewOrder from './components/AddNewOrder.vue'
import OrderSet from './components/OrderSet.vue'
import OrderDetail from './components/OrderDetail.vue'
export default {
  components: {
    page,
    AddNewOrder,
    OrderSet,
    OrderDetail
  },
  data() {
    return {
      formInline: {
        taskCode: '',
        status: ''
      },
      getListData: {
        pageIndex: 1,
        pageSize: 10,
        isRepair: false
      },
      totalCount: null,
      totalPage: null,
      oderStatus: [],
      tableData: [],
      addOrderShow: false,
      orderSetShow: false,
      orderDetailShow: false
    }
  },
  created() {
    this.getOrderStatus()
    this.getOrderList()
  },
  methods: {
    async onSubmit() {
      const { data } = await searchOrder(this.formInline)
      console.log(data)
      this.tableData = data.currentPageRecords
      this.tableData.forEach(item => {
        item.createTime = item.createTime.replace('T', ' ')
      })
      this.totalCount = +data.totalCount
      this.totalPage = data.totalPage
    },
    async getOrderStatus() {
      const { data } = await getOrderStatus()
      this.oderStatus = data
      console.log(this.oderStatus)
    },
    async getOrderList(val) {
      // console.log(val)
      this.getListData.pageIndex = val
      const { data } = await getOrderList(this.getListData)
      this.tableData = data.currentPageRecords
      this.tableData.forEach(item => {
        item.createTime = item.createTime.replace('T', ' ')
        item.createType = item.createType === 0 ? '自动' : '手动'
      })
      this.totalCount = +data.totalCount
      this.totalPage = data.totalPage
    },
    ViewDetails(row) {
      this.$refs.orderDetail.getWorkOrderDetail(row.taskId)
      this.orderDetailShow = true
    }
  }

}
</script>

<style scoped lang="scss">
  .orderbus {
    padding: 20px;
    .box-card {
      height: 80px;
      margin-bottom: 20px;
    }

  }

</style>
