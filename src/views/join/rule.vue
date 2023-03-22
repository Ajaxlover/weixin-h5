<template>
  <div class="page-rule">
    <Nav @go-back="goBack"></Nav>
    <div class="content" v-html="info.notes"></div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" :disabled="isDisable" type="primary" size="large" round @click="next">{{
        time == 0 ? '确定' : `${time}s`
      }}</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getContestDetail } from '@/api/home'

export default {
  name: 'Rule',
  components: {
    Nav
  },
  data() {
    return {
      time: 5,
      id: this.$route.query.id,
      info: {}
    }
  },
  computed: {
    isDisable() {
      return this.time !== 0
    }
  },
  mounted() {
    this.init()
    this.getInfo()
  },
  methods: {
    getInfo() {
      getContestDetail({
        masterheadId: this.id
      })
        .then(res => {
          this.info = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    next() {
      this.$router.push({
        path: '/promise',
        query: {
          id: this.id
        }
      })
    },
    goBack() {
      this.$router.push({
        path: '/control',
        query: {
          id: this.id
        }
      })
    },
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
.page-rule {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  .content {
    width: 100%;
    // height: calc(100% - 180px);
    min-height: 1200px;
    overflow: auto;
    padding: 20px 28px 100px 28px;
  }

  .footer {
    width: 100%;
    position: fixed;
    height: 100px;
    bottom: 0;
    background-color: #fff;
    padding: 0 28px;
    z-index: 999;
    .join-btn {
      height: 90px;
    }
  }
}
</style>
