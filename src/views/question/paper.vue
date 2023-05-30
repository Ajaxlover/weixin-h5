<template>
  <div class="page-paper">
    <!-- <van-overlay z-index="99999" :show="showOverlay">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-button class="overlay-btn" :loading="overlayLoading" loading-text="交卷中..." type="primary" @click="overlaySubmit">交卷</van-button>
        </div>
      </div>
    </van-overlay> -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '580px' }">
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
          <div v-if="questionType4.length > 0" class="contest-popup-danxuan">填空题</div>
          <div v-if="questionType4.length > 0" class="contest-popup-danxuan-list">
            <div v-for="(j, index) in questionType4" :key="index" class="list-item">
              <div :class="j.stuAnswer ? 'answered-bgc' : ''" class="item" @click="changIdx(j)">{{ j.num }}</div>
            </div>
          </div>
          <div v-if="questionType5.length > 0" class="contest-popup-danxuan">问答题</div>
          <div v-if="questionType5.length > 0" class="contest-popup-danxuan-list">
            <div v-for="(k, index) in questionType5" :key="index" class="list-item">
              <div :class="k.stuAnswer ? 'answered-bgc' : ''" class="item" @click="changIdx(k)">{{ k.num }}</div>
            </div>
          </div>
        </div>
        <div class="commit">
          <!-- <van-button :loading="loading" loading-text="交卷中..." class="commit-btn" type="primary" size="large" round @click="submitPaper"
            >交卷</van-button
          > -->
        </div>
      </div>
    </van-popup>
    <Nav :is-show-right="true" title="答卷" :time="time" :is-show-time="false" @go-back="goBack" @right-click="rightClick"></Nav>
    <div class="content">
      <div v-for="(item, index) in question" v-show="index === idx" :key="index" class="question">
        <div class="subject-type">
          <van-tag v-if="item.tSubject === 3" plain type="primary">多选题</van-tag>
          <van-tag v-else-if="item.tSubject === 2" plain type="primary">单选题</van-tag>
          <van-tag v-else-if="item.tSubject === 1" plain type="primary">判断题</van-tag>
          <van-tag v-else-if="item.tSubject === 5" plain type="primary">问答题</van-tag>
          <van-tag v-else-if="item.tSubject === 4" plain type="primary">填空题</van-tag>
          <span>{{ index + 1 }}/{{ question.length }}</span>
          <span>({{ item.score }}分)</span>
          <span style="position: absolute; right: 0; color: red">{{ item.stuScore }}分</span>
        </div>
        <div class="subject-title"><JaxMath :data="item.title"></JaxMath></div>
        <div v-if="item.tSubject === 5 || item.tSubject === 4" class="subject-options">
          <!-- <div class="upload-icon-pic" @click="handleUpload(item)"></div> -->
          <div v-if="item.stuAnswer" class="upload-icon-img">
            <img :src="item.stuAnswer" alt="" />
          </div>
          <div v-else class="un-answer-area">未作答</div>
          <div v-if="isView != 3" style="margin-bottom: 10px">答案：<JaxMath :data="item.correctAnswer"></JaxMath></div>
          <div v-if="isView != 3">解析：<JaxMath :data="item.analyse"></JaxMath></div>
        </div>
        <div v-else class="subject-options">
          <div v-for="i in item.answerList" :key="i.id" :class="i.checked ? 'bgc' : ''" class="option-item">
            <!-- <div class="option-letter">{{ i.disorderOption }}</div> -->
            {{ i.disorderOption }}.<JaxMath :data="i.text"></JaxMath>
          </div>
          <div v-if="isView != 3" style="margin-bottom: 10px">答案：<JaxMath :data="item.correctAnswer"></JaxMath></div>
          <div v-if="isView != 3">解析：<JaxMath :data="item.analyse"></JaxMath></div>
        </div>
      </div>
    </div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" type="primary" size="large" round @click.native="next">下一题</van-button>
      <!-- <div v-if="isErrorBank == 1" class="btn-container">
        <van-button class="next-btn" type="primary" size="large" round @click.native="isErrorBankPre">上一题</van-button>
        <van-button
          class="next-btn"
          :loading="isErrorBankLoading"
          loading-text="交卷中..."
          type="primary"
          size="large"
          round
          @click.native="isErrorBankNext"
          >{{ idx === question.length - 1 ? '交卷' : '下一题' }}</van-button
        >
      </div> -->
    </div>
  </div>
