<template>
  <div class="page-join">
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
      <van-button class="join-btn" type="primary" size="large" round>去报名</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Join',
  components: {
    Nav
  },
  data() {
    return {
      path: '/'
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-join {
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
