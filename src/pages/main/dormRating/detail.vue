<template>
  <div class="container-detail">
    <div class="g-mt20 g-mb20">
      <resultItem :info="currentDormInfo" />
    </div>
    <div class="container-merber">
      <item-merber v-for="(item, index) in merbers"
                   :key="index"
                   :border="false"
                   :info="item" />
    </div>
    <div class="honor-merber">
      <p class="title">寝室荣誉</p>
      <div class="line"></div>
      <div class="honor-container">
        <div v-for="(item, index) in honor"
             style="line-height: 1.5;"
             :key="index">
          <span>{{item.effectAt | filterTimeCn}}</span>
          <span>获“{{item.honorStr}}”称号</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
import resultItem from './resultItem'
import { listStudentInfoByRoomIdUsingGET, getBedroomHonorUsingGET } from '@/api/auto'
export default {
  name: '',
  props: {
  },
  mixins: [mixin],
  components: {
    resultItem
  },
  data () {
    return {
      merbers: [],
      currentDormInfo: {},
      honor: []
    }
  },
  created () {
    this.currentDormInfo = JSON.parse(sessionStorage.currentDormInfo)
  },
  mounted () {
    this.listStudentInfoByRoomIdUsingGET()
    this.getBedroomHonorUsingGET()
  },
  methods: {
    // 根据寝室id查询学生信息
    listStudentInfoByRoomIdUsingGET () {
      let date = new Date(JSON.parse(sessionStorage.listItem).createAt).toString()
      listStudentInfoByRoomIdUsingGET(this.currentDormInfo.bedroomId, -1, date)
        .then(res => {
          this.merbers = res.data
        })
    },
    // 寝室荣誉
    getBedroomHonorUsingGET () {
      let id = JSON.parse(sessionStorage.currentDormInfo).id
      getBedroomHonorUsingGET(id)
        .then(res => {
          this.honor = res.data
        })
    }
  }
}
</script>
<style lang='less' scoped>
.container-detail {
  height: 100vh;
  overflow-y: scroll;
  background-color: #efeff4;
  .container-merber,
  .honor-merber {
    border-radius: 5px;
    background: #fff;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .honor-merber {
    .title {
      padding: 13px;
    }
    .line {
      height: 1px;
      width: 100%;
      border-top: 1px solid #eee;
    }
    .honor-container {
      padding: 13px;
    }
  }
}
</style>
