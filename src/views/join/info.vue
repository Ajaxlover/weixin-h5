<template>
  <div class="page-info">
    <Nav :path="path"></Nav>
    <div class="content">
      <p>报名信息填写</p>
    </div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" :disabled="isDisable" type="primary" size="large" round to="/sign">提交</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Info',
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
.page-info {
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
