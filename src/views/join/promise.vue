<template>
  <div class="page-promise">
    <Nav :path="path"></Nav>
    <div class="content" v-html="instruction"></div>
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
      time: 5,
      instruction:
        '<h3 style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0 ;text-align:center"><strong><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 24px">考生守则</span></strong></h3><p style="margin-top:0;margin-right:0;margin-bottom:0;text-indent:37px;padding:0 0 0 0 "><span style=";font-family:华文仿宋;font-size:19px">一、赛前准备</span></p><p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:28px;padding:0 0 0 0 "><span style=";font-family:华文仿宋;font-size:19px"><span style="font-family:华文仿宋">&nbsp;本次竞赛在</span><span style="font-family:华文仿宋">“九斗”APP上进行，比赛期间须保证电量充足及网络畅通。参赛者在竞赛前须认真阅读《诚信承诺书》，并签名确认。</span></span></p><p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 37px;padding: 0"><span style=";font-family:华文仿宋;font-size:19px">二、参赛者在竞赛过程中须诚实守信，不得作弊！</span></p><p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 37px;padding: 0"><span style=";font-family:华文仿宋;font-size:19px">1、&nbsp;竞赛过程中一律不得使用除竞赛设备以外的其他电子设备；</span></p><p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 37px;padding: 0"><span style=";font-family:华文仿宋;font-size:19px">2、竞赛开启后，迟到15分钟未进入答题界面，将无法参与竞赛；</span></p><p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 37px;padding: 0"><span style=";font-family:华文仿宋;font-size:19px">3、竞赛期间不得运行竞赛平台以外的任何网页、APP；</span></p><p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 37px;padding: 0"><span style=";font-family:华文仿宋;font-size:19px">4、竞赛时不得切屏、离开“九斗”APP，如切屏次数超过3次，将强行交卷（竞赛过程中手机须开启勿扰模式，以免出现接听电话、查看短信造成违纪）；</span></p><p style="text-indent:37px"><span style=";font-family:华文仿宋;font-size:19px"><span style="font-family:华文仿宋">三、如有不遵守竞赛规则，不服从竞赛管理等违规行为，将按照《中华人民共和国教育法》以及《国家教育考试违规处理办法》</span><span style="font-family:华文仿宋">(教育部令第33号)执行。</span></span></p>'
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
    padding: 20px 28px 100px 28px;
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
