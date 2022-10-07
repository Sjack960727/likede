<template>
  <el-dialog
    v-if="selectVisible"
    title="选择商品"
    :visible="selectVisible"
    :before-close="handleClose"
    :close-on-click-modal="false"
    width="858px"
  >
    <div class="contain-sort">
      <div class="header">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model.trim="formData.skuName" placeholder="请输入" size="medium" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" class="btn" @click="productSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="sortGoods">
        <div v-for="(item,index) in selectGoods" :key="item.skuName" :span="5" class="selected" @click="onselect(item,index)">
          <div class="sku">
            <img src="@/assets/common/select.png" alt="" :class="{imghidden:index!==curIndex}">
            <img :src="item.skuImage" alt="">
            <div>{{ item.skuName }}</div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-row type="flex" align="center" justify="center">
        <el-button type="primary" class="newlyBuild" @click="onconfirm">确认</el-button>
      </el-row>
    </div>
    <svg-icon icon-class="left" :class="['left-svg',{'acitve-svg':formData.pageIndex>1}]" @click="preBtn" />
    <svg-icon icon-class="right" :class="['right-svg',{'acitve-svg':formData.pageIndex<totalPage}]" @click="nextBtn" />
  </el-dialog>
</template>

<script>
import { productSearch } from '@/api'
export default {
  props: {
    selectVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        pageIndex: 1,
        pageSize: 10,
        skuName: undefined
      },
      selectGoods: [],
      activeShow: true,
      totalPage: 0,
      curIndex: null,
      goods: {}
    }
  },
  watch: {
    'formData.skuName': {
      handler() {
        this.formData.pageIndex = 1
        this.productSearch()
      }
    }
  },
  created() {
    this.productSearch()
  },
  methods: {
    handleClose() {
      this.$emit('update:selectVisible', false)
    },
    async productSearch() {
      const { data } = await productSearch(this.formData)
      this.selectGoods = data.currentPageRecords
      this.totalPage = data.totalPage
    },
    nextBtn() {
      this.formData.pageIndex++
      console.log(this.formData.pageIndex)
      if (this.formData.pageIndex > +this.totalPage) return
      this.productSearch()
    },
    preBtn() {
      if (this.formData.pageIndex <= 1) return
      this.formData.pageIndex--
      this.productSearch()
    },
    onselect(goods, index) {
      this.curIndex = index
      this.goods = goods
    },
    onconfirm() {
      this.$emit('changeCur', this.goods)
      this.handleClose()
    }

  }
}
</script>

<style lang="scss" scoped>
.sortGoods{
  margin-top:16px ;
  display: flex;
  flex-wrap: wrap;
  >div{
    width: 20%;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 10px;
  .sku{
    position: relative;
    height: 135px;
    padding-top: 16px;
    background-color: #f6f7fb;
    border-radius: 4px;
    text-align: center;
    img:nth-child(1){
      position: absolute;
      top: 0;
      left: 0;
    }
    img:nth-child(2){
      width: 84px;
      height: 78px;
      margin-bottom: 10px;
      }
    }
  }
}
.contain-sort{
  width: 750px;
  margin: 0 auto;
}
.left-svg{
    position: absolute;
    top: 50%;
    width: 50px!important;
    height: 50px!important;
    left: 0px;
    fill: #d8dde3;
    cursor: auto;
  }
  .right-svg{
    position: absolute;
    top: 50%;
    width: 50px!important;
    height: 50px!important;
    right: 0px;
    fill: #d8dde3;
    cursor: auto;
  }
  .acitve-svg{
    fill: #000;
    cursor: pointer;
  }
  .btn{
      min-width: 80px;
      height: 36px;
      padding: 0;
      background-color: #5f84ff;
    }
  .selected{
    cursor: pointer;
  }
  .imghidden{
    display: none;
  }
</style>
