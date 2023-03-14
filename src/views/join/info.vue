<template>
  <div class="page-info">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="desc">报考信息</div>
      <div class="content-form">
        <van-cell-group>
          <van-field v-model="username" label-class="content-form-text" label-width="90" required label="姓名：" placeholder="请输入姓名" />
          <van-field
            v-model="school"
            label-class="content-form-text"
            label-width="90"
            required
            label="学校："
            placeholder="请输入学校名称"
            error-message=""
          />
          <van-field
            v-model="teacherName"
            label-class="content-form-text"
            label-width="90"
            label="指导老师："
            placeholder="请输入指导老师姓名"
            error-message=""
          />
          <van-field
            v-model="email"
            label-class="content-form-text"
            label-width="90"
            required
            label="邮箱："
            placeholder="请输入邮箱"
            error-message=""
          />
          <van-field
            v-model="phone"
            label-class="content-form-text"
            label-width="90"
            type="tel"
            label="联系电话："
            placeholder="请输入手机号码"
            error-message=""
          />
          <!-- <van-field v-model="phone" label-class="content-form-text" label-width="90" label="人脸录入：" placeholder="" error-message="">
            <template #button>
              <van-button size="small" type="primary">发送验证码</van-button>
            </template></van-field
          > -->
          <div style="height: 50px; line-height: 50px; padding-left: 30px; color: #646566" class="face-area">
            人脸录入：<span style="color: #03bd7c; margin-left: 10px" @click="takePhoto">点击录入</span>
          </div>
        </van-cell-group>
        <div class="face-btn">
          <!-- <van-button class="facing" size="large" type="primary" round>人脸录入</van-button> -->
          <div class="text-tip">敬请关注相关消息，准时参加竞赛。</div>
        </div>
      </div>
    </div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" :disabled="isDisable" type="primary" size="large" round @click="submitInfo">提交</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'

export default {
  name: 'Info',
  components: {
    Nav
  },
  data() {
    return {
      username: '',
      school: '',
      teacherName: '',
      email: '',
      phone: ''
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
    goBack() {
      this.$router.push({
        path: '/control',
        query: {}
      })
    },
    init() {},
    takePhoto() {
      console.log('拍照')
      const that = this
      // eslint-disable-next-line no-undef
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          const localIds = res.localIds // 返回选定照片的本地 ID 列表，localId可以作为 img 标签的 src 属性显示图片
          wx.getLocalImgData({
            localId: localIds[0], // 图片的localID
            success: function (res) {
              var base64Data = res.localData // localData是图片的base64数据，可以用 img 标签显示
              const file = that.base64toFile(base64Data)
              console.log(file)
              // file上传到服务器获取url
            }
          })
        }
      })
    },
    submitInfo() {
      if (this.username.trim().length === 0) {
        Toast({
          message: '姓名不能为空',
          position: 'middle'
        })
        return
      }
      if (this.school.trim().length === 0) {
        Toast({
          message: '学校不能为空',
          position: 'middle'
        })
        return
      }
      if (this.email.trim().length === 0) {
        Toast({
          message: '邮箱不能为空',
          position: 'middle'
        })
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-info {
  height: 100%;
  width: 100%;
  position: relative;
  .content {
    width: 100%;
    height: calc(100% - 180px);
    overflow: auto;
    padding: 30px 28px 0 28px;
    padding-bottom: 100px;
    .desc {
      margin-bottom: 35px;
      font-weight: 600;
    }
    .content-form {
      height: 700px;
      background-color: #fff;
      border-radius: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /deep/ .van-cell--required::before {
        left: 30px;
      }
      /deep/ .content-form-text {
        text-align: right;
      }
      .face-area {
        // display: flex;
        height: 50px;
      }
      .face-btn {
        display: flex;
        flex-direction: column;
        padding: 0 30px;
        .facing {
          height: 80px;
        }
        .text-tip {
          color: #666;
          font-size: 20px;
          margin-top: 20px;
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
