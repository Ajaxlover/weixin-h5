<template>
  <div class="page-promise">
    <Nav @go-back="goBack"></Nav>
    <div class="content" v-html="info.credible"></div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" :class="time == 0 ? '' : 'time-down-bgc'" :disabled="isDisable" type="primary" size="large" round @click="next">{{
        time == 0 ? '确定' : `${time}s`
      }}</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getContestDetail } from '@/api/home'

export default {
  name: 'Promise',
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
          if (res.data.signPic) {
            localStorage.setItem(`esign${this.id}`, res.data.signPic)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    goBack() {
      this.$router.replace({
        path: '/control',
        query: {
          id: this.id
        }
      })
    },
    next() {
      this.$router.replace({
        path: '/sign',
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
.page-promise {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #fff;

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
    z-index: 999;
    padding: 0 28px;
    .join-btn {
      height: 90px;
      background-color: #2cad69;
    }
    .join-btn:disabled {
      color: #000;
      opacity: 1;
      -webkit-text-fill-color: #000;
    }
    .time-down-bgc {
      background-color: #cafee5;
      color: #000;
      border-color: #cafee5;
    }
  }
}
</style>
