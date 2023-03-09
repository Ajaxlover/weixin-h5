<template>
  <div class="page-question">
    <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }">
      <div class="contest-popup">
        <div class="contest-popup-danxuan">单选题</div>
      </div>
    </van-popup>
    <Nav :is-show-right="isShowRight" @go-back="goBack" @right-click="rightClick"></Nav>
    <div class="content">
      <div v-for="(item, index) in question" v-show="index === idx" :key="index" class="question">
        <div class="subject-type">
          <van-tag v-if="item.ismultiple" plain type="primary">多选题</van-tag>
          <van-tag v-else plain type="primary">单选题</van-tag>
          <span>{{ index + 1 }}/{{ question.length }}</span>
          <span>({{ item.score }}分)</span>
        </div>
        <div class="subject-title">
          <JaxMath :data="item.name"></JaxMath>
        </div>
        <div class="subject-options">
          <div
            v-for="(i, j) in item.option"
            :key="i.id"
            :class="i.checked ? 'bgc' : ''"
            class="option-item van-hairline--surround"
            @click="handleClick(i, j)"
          >
            {{ i.letter }}. {{ i.name }}
          </div>
          <!-- <div class="option-item van-hairline--surround">111111111</div> -->
          <!-- <div class="option-item van-hairline--surround">111111111</div> -->
          <!-- <div class="option-item van-hairline--surround">111111111</div> -->
        </div>
      </div>
    </div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" type="primary" size="large" round @click="next">提交本题</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import JaxMath from '@/components/JaxMath'

