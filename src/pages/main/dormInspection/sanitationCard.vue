<template>
  <div class="card">
    <div style="line-height: 26px; position: reletive;">
      <span class="g-text-gray">{{info.checkDate | filterTimeNormol}}</span>
      <span class="level-container g-fr">
        <span class="circle"></span>
        <span class="level">{{info.level}}</span>
      </span>
    </div>
    <div style="line-height: 26px;">
      <span class="g-text-gray">得分</span>
      <span>&nbsp;&nbsp;&nbsp;{{info.score}}</span>
    </div>
    <div style="line-height: 26px;">
      <span class="g-text-gray">检查人</span>
      <span>&nbsp;&nbsp;&nbsp;{{info.dataList | peopleFilter}}</span>
    </div>
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
export default {
  name: '',
  props: {
    info: Object
  },
  mixins: [mixin],
  components: {},
  data () {
    return {
    }
  },
  filters: {
    peopleFilter: function (arr) {
      if (!arr) return ''
      var tempArr = []
      arr.forEach(item => {
        tempArr.push(item.checkUserName)
      })
      return tempArr.join('、')
    }
  },
  created () { },
  mounted () { },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.card {
  background: #fff;
  margin: 0 auto;
  width: 90%;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  .level-container {
    display: flex;
    align-items: center;
    .level {
      color: #f05c6e;
    }
    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: #f05c6e;
      margin-right: 5px;
    }
  }
}
</style>
