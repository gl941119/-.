<template>
  <div>
    <!-- <x-header title="寝室评比详情" /> -->
    <div class="rate-info">
      <p class="title">{{rateInfo.name}}<span class="gtextlink"
              style="font-size: 16px;"
              @click="toRich">详情</span></p>
      <div class="g-mt10 g-mb10">
        <span v-for="(item, index) in rateInfo.schoolAreas"
              class="area-item"
              :key="index">{{formatSchoolName(item)}}</span>
      </div>
      <div class="bottom">
        <span>{{formatRate(rateInfo.rateType)}}</span>
        <span style="color: #c7c7c7;">{{rateInfo.createAt | filterTimeMM}}-{{rateInfo.endAt | filterTimeMM}}</span>
      </div>
    </div>
    <div class="content"
         v-infinite-scroll="changePage"
         style="background: #fff;height: calc(100vh - 110px);margin-top: 5px;padding-top: 15px;overflow-y: scroll;"
         infinite-scroll-disabled="busy">
      <div>
        <resultItem v-for="(item, index) in list"
                    :key="index"
                    :info="item" />
      </div>
      <load-more tip="正在加载"
                v-if="showLoading"></load-more>
    </div>
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
import resultItem from './resultItem'
import { LoadMore } from 'vux'
import { findRatingListUsingPOST } from '@/api/auto'
export default {
  name: '',
  props: {
  },
  mixins: [mixin],
  components: {
    resultItem,
    LoadMore
  },
  data () {
    return {
      showLoading: false,
      area: ['高新校区', '沙河校区', '清水河校区'],
      data1: {
        title: '年度星级文明寝室评比活动正式启动',
        area: ['高新校区', '沙河校区', '清水河校区'],
        type: '星级寝室评比',
        dateRange: '2月16日-3月1日'
      },
      params: {
        size: 10,
        page: 1,
        ratingId: null
      },
      total: 0,
      list: [],
      rateInfo: {}
    }
  },
  created () {
    this.rateInfo = JSON.parse(sessionStorage.listItem)
    this.params.ratingId = this.rateInfo.id
  },
  mounted () {
    this.query()
  },
  methods: {
    query () {
      findRatingListUsingPOST(this.params)
        .then(res => {
          if (res.data && res.data.list) {
            this.list = this.list.concat(res.data.list)
            this.total = res.data.total
            this.showLoading = false
          }
        })
    },
    toRich () {
      this.$router.push({
        path: '/rate/rich'
      })
    },
    changePage () {
      if (this.list.length >= this.total) {
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
.rate-info {
  width: 90%;
  margin: 0 auto;
  .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.5;
  }
  .area-item {
    background: #e5e5e5;
    color: #666;
    padding: 4px;
    border-radius: 2px;
    font-size: 12px;
    display: inline-block;
    margin-right: 4px;
  }
  .bottom {
    font-size: 13px;
  }
}
</style>
