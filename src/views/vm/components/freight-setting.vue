<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="freightVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="940px"
    >
      <div class="contain-body">
        <el-row type="flex" justify="space-between" align="middle" class="contain-top">
          <el-col :span="4" class="col">货道行数：{{ currentDetail.vmRow }}</el-col>
          <el-col :span="4" class="col">货道列数：{{ currentDetail.vmCol }}</el-col>
          <el-col :span="12" class="col">货道容量（个）：{{ currentDetail.channelMaxCapacity }}</el-col>
          <el-col :span="4"><button class="sort-btn" @click="getBusinessDistrictList">智能排货</button></el-col>
        </el-row>
        <div ref="scollRef" class="scoll-wrap">
          <div v-if="freightVisible" ref="wrapRef">
            <el-row v-for="(machine,index) in machineList" :key="index" type="flex">
              <div v-for="item in machine" :key="item.channelCode" class="item">
                <div class="code">{{ item.channelCode }}</div>
                <div class="sku">
                  <img v-if="item.sku" :src="item.sku.skuImage" alt="">
                  <img v-else src="@/assets/common/defaultImg.png" alt="">
                  <div>{{ item.sku ? item.sku.skuName : '暂无商品' }}</div>
                </div>
                <div class="bottom">
                  <span class="details" @click="addGoods(item)">添加</span>
                  <span :class="['dele-btn',{disable:!item.sku}]" @click="item.sku=null">删除</span>
                </div>
              </div>
            </el-row>
          </div>
        </div>
        <svg-icon v-if="machineList[0]?machineList[0].length>5:false" icon-class="left" :class="['left-svg',{'acitve-svg':!activeShow}]" @click="preBtn" />
        <svg-icon v-if="machineList[0]?machineList[0].length>5:false" icon-class="right" :class="['right-svg',{'acitve-svg':activeShow}]" @click="nextBtn" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-row type="flex" align="center" justify="center">
          <el-button type="primary" class="newlyBuild" @click="onconfirm">确 定</el-button>
        </el-row>
      </div>

    </el-dialog>
    <el-dialog
      title="智能排货"
      :visible.sync="sortVisible"
      :close-on-click-modal="false"
      width="858px"
    >
      <div class="contain-sort">
        <div class="header">
          该区域属于{{ businessName }}商圈适合销售一下商品：
        </div>
        <div class="sortGoods">
          <div v-for="item in recommendGoods" :key="item.skuName" :span="5">
            <div class="sku">
              <img :src="item.image" alt="">
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-row type="flex" align="center" justify="center">
          <el-button type="primary" class="newlyBuild" @click="confirmSuggest">采纳建议</el-button>
        </el-row>
      </div>
    </el-dialog>
    <select-product :select-visible.sync="selectVisible" @changeCur="changeCur" />
  </div>

</template>

