<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="loginFormRules" auto-complete="on" label-position="left">

      <img src="@/assets/common/logo.png" alt="" class="login-logo">
      <el-form-item prop="loginName">
        <span
          class="svg-container"
        ><i
          class="el-icon-mobile-phone"
        /></span>
        <el-input v-model="loginForm.loginName" placeholder="请输入账号" maxlength="18" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i
            class="el-icon-lock"
          />
        </span>
        <el-input ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" maxlength="18" />
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType==='password'? 'eye':'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="verifycode">
        <el-row>
          <el-col :span="17"><span class="svg-container">
                               <i
                                 class="el-icon-circle-check"
                               />
                             </span>
            <el-input v-model="loginForm.verifycode" placeholder="请输入验证码" maxlength="4" />
          </el-col>
          <el-col :span="7"><div class="verifycode" @click="updateVerifycodeImg"><img :src="verifycodeImg" alt=""></div></el-col>

        </el-row></el-form-item>

      <el-button :loading="loading" class="loginbtn" style="width:100%;margin-bottom:30px;" @click="login">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { getVerifycodeImgAPI } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        verifycode: ''
      },
      clientToken: '',
      verifycodeImg: '',
      msg: '',
      loginData: {},
      passwordType: 'password',
      loading: false,
      loginFormRules: {
        loginName: [{ required: true, message: '请输入账号' }],
        password: [{ required: true, message: '请输入密码' }],
        verifycode: [{ required: true, message: '请输入验证码' }]
      }
    }
  },
  watch: {

  },
  created() {
    this.getVerifycodeImg()
  },
  methods: {
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async getVerifycodeImg() {
      this.clientToken = Math.random()
      const data = await getVerifycodeImgAPI(this.clientToken)
      this.verifycodeImg = `http://likede2-admin.itheima.net/likede/${data.config.url}`
    },
    updateVerifycodeImg() {
      this.getVerifycodeImg()
    },
    async login() {
      try {
        this.loading = true
        this.loginData.loginName = this.loginForm.loginName
        this.loginData.password = this.loginForm.password
        this.loginData.code = this.loginForm.verifycode
        this.loginData.clientToken = this.clientToken
        this.loginData.loginType = 0
        // console.log(this.loginData)
        await this.$store.dispatch('user/loginAction', this.loginData)
        this.msg = this.$store.state.user.userInfo.msg
        if (this.msg === '验证码错误') {
          this.$message.error(this.msg)
        }
        if (this.msg === '登录成功') {
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-repeat: no-repeat;
  background-size: cover;
  // background-position: center;
  .login-logo{
    position: absolute;
    width: 96px;
    height: 96px;
    top: -50px;
    left: 50%;
    margin-left: -48px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #e2e2e2;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
  .verifycode{
    background-color: #eee;
    height: 52px;
  }
  .loginbtn{
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -190px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
