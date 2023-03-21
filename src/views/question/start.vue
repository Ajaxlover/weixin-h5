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
        <van-button type="primary" size="large" round @click="goAnswer">开始答题</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getContestInfo, checkStartExam, submitExam } from '@/api/exam'
import Storage from '@/utils/auth'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'
import { uploadImage } from '@/api/exam'

export default {
  name: 'Start',
  components: {
    Nav
  },
  data() {
    return {
      id: this.$route.query.id,
      examId: this.$route.query.examId,
      info: {},
      localIds: []
    }
  },
  computed: {},
  mounted() {
    this.getInfo()
  },
  methods: {
    base64toFile(dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      // suffix是该文件的后缀
      const suffix = mime.split('/')[1]
      // atob 对经过 base-64 编码的字符串进行解码
      const bstr = atob(arr[1])
      // n 是解码后的长度
      let n = bstr.length
      // Uint8Array 数组类型表示一个 8 位无符号整型数组 初始值都是 数子0
      const u8arr = new Uint8Array(n)
      // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const filename = new Date().getTime()
      // new File返回File对象 第一个参数是 ArraryBuffer 或 Bolb 或Arrary 第二个参数是文件名
      // 第三个参数是 要放到文件中的内容的 MIME 类型
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },
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
    doSubmit() {
      const startTime = localStorage.getItem(`startTime-${this.examId}`)
      const examPic = localStorage.getItem(`examPic${this.examId}`)
      const examResultUniqueId = localStorage.getItem(`uniqueId-${this.examId}`)
      const questionCache = JSON.parse(Storage.getExamRecord(`contest-${this.examId}`))

      const content = []
      questionCache.forEach(item => {
        content.push({
          bankId: item.bankId,
          parentId: item.parentId,
          stuAnswer: item.stuAnswer ? item.stuAnswer : '',
          sonSubList: item.sonSubList
        })
      })
      const data = {
        examId: this.examId,
        examResultUniqueId,
        forceSubmitFlag: 0,
        startTime,
        content: JSON.stringify(content),
        examStuPicUrl: examPic
      }
      submitExam(data)
        .then(res => {
          if (res.code === 200) {
            this.removeCaches()
            this.$router.push({
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
    goAnswer() {
      // 是否有本场考试的startTime  有=>判断是否还有时间  无=> 拍照
      const startTimeCache = localStorage.getItem(`startTime-${this.examId}`) ? localStorage.getItem(`startTime-${this.examId}`) : ''
      if (startTimeCache) {
        if (new Date().getTime() - startTimeCache >= this.info.answerTime * 60 * 1000) {
          Toast({
            message: '答题时间已超过限时',
            position: 'middle'
          })
          // 提交原来记录 跳转答题结果
          this.doSubmit()
        } else {
          this.$router.push({
            path: '/question',
            query: {
              examId: this.examId,
              id: this.id,
              isErrorBank: this.info.isErrorBank
            }
          })
        }
      } else {
        checkStartExam({
          examId: this.examId,
          startTime: new Date().getTime()
        })
          .then(res => {
            if (res.code === 200) {
              // 首次进入 拍照
              const that = this
              // eslint-disable-next-line no-undef
              wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                  // const localIds = res.localIds // 返回选定照片的本地 ID 列表，localId可以作为 img 标签的 src 属性显示图片
                  that.localIds = res.localIds
                  wx.getLocalImgData({
                    localId: that.localIds[0], // 图片的localID
                    success: function (res) {
                      console.log(res)
                      let base64Data = ''
                      if (res.localData.indexOf(';base64,') === -1) {
                        // 兼容处理，安卓获取的图片base64码没有前缀，而苹果有,base64前缀并不固定
                        base64Data = 'data:image/jpeg;base64,' + res.localData
                      }
                      if (res.localData.indexOf('data:image/jpg;base64,') !== -1) {
                        // 兼容处理，若是苹果手机，将前缀中的jgp替换成jpeg
                        base64Data = res.localData.replace('data:image/jpg;base64,', 'data:image/jpeg;base64,')
                      }

                      const file = that.base64toFile(base64Data)
                      const fd = new FormData()
                      fd.append('cosPath', 'gfkd/masterhead')
                      fd.append('file', file)
                      uploadImage(fd).then(result => {
                        if (result.code === 200) {
                          localStorage.setItem(`examPic${that.examId}`, result.data.accessUrl)
                          that.$router.push({
                            path: '/question',
                            query: {
                              examId: that.examId,
                              id: that.id,
                              isErrorBank: that.info.isErrorBank
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
            if (res.code === 241) {
              // 超出作答次数 跳转结果页
              this.$router.push({
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
      }
    },
    removeCaches() {
      Storage.removeExamRecord(`contest-${this.examId}`)
      localStorage.removeItem(`countDown-${this.examId}`)
      localStorage.removeItem(`uniqueId-${this.examId}`)
      localStorage.removeItem(`startTime-${this.examId}`)
      localStorage.removeItem(`examPic${this.examId}`)
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
