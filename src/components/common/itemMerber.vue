<template>
  <div class="container"
       :class="{border: border}">
    <div class="left">
      <img class="img"
           :class="{self: info.isMe}"
           :src="info.avater ? info.avater : './static/img/ic_counsellor.png'" />
    </div>
    <div class="right">
      <div class="right-top">
        <span style="font-size: 16px;"><strong>{{info.name}}</strong></span>
        <x-img class="male"
               v-if="info.sex === 2"
               src="./../../../../static/img/ic_gender_female@2x.png" />
        <x-img class="male"
               v-else
               src="./../../../../static/img/ic_gender_male@2x.png" />
        <span style="font-size: 13px;color: #888;">{{info.sn}}</span>
      </div>
      <div class="right-bottom">
        <span>{{info.collegeName}}</span>
        <span>{{info.majorName}}</span>
        <span>{{info.className}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { defaultAvater } from '@/config'
export default {
  name: 'itemMerber',
  props: {
    info: Object,
    border: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      avater: defaultAvater
    }
  },
  filters: {
    filterSex: function (sex) {
      if (~~sex === 1) {
        return '男'
      } else if (~~sex === 0) {
        return '女'
      } else {
        return '未知'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 66px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 10px 15px;
  .left {
    width: 46px;
    margin-right: 10px;
    .img {
      width: 46px;
      height: 46px;
      border-radius: 23px;
      box-sizing: border-box;
    }
    .img.self {
      // border: 2px solid #ccc;
      box-shadow: 5px 5px 5px #ccc;
    }
  }
  .right {
    text-align: left;
    height: 46px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .right-top {
      .male {
        right: 6px;
        width: 14px;
        height: 14px;
      }
    }
    .right-bottom {
      color: #888;
    }
  }
}
.container.self {
  background: #eee;
}
.container.border {
  border-bottom: 1px solid #eee;
}
</style>
