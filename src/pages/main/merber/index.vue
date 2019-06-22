<template>
  <div class="container">
    <!-- <x-header title="寝室成员" /> -->
    <div>
      <item-merber v-for="(item, index) in merbers"
                   :key="index"
                   :info="item" />
    </div>
  </div>
</template>
<script>
import { listStudentByRoomIdAndDateUsingGET } from '@/api/auto'
export default {
  name: '',
  props: {},
  data () {
    return {
      merbers: []
    }
  },
  mounted () {
    this.listStudentByRoomIdAndDate()
  },
  methods: {
    // 根据寝室id查询学生信息
    listStudentByRoomIdAndDate () {
      let that = this
      let userInfo = JSON.parse(sessionStorage.userInfo)
      if (userInfo && userInfo.bedInfo && userInfo.bedInfo.bedroomId) {
        listStudentByRoomIdAndDateUsingGET(userInfo.bedInfo.bedroomId, new Date().toString())
          .then(res => {
            this.merbers = res.data
          })
      } else {
        this.$vux.alert.show({
          content: '当前登录用户没有入住信息',
          onHide () {
            that.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
