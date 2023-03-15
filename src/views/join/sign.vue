<template>
  <div class="page-sign">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="intro">
        <div class="intro-title">诚信考试承诺书</div>
        <p>本人已阅读清楚<span style="color: #1989fa" @click="toPromise">《考生守则》</span>的内容，愿意承诺遵守考试规则，诚信参加考试。</p>
      </div>
      <div>
        <div class="tip-text">承诺人签名：</div>
        <img v-show="imgUrl" :src="imgUrl" alt="" />
        <vue-esign
          v-show="!imgUrl"
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
import { uploadImage } from '@/api/exam'
import { Toast } from 'vant'

export default {
  name: 'Sign',
  components: {
    Nav,
    vueEsign
  },
  data() {
    return {
      id: this.$route.query.id,
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false,
      imgUrl: ''
    }
  },
  computed: {
    isDisable() {
      return false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/promise',
        query: {
          id: this.id
        }
      })
    },

    init() {
      this.imgUrl = localStorage.getItem(`esign${this.id}`) ? localStorage.getItem(`esign${this.id}`) : ''
    },
    toPromise() {
      this.$router.push({
        path: '/promise',
        query: {
          id: this.id
        }
      })
    },
    clearPaint() {
      this.imgUrl = ''
      this.$refs.esign.reset()
    },
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
    handleGenerate() {
      this.$refs.esign
        .generate()
        .then(res => {
          this.resultImg = res
          const file = this.base64toFile(this.resultImg)
          const fd = new FormData()
          fd.append('cosPath', 'gfkd/masterhead')
          fd.append('file', file)
          uploadImage(fd).then(result => {
            if (result.code === 200) {
              localStorage.setItem(`esign${this.id}`, result.data.accessUrl)
              this.$router.push({
                path: '/info',
                query: {
                  id: this.id
                }
              })
            }
          })
        })
        .catch(err => {
          console.log(err)
          if (this.imgUrl) {
            this.$router.push({
              path: '/info',
              query: {
                id: this.id
              }
            })
          } else {
            Toast({
              message: '您还没有签名',
              position: 'middle'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-sign {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  .content {
    width: 100%;
    // height: calc(100% - 180px);
    min-height: 1200px;
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
    img {
      width: 100%;
      height: 400px;
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
