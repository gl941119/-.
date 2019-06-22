<template>
  <div class="card">
    <div style="line-height: 26px">
      <span class="g-text-gray" v-if="type">{{info.checkdate | filterTimeNormol}}</span>
      <span class="g-text-gray" v-else>{{info.violationDate | filterTimeNormol}}</span>
      <span class="level-container g-fr">
        <span class="circle"></span>
        <span class="level">{{info.status | filterStatus}}</span>
      </span>
    </div>
    <div style="line-height: 26px;"
         class="log-detail">
      <span class="g-text-gray log-detail-left">{{type? '违章内容':'状态'}}</span>
      <span class="log-detail-right" v-if="type">{{info.content}}</span>
      <span class="log-detail-right" v-else>{{info.violationType | filterViolationType}}</span>
    </div>
    <div style="line-height: 26px;"
         class="log-detail" v-if="type">
      <span class="g-text-gray log-detail-left">人员</span>
      <span class="log-detail-right" >{{info.studentNames}}</span>
    </div>
    <!-- <div style="line-height: 26px;"
         class="log-detail">
      <span class="g-text-gray log-detail-left">违章处理</span>
      <span class="log-detail-right">{{info.handle}}</span>
    </div> -->
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
export default {
  name: '',
  props: {
    info: Object,
    type: {
      default: true,
      type: Boolean
    }
  },
  mixins: [mixin],
  components: {},
  data () {
    return {
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
  // height: 70px;
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
  .log-detail {
    display: flex;
    .log-detail-left {
      width: 80px;
    }
    .log-detail-right {
      width: calc(100% - 100px);
      text-align: left;
      word-break: break-all;
    }
  }
}
</style>
