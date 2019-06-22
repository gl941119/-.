<template>
  <div class="container"
       @click="toList">
    <div class="title g-text-lh">{{info.name}}</div>
    <div class="g-mt10 g-mb10">
      <span v-for="(item, index) in info.schoolAreas"
            class="area-item"
            :key="index">{{formatSchoolName(item)}}</span>
    </div>
    <div class="bottom">
      <div style="display: inline-block;">
        <span><img src="./../../../../static/img/ic_glory@2x.png"
               style="width: 14px;height: 14px;">{{formatRate(info.rateType)}}</span>
      </div>
      <span class="g-fr">{{info.createAt | filterTimeMM}}-{{info.endAt | filterTimeMM}}</span>
    </div>
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
export default {
  name: '',
  props: {
    info: Object,
    index: Number
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
    toList () {
      sessionStorage.listItem = JSON.stringify(this.info)
      this.$router.push({
        path: '/rate/result'
      })
    }
  }
}
</script>
<style lang='less' scoped>
.container {
  background: #fff;
  margin: 0 auto;
  width: 90%;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  .title {
    font-size: 17px;
    font-weight: bold;
    color: #333;
  }
  .area-item {
    background: #e5e5e5;
    color: #666;
    padding: 4px;
    border-radius: 2px;
    font-size: 12px;
    display: inline-block;
    margin-right: 4px;
  }
  .bottom {
    position: relative;
    font-size: 13px;
    color: #c7c7c7;
  }
}
</style>