<script>
import { getBusinessDistrictList, getReplenishmentRecommendation, freightLaneConfiguration } from '@/api'
import SelectProduct from './select-product.vue'
export default {
  components: {
    SelectProduct
  },
  props: {
    freightVisible: {
      type: Boolean,
      default: false
    },
    currentDetail: {
      type: Object,
      required: true
    },
    machineAisleList: {
      type: Array,
      required: true
    },
    businessId: {
      type: Number,
      required: true
    }
  },
  inject: ['form'],
  data() {
    return {
      activeShow: true,
      sortVisible: false,
      businessName: '',
      recommendGoods: [],
      selectVisible: false,
      channelId: '',
      a: 1
    }
  },
  computed: {
    machineList() {
      const arr = this.machineAisleList.reduce((pre, cur) => {
        const index = cur.channelCode[0] - 1
        if (pre[index] instanceof Array) {
          pre[index].push(cur)
        } else {
          pre[index] = []
          pre[index].push(cur)
        }
        return pre
      }, [])
      return arr
    }
  },
  methods: {
    handleClose() {
      this.activeShow = true
      this.$emit('update:freightVisible', false)
    },
    nextBtn() {
      this.activeShow = false
      this.$refs.wrapRef.classList.add('add-tran')
    },
    preBtn() {
      this.activeShow = true
      this.$refs.wrapRef.classList.remove('add-tran')
    },
    async getBusinessDistrictList() {
      const { data: res1 } = await getBusinessDistrictList(`/name/${this.businessId}`)
      this.businessName = res1
      const { data: res2 } = await getReplenishmentRecommendation(this.businessId)
      this.sortVisible = true
      this.recommendGoods = res2
    },
    confirmSuggest() {
      this.sortVisible = false
      const arr = this.machineAisleList.map((item, index) => {
        if (index < 10) {
          item.sku = {}
          item.sku.skuImage = this.recommendGoods[index].image
          item.sku.skuName = this.recommendGoods[index].skuName
        }
        return item
      })
      this.$emit('update:machineAisleList', arr)
    },
    async addGoods(item) {
      this.selectVisible = true
      this.channelId = item.channelId
    },
    changeCur(change) {
      // this.currGoods = item
      console.log(this.machineAisleList)
      this.machineAisleList.forEach(item => {
        if (item.channelId === this.channelId) {
          console.log(1)
          item.sku = change
        }
      })
      this.$forceUpdate()
      console.log({ machineAisleList: this.machineAisleList })
      console.log({ change })
    },
    async onconfirm() {
      const arr = this.machineAisleList.map(item => {
        const channelCode = item.channelCode
        const skuId = item.sku ? item.sku.skuId : '0'
        return { channelCode, skuId }
      })
      await freightLaneConfiguration({ innerCode: this.form.innerCode, channelList: arr })
      console.log(arr)
      this.$parent.vendingMachineList()
      this.handleClose()
    }

  }
}
</script>

<style lang="scss" scoped>
.contain-body{
    width: 847px;
    margin: 0 auto;
    .contain-top{
      margin-bottom: 16px;
      background: #f3f6fb;
      height: 56px;
    }
    .col{
      margin-left: 43px;
    }
    .sort-btn{
      background-color: #5f84ff;
      width: 80px;
      text-align: center;
      align-items: center;
      height: 36px;
      padding: 0;
      border: none;
      cursor: pointer;
      color: #fff;
      border-radius: 4px;
    }
    .scoll-wrap{
      >div{
        transition:all .5s ;
      }
      margin-bottom: -17px;
      margin-right: 17px;
      overflow-x: hidden;
      overflow-y: scroll;
      height: 365px;
      &::-webkit-scrollbar {
      width: 6px;
      background-color: transparent;
        }
      &::-webkit-scrollbar-thumb {
        background-color: hsla(0,0%,40%,.3);
        border-radius: 10px;
        }
      }
    .item{
      position: relative;
      margin-left: 8px;
      margin-right: 8px;
      width: 150px;
      height: 180px;
      background: #fff;
      -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
      border-radius: 4px;
      text-align: center;
      .code{
      position: absolute;
      top: 10px;
      left: 0;
      width: 43px;
      height: 23px;
      line-height: 23px;
      background: #829bed;
      border-radius: 0 10px 10px 0;
      font-size: 12px;
      color: #fff;
    }
    .bottom{
        width: 150px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        span:nth-child(2){
          margin-left: 10px;
        }
      }

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
  .add-tran{
    transform: translateX(-836px);
  }
}
.dialog-footer{
    margin-top: 20px;
  }
.sku{
  height: 135px;
  padding-top: 16px;
  background-color: #f6f7fb;
  border-radius: 4px;
  img{
    width: 84px;
    height: 78px;
    margin-bottom: 10px;
  }
}
.sortGoods{
  margin-top:16px ;
  display: flex;
  flex-wrap: wrap;
  >div{
    width: 20%;
    align-items: center;
    padding: 0 10px;
    .sku{
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 16px;
      background-color: #f6f7fb;
      border-radius: 4px;
      margin-bottom: 20px;
      img{
        width: 83px;
        height: 84px;
        object-fit: contain;
    }
  }

  }
}
.contain-sort{
  width: 750px;
  margin: 0 auto;
}
.disable{
    color: #ffdada;
    cursor: not-allowed
}
</style>
