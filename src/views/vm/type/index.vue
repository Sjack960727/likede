<template>
  <div>
    <div class="dashboard-container">
      <Banner :form-inline="formInline" @search="search">
        <template #name>
          <el-input v-model="pageForm.name" size="medium" placeholder="请输入" />
        </template>
      </Banner>
      <el-card class="result">
        <el-row type="flex" class="operation-btn">
          <el-button type="primary" icon="el-icon-circle-plus-outline" class="newlyBuild" @click="addVisible=true">新建</el-button>
        </el-row>

        <lin-tabel :table-data="tableData" :labels="labels" :current-page="pageForm.pageIndex" operation-width="150px">
          <template #image="{scope}">
            <img
              :src="scope.image"
              class="baseImg"
            >
          </template>
          <template #operation="{scope}">
            <div class="operation">
              <span class="details" @click="edit(scope)">修改</span>
              <span class="dele-btn" @click="dele(scope)">删除</span>
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
    </div>
    <add-management :visible.sync="addVisible" />
    <edit-management :form-data="formData" :visible.sync="editVisible" />
  </div>

</template>

<script>
import Banner from '@/components/Banner'
import LinTabel from '@/components/Table'
import LinPage from '@/components/Page'
import { vendingMachineTypeList, vendingMachineTypeDeletion } from '@/api'
import AddManagement from './components/add-management.vue'
import EditManagement from './components/edit-management.vue'
export default {
  components: {
    Banner,
    LinTabel,
    LinPage,
    AddManagement,
    EditManagement
  },
  data() {
    return {
      formInline: {
        name: '型号搜索'
      },
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined
      },
      formData: {
        name: '',
        model: '',
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: undefined,
        image: ''
      },
      totalPage: 0,
      total: 0,
      tableData: [],
      labels: {
        'name': '型号名称',
        'model': '型号编码',
        'image': '设备图片',
        'vmRow': '货道行',
        'vmCol': '货道列',
        'channelMaxCapacity': '设备容量'
      },
      addVisible: false,
      editVisible: false
    }
  },
  watch: {
    'pageForm.name': {
      handler(val) {
        this.pageForm.pageIndex = 1
      }
    }
  },
  created() {
    this.vendingMachineTypeList()
  },
  methods: {
    async vendingMachineTypeList() {
      const { data } = await vendingMachineTypeList(this.pageForm)
      this.totalPage = +data.totalPage
      this.total = +data.totalCount
      this.tableData = data.currentPageRecords
      console.log(data)
    },
    handleCurrentChange() {
      this.vendingMachineTypeList()
    },
    search() {
      this.vendingMachineTypeList()
    },
    edit(scope) {
      this.editVisible = true
      this.formData = scope
    },
    async  dele({ typeId }) {
      await vendingMachineTypeDeletion(typeId)
      this.vendingMachineTypeList()
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
  .baseImg{
    display: block;
    width: 24px;
    height: 24px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    background: #f3f6fb;
    border: 1px solid #f3f6fb;
  }

</style>
