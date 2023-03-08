<template>
  <div class="page-rule">
    <Nav @go-back="goBack"></Nav>
    <div class="content" v-html="notes"></div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" :disabled="isDisable" type="primary" size="large" round to="/promise">{{
        time == 0 ? '确定' : `${time}s`
      }}</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Rule',
  components: {
    Nav
  },
  data() {
    return {
      time: 5,
      notes:
        '<h3 style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:0;padding:0 0 0 0 ;text-align:center"><strong><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 24px">竞赛</span></strong><strong><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 24px">报名须知</span></strong></h3><p><span style=";font-family:宋体;font-size:14px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;color: rgb(167, 10, 36);letter-spacing: 0;font-size: 24px">&nbsp; &nbsp; &nbsp;</span><span style=";font-family:华文仿宋;font-size:19px">欢迎参加第二届</span><span style=";font-family:华文仿宋;font-size:19px">“九斗杯”全国大学生物理知识竞赛</span><span style=";font-family:华文仿宋;font-size:19px">。为提高考试质量，请各位参赛者注意以下事项：</span></p><p style="text-indent:37px"><span style="font-family:华文仿宋;font-size:19px">一、</span><span style=";font-family:华文仿宋;font-size:19px">报名时间及缴费</span></p><p style="text-indent:37px"><span style=";font-family:华文仿宋;font-size:19px"><span style="font-family:华文仿宋">本次竞赛只在九斗</span><span style="font-family:华文仿宋">“app”上进行线上报名，报名时间从即时起，截止至</span></span><span style=";font-family:华文仿宋;font-size:19px">2022</span><span style=";font-family:华文仿宋;font-size:19px">年</span><span style=";font-family:华文仿宋;font-size:19px">1</span><span style=";font-family:华文仿宋;font-size:19px">1月24日19 : 30，逾期不予补报。报名需缴纳10元报名费，未缴纳报名费的参赛者，报名信息无效，已缴纳报名费的不再退费。</span></p><p style="text-indent:37px"><span style=";font-family:华文仿宋;font-size:19px">二、个人信息填写</span></p><p style="text-indent:37px"><span style=";font-family:华文仿宋;font-size:19px">报名时参赛者需填写真实、准确、有效的个人信息（包括姓名、院校、学号、专业、邮箱），请参赛者务必认真填写（如因考生个人原因造成填报信息错误，后果由参赛者本人承担）。</span></p><p style="text-indent:37px"><span style=";font-family:华文仿宋;font-size:19px">三、参赛者须仔细阅读《考生守则》和《诚信承诺书》，并按流程进行报名，报名完成后请持续关注竞赛信息，按时参加竞赛。</span></p><p style="text-indent:37px"><span style=";font-family:华文仿宋;font-size:19px">四、参赛者须妥善保管个人信息，勿将账号密码告诉他人。如因个人原因泄漏导致报名信息被修改，由参赛者本人负责。</span></p><p style="text-indent:37px"><span style=";font-family:华文仿宋;font-size:19px">五、本次竞赛配有专业防作弊系统，参赛者须严格按照《考生守则》进行竞赛，如出现作弊行为，竞赛成绩将作废。</span></p><p style="text-indent:37px"><span style=";font-family:华文仿宋;font-size:19px"><span style="font-family:华文仿宋">六、若有其他疑问，请联系客服，客服</span><span style="font-family:华文仿宋">QQ：1822197301</span></span></p>'
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
    goBack() {
      this.$router.push({
        path: '/control',
        query: {}
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
