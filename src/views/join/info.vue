<template>
  <div class="page-info">
    <Nav title="报名信息" @go-back="goBack"></Nav>
    <div class="content">
      <div class="desc">报考信息</div>
      <div class="content-form">
        <!-- 人脸录入图片 -->
        <van-image v-if="faceUrl" class="face-pic" round :src="faceUrl" @click="previewFace" />
        <van-cell-group>
          <van-field
            v-model="username"
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            required
            label="姓名："
            placeholder="请输入姓名"
          />
          <van-field
            v-model.trim="attr.value"
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            required
            :label="attr.attrName"
            placeholder="请选择学校代号"
            error-message=""
          >
            <template #input>
              <smart-input id="service1" :is-disable="isDisable" :code.sync="attr.value" :props="attr" @sync="syncService"></smart-input>
            </template>
          </van-field>
          <van-popup v-model="showPicker" position="bottom">
            <van-picker value-key="shortCode" show-toolbar :columns="schoolCodes" @confirm="onConfirm" @cancel="showPicker = false" />
          </van-popup>
          <van-field
            v-model="teacherName"
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            label="指导老师："
            placeholder="请输入指导老师姓名"
            error-message=""
          />
          <van-field
            v-model="email"
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            required
            label="邮箱："
            placeholder="请输入邮箱"
            error-message=""
            @input="validateEmail"
          />
          <van-field
            v-model="phone"
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            maxlength="11"
            type="tel"
            required
            label="手机："
            placeholder="请输入手机号码"
            error-message=""
          />
          <!-- <van-field v-model="phone" label-class="content-form-text" label-width="90" label="人脸录入：" placeholder="" error-message="">
            <template #button>
              <van-button size="small" type="primary">发送验证码</van-button>
            </template></van-field
          > -->
          <div style="height: 50px; line-height: 50px; padding-left: 30px; color: #646566" class="face-area">
            人脸录入：<span style="color: #03bd7c; margin-left: 10px" @click="takePhoto">{{ faceUrl ? '重新录入' : '点击录入' }}</span>
          </div>
        </van-cell-group>
        <div class="face-btn">
          <!-- <van-button class="facing" size="large" type="primary" round>人脸录入</van-button> -->
          <div class="text-tip">敬请关注相关消息，准时参加竞赛。</div>
        </div>
      </div>
    </div>
    <div class="footer van-hairline--top">
      <van-button
        class="join-btn"
        :disabled="isDisable"
        type="primary"
        size="large"
        :loading="loading"
        loading-text="提交中..."
        round
        @click="submitInfo"
        >{{ submitBtnText }}</van-button
      >
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
// eslint-disable-next-line no-unused-vars
import { Toast, ImagePreview } from 'vant'
// import wx from 'weixin-js-sdk'
import wx from 'jweixin-1.6.0'
import { uploadImage } from '@/api/exam'
import { isEmail, isMobile } from '@/utils/validate'
import smartInput from '@/components/smart-input'
import { getUserInfoByUid } from '@/api/user'
import { getContestDetail, getPubCodes } from '@/api/home'
import { registerJoin } from '@/api/exam'

