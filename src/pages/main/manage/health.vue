<template>
    <div class="container">
      <div class="header">
        <p>
          最后得分<span>{{this.totalScore}}</span>分
        </p>
      </div>
      <div class="select">
        <group>
          <CommonDate :checkDate.sync="form.checkDate" @change="DateChange"></CommonDate>
        </group>
        <group>
          <CommonPicker :form.sync="form"></CommonPicker>
        </group>
      </div>
      <div class="check-item" v-for="(item, index) in checkData" :key="index">
        <div class="title">
          <span>{{item.item}}</span>
          <span>得分{{item.gainedScore||0}}</span>
        </div>
        <div class="line"></div>
        <checker class="content" v-model="item.particulars" @on-change="checkerChange(index)" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <div  class="content-item" v-for="(value, i) in item.details" :key="i">
            <checker-item :value="value">{{value.value}}</checker-item>
            <span class="content-item-content">{{value.item}}</span>
            <span class="content-item-score">
            <span>{{value.score}}分</span></span>
          </div>
        </checker>
      </div>
      <x-button class="submit" @click.native="handleSubmit">提交</x-button>
    </div>
</template>

<script>
import {PopupPicker, Checker, CheckerItem} from 'vux'
import {getCheckItemUsingGET, addRecordUsingPOST} from '@/api/auto'
export default {
  name: 'health',
  components: {
    PopupPicker,
    Checker,
    CheckerItem
  },
  data () {
    return {
      form: {
        'roomId': null,
        checkDate: ''
      },
      checkData: [],
      pickerList: [],
      totalScore: 0
    }
  },
  methods: {
    DateChange (val) {
      // console.log(val)
    },
    // 获取检查明细
    init () {
      getCheckItemUsingGET({}).then(res => {
        if (res.status) {
          if (res.data && res.data.length) {
            res.data.forEach(item => { // 前端字段需求
              item.particulars = null
            })
            this.checkData = res.data || []
          } else {
            this.$vux.alert.show({
              content: '未配置检查项，不能录入卫生记录',
              onHide () {}
            })
          }
        }
      })
    },
    // 分数计算
    checkerChange (index) {
      let num = 0
      this.checkData[index].particulars.forEach(item => {
        num += item.score
      })
      this.checkData[index].gainedScore = num // 单个分
      let totalScore = 0
      this.checkData.forEach(item => { // 总分
        totalScore += item.gainedScore
      })
      this.totalScore = totalScore
    },
    handleSubmit () {
      const checkData = this.checkData
      // 表单验证
      const is = checkData.map(item => {
        return item.particulars
      }).includes(null)
      if (!this.form.roomId || !this.form.checkDate || is) {
        this.$vux.alert.show({
          content: '请填写完表单'
        })
        return
      }
      // 数据处理
      let checkUserName = JSON.parse(window.sessionStorage.getItem('userInfo')).name
      checkData.forEach(item => {
        const arr = item.particulars.map(val => { // 勾选的
          return val.id
        })
        arr.forEach(v => {
          item.details.forEach(e => {
            if (v === e.id) {
              e.gainedScore = e.score
            } else {
              e.gainedScore = 0
            }
          })
        })
      })
      const parmas = {
        checkDatas: this.checkData,
        checkDate: this.form.checkDate,
        checkUserName,
        roomId: this.form.roomId,
        totalScore: this.totalScore
      }
      addRecordUsingPOST(parmas).then(res => {
        if (res.status) {
          const that = this
          this.$vux.alert.show({
            content: '提交成功',
            onHide () {
              that.$router.go(-1)
            }
          })
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>

  .container{
    height: 100vh;
    overflow-y: scroll;
    background:#F2F3FA;
    padding: 0 15px;
    .header{
      margin-top: 15px;
      height: 60px;
      line-height: 60px;
      background:linear-gradient(43deg,rgba(86,112,199,1),rgba(109,240,255,1));
      box-shadow:0px 4px 12px 0px rgba(172,162,136,0.32);
      border-radius:12px;
      >P{
        margin-left: 16px;
        font-size:13px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        >span{
          font-size: 18px;
        }
      }
    }
    .select{
      margin-top: 16px;
      /*height:88px;*/
      background:rgba(255,255,255,1);
      border-radius:12px;
      overflow: hidden;
    }
    .check-item {
      min-height:148px;
      overflow: hidden;
      background:rgba(255,255,255,1);
      border-radius:5px;
      background: #fff;
      margin: 0 auto;
      margin-top: 15px;
      .title {
        height: 39px;
        line-height: 39px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px 0;
        >span:first-child{
          height:16px;
          font-size:16px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        >span:last-child{
          height:12px;
          font-size:12px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(136,136,136,1);
        }
      }
      .line {
        height: 10px;
        width: 100%;
        border-top: 1px solid #eee;
      }
      .content {
        padding: 0 10px 0;
        .content-item {
        margin-bottom: 17px;
          display: flex;
          align-items: center;
          .demo1-item {
            width:16px;
            height:16px;
            border-radius: 250px;
            background: url("../../../../static/img/manage/ic_unselected.png") no-repeat center center;
            background-size:16px 16px;
          }
          .demo1-item-selected {
            width:16px;
            height:16px;
            background: url("../../../../static/img/manage/ic_selected.png") no-repeat center center;
            background-size:16px 16px;
            border-radius: 250px;
          }
          .content-item-content {
            flex: 1;
            margin-left: 8px;
            white-space: normal;
            line-height: 1.25;
            word-break: break-all;
            font-size:14px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .content-item-score {
            text-align: right;
            font-size:12px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(136,136,136,1);
          }
        }
      }
    }
    .submit{
      height:44px;
      background:rgba(50,83,192,1);
      border-radius:5px;
      margin: 30px auto 10px;
      font-size:17px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }

</style>
