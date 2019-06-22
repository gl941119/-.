export default {
  path: '/rate',
  name: 'Rate',
  component: () =>
    import(/* webpackChunkName: "Home" */ '../../pages/main/dormRating/index'),
  children: [{
    path: 'list',
    name: 'RateMain',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../../pages/main/dormRating/list')
  }, {
    path: 'detail',
    name: 'RateDetail',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../../pages/main/dormRating/detail')
  }, {
    path: 'result',
    name: 'RateResult',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../../pages/main/dormRating/result')
  }, {
    path: 'rich',
    name: 'RateRich',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../../pages/main/dormRating/rich')
  }]
}