export default {
  name: 'Info',
  components: {
    Nav,
    smartInput
  },
  data() {
    return {
      showPicker: false,
      loading: false,
      hasStuRegister: 0,
      status: -1,
      id: this.$route.query.id,
      info: {},
      faceUrl: '',
      username: '',
      school: '',
      teacherName: '',
      email: '',
      phone: '',
      mhStuId: '',
      schoolCodes: [],
      attr: {
        attrName: '学校：',
        value: ''
      },
      userInfo: null
    }
  },
  computed: {
    submitBtnText() {
      let str = '提交'
      switch (this.status) {
        case 0:
          str = '待审核'
          break
        case 2:
          str = '审核通过'
          break
        default:
          break
      }
      return str
    },
    isDisable() {
      if (this.hasStuRegister === 0) {
        return false
      } else {
        return this.status !== 3
      }
    }
  },
  mounted() {
    const signPic = localStorage.getItem(`esign${this.id}`) ? localStorage.getItem(`esign${this.id}`) : ''
    if (!signPic) {
      Toast({
        message: '未签写电子签名，请检查',
        position: 'middle'
      })
    }
    this.getSchools()
    this.init()
  },
  methods: {
    previewFace() {
      const url = this.faceUrl
      ImagePreview({
        images: [url],
        showIndex: false
      })
    },
    validateEmail() {
      this.email = this.email.replace(
        /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
        ''
      )
    },
    syncService(data) {
      this.school = data.shortCode
    },
    // a() {
    //   // 防止唤起手机键盘
    //   document.activeElement.blur()
    // },
    toChooseSchool() {
      if (this.isDisable) {
        return false
      }
      this.showPicker = true
    },
    onConfirm(value) {
      const { shortCode } = value
      this.school = shortCode
      this.showPicker = false
    },
    goBack() {
      this.$router.replace({
        path: '/control',
        query: {
          id: this.id
        }
      })
    },
    getSchools() {
      getPubCodes()
        .then(res => {
          if (res.code === 200) {
            this.schoolCodes = res.data
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    init() {
      getContestDetail({
        masterheadId: this.id
      })
        .then(res => {
          this.info = res.data
          this.hasStuRegister = res.data.hasStuRegister
          if (res.data.hasStuRegister === 0) {
            getUserInfoByUid()
              .then(res => {
                this.userInfo = res.data
                this.username = res.data.realName ? res.data.realName : ''
                this.school = res.data.school ? res.data.school : ''
                this.attr.value = res.data.school ? res.data.school : ''
                this.number = res.data.number ? res.data.number : ''
                this.email = res.data.email ? res.data.email : ''
                this.phone = res.data.mobile ? res.data.mobile : ''
              })
              .catch(err => {
                console.error(err)
              })
          }
          if (res.data.hasStuRegister === 1) {
            // 已报名
            const { name, facePic, school, email, appointTeacher, mobile, status, mhStuId } = res.data
            this.faceUrl = facePic
            this.username = name
            this.school = school
            this.attr.value = school || ''
            this.teacherName = appointTeacher
            this.email = email
            this.phone = mobile
            this.status = status
            this.mhStuId = mhStuId
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    takePhoto() {
      if (this.isDisable) {
        Toast({
          message: '不可修改',
          position: 'middle'
        })
        return
      }
      const that = this

      wx.ready(() => {
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              const localIds = res.localIds // 返回选定照片的本地 ID 列表，localId可以作为 img 标签的 src 属性显示图片
              wx.getLocalImgData({
                localId: localIds[0], // 图片的localID
                success: function (res) {
                  let base64Data = ''
                  if (res.localData.indexOf(';base64,') === -1) {
                    // 兼容处理，安卓获取的图片base64码没有前缀，而苹果有,base64前缀并不固定
                    base64Data = 'data:image/jpeg;base64,' + res.localData
                  }
                  if (res.localData.indexOf('data:image/jpg;base64,') !== -1) {
                    // 兼容处理，若是苹果手机，将前缀中的jgp替换成jpeg
                    base64Data = res.localData.replace('data:image/jpg;base64,', 'data:image/jpeg;base64,')
                  }

                  const file = that.$base64toFile(base64Data)
                  const fd = new FormData()
                  fd.append('cosPath', 'gfkd/masterhead')
                  fd.append('file', file)
                  uploadImage(fd).then(result => {
                    if (result.code === 200) {
                      Toast({
                        message: '上传成功',
                        position: 'middle'
                      })
                      that.faceUrl = result.data.accessUrl
                    }
                  })
                }
              })
            }
          })
        }, 200)
      })
    },
    submitInfo() {
      // 获取电子签名
      const signPic = localStorage.getItem(`esign${this.id}`) ? localStorage.getItem(`esign${this.id}`) : ''
      if (!signPic) {
        Toast({
          message: '未签写电子签名，请检查',
          position: 'middle'
        })
        return
      }
      if (this.username.trim().length === 0) {
        Toast({
          message: '姓名不能为空',
          position: 'middle'
        })
        return
      }
      if (this.school.trim().length === 0) {
        Toast({
          message: '请选择学校代号',
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
      if (!isEmail(this.email)) {
        Toast({
          message: '请填写有效的邮箱',
          position: 'middle'
        })
        return
      }
      if (this.phone.trim().length === 0) {
        Toast({
          message: '手机号不能为空',
          position: 'middle'
        })
        return
      }
      if (this.phone.length > 0 && !isMobile(this.phone)) {
        Toast({
          message: '请填写有效的手机号',
          position: 'middle'
        })
        return
      }
      if (this.faceUrl.length === 0) {
        Toast({
          message: '请录入人脸信息',
          position: 'middle'
        })
        return
      }

      const data = {
        masterheadId: this.id,
        signPic,
        name: this.username,
        school: this.school,
        email: this.email,
        facePic: this.faceUrl,
        appointTeacher: this.teacherName,
        mobile: this.phone
      }
      if (this.mhStuId) {
        data.mhStuId = this.mhStuId
      }
      this.loading = true
      registerJoin(data)
        .then(res => {
          this.loading = false
          Toast({
            message: '报名成功',
            position: 'middle'
          })
          localStorage.removeItem(`esign${this.id}`)
          this.$router.replace({
            path: '/control',
            query: {
              id: this.id
            }
          })
          // this.init()
        })
        .catch(err => {
          this.loading = false
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-info {
  // height: 100%;
  min-height: 1300px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .content {
    flex: 1;
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
      min-height: 700px;
      background-color: #fff;
      border-radius: 20px;
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .face-pic {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;
      }
      /deep/ .van-cell--required::before {
        left: 100px;
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
    margin-top: 200px;
    width: 100%;
    // position: fixed;
    height: 100px;
    // bottom: 0;
    // background-color: #fff;
    padding: 0 28px;
    // z-index: 999;
    .join-btn {
      height: 90px;
      background-color: #2cad69;
    }
  }
}
</style>
