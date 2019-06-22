export default {
  path: '/inspection',
  name: 'Inspection',
  component: () =>
    import(/* webpackChunkName: "Inspection" */ '../../pages/main/dormInspection/index')
}
