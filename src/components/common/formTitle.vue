<template>
  <div class="form-title-container">
    <span style="color: red"
          v-if="required">*</span>
    <span class="blue-prefix"
          v-if="blue"></span>
    <span style="font-size: 14px;">{{title}}</span>
    <span style="color: #B3B3B3;font-size: 12px;">{{tips}}</span>
  </div>
</template>
<script>
export default {
  name: 'formTitle',
  props: {
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    blue: {
      type: Boolean,
      default: false
    },
    tips: String
  },
  mixins: [],
  components: {},
  data () {
    return {
    }
  },
  created () { },
  mounted () { },
  methods: {
  }
}
</script>
<style lang='less' scoped>
.form-title-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.blue-prefix {
  width: 4px;
  height: 15px;
  display: inline-block;
  background: #44aaea;
  margin-right: 5px;
}
</style>
