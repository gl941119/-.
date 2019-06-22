<template>
  <div class="container">
    <div class="search">
      <x-input type="text" v-model="val" :show-clear="showClear" class="search_input" placeholder="请输入学号或者姓名" @on-enter="handleSearch"/>
      <div class="search_btn" @click="handleSearch"></div>
    </div>
    <ul class="content" v-if="isShow">
      <li v-if="!list.length">
        无
      </li>
      <li v-else v-for="(item,index) in  list" :key="index">
        <p class="name">{{item.studentName}}<span>({{item.studentSn}})</span></p>
        <p class="major">{{item.className}}&nbsp;{{item.collegeName}}</p>
        <p class="room">{{item.bedNumber}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {getStudentUsingGET} from '@/api/auto'

export default {
  name: 'checkInfo',
  data () {
    return {
      isShow: false,
      showClear: false,
      list: [],
      val: ''
    }
  },
  methods: {
    handleSearch () {
      if (!this.val) return
      const params = {
        keyword: this.val
      }
      // console.log(this.val)
      getStudentUsingGET(params).then(res => {
        if (res.status) {
          this.isShow = true
          this.list = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    height: 100vh;
    overflow-y: scroll;
    background: #F2F3FA;
    padding: 0 15px;
    .search {
      margin-top: 16px;
      height: 44px;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &_input {
        padding-left: 10px;
        flex: 1;
        height: 100%;
        outline: none;
        background: transparent;
        border: none;
        outline: medium;
        font-size: 17px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
      &_btn {
        height: 100%;
        width: 33px;
        background: url("../../../../static/img/manage/ic_search.png") no-repeat;
        background-size: 22px 22px;
        background-position: left center;

      }
    }
    .content {
      margin-top: 10px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
      border-radius: 12px;
      li {
        height: 104px;
        padding-left: 11px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-bottom: 1px solid #E3E3E3;
        .name {
          font-size: 17px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(50, 83, 192, 1);
          > span {
            margin-left: 5px;
            color: #A1A1A1;
            font-size: 13px;
          }
        }
        .major, .room {
          font-size: 13px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(161, 161, 161, 1);
          line-height: 24px;
        }
      }
    }
  }
</style>
