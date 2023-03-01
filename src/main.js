import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filter'
import 'babel-polyfill' // ES6转ES5
import 'normalize.css/normalize.css' //  重置样式
import '@/assets/style/index.scss' // 全局生效样式
import '@/plugins/vant' // 按需引入UI库 vant

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

Vue.prototype.$log = window.console.log // 在template模板中使用$log()打印
store.dispatch('system/initSystemType') // 初始化系统平台类型
filter.doFilters() // 全局过滤处理 - 只要判断逻辑

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   // chrome
//   document.body.scrollTop = 0
//   // firefox
//   document.documentElement.scrollTop = 0
//   // safari
//   window.pageYOffset = 0
//   next()
// })

// router.beforeEach((to, from, next) => {
//   document.documentElement.scrollTop = 0
// })
// router.afterEach((to, from, next) => {
//   document.body.scrollTop = 0

//   document.documentElement.scrollTop = 0
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
