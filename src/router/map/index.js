import login from './login'
import notFound from './notFound'
import home from './home'
import merber from './merber'
import dormCheck from './dormCheck'
import applyCheckin from './applyCheckin'
import dormInspection from './dormInspection'
import dormRating from './dormRating'
import manage from './manage'

let homeRoute = {
  name: 'HomeLogin',
  path: '/',
  redirect: '/login'
}

export default [
  login,
  homeRoute,
  notFound,
  home,
  merber,
  dormCheck,
  applyCheckin,
  dormInspection,
  dormRating,
  manage
]
