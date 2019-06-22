<template>
  <div class="rich-container">
    <div class="rate-info">
      <p class="title">{{rateInfo.name}}</p>
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
    <div v-html="rich"
         class="rich-text"></div>
  </div>
</template>
<script>
import { mixin } from '@/tools/mixins'
export default {
  name: '',
  props: {
  },
  mixins: [mixin],
  components: {},
  data () {
    return {
      rich: '',
      rateInfo: {}
    }
  },
  created () {
    this.rateInfo = JSON.parse(sessionStorage.listItem)
    this.rich = JSON.parse(sessionStorage.listItem).description
  },
  mounted () { },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.rich-container {
  height: 100vh;
  overflow-y: scroll;
  width: 90%;
  margin: 0 auto;
  .rate-info {
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
  .rich-text {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
<style lang="less">
.rich-text {
  /* table 样式 */
  table {
    width: 100%;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }

  /* ul ol 样式 */
  ul,
  ol {
    margin: 10px 0 10px 20px;
  }
}
</style>
