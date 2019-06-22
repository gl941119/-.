<template>
  <div>
  <datetime
    v-model="DateTime"
    @on-change="change"
    :title="'日期'"
    placeholder="请选择年月份/日期"
  ></datetime>
  </div>
</template>

<script>
export default {
  name: 'CommonDate',
  props: {
    checkDate: {
      default: '',
      type: String
    }
  },
  computed: {
    DateTime: {
      get () {
        return this.checkDate
      },
      set (val) {
        this.$emit('update:checkDate', val)
      }
    }
  },
  methods: {
    change (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped>

</style>
