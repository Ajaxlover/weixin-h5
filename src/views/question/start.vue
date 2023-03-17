<template>
  <div class="page-start">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="contest-name">{{ info.examName }}</div>
      <div class="contest-time">竞赛开始时间：{{ $parseTime(info.startTime, '{y}/{m}/{d} {h}:{i}') }}</div>
      <div class="contest-time">竞赛结束时间：{{ $parseTime(info.endTime, '{y}/{m}/{d} {h}:{i}') }}</div>
      <div class="contest-limit">考试限时：{{ info.answerTime }}分钟</div>
      <div class="contest-intro">考试说明：{{ info.examNotes ? info.examNotes : '无' }}</div>
      <div class="start-btn">
        <van-button type="primary" size="large" round @click="goAnswer">开始</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getContestInfo } from '@/api/exam'

export default {
  name: 'Start',
  components: {
    Nav
  },
  data() {
    return {
      id: this.$route.query.id,
      examId: this.$route.query.examId,
      info: {}
    }
  },
  computed: {},
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getContestInfo({
        examId: this.examId
      })
        .then(res => {
          this.info = res.data
        })
        .catch(err => {
          console.error(err)
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
    goAnswer() {
      this.$router.push({
        path: '/question',
        query: {
          examId: this.examId,
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-start {
  // height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 30px 28px 100px 28px;
  .content {
    width: 100%;
    min-height: 1100px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 5px 5px 5px #cdcfcf;
    overflow: hidden;
    position: relative;
    .contest-name {
      height: 90px;
      background-color: #a5e3bd;
      text-align: center;
      line-height: 90px;
      font-weight: 600;
      color: #333;
      margin-bottom: 80px;
    }
    .contest-time {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
    }
    .contest-limit {
      height: 200px;
      text-align: center;
      color: #666;
      margin-bottom: 60px;
      line-height: 200px;
    }
    .contest-intro {
      padding: 0 140px;
      color: #666;
    }
    .start-btn {
      padding: 0 130px;
      margin-top: 150px;
    }
  }
}
</style>
