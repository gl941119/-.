<template>
  <div class="container-msg">
    <x-img src="./../../../../static/img/ic_success.png"
           style="width: 56%;"
           class="img" />
    <p class="status-word g-text-lh2">申请成功</p>
    <p class="detail-word g-text-lh">你的申请我们已经收到，申请结果将会在7个工作日内反馈给你，请持续关注</p>
    <x-button style="width: 90%;"
              class="g-mt20"
              @click.native="$router.push('/home')"
              type="primary">确定</x-button>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
  },
  mixins: [],
  components: {},
  data () {
    return {
    }
  },
  created () { },
  mounted () {
    // document.title = '入住申请'
  },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.container-msg {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .status-word {
    font-size: 20px;
    font-weight: bold;
  }
  .detail-word {
    width: 80%;
    text-align: center;
    font-size: 14px;
    color: #888;
  }
}
</style>
