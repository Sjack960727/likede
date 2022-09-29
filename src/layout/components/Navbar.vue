<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="logo"> <img src="../../assets/common/logoone.png" alt=""></div>
    <div class="right-menu">
      <el-row>
        <el-col :span="5"><img src="../../assets/common/user.png" alt="" class="avatar"></el-col>
        <el-col :span="14"><p>欢迎您,admin</p></el-col>
        <el-col :span="5" style="vertical-align: middle;">  <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
          <el-button @click="logout">退出<i class="el-icon-caret-bottom" /> </el-button>
        </el-tooltip></el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    // this.$store.dispatch('user/getUserInfo')
  },
  methods: {
    async logout() {
      console.log(111)
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: fixed;
  left: 0;
  width: 100%;
  background: #fff;
  background-image: url('~@/assets/common/backgroundone.png');
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
.logo{
  float: left;
  line-height: 60px;
  img{
    margin-top: 10px;
    margin-left: 15px;
    width: 88px;
  }

}
  .right-menu {
    float: right;
    height: 100%;
    width: 240px;
    margin-right: 24px;
    line-height: 60px;
    display: flex;
    .el-row{
      width: 240px;
      margin-right: 24px;
    }
    .avatar{
      line-height: 60px;
      width: 35px;
      height: 35px;
      border-radius: 5px;
       vertical-align: middle;
    }
    p{
      vertical-align: middle;
      line-height: 60px;
      margin: 0;
      margin-left: 10px;
      color: #fff;
      font-size: 16px;
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
    }
    .el-button{
      padding: 0;
      font-size: 18px;
      color: #fff;
      background-color: transparent;
      border: none;
      vertical-align: middle;
      cursor: pointer;
      span{
        margin-right: 100px;
      }
    }
  }
}
</style>
