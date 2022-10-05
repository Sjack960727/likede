<template>
  <div v-if="total>10" class="lin-pagination-container">
    <div class="lin-pagination-left">
      共{{ total }}条记录 第{{ currentPage }}/{{ totalPage }}页
    </div>
    <div class="lin-pagination-right">
      <button class="left-btn" :class="{disable:currentPage<=1}" :disabled="currentPage<=1" @click="previousPage">上一页</button>
      <button class="right-btn" :class="{disable:currentPage===totalPage}" :disabled="currentPage===totalPage" @click="nextPage">下一页</button>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    // 总数
    total: {
      type: Number,
      required: true
    },
    // 当前页码
    currentPage: {
      type: Number,
      required: true
    },
    // 条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总页数
    totalPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    previousPage() {
      this.$emit('update:currentPage', this.currentPage - 1)
      this.$emit('current-change', this.currentPage - 1)
    },
    nextPage() {
      this.$emit('update:currentPage', this.currentPage + 1)
      this.$emit('current-change', this.currentPage + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .lin-pagination-container{
    background: rgb(255, 255, 255);
    padding: 32px 16px;
    display: flex;
    justify-content: space-between;
  }
  .lin-pagination-left{
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
    color: #dbdfe5;
  }
  .lin-pagination-right{
  .left-btn,.right-btn{
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    border: none;
    background-color: #d5ddf8;
    color:#606266;
    cursor: pointer;
  }
  .disable{
    background-color: #d5ddf8;
    color: #bbbcc3;
    cursor: not-allowed
  }
}

</style>
