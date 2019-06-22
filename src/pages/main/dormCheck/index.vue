<template>
  <div class="container">
    <div class="check-header">
      <div class="looker">
        <img src="./../../../../static/img/pic_male@2x.png"
             class="img-score">
        <div class="word-score"
             style="line-height: 1.5;">
          <p class="g-over-e">{{checkUser}}</p>
          <p>检查者</p>
        </div>
      </div>
      <div class="score">
        <img src="./../../../../static/img/ic_score@2x.png"
             class="img-score">
        <div class="word-score">
          <p style="font-size: 24px;">{{formData.resultScore}}</p>
          <p>本次检查得分</p>
        </div>
      </div>
    </div>
    <div class="search-container"
         @click="nav('/check/list')">
      <span class="search-container__placeholder">{{placeholder}}</span>
      <x-icon type="ios-search"
              class="search-container__icon"
              size="18"></x-icon>
    </div>
    <div class="search-container"
         @click="nav('/check/workList')">
      <span class="search-container__placeholder">{{workPlaceholder}}</span>
      <x-icon type="ios-search"
              class="search-container__icon"
              size="18"></x-icon>
    </div>
    <div class="check-item"
         v-for="(item, index) in checkData"
         v-if="item.checkProjectItemDtos && item.checkProjectItemDtos.length"
         :key="index">
      <div class="title">
        <span>{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>得分{{item.tempTotal}}</span>
      </div>
      <div class="line"></div>
      <div class="content">
        <div class="content-item"
             v-for="(value, i) in item.checkProjectItemDtos"
             @click="checkChange(index, i)"
             :key="i">
          <x-icon type="ios-checkmark"
                  v-if="value.checked"
                  style="fill: #44AAEA;margin-right: 4px;" />
          <x-icon type="ios-circle-outline"
                  v-if="!value.checked"
                  style="fill: #D2D2D2;margin-right: 4px;" />
          <span class="content-item-content">{{value.content}}</span>
          <span class="content-item-score">
            <span v-if="value.checkType !== 1">-</span>
            <span>{{value.checkType === 3 ? 100 : value.score}}分</span>
          </span>
        </div>
      </div>
    </div>
    <x-button type="primary"
              @click.native="submit"
              style="width: 90%;margin: 10px auto;">提交</x-button>
  </div>
</template>
<script>
import lodash from 'lodash'
import { mixin } from '@/tools/mixins'
import { listTitleAndScoreUsingPOST, addBedroomCheckUsingPOST } from '@/api/auto'
import { Map } from 'immutable'
export default {
  name: '',
  mixins: [mixin],
  props: {
  },
  data () {
    return {
      resultScore: 0,
      initScore: 0,
      locked: false,
      checkUser: '',
      name: '',
      site: '',
      checkData: [],
      placeholder: '检查寝室',
      workPlaceholder: '检查工作项',
      currentRoom: {},
      workInfo: {},
      formData: {
        bedroomId: '',
        checkWorkId: '',
        resultScore: 0
      },
      healthCheckDetailDto: [],
      checkDataMap: {},
      violationChecks: []
    }
  },
  mounted () {
    // 震动反馈
    // navigator.vibrate(2000)
    // document.title = '星级寝室检查'
    let that = this
    window.addEventListener('pagehide', e => {
      that.init()
    })
  },
  destroyed () {
    window.removeEventListener('pagehide', () => {})
  },
  methods: {
    init () {
      this.checkData = []
      this.placeholder = '检查寝室'
      this.workPlaceholder = '检查工作项'
      this.resultScore = 0
      this.formData = {
        bedroomId: '',
        checkWorkId: '',
        resultScore: 0
      }
      sessionStorage.removeItem('currentRoom')
      sessionStorage.removeItem('workInfo')
    },
    /* 分数计算，计算逻辑:
      1.违章扣分;
      2.卫生得分;
      3.违禁则总分为零;
      4.总分最小为零
    */
    computedScore (index, i) {
      var tempTotal = this.checkData[index].initTotal || 0
      this.formData.resultScore = 0
      var hasZero = false
      this.locked = false
      this.checkData[index].checkProjectItemDtos.forEach(item => {
        if (item.checked) {
          if (item.checkType === 1) {
            tempTotal = lodash.add(tempTotal, item.score)
          } else if (item.checkType === 3) {
            tempTotal = -100
            hasZero = true
            this.locked = true
          } else {
            tempTotal = lodash.add(tempTotal, -item.score)
            // tempTotal -= item.score
          }
        }
      })
      this.checkData.forEach(item => {
        item.checkProjectItemDtos.forEach(i => {
          if (i.checked && i.checkType === 3) {
            hasZero = true
            this.locked = true
          }
        })
      })
      this.checkData[index].tempTotal = lodash.floor(tempTotal, 2)
      let temp = Map(this.checkData[index]).toObject()
      this.checkData.splice(index, 1, temp)
      this.checkData.forEach(item => {
        if (item.tempTotal) {
          this.formData.resultScore += item.tempTotal
        }
      })
      if (this.formData.resultScore < 0 || hasZero) {
        this.formData.resultScore = 0
      }
      this.formData.resultScore = lodash.floor(this.formData.resultScore, 2)
    },
    // 复选框选择与取消
    checkChange (index, i) {
      let temp = Map(this.checkData[index]).toObject()
      temp.checkProjectItemDtos[i].checked = !temp.checkProjectItemDtos[i].checked
      this.checkData.splice(index, 1, temp)
      this.computedScore(index, i)
    },
    // 获取检查明细
    listTitleAndScoreUsingPOST (checkWordId, roomId) {
      let obj = {
        checkWordId: checkWordId,
        roomId: roomId
      }
      listTitleAndScoreUsingPOST(obj)
        .then(res => {
          this.checkData = res.data || []
          if (this.checkData && this.checkData.length) {
            if (this.checkData[0].order) {
              this.checkData = lodash.orderBy(this.checkData, ['order'], ['asc'])
            }
          } else {
            this.$vux.alert.show({
              content: '未配置检查项，不能录入卫生记录',
              onHide () {
              }
            })
          }
          this.computedInitScore()
        })
    },
    // 计算初始得分，默认未违章
    computedInitScore () {
      this.checkData.forEach((item, index) => {
        let tempTotal = 0
        item.checkProjectItemDtos.forEach(i => {
          if (i.checkType === 2) {
            tempTotal += Math.abs(i.score)
          }
        })
        this.checkData[index].tempTotal = tempTotal
        this.checkData[index].initTotal = tempTotal
      })
      this.checkData.forEach(item => {
        if (item.tempTotal) {
          this.formData.resultScore += item.tempTotal
        }
      })
      this.formData.resultScore = lodash.floor(this.formData.resultScore, 2)
    },
    // 处理复选选项，分离卫生记录与违章记录
    handleCheckData () {
      this.checkData.forEach((item, index) => {
        let tempScore = this.checkData[index].initTotal || 0// 卫生记录单项检查分数
        item.checkProjectItemDtos.forEach(i => {
          if (i.checked) {
            if (i.checkType === 1) {
              tempScore += i.score
            } else {
              tempScore -= i.score
              this.handleVio(i)
            }
          }
        })
        // 如果存在卫生记录
        let obj = {}
        obj[item.name] = lodash.floor(tempScore, 2)
        this.handleHealth(obj)
      })
    },
    // 卫生记录类型
    handleHealth (obj) {
      this.checkDataMap = Object.assign(this.checkDataMap, obj)
    },
    // 违章、违禁类型
    handleVio (data) {
      let obj = {
        content: data.content,
        roomId: this.formData.bedroomId
      }
      this.violationChecks.push(obj)
    },
    // 判断是否有勾选
    handleCheckStatus () {
      let flag = false
      this.checkData.forEach(item => {
        item.checkProjectItemDtos.forEach(item => {
          if (item.checked) {
            flag = true
          }
        })
      })
      return flag
    },
    // 表单提交
    submit () {
      let hasChecked = this.handleCheckStatus()
      if (!this.formData.bedroomId || !this.formData.checkWorkId) {
        this.$vux.alert.show({
          content: '请先选择所检查的寝室以及检查工作项',
          onHide () {
          }
        })
      } else if (!this.checkData || !this.checkData.length) {
        this.$vux.alert.show({
          content: '未配置检查项，不能录入卫生记录',
          onHide () {
          }
        })
      } else if (!hasChecked) {
        this.$vux.alert.show({
          content: '未勾选检查项，不能提交检查结果',
          onHide () {
          }
        })
      } else {
        this.handleCheckData()
        // 改需求后下面的代码有的可以删了
        if (Object.keys(this.checkDataMap).length === 0 && !this.violationChecks.length) {
          this.$vux.alert.show({
            content: '未进行星级寝室检查打分，请勾选检查得分',
            onHide () {
            }
          })
        } else {
          this.healthCheckDetailDto = {
            bedroomId: this.formData.bedroomId,
            checkUserName: this.checkUser,
            checkUserSn: JSON.parse(sessionStorage.userInfo).sn || ''
          }
          // this.healthCheckDetailDto.checkData = JSON.stringify(this.checkDataMap)
          this.healthCheckDetailDto.checkData = this.checkDataMap
          this.formData.healthCheckDetailDto = this.healthCheckDetailDto
          this.formData.violationChecks = this.violationChecks
          this.formData.locked = this.locked
          this.$vux.loading.show()
          addBedroomCheckUsingPOST(this.formData)
            .then(() => {
              this.$vux.loading.hide()
              let that = this
              this.$vux.alert.show({
                content: '提交成功',
                onHide () {
                  that.init()
                }
              })
            })
            .catch(() => {
              this.$vux.loading.hide()
            })
        }
      }
    }
  },
  created () {
    if (sessionStorage.currentRoom) {
      this.currentRoom = JSON.parse(sessionStorage.currentRoom)
      this.formData.bedroomId = this.currentRoom.id
      if (this.formData.checkWorkId) {
        this.listTitleAndScoreUsingPOST(this.formData.checkWorkId, this.formData.bedroomId)
      }
    }
    if (sessionStorage.workInfo) {
      this.workInfo = JSON.parse(sessionStorage.workInfo)
      this.formData.checkWorkId = this.workInfo.id
      if (this.formData.bedroomId) {
        this.listTitleAndScoreUsingPOST(this.formData.checkWorkId, this.formData.bedroomId)
      }
    }
    this.placeholder = this.currentRoom.detailInfo || '检查寝室'
    this.workPlaceholder = this.workInfo.name || '检查工作项'
    this.checkUser = JSON.parse(sessionStorage.userInfo).name || ''
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
  overflow-y: scroll;
  background-color: #efeff4;
  .check-header {
    width: 90%;
    margin: 0 auto;
    height: 76px;
    display: flex;
    padding: 15px 0;
    .looker,
    .score {
      border-radius: 5px;
      width: 48%;
    }
    .looker {
      display: flex;
      align-items: center;
      background-image: linear-gradient(35deg, #5a4eff 50%, #47f4ff);
      margin-right: 4%;
      .img-score {
        width: 46px;
        height: 46px;
        margin-right: 10px;
        margin-left: 15px;
      }
      .word-score {
        width: calc(100% - 80px);
        color: #fff;
        display: flex;
        flex-direction: column;
      }
    }
    .score {
      display: flex;
      align-items: center;
      background-image: linear-gradient(35deg, #ff386c 50%, #ffe467);
      .img-score {
        width: 46px;
        height: 46px;
        margin-left: 15px;
        margin-right: 10px;
      }
      .word-score {
        color: #fff;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .search-container {
    width: 90%;
    margin: 0 auto;
    height: 32px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search-container__placeholder {
      color: #b2b2b2;
      font-size: 13px;
      display: inline-block;
      text-indent: 10px;
    }
    .search-container__icon {
      fill: #b2b2b2;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .check-item {
    border-radius: 5px;
    background: #fff;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
    padding-bottom: 10px;
    .title {
      padding: 13px;
    }
    .line {
      height: 10px;
      width: 100%;
      border-top: 1px solid #eee;
    }
    .content {
      .content-item {
        margin-left: 5px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        .content-item-content {
          width: 75%;
          margin-right: 5px;
          white-space: normal;
          line-height: 1.25;
          word-break: break-all;
        }
        .content-item-score {
          margin-right: 10px;
          width: 80px;
          text-align: right;
        }
      }
    }
  }
}
</style>
