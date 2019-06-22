<template>
  <div class="container">
    <div style="margin-left: 10%;margin-top: 55px;">
      <div style="font-size: 32px;color: #333;">浙江长征职业技术学院</div>
      <div style="font-size: 32px;color: #333;font-weight: bold;line-height: 2;">住宿管理</div>
      <div style="color: #41B0EF;line-height: 4;">Hi,欢迎登陆</div>
    </div>
    <div class="form">
      <x-input placeholder="请输入用户名"
               novalidate
               :icon-type="iconType"
               :show-clear="false"
               v-model="params.sn"
               @on-blur="onBlur"
               class="input-text"></x-input>
      <x-input placeholder="请输入密码"
               novalidate
               :icon-type="iconType"
               :show-clear="false"
               v-model="params.password"
               @on-blur="onBlur"
               class="input-text"
               type="password"></x-input>
      <x-button class="login-btn"
                text="登录"
                type="primary"
                @click.native="login">
      </x-button>
    </div>
    <div class="footer">
      <img src="./../../../static/img/ic_wuhan_university.png"
           class="img">
    </div>
  </div>
</template>
<script>
import { loginByInstructorUsingPOST, loginByStudentUsingPOST, listSchoolAreaUsingGET, getStudentInfoUsingGET, getUserInfoUsingGET, getStudentBedInfoUsingGET } from '@/api/auto'
export default {
  name: '',
  props: {
  },
  data () {
    return {
      iconType: '',
      params: {
        sn: '',
        password: ''
      },
      isTeacher: false
    }
  },
  mounted () {

  },
  methods: {
    async listSchoolAreaUsingGET () {
      let res = await listSchoolAreaUsingGET()
      sessionStorage.schoolArea = JSON.stringify(res.data)
    },
    onBlur (val) {
      console.log('on blur', val)
    },
    login () {
      if (this.isTeacher) {
        loginByInstructorUsingPOST(this.params)
          .then(res => {
            if (res.data.name === '住楼辅导员') {
              this.getUserInfo()
            } else {
              this.$vux.alert.show({
                content: '用户角色不正确',
                onHide () {
                }
              })
            }
          })
      } else {
        loginByStudentUsingPOST(this.params)
          .then(res => {
            if (res.data.name === '学生') {
              this.stuApi()
            } else {
              this.$vux.alert.show({
                content: '用户角色不正确',
                onHide () {
                }
              })
            }
          })
      }
    },
    // 获取当前登录学生用户信息、床位信息
    async stuApi () {
      let userInfo = await getStudentInfoUsingGET()
      let bedInfo = await getStudentBedInfoUsingGET()
      userInfo.data.bedInfo = bedInfo.data
      sessionStorage.userInfo = JSON.stringify(userInfo.data)
      this.$router.push('/home')
      this.listSchoolAreaUsingGET()
    },
    getUserInfo () {
      getUserInfoUsingGET()
        .then((res) => {
          sessionStorage.userInfo = JSON.stringify(res.data)
          this.$router.push('/manage')
          this.listSchoolAreaUsingGET()
        })
    }
  },
  created () {
    this.isTeacher = this.$route.query.r === 's'
  }
}
</script>
<style lang="less" scoped>
.container {
  position: relative;
  min-height: 600px;
}
.form {
  width: 100%;
  margin: 0 auto;
  overflow: auto;
  .input-text {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 10px;
    height: 42px;
    line-height: 42px;
    background: #fbfafc;
    color: #000;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px rgba(214, 213, 214, 1) solid;
  }
  .login-btn {
    width: 80%;
    margin: 0 auto;
    margin-top: 40px;
  }
}
.footer {
  position: absolute;
  bottom: 25px;
  width: 100%;
  .img {
    width: 32%;
    margin: 0 auto;
    display: block;
  }
}
</style>
<style>
.form .weui-cell:before {
  border-top: none;
}
</style>
