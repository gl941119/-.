import Vue from 'vue'

import vuxComponents from './vux'
import commComponents from './common'
const components = { ...vuxComponents,
  ...commComponents
}
Object.keys(components).forEach(key => Vue.component(components[key].name, components[key]))
