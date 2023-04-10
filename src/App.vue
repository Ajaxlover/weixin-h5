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
  mounted() {
    var overscroll = function (el) {
      el.addEventListener('touchstart', function () {
        const top = el.scrollTop
        const totalScroll = el.scrollHeight
        const currentScroll = top + el.offsetHeight
        if (top === 0) {
          el.scrollTop = 1
        } else if (currentScroll === totalScroll) {
          el.scrollTop = top - 1
        }
      })
      el.addEventListener('touchmove', function (evt) {
        if (el.offsetHeight < el.scrollHeight) {
          evt._isScroller = true
        }
      })
    }
    overscroll(document.querySelector('body'))
    document.body.addEventListener('touchmove', function (evt) {
      if (!evt._isScroller) {
        evt.preventDefault()
      }
    })
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
  // background-color: red;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  .up-part {
    flex: 1;
    overflow: auto;
  }
}
// .van-tabbar__placeholder {
//   height: 100px;
// }

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
}
.mymath .MathJax_CHTML {
  outline: 0 !important;
}
</style>
