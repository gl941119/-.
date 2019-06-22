import Vue from 'vue'
import Router from 'vue-router'
import routesMap from './map'
import {
  clearHttpRequestingList
} from '@/tools/httpRequestList'
Vue.$httpRequestList = []
Vue.use(Router)

const router = new Router({
  mode: 'hash', // pure browser, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routesMap
})
router.beforeEach((to, form, next) => {
  clearHttpRequestingList()
  next()
})

export default router
