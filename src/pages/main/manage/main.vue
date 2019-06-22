<template>
  <div class="container">
    <div class="header">
      <div class="header_left">
      <p>{{info.name}}</p>
        <p>职位  {{info.roleName}}</p>
        <p>工号  {{info.sn}}</p>
      </div>
      <div class="header_right">
        <img src="../../../../static/img/ic_property_management.png" height="80" width="80" /></div>
    </div>
    <div class="main">
      <group >
        <cell
          v-for="(item, index) in views"
              :key="index"
              :title="item.title"
              value-align="left"
              is-link
              @click.native="nav(item.path)">
          <img
            slot="icon"
               width="25"
               style="display:block;margin-right:5px"
               :src="item.iconBase64">
        </cell>
      </group>
    </div>
  </div>

</template>
<script>

export default {
  name: 'min',
  props: {
  },
  data () {
    return {
      views: [{
        title: '卫生检查登记',
        path: '/manage/health',
        iconBase64: './static/img/manage/ic_clean_ inspection.png'
      },
      {
        title: '寝室违纪登记',
        path: '/manage/breakRule',
        iconBase64: './static/img/manage/ic_disciplinary_reg.png'
      },
      {
        title: '晚归未归登记',
        path: '/manage/notBack',
        iconBase64: './static/img/manage/ic_late_reg.png'
      },
      {
        title: '入住信息查看',
        path: '/manage/checkInfo',
        iconBase64: './static/img/manage/ic_clean_ inspection.png'
      }
      // ,
      // {
      //   title: '管辖区域查看',
      //   path: '/manage/manageArea',
      //   iconBase64: './static/img/manage/ic_admin_areas.png'
      // }
      ]
    }
  },
  computed: {
    info () {
      return JSON.parse(window.sessionStorage.getItem('userInfo'))
    }
  },
  mounted () {
    // 震动反馈
    // navigator.vibrate(2000)
    // document.title = '星级寝室检查'
    let that = this
    window.addEventListener('pagehide', e => {
      that.init()
    })
  },
  destroyed () {
    window.removeEventListener('pagehide', () => {})
  },
  methods: {
    nav (path) {
      this.$router.push({
        path: path
      })
    }
  },
  created () {

  }
}
</script>
<style lang="less" scoped>
  div{
    box-sizing: border-box;
  }

  .container {
    height: 100vh;
    overflow-y: scroll;
    background-color: #efeff4;
    .header{
      padding: 38px 50px 43px;
      height:160px;
      background:rgba(255,255,255,1);
      display: flex;
      justify-content: space-between;
      &_left{
        >p{
          font-size:13px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(0,0,0,0.73);
          line-height:22px;
        }
        p:first-child{

          font-size:24px;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
         }
        p:nth-child(2){
          margin-top: 10px;
        }
      }
      &_right{

      }
    }
    .main{
    height: 100%;
      margin-top: 10px;
      background-color: white;
    }
  }
  .weui-cell:before{
    left: 0!important;
  }

</style>
