import router from '../router'
import store from '../store'
import wxUtils from '@/utils/weixin'

/**
 * @desc 微信js-sdk使用的配置注入 ios环境落地页处理(js-api)
 */
function doFilter() {
  router.afterEach((to, from, next) => {
    if (store.getters.thirdType === 'wx' && to.meta.wx && to.meta.wx.sign && to.meta.wx.jsApiList.length > 0) {
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

      if (isiOS) {
        // ios环境
        const url = process.env.VUE_APP_BASEURL + process.env.VUE_APP_BASE_PUBLIC_PATH + to.fullPath // ios 落地页问题

        // store.dispatch('wxSign/setOriginUrl', url).then(v => {
        //   // wx-js-sdk初始化
        //   wxUtils.init({
        //     apiList: to.meta.wx.jsApiList,
        //     showMenuList: to.meta.wx.showMenuList ? to.meta.wx.showMenuList : []
        //   })
        // })
        // wx-js-sdk初始化
        wxUtils.init(
          {
            apiList: to.meta.wx.jsApiList,
            showMenuList: to.meta.wx.showMenuList ? to.meta.wx.showMenuList : []
          },
          url
        )
      } else {
        const url = process.env.VUE_APP_BASEURL + process.env.VUE_APP_BASE_PUBLIC_PATH + to.fullPath // ios 落地页问题

        // wx-js-sdk初始化
        wxUtils.init(
          {
            apiList: to.meta.wx.jsApiList,
            showMenuList: to.meta.wx.showMenuList ? to.meta.wx.showMenuList : []
          },
          url
        )
      }
      // return next()
    } else {
      // return next()
    }
  })
}

export default {
  doFilter
}
