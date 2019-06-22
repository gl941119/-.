export default {
  path: '/merber',
  name: 'Merber',
  component: () =>
    import(/* webpackChunkName: "Merber" */ '../../pages/main/merber/index')
}
