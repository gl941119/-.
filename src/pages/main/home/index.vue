<template>
  <div class="container">
    <!-- <x-header title="住宿管理"/> -->
    <info-card :info="userInfo" />
    <div style="height: 10px;background-color: #EDEDF2;"></div>
    <group>
      <cell v-for="(item, index) in views"
            :key="index"
            :title="item.title"
            value-align="left"
            is-link
            @click.native="nav(item.path, {id: userId})">
        <img slot="icon"
             width="25"
             style="display:block;margin-right:5px;"
             :src="item.iconBase64">
      </cell>
    </group>
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
import { getStudentInfoUsingGET, getStudentBedInfoUsingGET } from '@/api/auto'
import infoCard from './infoCard'
export default {
  name: '',
  mixins: [mixin],
  props: {
  },
  components: {
    infoCard
  },
  data () {
    return {
      userId: 12,
      userInfo: {
      },
      views: [{
        title: '寝室成员',
        path: '/merber',
        iconBase64: './static/img/ic_roommate@2x.png'
      },
      {
        title: '入住申请',
        path: '/applyCheckin/viewer?type=1',
        iconBase64: './static/img/ic_dorm_application@2x.png'
      },
      {
        title: '调宿申请',
        path: '/applyCheckin/viewer?type=3',
        iconBase64: './static/img/ic_Accommodation_transfer@2x.png'
      },
      {
        title: '校外住宿',
        path: '/applyCheckin/viewer?type=4',
        iconBase64: './static/img/ic_off_campus_housing@2x.png'
      },
      {
        title: '寝室检查',
        path: '/inspection',
        iconBase64: './static/img/ic_check_the_dorm@2x.png'
      },
      {
        title: '寝室评比',
        path: '/rate/list',
        iconBase64: './static/img/ic_compare_the_dorm@2x.png'
      },
      {
        title: '上传请假单',
        path: '/applyCheckin/viewer?type=5',
        iconBase64: './static/img/ic_dorm_application@2x.png'
      }
      ]
    }
  },
  mounted () {
    this.stuApi()
  },
  methods: {
    // 获取当前登录学生用户信息、床位信息
    async stuApi () {
      let userInfo = await getStudentInfoUsingGET()
      let bedInfo = await getStudentBedInfoUsingGET()
      userInfo.data.bedInfo = bedInfo.data
      sessionStorage.userInfo = JSON.stringify(userInfo.data)
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.userInfo)
  }
}
</script>
<style lang="less" scoped>
</style>
