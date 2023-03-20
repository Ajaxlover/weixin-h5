import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '@/views/home'
import Test from '@/views/contest'
import My from '@/views/my'
import Personal from '@/views/my/personal.vue'
import Credentials from '@/views/my/credentials.vue'
import CreDetail from '@/views/my/credentialsDetail.vue'

import Join from '@/views/join'
import Control from '@/views/join/control.vue'
import Rule from '@/views/join/rule.vue'
import Promise from '@/views/join/promise.vue'
import Sign from '@/views/join/sign.vue'
import Info from '@/views/join/info.vue'

import Start from '@/views/question/start.vue'
import Question from '@/views/question'
import Finish from '@/views/question/finish.vue'
import Result from '@/views/question/result.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'hideAllNonBaseMenuItem',
          'hideMenuItems',
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData' // 分享朋友圈
        ],
        hideMenuList: [
          'menuItem:copyUrl', // 屏蔽复制链接
          'menuItem:openWithQQBrowser', // 屏蔽在QQ浏览器打开
          'menuItem:openWithSafari' // 屏蔽在Safari浏览器打开
        ]
      },
      keepAlive: false,
      title: '首页'
    }
  },
  {
    path: '/start',
    name: 'Start',
    component: Start,
    meta: {
      auth: false, // 需要登录
      thirdAuth: '', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'hideAllNonBaseMenuItem',
          'hideMenuItems',
          'chooseImage' // 拍照
        ],
        hideMenuList: [
          'menuItem:copyUrl', // 屏蔽复制链接
          'menuItem:openWithQQBrowser', // 屏蔽在QQ浏览器打开
          'menuItem:openWithSafari' // 屏蔽在Safari浏览器打开
        ]
      },
      keepAlive: false,
      title: '开始答题'
    }
  },
  {
    path: '/question',
    name: 'Question',
    component: Question,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: ['hideAllNonBaseMenuItem', 'hideMenuItems'],
        hideMenuList: [
          'menuItem:copyUrl', // 屏蔽复制链接
          'menuItem:openWithQQBrowser', // 屏蔽在QQ浏览器打开
          'menuItem:openWithSafari' // 屏蔽在Safari浏览器打开
        ]
      },
      keepAlive: false,
      title: '题目'
    }
  },
  {
    path: '/finish',
    name: 'Finish',
    component: Finish,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: []
      },
      keepAlive: false,
      title: '答题结束'
    }
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: []
      },
      keepAlive: false,
      title: '成绩公布'
    }
  },
  {
    path: '/join',
    name: 'Join',
    component: Join,
    meta: {
      auth: true, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData' // 分享朋友圈
        ]
      },
      keepAlive: false,
      title: '竞赛详情'
    }
  },
  {
    path: '/control',
    name: 'Control',
    component: Control,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'chooseImage' // 拍照
          // 'hideMenuItems',
          // 'hideAllNonBaseMenuItem'
        ],
        hideMenuList: [
          'menuItem:copyUrl', // 屏蔽复制链接
          'menuItem:openWithQQBrowser', // 屏蔽在QQ浏览器打开
          'menuItem:openWithSafari' // 屏蔽在Safari浏览器打开
        ]
      },
      keepAlive: false,
      title: '报名流程'
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
      title: ''
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
    path: '/info',
    name: 'Info',
    component: Info,
    meta: {
      auth: false, // 需要登录
      thirdAuth: '', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'chooseImage' // 拍照
          // 'hideMenuItems',
          // 'hideAllNonBaseMenuItem'
        ],
        hideMenuList: [
          'menuItem:copyUrl', // 屏蔽复制链接
          'menuItem:openWithQQBrowser', // 屏蔽在QQ浏览器打开
          'menuItem:openWithSafari' // 屏蔽在Safari浏览器打开
        ]
      },
      keepAlive: false,
      title: '报名信息'
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
      title: '我的竞赛'
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
    path: '/personal',
    name: 'Personal',
    component: Personal,
    meta: {
      auth: false, // 需要登录
      thirdAuth: '', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: []
      },
      keepAlive: false,
      title: '个人信息'
    }
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: Credentials,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: []
      },
      keepAlive: false,
      title: '证书列表'
    }
  },
  {
    path: '/credentials-detail',
    name: 'credentials-detail',
    component: CreDetail,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: false, // 是否需要微信验签
        jsApiList: []
      },
      keepAlive: false,
      title: '证书详情'
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
