// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
// import {
//   Message
// } from '@/plugin'
import {
  AlertPlugin,
  LoadingPlugin,
  ConfirmPlugin
} from 'vux'
import './components'
import '@/assets/style/reset.css'
import '@/assets/style/common.less'

Vue.config.productionTip = false
// Vue.use(Message)
Vue.use(LoadingPlugin)
Vue.use(infiniteScroll)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
