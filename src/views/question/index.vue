<template>
  <div class="page-question">
    <van-popup v-model="show" round position="bottom" :style="{ height: '600px' }">
      <div class="contest-popup">
        <div class="contest-popup-toolBar van-hairline--bottom">
          <div class="text-l">题目列表</div>
          <div class="text-r">
            <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #00a400"></div>
            <span class="answered">已答</span>
            <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #aaa; margin-left: 10px"></div>
            <span class="unAnswer">未答</span>
          </div>
        </div>
        <div class="option-container">
          <div v-if="questionBoolean.length > 0" class="contest-popup-danxuan">判断题</div>
          <div v-if="questionBoolean.length > 0" class="contest-popup-danxuan-list">
            <div v-for="(i, index) in questionBoolean" :key="index" class="list-item">
              <div :class="i.stuAnswer ? 'answered-bgc' : ''" class="item" @click="changIdx(i)">{{ i.num }}</div>
            </div>
          </div>
          <div v-if="questionSingle.length > 0" class="contest-popup-danxuan">单选题</div>
          <div v-if="questionSingle.length > 0" class="contest-popup-danxuan-list">
            <div v-for="(i, index) in questionSingle" :key="index" class="list-item">
              <div :class="i.stuAnswer ? 'answered-bgc' : ''" class="item" @click="changIdx(i)">{{ i.num }}</div>
            </div>
          </div>
          <div v-if="questionMultiple.length > 0" class="contest-popup-danxuan">多选题</div>
          <div v-if="questionMultiple.length > 0" class="contest-popup-danxuan-list">
            <div v-for="(j, index) in questionMultiple" :key="index" class="list-item">
              <div :class="j.stuAnswer ? 'answered-bgc' : ''" class="item" @click="changIdx(j)">{{ j.num }}</div>
            </div>
          </div>
        </div>
        <div class="commit">
          <van-button :loading="loading" loading-text="交卷中..." class="commit-btn" type="primary" size="large" round @click="submitPaper"
            >交卷</van-button
          >
        </div>
      </div>
    </van-popup>
    <Nav
      :is-show-right="isErrorBank == 1 ? false : isShowRight"
      :time="time"
      :is-show-time="answerTime > 0 ? isShowTime : false"
      @go-back="goBack"
      @right-click="rightClick"
      @finish="finish"
    ></Nav>
    <div class="content">
      <div v-for="(item, index) in question" v-show="index === idx" :key="index" class="question">
        <div class="subject-type">
          <van-tag v-if="item.tSubject === 3" plain type="primary">多选题</van-tag>
          <van-tag v-else-if="item.tSubject === 2" plain type="primary">单选题</van-tag>
          <van-tag v-else-if="item.tSubject === 1" plain type="primary">判断题</van-tag>
          <span>{{ index + 1 }}/{{ question.length }}</span>
          <span>({{ item.score }}分)</span>
        </div>
        <div class="subject-title"><JaxMath :data="item.title"></JaxMath></div>
        <div class="subject-options">
          <div v-for="(i, j) in item.answerList" :key="i.id" :class="i.checked ? 'bgc' : ''" class="option-item" @click="handleClick(i, j)">
            <!-- <div class="option-letter">{{ i.disorderOption }}</div> -->
            {{ i.disorderOption }}.<JaxMath :data="i.text"></JaxMath>
          </div>
        </div>
      </div>
    </div>
    <div class="footer van-hairline--top">
      <van-button v-if="isErrorBank == 0" class="join-btn" type="primary" size="large" round @click.native="next">下一题</van-button>
      <div v-if="isErrorBank == 1" class="btn-container">
        <van-button class="next-btn" type="primary" size="large" round @click.native="isErrorBankPre">上一题</van-button>
        <van-button class="next-btn" type="primary" size="large" round @click.native="isErrorBankNext">{{
          idx === question.length - 1 ? '交卷' : '下一题'
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { Toast } from 'vant'
import Nav from '@/components/Nav'
import JaxMath from '@/components/JaxMath'
import Storage from '@/utils/auth'
import { getExamSubject, submitExam } from '@/api/exam'
// import wx from 'weixin-js-sdk'

export default {
  name: 'Question',
  components: {
    Nav,
    JaxMath
  },
  data() {
    return {
      // 考试结束时间-开始时间>= 限时(倒计时)
      // 1.记录开始考试时间 2.倒计时 限时-（当前-开始）
      startAnswerTime: '',
      id: this.$route.query.id,
      examId: this.$route.query.examId,
      isErrorBank: this.$route.query.isErrorBank,
      switchScreenTimes: this.$route.query.switchScreenTimes,
      answerTime: this.$route.query.answerTime,
      examResultUniqueId: '',
      time: 8000, // 倒计时初始值，注意不能设置为0,否则进页面就触发交卷
      show: false,
      loading: false,
      idx: 0,
      isShowTime: true,
      isShowRight: true,
      ismultipleAnswer: [],
      question: [],
      questionBoolean: [], // 判断题
      questionSingle: [], // 单选题
      questionMultiple: [] // 多选题
    }
  },
  computed: {},
  created() {
    this.getInfo()
  },
  mounted() {
    this.noSleep()
  },
  beforeDestroy() {
    if (this.switchScreenTimes > 0) {
      // 开启了防切屏
      let screenTimes = localStorage.getItem(`screenTimes-${this.examResultUniqueId}`)
      // eslint-disable-next-line eqeqeq
      if (screenTimes == this.switchScreenTimes) {
        // 达到切屏次数自动提交
        this.doSubmit(1)
      } else {
        screenTimes++
        localStorage.setItem(`screenTimes-${this.examResultUniqueId}`, screenTimes)
      }
    }
  },
  methods: {
    getInfo() {
      const startTimeCache = localStorage.getItem(`startTime-${this.examId}`) ? localStorage.getItem(`startTime-${this.examId}`) : ''
      if (startTimeCache) {
        // 存在开始时间,说明是中途再次进入
        let hasSpendTime = 0
        const countDown = localStorage.getItem(`countDown-${this.examId}`) * 1000
        if (new Date().getTime() - startTimeCache >= countDown) {
          hasSpendTime = countDown
        } else {
          hasSpendTime = new Date().getTime() - startTimeCache
        }
        this.time = countDown - hasSpendTime // 设置倒计时
        this.examResultUniqueId = localStorage.getItem(`uniqueId-${this.examId}`)

        const questionCache = Storage.getExamRecord(`contest-${this.examId}`)
        if (questionCache) {
          this.question = JSON.parse(questionCache)
        }

        this.question.forEach(i => {
          if (i.tSubject === 1) {
            this.questionBoolean.push(i)
          } else if (i.tSubject === 2) {
            this.questionSingle.push(i)
          } else {
            this.questionMultiple.push(i)
          }
        })
      } else {
        Toast.loading({
          duration: 4000,
          message: '加载中...',
          forbidClick: true
        })
        // 首次进入
        getExamSubject({
          examId: this.examId
        })
          .then(res => {
            res.data.paperInfoList.forEach((item, idx) => {
              item.num = idx + 1
            })
            this.question = res.data.paperInfoList
            this.examResultUniqueId = res.data.examResultUniqueId
            Storage.setExamRecord(`contest-${this.examId}`, this.question)
            localStorage.setItem(`countDown-${this.examId}`, res.data.countDown)
            localStorage.setItem(`uniqueId-${this.examId}`, res.data.examResultUniqueId)
            localStorage.setItem(`screenTimes-${this.examResultUniqueId}`, 0) // 本次examResultUniqueId对应的切屏次数
            localStorage.setItem(`startTime-${this.examId}`, res.data.startTime)
            this.time = res.data.countDown * 1000

            this.question.forEach(i => {
              if (i.tSubject === 1) {
                this.questionBoolean.push(i)
              } else if (i.tSubject === 2) {
                this.questionSingle.push(i)
              } else {
                this.questionMultiple.push(i)
              }
            })
            // console.log(this.question)
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    // 切换到指定题目
    changIdx(i) {
      this.idx = i.num - 1
      this.show = false
    },
    rightClick() {
      this.show = true
    },
    goBack() {
      this.$router.replace({
        path: '/start',
        query: {
          examId: this.examId,
          id: this.id
        }
      })
    },
    isErrorBankPre() {
      if (this.idx === 0) {
        Toast({
          message: '当前题目是第一题',
          position: 'middle'
        })
        return false
      }
      this.idx--
    },
    isErrorBankNext() {
      if (this.idx === this.question.length - 1) {
        Dialog.confirm({
          title: '提示',
          message: '是否确认交卷?',
          confirmButtonText: '确认',
          confirmButtonColor: '#2cad69',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              // 交卷
              this.doSubmit()
              done()
            } else {
              done()
            }
          }
        })
      } else {
        // 切换下一题 当前题目未答不准切换
        if (this.question[this.idx].stuAnswer) {
          this.idx++
        } else {
          Toast({
            message: '请先作答当前题目',
            position: 'middle'
          })
        }
      }
    },
    next() {
      if (this.idx === this.question.length - 1) {
        this.show = true
        return
      }
      this.idx++
    },
    handleClick(info, idx) {
      const question = this.question[this.idx] // 每题选项
      const option = this.question[this.idx].answerList // 每一题题目的选项

      // 选中添加样式
      option.forEach((item, ix) => {
        if (ix === idx) {
          // 如果选中的与数据里面的相等就改变他的样式
          item.checked = !item.checked // 是否选中，取反
        } else if (question.tSubject !== 3) {
          // 如果不是多选 只能选中一个 其他的都为false
          item.checked = false
        }
      })

      let isAnswer = '' // 选中的答案
      if (info.checked) {
        isAnswer = info.disorderOption // 选中的答案
      }

      // 如果是多选
      if (question.tSubject === 3) {
        this.ismultipleAnswer = []
        option.forEach(item => {
          if (item.checked) {
            // 将选中的push到 ismultipleAnswer 数组中
            this.ismultipleAnswer.push(item.disorderOption)
          }
        })
        isAnswer = this.ismultipleAnswer.join(',')
      }

      console.log('选中的答案', isAnswer)
      // console.log('题目的答案', answer)
      this.question[this.idx].stuAnswer = isAnswer // 记录学生答案
      // 缓存作答记录
      Storage.setExamRecord(`contest-${this.examId}`, this.question)
      // if (info.checked) {
      //   if (question.tSubject !== 3) {
      //     this.idx++
      //   }
      // }
    },

    submitPaper() {
      const flag = this.question.some(i => {
        return !i.stuAnswer
      })
      if (flag) {
        // 存在未答题目
        Dialog.confirm({
          title: '提示',
          message: '您还有题目未答，是否交卷?',
          confirmButtonText: '交卷',
          confirmButtonColor: '#2cad69',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              done()
              // 交卷
              this.doSubmit()
            } else {
              done()
            }
          }
        })
      } else {
        // 题目全部已作答，直接交卷
        this.doSubmitDirect()
      }
    },
    // 直接交卷
    doSubmitDirect() {
      const startTime = localStorage.getItem(`startTime-${this.examId}`)
      const examPic = localStorage.getItem(`examPic${this.examId}`)
      const content = []
      this.question.forEach(item => {
        content.push({
          bankId: item.bankId,
          parentId: item.parentId,
          stuAnswer: item.stuAnswer ? item.stuAnswer : '',
          sonSubList: item.sonSubList
        })
      })
      const data = {
        examId: this.examId,
        examResultUniqueId: this.examResultUniqueId,
        forceSubmitFlag: 0,
        startTime,
        content: JSON.stringify(content),
        examStuPicUrl: examPic
      }
      this.loading = true
      submitExam(data)
        .then(res => {
          if (res.code === 200) {
            this.loading = false
            this.removeCaches()
            Toast({
              message: '交卷成功',
              position: 'middle'
            })
            this.$router.replace({
              path: '/result',
              query: {
                examId: this.examId,
                id: this.id
              }
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    doSubmit(forceSubmitFlag = 0) {
      const startTime = localStorage.getItem(`startTime-${this.examId}`)
      const examPic = localStorage.getItem(`examPic${this.examId}`)
      const content = []
      this.question.forEach(item => {
        content.push({
          bankId: item.bankId,
          parentId: item.parentId,
          stuAnswer: item.stuAnswer ? item.stuAnswer : '',
          sonSubList: item.sonSubList
        })
      })
      const data = {
        examId: this.examId,
        examResultUniqueId: this.examResultUniqueId,
        forceSubmitFlag,
        startTime,
        content: JSON.stringify(content),
        examStuPicUrl: examPic
      }
      submitExam(data)
        .then(res => {
          if (res.code === 200) {
            this.removeCaches()
            Toast({
              message: '交卷成功',
              position: 'middle'
            })
            this.$router.replace({
              path: '/result',
              query: {
                examId: this.examId,
                id: this.id
              }
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    finish() {
      this.doSubmit()
    },
    removeCaches() {
      Storage.removeExamRecord(`contest-${this.examId}`)
      localStorage.removeItem(`countDown-${this.examId}`)
      localStorage.removeItem(`uniqueId-${this.examId}`)
      localStorage.removeItem(`startTime-${this.examId}`)
      localStorage.removeItem(`examPic${this.examId}`)
      localStorage.removeItem(`screenTimes-${this.examResultUniqueId}`)
    },
    // 保持页面常亮
    noSleep() {
      const noSleep = new this.$NoSleep()
      document.addEventListener(
        'click',
        function enableNoSleep() {
          noSleep.enable()
          document.removeEventListener('click', enableNoSleep, false)
        },
        false
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.page-question {
  user-select: none;
  -moz-user-select: none; /* Firefox私有属性 */
  -webkit-user-select: none; /* WebKit内核私有属性 */
  -ms-user-select: none; /* IE私有属性(IE10及以后) */
  -khtml-user-select: none; /* Khtml内核私有属性 */
  -o-user-select: none; /* Opera私有属性 */
  // height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  /deep/ .van-popup--bottom {
    padding-top: 30px;
  }
  .contest-popup {
    .contest-popup-toolBar {
      color: #666;
      height: 60px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      // margin-bottom: 20px;
      .text-l {
        color: #333;
      }

      .text-r {
        // float: right;
        display: flex;
        align-items: center;
        .answered {
          // float: right;
        }

        .unAnswer {
          // float: right;
        }
      }
    }
    .option-container {
      height: 900px;
      overflow-y: scroll;
      padding-bottom: 10px;
      .contest-popup-danxuan {
        height: 60px;
        padding: 0 20px;
        display: flex;
        align-items: center;
      }
      .contest-popup-danxuan-list {
        padding: 0 20px;
        width: 100%;
        // background-color: ;
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        .list-item {
          width: 20%;
          height: 100px;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          .item {
            width: 90px;
            height: 90px;
            border: 1px solid #aaa;
            color: #333;
            border-radius: 50%;
            text-align: center;
            line-height: 90px;
          }

          .answered-bgc {
            color: #00a400;
            border: 1px solid #00a400;
            background: rgba(0, 164, 0, 0.17);
          }
        }
      }
    }
    .commit {
      padding: 0 20px;
      .commit-btn {
        height: 85px;
        background-color: #2cad69;
      }
    }
  }
  .content {
    width: 100%;
    // height: calc(100% - 180px);
    min-height: 1200px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px 28px 100px 28px;
    .question {
      .subject-type {
        margin-bottom: 20px;
      }
      .subject-title {
        margin-bottom: 60px;
      }
      .subject-options {
        .option-item {
          margin-bottom: 40px;
          min-height: 90px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          .option-letter {
            width: 90px;
            height: 90px;
            border: 1px solid #aaa;
            color: #333;
            border-radius: 50%;
            text-align: center;
            line-height: 90px;
          }
        }
        .bgc {
          // border: 1px rgb(250, 109, 0) solid;
          color: #fff;
          background-color: #07c160;
        }
      }
    }
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
    .btn-container {
      display: flex;
      justify-content: space-between;
      .next-btn {
        width: 49%;
        height: 90px;
        background-color: #2cad69;
      }
    }
  }
}
</style>
