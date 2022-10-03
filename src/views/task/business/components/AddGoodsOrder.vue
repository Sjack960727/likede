<template>
  <el-dialog
    title="补货详情"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose"
    custom-class="add-goods"
  >
    <el-table
      empty-text="暂无数据"
      :data="goodsList"
      max-height="370"
    >
      <el-table-column prop="channelCode" label="货道编号" width="92" />
      <el-table-column prop="sku.brandName" label="商品名称" width="92" />
      <el-table-column prop="currentCapacity" label="当前数量" width="92" />
      <el-table-column prop="expectCapacity1" label="还可添加" width="92" />
      <el-table-column prop="expectCapacity" label="补满数量">
        <template slot-scope="{row}">
          <el-input-number
            v-if="row.sku"
            v-model="row.expectCapacity"
            controls-position="right"
            :min="0"
            :max="row.expectCapacity1"
          />
          <span v-else>货道暂无商品</span>
        </template>
      </el-table-column>
    </el-table>

    <el-row justify="center" type="flex">
      <el-button type="primary" size="medium" class="allocationbtn" style="background-color: #fbf4f0;border:none;color: #655b56" @click="handleClose">取消</el-button>
      <el-button type="primary" size="medium" style="background: linear-gradient(135deg,#ff9743,#ff5e20);border:none" @click="confirmAddGoods">确认</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { treeToArray } from '@/utils/index'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      goodsList: [],
      goodsInfo: {
        channelCode: '',
        expectCapacity: null,
        skuId: '',
        skuName: '',
        skuImage: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
    },
    confirmAddGoods() {
      const arr = this.goodsList.filter(ele => ele.sku !== null && ele.expectCapacity1 !== 0)
      treeToArray(arr)
      const detail = arr.map(ele => {
        const obj = {}
        Object.keys(this.goodsInfo).forEach(item => {
          obj[item] = ele[item]
        })
        return obj
      })
      this.$emit('setDetail', detail)
      this.handleClose()
    }
  }
}
</script>

<style lang="scss">
.add-goods{
    height:508px;
    border-radius: 8px;
    .el-dialog__body{
        padding-top: 0;
        padding-bottom: 0;
    .el-row{
        margin-top: 20px;
    }
    }
    .el-table .cell{
        text-overflow:unset;
    }
}
</style>
