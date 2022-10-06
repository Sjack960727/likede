<template>
  <el-dialog
    title="补货详情"
    :visible="dialogVisible"
    width="45%"
    :before-close="handleClose"
    custom-class="add-goods"
  >
    <div class="">
      <el-table ref="aabb" empty-text="暂无数据" :data="detailList" max-height="370">
        <el-table-column prop="channelCode" label="货道编号" />
        <el-table-column prop="skuName" label="商品" />
        <el-table-column prop="expectCapacity" label="补货数量" />
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { getSupplyGoodsDetail } from '@/api/workorder'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      detailList: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
    },
    async getSupplyGoodsDetail(id) {
      const { data } = await getSupplyGoodsDetail(id)
      this.detailList = data
      // console.log(res)
    }
  }
}
</script>

<style>

</style>
