<template>
  <div>
    <div v-for="(item, index) in flowInfo"
         :key="index">
      <div class="single">
        <img src="./../../../static/img/ic_counsellor.png"
             class="avatar" />
        <div class="step-info">
          <span>{{item.approvalRole === '学生' ? '我' : item.approvalRole}}</span>
          <span v-if="item.approvalRole !== '学生'"
                :class="'status-' + item.status">{{item.status | filterStatus}}</span>
          <span v-if="item.apinion">{{item.apinion}}</span>
        </div>
        <div class="time"
             v-if="item.approvalRole === '学生'">{{item.createAt | filterTimeFull}}</div>
        <div class="time"
             v-else>{{item.approvalAt | filterTimeFull}}</div>
      </div>
      <img src="./../../../static/img/ic_arrow.png"
           v-if="(index + 1) !== len"
           class="arrow-down">
    </div>
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
export default {
  name: 'flow',
  props: {
    flowInfo: {
      type: Array,
      required: true
    }
  },
  mixins: [mixin],
  components: {},
  data () {
    return {
    }
  },
  filters: {
    filterAvatar: function (roleName) {
      return './../../../static/img/ic_counsellor.png'
    },
    filterStatus: function (num) {
      switch (num) {
        case 1:
          return '审核中'
        case 2:
          return '通过'
        default:
          return '驳回'
      }
    }
  },
  computed: {
    len: function () {
      return this.flowInfo.length
    }
  },
  created () { },
  mounted () { },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.single {
  display: flex;
  align-items: center;
  padding: 10px 0;
  .avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin-right: 11px;
  }
  .step-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.2;
    width: 50%;
  }
  .status-1 {
    color: #41b0ef;
  }
  .status-2 {
    color: #54cd81;
  }
  .status-3 {
    color: #f05c6e;
  }
  .time {
    width: calc(50% - 57px);
    text-align: right;
  }
}
.arrow-down {
  width: 8px;
  height: 17px;
  position: relative;
  left: 19px;
}
</style>
