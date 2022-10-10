<template>
  <div class="dashboard-container">
    <Banner :form-inline="formInline" @search="search">
      <template #policyName>
        <el-input v-model="formData.policyName" size="medium" placeholder="请输入" clearable />
      </template>
    </Banner>

    <el-card class="result">
      <el-row type="flex" class="operation-btn">
        <el-button type="primary" icon="el-icon-circle-plus-outline" class="newlyBuild" @click="addPolicy('')">新建</el-button>
      </el-row>
      <lin-table
        :table-data="tableData"
        :labels="labels"
        :current-page="formData.pageIndex"
        operation-width="200px"
      >
        <template #createTime="{scope}">
          {{ scope.createTime | changeTime }}
        </template>
        <template #operation="{scope}">
          <div class="operation">
            <span class="details" @click="searchThePolicy(scope)">查看详情</span>
            <span class="details" @click="addPolicy(scope)">修改</span>
            <span class="dele-btn" @click="deletePolicy(scope)">删除</span>
          </div>
        </template>
      </lin-table>
      <lin-page
        :total="total"
        :current-page.sync="formData.pageIndex"
        :total-page="totalPage"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <lin-form
      :title="title"
      :visible.sync="addVisible"
      :form-labels="addLabels"
      :form-data="addForm"
      :rules="rules"
      @confirm="addConfirm"
      @close="formClose"
    >
      <template #policyName>
        <el-input v-model="addForm.policyName" placeholder="请输入" />
      </template>
      <template #discount>
        <el-input-number v-model="addForm.discount" controls-position="right" :min="1" :max="100" placeholder="请输入" />
      </template>
    </lin-form>
    <!-- 策略详情 -->
    <lin-form
      title="策略详情"
      :visible.sync="detailVisible"
      :form-labels="detailLabels"
      :form-data="detailForm"
      :is-footer-show="true"
    >
      <template #strategy>
        <lin-table
          :table-data="detailData"
          :labels="detailTablelLabels"
          :isoperation-show="false"
          :current-page="detailFormData.pageIndex"
        />
        <lin-page
          :total="detailtotal"
          :current-page.sync="detailFormData.pageIndex"
          :total-page="detailPageTotal"
          @current-change="detailHandleCurrentChange"
        />
      </template>
    </lin-form>
  </div>
</template>

<script>
import Banner from '../user/index/components/Banner.vue'
import LinTable from '@/components/Table'
import LinPage from '@/components/Page'
import LinForm from '@/components/Form'
import { policySearch, policyList, searchThePolicy, modifyPolicy, deletePolicy } from '@/api'
export default {
  components: {
    Banner,
    LinTable,
    LinPage,
    LinForm
  },
  filters: {
    changeTime(val) {
      return val.split('T').join(' ')
    }
  },
  data() {
    return {
      formInline: {
        policyName: '策略搜索：'
      },
      formData: {
        pageIndex: 1,
        pageSize: 10,
        policyName: ''
      },
      tableData: [],
      labels: {
        policyName: '策略名称',
        discount: '策略方案',
        createTime: '创建日期'
      },
      total: 0,
      totalPage: 0,
      addVisible: false,
      title: '修改策略',
      addForm: {
        policyName: '',
        discount: undefined
      },
      addLabels: {
        policyName: '策略名称：',
        discount: '策略方案：'
      },
      rules: {
        policyName: [{ required: true, message: '请输入', trigger: 'blur' }],
        discount: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      // 查看详情
      viewDetailsForm: {
        pageIndex: 1,
        pageSize: 10
      },
      detailVisible: false,
      detailLabels: {
        policyName: '策略名称：',
        strategy: '策略方案：'
      },
      detailForm: {
        policyName: '',
        strategy: ''
      },
      detailData: [],
      detailTablelLabels: {
        nodeName: '点位名称',
        innerCode: '设备编号'
      },
      detailFormData: {
        pageIndex: 1,
        pageSize: 10
      },
      detailtotal: 0,
      detailPageTotal: 0,
      currpolicyId: 0
    }
  },
  watch: {
    'formData.policyName'() {
      this.formData.pageIndex = 1
    }
  },
  created() {
    this.policySearch()
  },
  methods: {
    async policySearch() {
      const { data } = await policySearch(this.formData)
      this.totalPage = +data.totalPage
      this.total = +data.totalCount
      this.tableData = data.currentPageRecords
      console.log(data)
    },
    handleCurrentChange() {
      this.policySearch()
    },
    search() {
      this.policySearch()
    },
    async addConfirm() {
      if (this.addForm.policyId) {
        await modifyPolicy(this.addForm.policyId, { discount: this.addForm.discount, policyName: this.addForm.policyName })
      } else {
        await policyList(this.addForm)
      }
      this.policySearch()
    },
    addPolicy(scope) {
      console.log(scope)
      if (scope) {
        this.addForm = scope
      }
      this.addVisible = true
    },
    // 查看详情
    searchThePolicy(scope) {
      this.detailVisible = true
      this.detailForm.policyName = scope.policyName
      this.currpolicyId = scope.policyId
      this.searchNode()
    },
    async searchNode() {
      const { data } = await searchThePolicy(this.currpolicyId, this.detailFormData)
      this.detailData = data.currentPageRecords
      this.detailPageTotal = +data.totalPage
      this.detailtotal = +data.totalCount
      console.log(data)
    },
    detailHandleCurrentChange() {
      this.searchNode()
    },
    formClose() {
      this.addForm = {
        policyName: '',
        discount: undefined
      }
    },
    async deletePolicy(scope) {
      await deletePolicy(scope.policyId)
      this.policySearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.operation{
    span{
      margin-right: 10px;
    }
  }
</style>
