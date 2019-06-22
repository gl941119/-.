<template>
  <div class="container">
    <search @search="search" />
    <div v-if="init"
         class="result-container">
      <div v-if="!noResult">
        <p style="color: #878787;">搜索结果</p>
        <div>
          <div v-for="(item, index) in roomList"
               :key="index"
               style="line-height: 1.5;"
               @click="toParent(item)">
            {{item.detailInfo}}
          </div>
        </div>
      </div>
      <div v-else>暂无结果</div>
    </div>
  </div>
</template>
<script>
import { listRommByNameUsingGET } from '@/api/auto'
export default {
  name: '',
  props: {
  },
  data () {
    return {
      value: '',
      init: false,
      noResult: false,
      roomList: []
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
      this.init = true
      listRommByNameUsingGET(word)
        .then(res => {
          if (!res.data || !res.data.length) {
            this.noResult = true
          } else {
            this.noResult = false
            this.roomList = res.data
          }
        })
    },
    toParent (item) {
      sessionStorage.currentRoom = JSON.stringify(item)
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
