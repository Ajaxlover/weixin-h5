<template>
  <div class="page-control">
    <Nav :path="path"></Nav>
    <div class="content">
      <div class="contest-name">1111</div>
      <div class="contest-time"></div>
      <div class="contest-icons"></div>
      <div class="contest-line"></div>
      <div class="contest-timeline"></div>
    </div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" :disabled="isDisable" type="primary" size="large" round to="/sign">提交</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Control',
  components: {
    Nav
  },
  data() {
    return {
      path: '/'
    }
  },
  computed: {
    isDisable() {
      return false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style lang="scss" scoped>
.page-control {
  height: 1400px;
  background-color: #f4f4f4;

  width: 100%;
  position: relative;
  .content {
    width: 100%;
    // height: calc(100% - 180px);
    height: 100%;
    overflow: auto;
    padding-bottom: 100px;
    .content-name {
    }
    .content-time {
    }
    .content-icons {
    }
    .content-line {
    }
    .content-timeline {
    }
  }
  // .content p {
  //   height: 300px;
  // }
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
