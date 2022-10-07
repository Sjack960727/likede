<template>
  <div>
    <el-row type="flex" class="operation-btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" class="newlyBuild" @click="addEquipment">新建</el-button>
      <el-button type="primary" class="batch" @click="batchOperation">批量操作</el-button>
    </el-row>
    <lin-form
      title="新增设备"
      :visible.sync="addVisible"
      :form-data="addForm"
      :form-labels="addLabels"
      :rules="addRules"
      @confirm="addConfirm"
    >
      <template #vmType>
        <el-select v-model="addForm.vmType" placeholder="请选择" size="medium">
          <el-option v-for="item in modelNameList" :key="item.typeId" :label="item.name" :value="item.typeId" />
        </el-select>
      </template>
      <template #nodeId>
        <el-select v-model="addForm.nodeId" placeholder="请选择" size="medium">
          <el-option v-for="item in pointSearchList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </template>
    </lin-form>
    <lin-form
      title="批量策略管理"
      :visible.sync="operationVisible"
      :form-data="operationForm"
      :form-labels="operationLabels"
      :rules="operationRules"
      @confirm="operationConfirm"
    >
      <template #policyId>
        <el-select v-model="operationForm.policyId" placeholder="请选择" size="medium">
          <el-option v-for="item in batchOperationList" :key="item.policyId" :label="item.policyName" :value="item.policyId" />
        </el-select>
      </template>
    </lin-form>
  </div>
</template>

<script>
import { vendingMachineTypeList, pointSearch, newVendingAircraft, getPolicyList, getApplicationStrategy } from '@/api'
import LinForm from '@/components/Form'
export default {
  components: {
    LinForm
  },
  props: {
    innerCodeList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      addVisible: false,
      addForm: {
        innerCode: '系统自动生成',
        vmType: '',
        nodeId: ''
      },
      addLabels: {
        innerCode: '设备编号：',
        vmType: '选择型号：',
        nodeId: '选择点位：'
      },
      modelNameList: [],
      pointSearchList: [],
      addRules: {
        vmType: [{ required: true, message: '请输入', trigger: 'blur' }],
        nodeId: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      operationVisible: false,
      operationForm: {
        policyId: ''
      },
      operationLabels: {
        policyId: '选择策略'
      },
      operationRules: {
        policyId: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      batchOperationList: []
    }
  },
  methods: {
    async addEquipment() {
      this.addVisible = true
      const { data: res1 } = await vendingMachineTypeList({ pageIndex: 1, pageSize: 100000 })
      const { data: res2 } = await pointSearch({ pageIndex: 1, pageSize: 100000 })
      this.modelNameList = res1.currentPageRecords.map(item => {
        return { name: item.name, typeId: item.typeId }
      })
      this.pointSearchList = res2.currentPageRecords.map(item => {
        return { name: item.name, id: item.id }
      })
    },
    addConfirm() {
      newVendingAircraft({ ...this.addForm, innerCode: undefined, createUserId: this.$store.getters.userId })
    },
    async batchOperation() {
      if (this.innerCodeList.length === 0) {
        return this.$message({
          message: '请勾选售货机',
          type: 'warning'
        })
      }
      const { data } = await getPolicyList()
      this.batchOperationList = data
      this.operationVisible = true
    },
    async  operationConfirm() {
      await getApplicationStrategy({ innerCodeList: this.innerCodeList, policyId: this.operationForm.policyId })
      this.$parent.$parent.vendingMachineList()
    }
  }
}
</script>

<style>

</style>
