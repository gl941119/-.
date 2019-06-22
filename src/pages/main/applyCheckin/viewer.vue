<template>
  <div class="container">
    <component :is="applyStatus"
               @changeStatus="changeStatus"
               v-bind="childrenData"></component>
  </div>
</template>
<script>
import edit from './index'
import detail from './detail'
import { listLastByMeUsingGET } from '@/api/auto'
export default {
  name: '',
  props: {
  },
  components: {
    edit,
    detail
  },
  data () {
    return {
      applyStatus: '',
      childrenData: {
        statusInfo: null,
        // 申请类型，1入住，3调宿，4校外， 5申请请假
        type: ''
      }
    }
  },
  mounted () {
    this.listLastByMeUsingGET()
  },
  methods: {
    changeStatus (type) {
      this.applyStatus = type
    },
    // 获取我提交的申请
    listLastByMeUsingGET () {
      listLastByMeUsingGET({ type: ~~this.childrenData.type })
        .then(res => {
          this.handleData(res.data)
        })
    },
    handleData (data) {
      // 没有申请记录或者最近一条记录为已撤销（4）时进入编辑状态
      if (!data || data[0].approveStatus === 4) {
        this.applyStatus = 'edit'
      } else {
        this.childrenData.statusInfo = data[0]
        this.applyStatus = 'detail'
      }
    }
  },
  created () {
    this.childrenData.type = ~~this.$route.query.type || 1
  }
}
</script>
<style lang="less" scoped>
</style>
