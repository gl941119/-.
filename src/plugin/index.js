import message from './message.vue'
let Message = {}
Message.install = function (Vue, options) {
  Vue.prototype.$Message = 'Hello I am test.js'
  Vue.component(message.name, message)
}
export default Message
