<template>
  <div class="page-sign">
    <Nav :path="path"></Nav>
    <div class="content">
      <div class="intro">
        <div class="intro-title">诚信考试承诺书</div>
        <p>本人已阅读清楚<span style="color: #1989fa" @click="toPromise">《考生守则》</span>的内容，愿意承诺遵守考试规则，诚信参加考试。</p>
      </div>
      <div>
        <div class="tip-text">承诺人签名：</div>
        <vue-esign
          ref="esign"
          class="e-sign"
          :width="800"
          :height="400"
          :is-crop="isCrop"
          :line-width="lineWidth"
          :line-color="lineColor"
          :bg-color.sync="bgColor"
        />
        <van-button class="resign" type="primary" size="large" round @click="clearPaint">重新签名</van-button>
        <van-button class="resign" :disabled="isDisable" type="primary" size="large" round @click="handleGenerate">确定</van-button>
      </div>
    </div>
    <!-- <div class="footer van-hairline--top">
      <van-button class="join-btn" :disabled="isDisable" type="primary" size="large" round @click="handleGenerate">确定</van-button>
    </div> -->
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import vueEsign from 'vue-esign'

export default {
  name: 'Sign',
  components: {
    Nav,
    vueEsign
  },
  data() {
    return {
      path: '/',
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false
    }
  },
  computed: {
    isDisable() {
      return false
    }
  },
  mounted() {},
  methods: {
    init() {},
    toPromise() {
      this.$router.push('/promise')
    },
    clearPaint() {
      this.$refs.esign.reset()
    },
    handleGenerate() {
      this.$refs.esign
        .generate()
        .then(res => {
          this.resultImg = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-sign {
  height: 100%;
  width: 100%;
  position: relative;
  .content {
    width: 100%;
    height: calc(100% - 180px);
    overflow: auto;
    padding: 20px 28px 100px 28px;
    .intro {
      height: 400px;
      .intro-title {
        text-align: center;
        font-size: 34px;
        margin-bottom: 20px;
      }
      p {
        text-indent: 2em;
        line-height: 2;
      }
    }
    .e-sign {
      border: 1px solid #ebedf0;
      margin: 10px 0;
      margin-bottom: 40px;
    }
    .resign {
      height: 90px;
      margin-bottom: 40px;
    }
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