export default {
  name: 'Question',
  components: {
    Nav,
    JaxMath
  },
  data() {
    return {
      // 考试结束时间-开始时间>= 限时(倒计时)
      // 1.记录开始考试时间 2.倒计时 当前-开始
      show: false,
      idx: 0,
      isShowRight: true,
      ismultipleAnswer: [],
      question: [
        {
          id: 1,
          num: 1,
          ismultiple: false,
          name: '<p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri,&quot;sans-serif&quot;"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,&quot;serif&quot;"><span style="color:black">Questions 22 to 25 are based on the recording you have just heard. </span></span></span></strong></span></span><br />\n&nbsp;</p>\n\n<div class="ckeditor-html5-audio" style="text-align: center;">\n<audio controls="controls" controlslist="nodownload" src="https://img.guangyiedu.com/ckeditor/1653372688386.mp3">&nbsp;</audio>\n</div>\n',
          answer: 'A',
          score: 2,
          option: [
            {
              id: 1,
              name: '星期一',
              checked: false,
              letter: 'A'
            },
            {
              id: 2,
              name: '星期三',
              checked: false,
              letter: 'B'
            },
            {
              id: 3,
              name: '星期四',
              checked: false,
              letter: 'C'
            }
          ]
        },
        {
          id: 2,
          num: 2,
          ismultiple: false,
          name: '（2022年数学三）已知数列<span class="math-tex">${{a}_{n}}=\\sqrt[n]{n}-\\frac{{{(-1)}^{n}}}{n}(n=1,2,\\cdots )$</span>，则下列说法中正确的是（ ）.',
          answer: 'C',
          score: 2,
          option: [
            {
              id: 1,
              name: '香蕉',
              checked: false,
              letter: 'A'
            },
            {
              id: 2,
              name: '苹果',
              checked: false,
              letter: 'B'
            },
            {
              id: 3,
              name: '橘子',
              checked: false,
              letter: 'C'
            }
          ]
        },
        {
          id: 3,
          num: 3,
          ismultiple: false,
          name: '你的梦想是什么?',
          answer: 'B',
          score: 2,
          option: [
            {
              id: 1,
              name: '当一名程序员',
              checked: false,
              letter: 'A'
            },
            {
              id: 2,
              name: '当一名测试员',
              checked: false,
              letter: 'B'
            },
            {
              id: 3,
              name: '当一名运维',
              checked: false,
              letter: 'C'
            }
          ]
        },
        {
          id: 4,
          num: 4,
          ismultiple: true, // 是否多选
          name: '这是一题多选吗?',
          answer: 'BC',
          score: 2,
          option: [
            // 选项
            {
              id: 1,
              name: '不是',
              checked: false,
              letter: 'A'
            },
            {
              id: 2,
              name: '是的',
              checked: false,
              letter: 'B'
            },
            {
              id: 3,
              name: '是的',
              checked: false,
              letter: 'C'
            }
          ]
        },
        {
          id: 5,
          num: 5,
          ismultiple: true, // 是否多选
          name: '是多选吧?',
          answer: 'ABC',
          score: 2,
          option: [
            // 选项
            {
              id: 1,
              name: '是的',
              checked: false,
              letter: 'A'
            },
            {
              id: 2,
              name: '是的',
              checked: false,
              letter: 'B'
            },
            {
              id: 3,
              name: '是的',
              checked: false,
              letter: 'C'
            }
          ]
        }
      ],
      questionSingle: [], // 单选题
      questionMultiple: [] // 多选题
    }
  },
  computed: {},
  mounted() {
    this.question.forEach(i => {
      if (i.ismultiple) {
        this.questionMultiple.push(i)
      } else {
        this.questionSingle.push(i)
      }
    })
  },
  methods: {
    rightClick() {
      this.show = true
    },
    goBack() {
      this.$router.push({
        path: '/start',
        query: {}
      })
    },
    next() {
      if (this.idx === this.question.length - 1) {
        this.show = true
        return
      }
      this.idx++
    },
    handleClick(info, idx) {
      console.log(info)
      const question = this.question[this.idx] // 每题选项
      const option = this.question[this.idx].option // 每一题题目的选项

      // 选中添加样式
      option.forEach((item, ix) => {
        if (ix === idx) {
          // 如果选中的与数据里面的相等就改变他的样式
          item.checked = !item.checked // 是否选中，取反
        } else if (!question.ismultiple) {
          // 如果不是多选 只能选中一个 其他的都为false
          item.checked = false
        }
      })

      // let isAnswer = info.letter // 选中的答案
      let isAnswer = '' // 选中的答案
      if (info.checked) {
        isAnswer = info.letter // 选中的答案
      }
      const answer = this.question[this.idx].answer // 题目中的答案

      // 如果是多选
      if (question.ismultiple) {
        this.ismultipleAnswer = []
        option.forEach(item => {
          if (item.checked) {
            // 将选中的push到 ismultipleAnswer 数组中
            this.ismultipleAnswer.push(item.letter)
          }
        })
        isAnswer = this.ismultipleAnswer.join(',') // 将ismultipleAnswer转为字符串 下面与答案比较
      }

      console.log('选中的答案', isAnswer)
      console.log('题目的答案', answer)

      // 判断是否选正确，计算分数

      // if (isAnswer == answer) {
      //   // 如果选的答案与题目答案相等,isOk 说明选对了
      //   this.question[this.idx].isOk = true
      //   this.question[this.idx].isDone = true
      // } else {
      //   this.question[this.idx].isOk = false
      //   this.question[this.idx].isDone = true
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-question {
  // -moz-user-select: none; /* Firefox私有属性 */
  // -webkit-user-select: none; /* WebKit内核私有属性 */
  // -ms-user-select: none; /* IE私有属性(IE10及以后) */
  // -khtml-user-select: none; /* Khtml内核私有属性 */
  // -o-user-select: none; /* Opera私有属性 */
  // height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  /deep/ .van-popup--bottom {
    padding-top: 30px;
  }
  .content {
    width: 100%;
    // height: calc(100% - 180px);
    min-height: 1200px;
    overflow: auto;
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
        }
        .bgc {
          // border: 1px rgb(250, 109, 0) solid;
          color: #fff;
          background-color: #a5e3bd;
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
    .join-btn {
      height: 90px;
    }
  }
}
</style>
