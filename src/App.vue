<template>
  <div id="app" class="no-vw">
    <div class="up-part">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && isRouterAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && isRouterAlive" />
    </div>
    <div style="height: 90px"></div>

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
  mounted() {},
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
  overflow: hidden;
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
  // height: 100vh;
  width: 100vw;
  overflow: auto;
  // overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  // background-color: red;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  .up-part {
    flex: 1;
    overflow: auto;
  }
}

img {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.mymath img {
  display: block;
  max-width: 40%;
}
.mymath p {
  margin: 0;
  display: inline-block;
  vertical-align: top;
  color: red;
}
.mymath .MathJax_CHTML {
  outline: 0 !important;
}
</style>
