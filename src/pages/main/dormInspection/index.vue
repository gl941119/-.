<template>
  <div class="contianer">
    <!-- <x-header title="寝室检查" /> -->
    <div class="tabs">
      <span class="tabs-item"
            :class="{active: currentTab === 'sanitation'}"
            @click="currentTab = 'sanitation'">卫生记录</span>
      <span class="tabs-item"
            :class="{active: currentTab === 'log'}"
            @click="currentTab = 'log'">违章记录</span>
      <span class="tabs-item"
            :class="{active: currentTab === 'notBack'}"
            @click="currentTab = 'notBack'">晚归未归记录</span>
    </div>
    <div class="content"
         v-infinite-scroll="changePage"
         infinite-scroll-disabled="busy"
         style="background: #EFEFF4;height: calc(100vh - 59px);padding-top: 15px;overflow-y: scroll;">
      <div v-if="currentTab === 'sanitation'">
        <sanitation-card v-for="(item, index) in sanitationData"
                         :key="index"
                         :info="item" />
      </div>
      <div v-if="currentTab === 'log'">
        <log-card v-for="(item, index) in logData"
                  :key="index"
                  :info="item" />
      </div>
      <div v-if="currentTab === 'notBack'">
        <log-card v-for="(item, index) in notBackData"
                  :key="index"
                  :info="item" :type="false"/>
      </div>
      <load-more tip="正在加载"
                 v-if="showLoading"></load-more>
    </div>
  </div>
</template>
<script>
import sanitationCard from './sanitationCard'
import logCard from './logCard'
import { LoadMore } from 'vux'
import { listRoomHealthUsingPOST, listViolationUsingPOST, getStudentRecordsUsingGET } from '@/api/auto'
import { mixin } from '@/tools/mixins'
export default {
  name: '',
  props: {
  },
  mixins: [mixin],
  components: {
    sanitationCard,
    logCard,
    LoadMore
  },
  data () {
    return {
      total: 0,
      totalVio: 0,
      busy: false,
      showLoading: false,
      currentTab: 'sanitation',
      sanitationData: [],
      logData: [],
      notBackData: [],
      params: {
        page: 1,
        size: 10,
        roomId: null
      },
      paramsVio: {
        page: 1,
        size: 1000,
        roomId: null
      }
    }
  },
  created () { },
  mounted () {
    let that = this
    let userInfo = JSON.parse(sessionStorage.userInfo)
    if (userInfo && userInfo.bedInfo && userInfo.bedInfo.bedroomId) {
      this.params.roomId = userInfo.bedInfo.bedroomId
      this.paramsVio.roomId = userInfo.bedInfo.bedroomId
      this.query()
      this.queryViolation()
      this.handleNotBack()
    } else {
      this.$vux.alert.show({
        content: '暂无数据',
        onHide () {
          that.$router.go(-1)
        }
      })
    }
  },
  methods: {
    // 晚归未归记录
    handleNotBack () {
      getStudentRecordsUsingGET().then(res => {
        if (res.status) {
          this.notBackData = this.notBackData.concat(res.data)
          this.showLoading = false
        }
      })
    },
    // 根据分页条件查询卫生记录[修改]
    query () {
      listRoomHealthUsingPOST(this.params)
        .then(res => {
          if (res.data && res.data.list) {
            this.sanitationData = this.sanitationData.concat(res.data.list)
            this.total = res.data.total
            this.showLoading = false
          }
        })
    },
    // 根据条件分页查询违章记录
    queryViolation () {
      listViolationUsingPOST(this.paramsVio)
        .then(res => {
          if (res.data && res.data.list) {
            this.logData = this.logData.concat(res.data.list)
            this.totalVio = res.data.total
            this.showLoading = false
          }
        })
    },
    changePage () {
      if (this.sanitationData.length >= this.total) {
        this.busy = false
        this.showLoading = false
      } else {
        this.showLoading = true
        ++this.params.page
        this.query()
      }
    }
  }
}
</script>
<style lang='less' scoped>
.contianer {
  .tabs {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    .tabs-item {
      display: inline-block;
      flex: 1;
      text-align: center;
    }
    .tabs-item.active {
      color: #41b0ef;
      border-bottom: 1px solid #41b0ef;
      font-weight: 600;
    }
  }
}
</style>
