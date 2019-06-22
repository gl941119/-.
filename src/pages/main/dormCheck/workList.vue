<template>
  <div class="container">
    <search @search="search"
            :placeholder="placeholder" />
    <div v-if="init"
         class="result-container">
      <div v-if="!noResult">
        <p style="color: #878787;">搜索结果</p>
        <div>
          <div v-for="(item, index) in workList"
               :key="index"
               style="line-height: 1.5;"
               @click="toParent(item)">
            <p>{{item.name}}</p>
            <p>{{item.startAt | filterTimeNormol}}至{{item.endAt | filterTimeNormol}}</p>
          </div>
        </div>
      </div>
      <div v-else>暂无结果</div>
    </div>
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
import { listCheckWorkUsingPOST } from '@/api/auto'
export default {
  name: '',
  props: {
  },
  mixins: [mixin],
  data () {
    return {
      value: '',
      placeholder: '请输入星级检查名称',
      init: false,
      noResult: false,
      workList: []
    }
  },
  methods: {
    search (word) {
      let hasPerent = word.indexOf('%') > -1
      if (!word.trim()) {
        word = null
      }
      if (hasPerent) {
        word = -1
      }
      let obj = {
        checkType: 1,
        workNameOrUserName: word,
        status: 2,
        page: 1,
        size: 10000
      }
      this.init = true
      listCheckWorkUsingPOST(obj)
        .then(res => {
          if (!res.data || !res.data.list || !res.data.list.length) {
            this.noResult = true
          } else {
            this.noResult = false
            this.workList = res.data.list
          }
        })
    },
    toParent (item) {
      sessionStorage.workInfo = JSON.stringify(item)
      this.$router.push({
        path: '/check/main'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  .result-container {
    padding: 13px;
  }
}
</style>
