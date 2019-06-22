<template>
  <div class="container"
       @click="toDormInfo">
    <div class="left">
      <div class="top"
           style="font-size: 18px;line-height: 1.25;">{{info.campusArea}}#{{info.building}}#{{info.bedroomName}}</div>
      <div class="bottom g-mt10"
           style="font-size: 14px;">{{info.shoolArea}}</div>
    </div>
    <div class="right">
      <!-- <div class="top"></div> -->
      <div class="bottom g-mt10"
           style="font-size: 12px;">{{info.honor}}</div>
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
  created () { },
  mounted () { },
  methods: {
    toDormInfo () {
      sessionStorage.currentDormInfo = JSON.stringify(this.info)
      this.$router.push({
        path: '/rate/detail'
      })
    }
  }
}
</script>
<style lang='less' scoped>
.container {
  width: calc(90% - 40px);
  // height: 50px;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  color: #fff;
  padding: 20px;
  background-image: linear-gradient(35deg, #ff386c 50%, #ffe467);
  margin-bottom: 10px;
  .left {
    width: 60%;
  }
  .right {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .top {
      width: 44px;
      height: 44px;
      background: #ffcece;
    }
  }
}
</style>
