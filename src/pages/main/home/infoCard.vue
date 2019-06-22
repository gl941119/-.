<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <img class="img"
             :src="info.avater ? info.avater : './static/img/ic_counsellor.png'" />
        <img class="male"
             v-if="~~info.gender === 2"
             src="./../../../../static/img/ic_gender_female@2x.png" />
        <img class="male"
             v-else
             src="./../../../../static/img/ic_gender_male@2x.png" />
      </div>
      <div class="right">
        <div class="right-top">
          <span style="font-size: 19px;"><strong>{{info.name}}</strong></span>
          <span style="background-color: #54CD81;color: #fff;display: inline-block;font-size: 11px; padding: 2px 4px;border-radius: 2px;">{{info.objectOrientedName}}</span>
        </div>
        <div class="right-bottom">
          <span>{{info.sn}}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="top-c">
        <img class="img"
             src="./../../../../static/img/ic_grade@2x.png" />
        <span class="g-over-e"
              style="width: 80%;display: inline-block;">{{info.collegeName}}&nbsp;{{info.majorName}}&nbsp;{{info.className}}</span>
      </div>
      <div class="line"></div>
      <div class="bottom-c">
        <img class="img"
             src="./../../../../static/img/ic_school@2x.png" />
        <span class="location g-over-e"
              style="width: 80%;display: inline-block;">{{info.checkInInfo || '暂无入住信息'}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { defaultAvater } from '@/config'
export default {
  name: '',
  props: {
    info: Object
  },
  data () {
    return {
      avater: defaultAvater
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 200px;
  display: flex;
  flex-direction: column;
  .top {
    height: 120px;
    display: flex;
    align-items: center;
    margin-left: 35px;
    .left {
      width: 60px;
      margin-right: 10px;
      position: relative;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        box-sizing: border-box;
        box-shadow: 5px 5px 5px #ccc;
      }
      .male {
        position: absolute;
        bottom: -1px;
        right: 6px;
        width: 14px;
        height: 14px;
      }
    }
    .right {
      text-align: left;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .right-bottom {
        color: #888;
        font-size: 13px;
      }
    }
  }
  .bottom {
    width: 90%;
    height: 68px;
    // border: 1px solid #000;
    background-image: linear-gradient(35deg, #41b0ef 50%, #41efe1);
    box-shadow: 1px 2px 3px 4px #eee;
    margin: 0 auto;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    text-align: left;
    color: #fff;
    .top-c,
    .bottom-c {
      display: flex;
      align-items: center;
      height: 33px;
      line-height: 33px;
      .img {
        width: 12px;
        height: 12px;
        margin-right: 5px;
        margin-left: 16px;
      }
      .location {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background: rgba(219, 231, 255, 1);
      opacity: 0.2;
    }
  }
}
</style>
