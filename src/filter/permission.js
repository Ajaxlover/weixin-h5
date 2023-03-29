import router from '../router'
// import wx from 'weixin-js-sdk'

// import authUtils from '@/utils/auth'

/**
 * @desc 页面进入权限
 *
 */
function doFilter() {
  router.beforeEach(async (to, from, next) => {
    // if (from.fullPath === '/') {
    //   wx.closeWindow()
    // } else {
    //   next()
    // }

    next()
  })
}

export default {
  doFilter
}
