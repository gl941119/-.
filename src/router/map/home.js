export default {
  path: '/home',
  name: 'Home',
  component: () =>
    import(/* webpackChunkName: "Home" */ '../../pages/main/home/index')
}
