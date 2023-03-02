<template>
  <div class="page-promise">
    <Nav :path="path"></Nav>
    <div class="content">
      <p>11111111111111111111</p>
      <p>11111111111111111111</p>
      <p>11111111111111111111</p>
      <p>11111111111111111111</p>
      <p>11111111111111111111</p>
      <p>11111111111111111111</p>
    </div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" :disabled="isDisable" type="primary" size="large" round to="/sign">{{
        time == 0 ? '确定' : `${time}s`
      }}</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Promise',
  components: {
    Nav
  },
  data() {
    return {
      path: '/',
      time: 5
    }
  },
  computed: {
    isDisable() {
      return this.time !== 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(timer)
        }
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-promise {
  height: 100%;
  width: 100%;
  position: relative;
  .content {
    width: 100%;
    height: calc(100% - 180px);
    overflow: auto;
    padding-bottom: 100px;
  }
  .content p {
    height: 300px;
  }
  .footer {
    width: 100%;
    position: fixed;
    height: 100px;
    bottom: 0;
    background-color: #fff;
    z-index: 999;
    .join-btn {
      height: 90px;
    }
  }
}
</style>
