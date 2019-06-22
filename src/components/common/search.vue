<template lang="pug">
  .search
    x-input.search_input(:placeholder="placeholder", v-model="search")
      x-icon(type="ios-search"
              slot="label"
              style="margin-left: 5px;"
              size="18")
    x-button.search_btn(@click.native="clickSearch" type="primary") 搜索
</template>
<script>
export default {
  name: 'search',
  props: {
    placeholder: {
      type: String,
      default: '输入房间号'
    }
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    clickSearch () {
      this.$emit('search', this.search)
    }
  },
  watch: {
    search (n, o) {
      if (!n && o) this.$emit('search', this.search)
    }
  }
}
</script>
<style scoped>
.search {
  height: 55px;
  width: calc(100% - 30px);
  padding: 0 15px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search_input {
  width: calc(100% - 100px);
  height: 28px;
  border-radius: 5px;
  color: #666;
  background: #efeff4;
  font-size: 14px;
}

.search_icon {
  width: 13px;
  margin-right: 5px;
  margin-left: 5px;
}

.search_btn {
  height: 28px;
  width: 50px;
  font-size: 12px;
}
</style>
<style lang="less">
.search .weui-cell {
  padding: 0;
}
.search_btn.weui-btn {
  padding-left: 0;
  padding-right: 0;
}
</style>
