<template>
  <div class="pagination-container">
    <div class="myPagination">
      <div class="total">
        共{{ total }}条记录 &nbsp;&nbsp; 第{{ currentPage }}/{{ totalPage }}页
      </div>
      <div>
        <button :disabled="currentPage==1" @click="currentPageChange(-1)">上一页</button>
        <button :disabled="currentPage==totalPage" @click="currentPageChange(1)">下一页</button>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'MyPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    currentPageChange(val) {
      console.log(this.currentPage + val)
      this.$emit('changePageEvent', this.currentPage + val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container{
  background: #fff;
  padding: 32px 16px;
  .myPagination {
  display: flex;
  justify-content:space-between;
  font-size: 16px;
  padding: 0;
  button {
    width: 70px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
    outline: none;
    border:none;
    color: #606266;
    height: 32px;
    line-height:32px;
  }
  button:disabled {
    background: #edf0f9;
    color: #d8dde3;
    cursor: no-drop;
  }
  .total {
    margin-right: 10px;
    font-weight: 400;
    color: #dbdfe5;
    height: 32px;
    line-height:32px;
  }
}
}
</style>