</template>

<script>
// import { Dialog } from 'vant'
// import { Toast } from 'vant'
import Nav from '@/components/Nav'
import JaxMath from '@/components/JaxMath'

import { getPaper } from '@/api/exam'

// import wx from 'weixin-js-sdk'

export default {
  name: 'Question',
  components: {
    Nav,
    JaxMath
  },
  data() {
    return {
      isView: this.$route.query.isView,
      overlayLoading: false, // 遮罩交卷按钮
      showOverlay: false, // 自动提交遮罩
      flag: 0, // 1-非默认倒计时,=0时不会触发自动提交
      isMock: this.$route.query.isMock,
      startAnswerTime: '',
      id: this.$route.query.id,
      examId: this.$route.query.examId,
      isErrorBank: this.$route.query.isErrorBank,
      switchScreenTimes: this.$route.query.switchScreenTimes,
      answerTime: this.$route.query.answerTime,
      examResultUniqueId: '',
      time: 0, // 倒计时初始值，注意不能设置为0,否则进页面就触发交卷
      show: false,
      loading: false,
      isErrorBankLoading: false, // 闯关模式交卷
      idx: 0,
      isShowTime: true,
      isShowRight: true,
      ismultipleAnswer: [],
      question: [],
      questionBoolean: [], // 判断题
      questionSingle: [], // 单选题
      questionMultiple: [], // 多选题
      questionType5: [], // 问答题
      questionType4: [] // 填空题
    }
  },
  computed: {},
  created() {
    this.getInfo()
  },
  mounted() {
    this.noSleep()
  },
  methods: {
    getInfo() {
      // eslint-disable-next-line no-unused-vars
      // const toast = Toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true,
      //   message: '加载中...'
      // })

      // 答卷
      getPaper({
        examId: this.examId
      })
        .then(res => {
          res.data.forEach((item, idx) => {
            item.num = idx + 1
          })
          this.question = res.data
          // Toast.clear()
          this.question.forEach(i => {
            if (i.tSubject === 1) {
              this.questionBoolean.push(i)
            } else if (i.tSubject === 2) {
              this.questionSingle.push(i)
            } else if (i.tSubject === 5) {
              this.questionType5.push(i)
            } else if (i.tSubject === 4) {
              this.questionType4.push(i)
            } else {
              this.questionMultiple.push(i)
            }
          })
        })
        .catch(err => {
          console.error(err)
        })
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
        path: '/result',
        query: {
          examId: this.examId,
          id: this.id,
          isView: this.isView,
          // eslint-disable-next-line eqeqeq
          isMock: this.isMock == 1 ? this.isMock : 0
        }
      })
    },
    next() {
      if (this.idx === this.question.length - 1) {
        this.show = true
        return
      }
      this.idx++
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
.page-paper {
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
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      .overlay-btn {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        color: #fff;
        background-color: #2cad69;
      }
    }
  }
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
        position: relative;
      }
      .subject-title {
        margin-bottom: 60px;
        white-space: wrap;
        .mymath {
          display: block;
          .mjx-chtml {
            white-space: wrap;
            word-wrap: break-word;
            word-break: break-all;
          }
          // span {
          //   padding-right: 10px;
          // }
        }
      }
      .subject-options {
        .upload-icon-pic {
          // width: 100%;
          height: 180px;
          background-color: red;
          background: url('../../assets/image/add.png') no-repeat center center;
        }
        .upload-icon-img {
          img {
            width: 100%;
          }
        }
        .un-answer-area {
          width: 100%;
          height: 400px;
          text-align: center;
          line-height: 400px;
          color: red;
        }
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
      // display: flex;
      // justify-content: space-between;
      .next-btn {
        // width: 49%;
        height: 90px;
        background-color: #2cad69;
      }
    }
  }
}
</style>
