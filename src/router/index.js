import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '@/views/home'
import Test from '@/views/exam'
import My from '@/views/my'
import Join from '@/views/join'
import Rule from '@/views/join/rule.vue'
import Promise from '@/views/join/promise.vue'
import Sign from '@/views/join/sign.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true, // 需要登录
      thirdAuth: 'userinfo', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData', // 分享朋友圈
          'getLocation', // 定位
          'openLocation' // 打开地图
        ]
      },
      keepAlive: false,
      title: '首页'
    }
  },
  {
    path: '/join',
    name: 'Join',
    component: Join,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData', // 分享朋友圈
          'getLocation', // 定位
          'openLocation' // 打开地图
        ]
      },
      keepAlive: false,
      title: '竞赛报名'
    }
  },
  {
    path: '/rule',
    name: 'Rule',
    component: Rule,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData', // 分享朋友圈
          'getLocation', // 定位
          'openLocation' // 打开地图
        ]
      },
      keepAlive: false,
      title: '报名须知'
    }
  },
  {
    path: '/promise',
    name: 'Promise',
    component: Promise,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData', // 分享朋友圈
          'getLocation', // 定位
          'openLocation' // 打开地图
        ]
      },
      keepAlive: false,
      title: '诚信承诺书'
    }
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData', // 分享朋友圈
          'getLocation', // 定位
          'openLocation' // 打开地图
        ]
      },
      keepAlive: false,
      title: '电子签名'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData', // 分享朋友圈
          'getLocation', // 定位
          'openLocation' // 打开地图
        ]
      },
      keepAlive: false,
      title: '竞赛'
    }
  },
  {
    path: '/my',
    name: 'My',
    component: My,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData', // 分享朋友圈
          'getLocation', // 定位
          'openLocation' // 打开地图
        ]
      },
      keepAlive: false,
      title: '个人中心'
    }
  },
  {
    path: '/sign_in',
    name: 'sign',
    component: () => import('@/views/signIn/index'),
    meta: {
      auth: false,
      thirdAuth: '',
      wx: {
        sign: false,
        jsApiList: ['getLocation']
      },
      keepAlive: false,
      title: '登录'
    }
  }

  // 404
  // {
  //   path: '*',
  //   component: () => import('@/views/404'),
  //   meta: {
  //     title: '错误'
  //   }
  // }
]

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior() {
      return { y: 0 }
    },
    // base: '/',
    routes: routes
  })

const router = createRouter()

// router.beforeEach((to, from, next) => {
//   // chrome
//   document.body.scrollTop = 0
//   // firefox
//   document.documentElement.scrollTop = 0
//   // safari
//   window.pageYOffset = 0
//   window.scrollTo(0, 0) // 将页面滚动位置重置为顶部
//   next()
// })
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
