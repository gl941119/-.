<template>
  <div class="container">
    <img src="./../../../../static/img/ic_pass@2x.png"
         v-if="statusInfo.approveStatus === 2"
         class="status-img">
    <img src="./../../../../static/img/ic_rejected@2x.png"
         v-if="statusInfo.approveStatus === 3"
         class="status-img">
    <div class="stu-info g-bg-white g-padding-h g-mb10">
      <form-title title="基本信息"
                  style="padding-top: 8px;"
                  :blue="true"></form-title>
      <div style="line-height: 2;">
        <span style="font-size: 16px;"><strong>{{userInfo.name}}</strong></span>
        <span class="g-text-gray">{{userInfo.sn}}</span>
      </div>
      <div style="line-height: 2;">
        <span class="g-text-gray">{{userInfo.collegeName}}&nbsp;{{userInfo.majorName}}&nbsp;{{userInfo.className}}</span>
      </div>
      <div class="right-bottom">
      </div>
    </div>
    <div class="stu-info g-bg-white g-padding-h g-mb10" v-if="statusInfo.type === 5">
      <form-title title="请假时间段"
                  style="padding-top: 8px;"
                  :blue="true"></form-title>
      <div style="line-height: 2;">
        <span>{{statusInfo.leaveStart | filterTimeCn}}-{{statusInfo.leaveEnd | filterTimeCn}}</span>
      </div>
    </div>
    <div v-else>
    <div class="stu-info g-bg-white g-padding-h g-mb10">
      <form-title title="当前入住"
                  style="padding-top: 8px;"
                  :blue="true"></form-title>
      <div style="line-height: 2;">
        <span>{{statusInfo.beforBedInfo || '无'}}</span>
      </div>
    </div>
    <div class="stu-info g-bg-white g-padding-h g-mb10"
         v-if="(statusInfo.type === 3 || statusInfo.type === 1) && statusInfo.approveStatus === 2">
      <form-title title="分配入住"
                  style="padding-top: 8px;"
                  :blue="true"></form-title>
      <div style="line-height: 2;">
        <span>{{statusInfo.afterBedInfo || '暂未分配'}}</span>
      </div>
    </div>
    <div class="stu-info g-bg-white g-padding-h g-mb10">
      <form-title title="备注"
                  style="padding-top: 8px;"
                  :blue="true"></form-title>
      <div style="line-height: 2;">
        <span>{{statusInfo.applyReason}}</span>
      </div>
    </div>
    </div>
    <div class="stu-info g-bg-white g-padding-h g-mb10">
      <form-title title="申请材料"
                  style="padding-top: 8px;"
                  :blue="true"></form-title>
      <div class="imgs g-mt10">
        <img v-for="(item, index) in materialImgs"
             :key="index"
             :src="item.filePath ? fileServer.download + '?filePath=' + item.filePath : item.tempSrc"
             class="material-img g-mb10" />
      </div>
    </div>
    <div class="stu-info g-bg-white g-padding-h g-mb10">
      <form-title title="审批流程"
                  style="padding-top: 8px;"
                  :blue="true"></form-title>
      <flow :flowInfo="flowInfo"></flow>
    </div>
    <div class="btn-container g-padding-h g-mb10"
         v-if="statusInfo.approveStatus !== 2">
      <button style="width: 45%;"
              class="btn"
              v-if="statusInfo.approveStatus !== 3"
              @click="recallTasksUsingPOST">撤销申请</button>
      <button style="width: 45%;"
              class="btn"
              @click="reSubmit(0)">重新提交</button>
    </div>
    <!-- 入住申请和调宿申请在通过并且已分配情况才能再次提交；校外住宿申请通过即可再次提交 -->
    <div class="btn-container g-padding-h g-mb10"
         v-if="(statusInfo.type === 1 || statusInfo.type === 3) && statusInfo.approveStatus === 2 && statusInfo.afterBedInfo">
      <button style="width: 45%;"
              class="btn"
              @click="reSubmit(1)">再次提交</button>
    </div>
    <div class="btn-container g-padding-h g-mb10"
         v-if="statusInfo.type === 4 && statusInfo.approveStatus === 2">
      <button style="width: 45%;"
              class="btn"
              @click="reSubmit(1)">再次提交</button>
    </div>
  </div>
</template>
<script>
import { fileServer } from '@/config'
import { findApplyDetailUsingGET, recallTasksUsingPOST } from '@/api/auto'
import { mixin } from '@/tools/mixins'
export default {
  name: 'ApplyDetail',
  mixins: [mixin],
  props: {
    statusInfo: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      userInfo: {},
      flowInfo: [],
      materialImgs: [],
      fileServer: fileServer
    }
  },
  created () {
    // 申请材料图片JSON转换
    try {
      this.materialImgs = JSON.parse(this.statusInfo.images)
    } catch (error) {
      this.materialImgs = []
    }
    this.userInfo = JSON.parse(sessionStorage.userInfo) || {}
  },
  mounted () {
    this.findApplyDetailUsingGET()
  },
  methods: {
    // 获取审批流程信息
    findApplyDetailUsingGET () {
      findApplyDetailUsingGET(this.statusInfo.id)
        .then(res => {
          this.flowInfo = res.data
        })
    },
    // 撤销申请
    recallTasksUsingPOST () {
      let that = this
      recallTasksUsingPOST(this.statusInfo.id)
        .then(() => {
          this.$vux.alert.show({
            content: '撤回成功',
            onShow () {
              console.log('Plugin: I\'m showing')
            },
            onHide () {
              console.log('Plugin: I\'m hiding')
              that.$router.push({
                path: '/home'
              })
            }
          })
        })
    },
    // 再次提交事件，如果当前申请为被驳回状态，则不调撤销接口，直接重新填表单
    reSubmit (noRecall) {
      let that = this
      if (this.statusInfo.approveStatus === 3 || noRecall) {
        that.$emit('changeStatus', 'edit')
      } else {
        recallTasksUsingPOST(this.statusInfo.id)
          .then(() => {
            that.$emit('changeStatus', 'edit')
          })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.container {
  background-color: #efeff4;
  height: 100vh;
  overflow-y: scroll;
  position: relative;
  .status-img {
    position: absolute;
    width: 63px;
    height: 43px;
    top: 15px;
    right: 15px;
  }
  .stu-info {
    min-height: 30px;
    .imgs {
      display: flex;
      flex-wrap: wrap;
      .material-img {
        width: 65px;
        height: 65px;
        margin-right: 5px;
      }
    }
  }
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .btn {
      background: #44aaea;
      border: none;
      color: #fff;
      height: 40px;
      font-size: 16px;
      line-height: 1;
      border-radius: 4px;
    }
  }
}
</style>
