import moment from 'moment'
moment.locale('zh-cn')
export let mixin = {
  methods: {
    nav (path, params) {
      this.$router.push({
        path: path,
        query: params
      })
    },
    formatSchoolName (id) {
      let area = sessionStorage.schoolArea
      if (area) {
        area = JSON.parse(sessionStorage.schoolArea)
        let len = area.length
        for (let i = 0; i < len; i++) {
          if (id === area[i].id) return area[i].name
        }
      }
    },
    // 评比类型
    formatRate (cellValue) {
      switch (cellValue) {
        case 1:
          return '星级寝室'
        case 2:
          return '校文明寝室'
        default:
          return '校标兵寝室'
      }
    },
    // 星级
    formatStart (cellValue) {
      switch (~~cellValue) {
        case 1:
          return '一星文明寝室'
        case 2:
          return '二星文明寝室'
        case 3:
          return '三星文明寝室'
        case 4:
          return '四星文明寝室'
        case 5:
          return '五星文明寝室'
        default:
          return '无'
      }
    }
  },
  filters: {
    filterTime: function (timestamp) {
      if (!timestamp) return ''
      let temp = moment(timestamp).format('YYYYMMDDHH')
      return moment(temp, 'YYYYMMDDHH').fromNow()
    },
    filterTimeNormol: function (timestamp) {
      if (!timestamp) return ''
      console.log(timestamp)
      return moment(timestamp).format('YYYY-MM-DD')
    },
    filterTimeFull: function (timestamp) {
      if (!timestamp) return ''
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    filterTimeMM: function (timestamp) {
      if (!timestamp) return ''
      return moment(timestamp).format('MM月DD日')
    },
    filterTimeCn: function (timestamp) {
      if (!timestamp) return ''
      return moment(timestamp).format('YYYY年MM月DD日')
    },
    filterStatus: function (status) {
      if (status === 0) {
        return '无效'
      }
      return '有效'
    },
    filterViolationType: function (type) {
      if (type === 1) {
        return '晚归'
      } else {
        return '未归'
      }
    }
  }
}
