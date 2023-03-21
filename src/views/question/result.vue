<template>
  <div class="page-result">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="contest-name">{{ info.examName }}</div>
      <div class="contest-score">
        <span v-if="showScore" class="score">{{ info.score }}</span>
        <span v-else class="un-score">成绩暂未公布</span>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getExamScore } from '@/api/exam'

export default {
  name: 'Result',
  components: {
    Nav
  },
  data() {
    return {
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
          if (res.code === 200) {
            this.showScore = true
          } else if (res.code === 250) {
            this.showScore = false
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    goBack() {
      this.$router.push({
        path: '/start',
        query: {
          id: this.id,
          examId: this.examId
        }
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
      .un-score {
        font-size: 50px;
      }
      .score {
        font-size: 250px;
      }
    }
  }
}
</style>
