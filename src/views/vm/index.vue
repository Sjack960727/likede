<template>
  <div class="dashboard-container">
    <Banner :form-inline="formInline" @search="search">
      <template #innerCode>
        <el-input v-model="pageForm.innerCode" size="medium" placeholder="请输入" clearable />
      </template>
    </Banner>

    <el-card class="result">
      <add-management ref="managementRef" :inner-code-list="innerCodeList" />

      <lin-tabel
        :table-data="tableData"
        :labels="labels"
        :current-page="pageForm.pageIndex"
        operation-width="150px"
        :is-selection-show="true"
        @selectionChange="selectionChange"
      >
        <template #vmStatus="{scope}">
          {{ equipmentStatus(scope) }}
        </template>
        <template #operation="{scope}">
          <div class="operation">
            <span class="details" @click="freightLang(scope)">货道</span>
            <span class="details" @click="strategy(scope)">策略</span>
            <span class="details" @click="editmodity(scope)">修改</span>
          </div>
        </template>
      </lin-tabel>

      <lin-page
        :total="total"
        :current-page.sync="pageForm.pageIndex"
        :total-page="totalPage"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <freight-setting
      :freight-visible.sync="freightVisible"
      :current-detail="currentDetail"
      :machine-aisle-list.sync="machineAisleList"
      :business-id="businessId"
    />
    <lin-form
      title="策略管理"
      :inline="true"
      :visible.sync="strategyVisible"
      :form-labels="strategyLabels"
      :form-data="strategyForm"
    >
      <template #discount>
        <div>{{ strategyForm.discount }}%</div>
      </template>
      <template #dialogFooter>
        <div class="dialogFooter">
          <el-button type="primary" class="recreate" @click="cancelPolicy">取消策略</el-button>
        </div>
      </template>
    </lin-form>
    <lin-form
      title="修改设备"
      :visible.sync="editVisible"
      :form-labels="editLabels"
      :form-data="editForm"
      @confirm="editConfirm"
    >
      <template #point>
        <el-select v-model="pointVal" placeholder="请选择" size="medium">
          <el-option
            v-for="item in names"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </template>
      <template #dialogFooter>
        <div class="dialogFooter">
          <el-button type="primary" class="recreate" @click="cancelPolicy">取消策略</el-button>
        </div>
      </template>
    </lin-form>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import LinTabel from '@/components/Table'
import LinPage from '@/components/Page'
import LinForm from '@/components/Form'
import AddManagement from './components/add-management.vue'
import FreightSetting from './components/freight-setting.vue'
import { vendingMachineList, getDetailsOfVendingMachineAisle, queryVendingMachinePolicy, cancelPolicy, pointSearch, modifyVendingMachinePoint } from '@/api'
export default {
  components: {
    Banner,
    LinForm,
    LinTabel,
    LinPage,
    AddManagement,
    FreightSetting
  },
  data() {
    return {
      formInline: {
        innerCode: '设备编号：'
      },
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        innerCode: ''
      },
      totalPage: 0,
      total: 0,
      tableData: [],
      labels: {
        'innerCode': '设备编号',
        'type.name': '设备型号',
        'node.name': '详细地址',
        'ownerName': '合作商',
        'vmStatus': '设备状态'
      },
      innerCodeList: [],
      // 货道
      freightVisible: false,
      currentDetail: {},
      machineAisleList: [],
      businessId: 0,
      form: {
        innerCode: ''
      },
      strategyVisible: false,
      strategyForm: {},
      strategyLabels: {
        innerCode: '机器编号',
        policyName: '策略名称',
        discount: '策略方案'
      },
      editVisible: false,
      editLabels: {
        innerCode: '机器编号',
        lastSupplyTime: '供货时间',
        'type.name': '设备类型',
        'type.channelMaxCapacity': '设备容量',
        point: '设备点位',
        ownerName: '合作商',
        'region.name': '所属区域',
        'node.name': '设备地址'
      },
      editForm: {},
      names: [],
      pointVal: '',
      nodeId: ''
    }
  },
  computed: {
    equipmentStatus() {
      return ({ vmStatus }) => {
        if (vmStatus === 0) {
          return '未投放'
        } else if (vmStatus === 1) {
          return '运营'
        } else if (vmStatus === 3) {
          return '撤机'
        }
      }
    }
  },
  provide() {
    return {
      form: this.form
    }
  },
  watch: {
    'pageForm.innerCode'() {
      this.pageForm.pageIndex = 1
    }
  },
  created() {
    this.vendingMachineList()
  },
  methods: {
    async vendingMachineList() {
      const { data } = await vendingMachineList(this.pageForm)
      this.totalPage = +data.totalPage
      this.total = +data.totalCount
      this.tableData = data.currentPageRecords
    },
    handleCurrentChange() {
      this.vendingMachineList()
    },
    selectionChange(selection) {
      this.innerCodeList = selection.map(item => item.innerCode)
    },
    search() {
      this.vendingMachineList()
    },
    async freightLang(scope) {
      const { data } = await getDetailsOfVendingMachineAisle(scope.innerCode)
      this.freightVisible = true
      this.currentDetail = scope.type
      this.machineAisleList = data
      this.businessId = scope.businessId
      this.form.innerCode = scope.innerCode
    },
    async strategy(scope) {
      const { data } = await queryVendingMachinePolicy(scope.innerCode)
      if (data) {
        this.strategyForm = data
        this.strategyVisible = true
      } else {
        this.innerCodeList = [scope.innerCode]
        this.$refs.managementRef.batchOperation()
      }
    },
    async cancelPolicy() {
      await cancelPolicy(this.strategyForm.innerCode, this.strategyForm.policyId)
      this.strategyVisible = false
    },
    async editmodity(scope) {
      console.log(scope)
      this.editForm = scope
      this.pointVal = scope.id
      this.nodeId = scope.nodeId
      const { data } = await pointSearch({ pageIndex: 1, pageSize: 100000 })
      this.names = data.currentPageRecords.map(item => ({ name: item.name, id: item.id }))
      this.editVisible = true
    },
    async editConfirm() {
      await modifyVendingMachinePoint(this.pointVal, this.nodeId)
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
  .dialogFooter{
  display: flex;
  justify-content: center;
  align-items: center;
  .recreate{
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }
}
</style>
