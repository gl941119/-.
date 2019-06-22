export default {
  path: '/applyCheckin',
  name: 'ApplyCheckin',
  component: () =>
    import(/* webpackChunkName: "Home" */ '../../pages/main/applyCheckin/main'),
  children: [{
    path: 'viewer',
    name: 'ApplyCheckinEdit',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/applyCheckin/viewer')
  },
  {
    path: 'msg',
    name: 'ApplyCheckinMsg',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/applyCheckin/msg')
  }
  ]
}
