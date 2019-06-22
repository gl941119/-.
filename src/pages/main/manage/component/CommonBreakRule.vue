<template>
  <div class="warp">
      <cell title="违纪人员" style="border-bottom: 1px solid #E3E3E3;height: 44px;box-sizing: border-box">
        <div class="weui-input weui-cell">
          <x-input  v-model="report" class="report"  :show-clear="showClear" placeholder="学号或者姓名"
                    @on-enter="inputChange" ></x-input>
          <div class="search_btn" @click="inputChange"></div>
        </div>
        <!--<div class="weui-input"  >-->
        <!---->
          <!--<x-button type="primary"-->
                    <!--mini-->
                    <!--@click.native="inputChange"-->
                    <!--style="display: inline-block"-->
          <!--&gt;搜索</x-button>-->
        <!--</div>-->

      </cell>
    <div class="search" v-if="isShow">
      <div class="search_li" v-if="!list.length">
        无
      </div>
      <div v-else>
        <div class="search_li" v-for="(item,index) in  list" :key="index" @click="handleClick(item)">
          <p>{{item.studentName}}<span>({{item.studentSn}})</span></p>
          <p>{{item.bedNumber}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getStudentUsingGET} from '@/api/auto'

export default {
  name: 'CommonbeakRule',
  props: {
    studentSn: {
      default: '',
      type: String
    },
    bedNumber: {
      default: '',
      type: String
    },
    name: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      report: '',
      showClear: false,
      isShow: false,
      list: []
    }
  },
  methods: {
    handleClick (item) {
      this.$emit('update:studentSn', item.studentSn)
      this.$emit('update:bedNumber', item.bedNumber)
      this.$emit('update:name', item.studentName)
      this.$emit('handleClick', item)
      this.list = []
      this.isShow = false
      this.report = item.studentName
    },
    inputChange (val) {
      if (!this.report) return
      const params = {
        keyword: val || this.report
      }
      // console.log(val)
      getStudentUsingGET(params).then(res => {
        if (res.status) {
          this.isShow = true
          this.list = res.data
        }
      })
    },
    handleSearch () {
    }
  }
}
</script>

<style lang="less" scoped>
  .report {
    float: right;
    width: 80%;
    padding: 0;
    /deep/ .weui-input::-webkit-input-placeholder {
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #999;
    }
  }

  .search {
    margin-top: 20px;
    margin-bottom: 10px;
    min-height: 68px;
    max-height: 400px;
    overflow-y: scroll;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    &_li {
      height: 68px;
      line-height: 50px;
      padding-left: 12px;
      border-bottom: 1px solid #E3E3E3;
      > p:first-child {
        height: 16px;
        font-size: 17px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(50, 83, 192, 1);
        > span {
          color: #A1A1A1;
          font-size: 13px;
          margin-left: 5px;
        }
      }
      > p:last-child {
        margin-top: 9px;
        height: 13px;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(161, 161, 161, 1);
      }
    }
  }
.search_btn{
  height: 100%;
  width: 10%;
  float: right;
  background: url("../../../../../static/img/manage/ic_search.png") no-repeat;
  background-size: 22px 22px;
  background-position: left center;
}
</style>
