<template>
  <div class="container-flow g-mt10">
    <div class="avater-container"
         v-for="(item, index) in flow"
         :key="index">
      <div class="left">
        <img src="./../../../../static/img/ic_counsellor.png"
             class="avater">
        <p class="role-name g-lh">{{item.roleName}}</p>
      </div>
      <img src="./../../../../static/img/ic_arrow_h.png"
           v-if="index !== flow.length - 1"
           class="arrow" />
    </div>
  </div>
</template>
<script>
import { listFlowSettingUsingGET } from '@/api/special'
export default {
  name: '',
  props: {
    flowId: String
  },
  mixins: [],
  components: {},
  data () {
    return {
      flow: []
    }
  },
  created () { },
  mounted () {
    this.listFlowSettingUsingGET()
  },
  methods: {
    listFlowSettingUsingGET () {
      listFlowSettingUsingGET(~~this.flowId)
        .then(res => {
          this.flow = res.data
          if (!this.flow || !this.flow.length) {
            let that = this
            this.$vux.alert.show({
              content: '没有配置审批流程,请稍后再试',
              onHide () {
                that.$router.go(-1)
              }
            })
          }
        })
    }
  }
}
</script>
<style lang='less' scoped>
.container-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .arrow {
    width: 17px;
    height: 8px;
    margin: 0 9px;
    position: relative;
    top: -10px;
  }
  .avater-container {
    display: flex;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avater {
        width: 46px;
        height: 47px;
      }
      .role-name {
        color: #333;
        font-size: 12px;
        line-height: 1.5;
      }
    }
  }
}
</style>
