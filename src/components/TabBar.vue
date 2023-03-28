/* eslint-disable vue/html-self-closing */
<template>
  <div v-show="$route.name == 'Home' || $route.name == 'Test' || $route.name == 'My'">
    <van-tabbar v-model="active" inactive-color="#666666" active-color="#2CAE6A" fixed placeholder>
      <van-tabbar-item v-for="(item, index) in tabbarList" :key="index" replace :to="item.path">
        <span>{{ item.title }}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      active: 0,
      tabbarList: [
        {
          path: '/',
          title: '首页',
          normal: require('../assets/image/home.png'),
          active: require('../assets/image/home_active.png')
        },
        {
          path: '/test',
          title: '竞赛',
          normal: require('../assets/image/test.png'),
          active: require('../assets/image/test_active.png')
        },
        {
          path: '/my',
          title: '个人中心',
          normal: require('../assets/image/my.png'),
          active: require('../assets/image/my_active.png')
        }
      ]
    }
  },

  // 监听路由变化
  watch: {
    $route(to) {
      this.activeTab(to.path)
    }
  },

  methods: {
    activeTab(path) {
      var index = this.tabbarList.map(item => item.path).indexOf(path)
      if (index !== -1) {
        this.active = index
      }
    }
  }
}
</script>
