export default {
  path: '/login',
  name: 'Login',
  component: () =>
    import(/* webpackChunkName: "Login" */ '../../pages/login/index')
}
