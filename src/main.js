import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filter'
import 'babel-polyfill' // ES6转ES5
import 'normalize.css/normalize.css' //  重置样式
import '@/assets/style/index.scss' // 全局生效样式
import '@/plugins/vant' // 按需引入UI库 vant
import NoSleep from 'nosleep.js/dist/NoSleep.min.js'

if (process.env.VUE_APP_USE_VCONSOLE === 'true') {
  const vConsole = require('vconsole')
  // eslint-disable-next-line
  const vconsole = new vConsole()
}

import './assets/icon/svg/index' // svg-iocn
// eslint-disable-next-line
import directive from './directive' // 全局自定义指令
// eslint-disable-next-line
import components from './components' // 全局组件
// eslint-disable-next-line
import mixins from './mixins' // 全局混入

import { parseTime, base64toFile } from './utils'
Vue.prototype.$parseTime = parseTime // 时间戳格式化
Vue.prototype.$base64toFile = base64toFile // base64转file

Vue.prototype.$NoSleep = NoSleep

Vue.prototype.$log = window.console.log // 在template模板中使用$log()打印
store.dispatch('system/initSystemType') // 初始化系统平台类型
filter.doFilters() // 全局过滤处理 - 只要判断逻辑

const agent = navigator.userAgent
// eslint-disable-next-line no-unused-vars
const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios手机

if (isiOS && (typeof window.entryUrl === 'undefined' || window.entryUrl === '')) {
  window.entryUrl = location.href.split('#')[0]
}
// 安卓路由更新的时候 都会更新，所以安卓就在路由里每次都赋值
router.afterEach(() => {
  // 记录安卓url 用于注册微信jsdk
  if (!isiOS) window.entryUrl = location.href.split('#')[0]
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
