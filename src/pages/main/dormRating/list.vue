<template>
  <div class="container">
    <!-- <x-header title="寝室评比" /> -->
    <div style="background: #EFEFF4;height: calc(100vh - 30px);padding: 15px 0;overflow-y:scroll;"
         v-if="total">
      <list-item v-for="(item, index) in rateData"
                 :key="index"
                 :index="index"
                 :info="item" />
    </div>
    <div style="background: #EFEFF4;height: calc(100vh - 30px);padding: 15px 0;overflow-y:scroll;"
         v-else>暂无数据</div>
  </div>
</template>
<script>
import listItem from './listItem'
import { listPageUsingPOST } from '@/api/auto'
export default {
  name: '',
  props: {
  },
  mixins: [],
  components: {
    listItem
  },
  data () {
    return {
      rateData: [],
      total: 0,
      params: {
        page: 1,
        size: 10000,
        status: 3
      }
    }
  },
  created () { },
  mounted () {
    this.query()
  },
  methods: {
    query () {
      // 获取公示中的寝室评比，数据量不会太多，没有用分页size设置为10000
      listPageUsingPOST(this.params)
        .then(res => {
          if (res.data && res.data.list) {
            this.total = res.data && res.data.total
            this.rateData = this.rateData.concat(res.data.list)
          }
        })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
