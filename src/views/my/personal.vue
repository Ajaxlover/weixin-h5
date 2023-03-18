<template>
  <div class="page-info">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="desc">报考信息</div>
      <div class="content-form">
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
            v-model="school"
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            required
            label="学校："
            placeholder="请输入学校名称"
            error-message=""
          />
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
          />
          <van-field
            v-model="phone"
            :readonly="isDisable"
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
          <!-- <div style="height: 50px; line-height: 50px; padding-left: 30px; color: #646566" class="face-area">
            人脸录入：<span style="color: #03bd7c; margin-left: 10px" @click="takePhoto">{{ faceUrl ? '重新录入' : '点击录入' }}</span>
          </div> -->
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
        >保存</van-button
      >
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { Toast } from 'vant'
import { getUserInfoByUid, updateUserInfoByUid } from '@/api/user'

export default {
  name: 'Info',
  components: {
    Nav
  },
  data() {
    return {
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
      mhStuId: ''
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
    this.init()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/my'
      })
    },
    init() {
      getUserInfoByUid()
        .then(res => {
          this.info = res.data
        })
        .catch(err => {
          console.error(err)
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
      updateUserInfoByUid(data)
        .then(res => {
          this.loading = false
          Toast({
            message: '更新成功',
            position: 'middle'
          })
          this.init()
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
