<template>
  <div class="container">
    <div class="stu-info g-bg-white g-padding-h g-mb10">
      <div class="right g-text-lh">
        <div>
          <div class="top">
            <img class="img"
                 :src="userInfo.avater ? info.avater : './static/img/ic_counsellor.png'" />
            <span style="font-size: 16px;">{{userInfo.name}}</span>
            <span style="font-size: 13px;color: #888;text-indent: 4px;display: inline-block;">{{userInfo.sn}}</span>
          </div>
          <div class="bottom">
            <span style="font-size: 13px;color: #888;display: inline-block;margin-left: 26px;display: inline-block;">{{userInfo.collegeName}}{{userInfo.majorName}}{{userInfo.className}}</span>
          </div>
          <div class="bottom"
               v-if="userInfo.checkInInfo">
            <span style="font-size: 13px;color: #888;display: inline-block;margin-left: 26px;display: inline-block;">{{userInfo.checkInInfo}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="remark g-bg-white g-padding-h g-mb10">
      <span>{{type}}</span>
    </div> -->
    <div class="remark g-bg-white g-padding-h g-mb10" style="height: 30px" v-if="type===5">
        <span style="color: red;float: left">*</span>
        <datetime
          v-model="form.leaveStart"
          :title="'开始时间'"
          @on-change="change"
          ></datetime>
    </div>
    <div class="remark g-bg-white g-padding-h g-mb10" style="height: 30px" v-if="type===5">
        <span style="color: red;float: left">*</span>
        <datetime
          v-model="form.leaveEnd"
          :title="'结束时间'"
          @on-change="change"
          ></datetime>
    </div>
    <div class="remark g-bg-white g-padding-h g-mb10" v-else>
      <form-title title="备注"
                  :required="true"></form-title>
      <x-textarea class="remark-text"
                  :max="200"
                  :rows="5"
                  :autosize="true"
                  v-model.trim="form.applyReason"
                  placeholder="备注不超过200字" />
    </div>
    <div class="material g-bg-white g-padding-h g-mb10">
      <form-title title="申请材料"
                  tips="请上传图片"
                  :required="true"></form-title>
      <div class="imgs g-mt10">
        <div class="img-container"
             v-for="(item, index) in materialImgs"
             :key="index">
          <img :src="item.tempSrc"
               class="material-img">
          <x-icon type="ios-minus"
                  @click.native="delImg(index)"
                  class="icon-del"
                  size="30"></x-icon>
        </div>
        <img-uploder @uploadCb="uploadCb"
                     @uploadorigin="uploadorigin" />
      </div>
    </div>
    <div class="step-container g-bg-white g-padding-h g-mb10">
      <form-title title="审批流程" />
      <flow-graph :flowId="form.type" />
    </div>
    <x-button type="primary"
              style="width: 90%;"
              @click.native="submit"
              size="small">提交</x-button>
  </div>
</template>
<script>
import { addApplyUsingPOST } from '@/api/auto'
import { defaultAvater } from '@/config'
import flowGraph from './flowGraph'
import { Datetime, Group } from 'vux'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  name: '',
  props: {
    type: Number
  },
  components: {
    flowGraph,
    Datetime,
    Group
  },
  data () {
    return {
      avater: defaultAvater,
      materialImgs: [],
      form: {
        applyReason: '',
        images: [],
        leaveStart: '', // 开始时间
        leaveEnd: '', // 结束时间
        type: 1
      },
      timer: null,
      userInfo: {},
      value1: ''
    }
  },
  methods: {
    change (value) {
      console.log('change', value)
    },
    delImg (index) {
      this.materialImgs.splice(index, 1)
      this.form.images.splice(index, 1)
    },
    // 图片回显
    uploadCb (imgInfo) {
      if (this.materialImgs.length > 5) {
        this.$vux.alert.show({
          content: '最多上传六张图片哟~',
          onHide () {
          }
        })
      } else {
        this.materialImgs.push(imgInfo)
      }
    },
    // 表单内容处理
    uploadorigin (imgInfo) {
      if (this.form.images.length > 5) {
        this.$vux.alert.show({
          content: '最多上传六张图片哟~',
          onHide () {
          }
        })
      } else {
        this.form.images.push(imgInfo)
      }
    },
    // 提交申请
    submit () {
      if (this.form.type === '5') {
        // 表单验证
        const leaveStart = new Date(this.form.leaveStart).getTime()
        const leaveEnd = new Date(this.form.leaveEnd).getTime()
        if (leaveEnd <= leaveStart) {
          this.$vux.alert.show({
            content: '结束时间必须大于开始时间'
          })
          return
        }
        if (!this.form.images.length || !this.form.leaveStart || !this.form.leaveEnd) {
          this.$vux.alert.show({
            content: '请检查表单是否填写完整'
          })
          return
        }
      } else {
        if (!this.form.images.length || !this.form.applyReason) {
          this.$vux.alert.show({
            content: '请检查表单是否填写完整'
          })
          return
        }
      }
      this.form.images = JSON.stringify(this.form.images)
      this.$vux.loading.show()
      addApplyUsingPOST(this.form)
        .then(() => {
          this.$vux.loading.hide()
          this.$router.push('/applyCheckin/msg')
        })
        .catch(() => {
          this.$vux.loading.hide()
        })
    }
  },
  created () {
    this.form.type = this.$route.query.type || 1
    this.userInfo = JSON.parse(sessionStorage.userInfo) || {}
  }
}
</script>
<style lang="less" scoped>
.container {
  background-color: #efeff4;
  height: 100vh;
  overflow-y: scroll;
  .stu-info {
    // height: 72px;
    display: flex;
    align-items: center;
    .right {
      .top {
        display: flex;
        align-items: center;
        .img {
          width: 22px;
          height: 22px;
          margin-right: 6px;
        }
      }
    }
  }
  .remark {
    padding-top: 14px;
    .remark-text {
      border: none;
      padding: 5px;
    }
  }
  .material {
    padding-top: 14px;
    padding-bottom: 14px;
    .imgs {
      display: flex;
      flex-wrap: wrap;
      .img-container {
        position: relative;
        .icon-del {
          position: absolute;
          top: -11px;
          right: 3px;
          fill: red;
        }
        .material-img {
          width: 65px;
          height: 65px;
          margin-right: 10px;
        }
      }
    }
  }
  .step-container {
    padding-top: 14px;
    padding-bottom: 14px;
  }
}
</style>
<style>
.remark .weui-cell:before {
  border-top: none;
}
.remark .weui-cell {
  padding: 0;
}
</style>
