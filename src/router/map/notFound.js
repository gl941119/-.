export default {
  path: '*',
  name: 'NotFound',
  component: () =>
    import(/* webpackChunkName: "notFound" */ '../../pages/error/notFound')
}
