export default {
  path: '/check',
  name: 'Check',
  component: () =>
    import(/* webpackChunkName: "Home" */ '../../pages/main/dormCheck/main'),
  children: [{
    path: 'main',
    name: 'CheckMain',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/dormCheck/index')
  },
  {
    path: 'list',
    name: 'CheckList',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/dormCheck/list')
  },
  {
    path: 'workList',
    name: 'workList',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/dormCheck/workList')
  }
  ]
}
