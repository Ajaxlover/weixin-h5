<template>
  <div id="app" class="no-vw">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive && isRouterAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive" />
    <TabBar />

    <!-- 页面切换遮罩层 -->
    <global-mask />
  </div>
</template>
<script>
import GlobalMask from '@/components/GlobalMask'
import TabBar from '@/components/TabBar'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
    GlobalMask,
    TabBar
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 用provide / inject 组合,控制router-view的显示或隐藏，从而控制页面的再次加载
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  -webkit-tap-highlight-color: rgba($color: #000000, $alpha: 0); // 点击高亮
  -webkit-text-size-adjust: 100% !important; // ios禁止调整字体大小
  // user-select: none;
  // -moz-user-select: none; /* Firefox私有属性 */
  // -webkit-user-select: none; /* WebKit内核私有属性 */
  // -ms-user-select: none; /* IE私有属性(IE10及以后) */
  // -khtml-user-select: none; /* Khtml内核私有属性 */
  // -o-user-select: none; /* Opera私有属性 */
}
html,
body,
#app {
  // height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #f4f4f4;
}

img {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
