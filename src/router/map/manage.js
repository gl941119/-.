export default {
  path: '/manage',
  name: 'manage',
  component: () =>
    import(/* webpackChunkName: "Home" */ '../../pages/main/manage/index'),
  redirect: '/manage/main',
  children: [{
    path: 'main',
    name: 'ManageMain',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../../pages/main/manage/main')
  },
  {// 卫生检查
    path: 'health',
    name: 'ManageHealth',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/manage/health')
  },
  {// 违纪
    path: 'breakRule',
    name: 'breakRule',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/manage/breakRule')
  },
  {// 未归
    path: 'notBack',
    name: 'notBack',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/manage/notBack')
  },
  {// 入住信息
    path: 'checkInfo',
    name: 'checkInfo',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/manage/checkInfo')
  },
  {// 管辖区域
    path: 'manageArea',
    name: 'v',
    component: () =>
        import(/* webpackChunkName: "Home" */ '../../pages/main/manage/manageArea')
  }

  ]
}
