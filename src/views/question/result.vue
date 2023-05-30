<template>
  <div class="page-result">
    <Nav title="竞赛结果" @go-back="goBack"></Nav>
    <div class="content">
      <div class="contest-name">{{ info.examName }}</div>
      <div class="contest-score">
        <div v-if="showScore" class="score">{{ info.score }}分</div>
        <span v-else class="un-score"
          >注意:{{
            isMock == 1
              ? '本次模拟已结束，请准时参加竞赛，及时关注竞赛的最新动态。'
              : '本次竞赛已结束。竞赛最新动态将在个人中心及微信公众号内公布，请各位选手及时关注。'
          }}</span
        >
        <div class="paper-btn">
          <van-button v-if="isView != 0" class="s-btn" type="primary" size="large" round @click="goPaper">查看答卷</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getExamScore, getPaper } from '@/api/exam'

export default {
  name: 'Result',
  components: {
    Nav
  },
  data() {
    return {
      isView: this.$route.query.isView,
      isMock: this.$route.query.isMock,
      id: this.$route.query.id,
      examId: this.$route.query.examId,
      info: {},
      showScore: false
    }
  },
  computed: {},
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getExamScore({
        examId: this.examId
      })
        .then(res => {
          this.info = res.data
          if (res.data.score === -1) {
            this.showScore = false
          } else {
            this.showScore = true
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    goBack() {
      this.$router.replace({
        path: '/start',
        query: {
          id: this.id,
          examId: this.examId,
          // eslint-disable-next-line eqeqeq
          isMock: this.isMock == 1 ? this.isMock : 0
        }
      })
    },
    goPaper() {
      getPaper({
        examId: this.examId
      })
        .then(res => {
          if (res.code === 200) {
            this.$router.replace({
              path: '/paper',
              query: {
                id: this.id,
                examId: this.examId,
                // eslint-disable-next-line eqeqeq
                isMock: this.isMock == 1 ? this.isMock : 0,
                isView: this.isView
              }
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-result {
  width: 100%;
  overflow: hidden;
  padding: 30px 28px 100px 28px;
  .content {
    width: 100%;
    height: 1100px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 5px 5px 5px #cdcfcf;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    .contest-name {
      height: 90px;
      background-color: #a5e3bd;
      text-align: center;
      line-height: 90px;
      font-weight: 600;
      color: #333;
    }

    .contest-score {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .un-score {
        font-size: 38px;
        padding: 0 80px;
      }
      .score {
        width: 500px;
        height: 500px;
        font-size: 100px;
        text-align: center;
        line-height: 500px;
        background: url('../../assets/image/score.png') no-repeat;
        background-size: 100%;
      }

      .paper-btn {
        position: absolute;
        bottom: 15px;
        .s-btn {
          width: 400px;
          background-color: #2cad69;
        }
      }
    }
  }
}
</style>
