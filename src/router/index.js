import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home'),
    meta: {
      auth: true, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'hideMenuItems',
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData' // 分享朋友圈
        ],
        showMenuList: []
      },
      keepAlive: false,
      title: '首页'
    }
  },
  {
    path: '/start',
    name: 'Start',
    component: () => import('@/views/question/start.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: '', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'hideMenuItems',
          'chooseImage' // 拍照
        ],
        showMenuList: []
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import('@/views/question'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'hideMenuItems', 'showMenuItems', 'chooseImage'],
        showMenuList: []
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/paper',
    name: 'Paper',
    component: () => import('@/views/question/paper.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'hideMenuItems', 'showMenuItems', 'chooseImage'],
        showMenuList: []
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/finish',
    name: 'Finish',
    component: () => import('@/views/question/finish.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem']
      },
      keepAlive: false,
      title: '答题结束'
    }
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('@/views/question/result.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems', 'chooseImage']
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('@/views/join'),
    meta: {
      auth: true, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData' // 分享朋友圈
        ],
        showMenuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
      },
      keepAlive: false,
      title: '竞赛详情'
    }
  },
  {
    path: '/control',
    name: 'Control',
    component: () => import('@/views/join/control.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'chooseImage', // 拍照
          // 'hideMenuItems',
          'hideAllNonBaseMenuItem',
          'showMenuItems'
        ],
        showMenuList: []
      },
      keepAlive: false,
      title: '报名流程'
    }
  },
  {
    path: '/rule',
    name: 'Rule',
    component: () => import('@/views/join/rule.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems']
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/promise',
    name: 'Promise',
    component: () => import('@/views/join/promise.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems']
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('@/views/join/sign.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems']
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/join/info.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: '', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'chooseImage', // 拍照
          // 'hideMenuItems',
          'hideAllNonBaseMenuItem',
          'showMenuItems'
        ],
        showMenuList: []
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/contest'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems']
      },
      keepAlive: false,
      title: '我的竞赛'
    }
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('@/views/my'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems']
      },
      keepAlive: false,
      title: '个人中心'
    }
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/my/personal.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: '', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems']
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: () => import('@/views/my/credentials.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems']
      },
      keepAlive: false,
      title: ''
    }
  },
  {
    path: '/credentials-detail',
    name: 'credentials-detail',
    component: () => import('@/views/my/credentialsDetail.vue'),
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems']
      },
      keepAlive: false,
      title: ''
    }
  }
  // {
  //   path: '/sign_in',
  //   name: 'sign',
  //   component: () => import('@/views/signIn/index'),
  //   meta: {
  //     auth: false,
  //     thirdAuth: '',
  //     wx: {
  //       sign: false,
  //       jsApiList: ['getLocation']
  //     },
  //     keepAlive: false,
  //     title: '登录'
  //   }
  // }

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
    base: process.env.BASE_URL,
    routes: routes
  })

console.log(process.env)
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
