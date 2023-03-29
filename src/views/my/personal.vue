<template>
  <div class="page-info">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <!-- <div class="desc">报考信息</div> -->
      <div class="content-form">
        <div class="wx-user-info">
          <div class="wx-pic">
            <!-- <img src="../../assets/image/home.png" alt="" /> -->
            <img :src="info.pic" alt="" />
          </div>
          <div class="wx-nickname">昵称：{{ info.username }}</div>
        </div>
        <van-cell-group>
          <van-field
            v-model.trim="username"
            v-focus
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            required
            label="姓名："
            placeholder="请输入姓名"
          />
          <!-- label="学校：" -->
          <!-- v-model.trim="attr.value" -->

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
              <smart-input id="service" :code.sync="attr.value" :props="attr" @sync="syncService"></smart-input>
            </template>
          </van-field>
          <van-field
            v-model.trim="number"
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            type="tel"
            label="学号："
            placeholder="请输入学号"
            error-message=""
          />
          <van-field
            v-model.trim="email"
            :readonly="isDisable"
            label-class="content-form-text"
            label-width="90"
            required
            label="邮箱："
            placeholder="请输入邮箱"
            error-message=""
          />
          <van-field
            v-model.trim="phone"
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
        <!-- <div class="face-btn">
          <div class="text-tip">敬请关注相关消息，准时参加竞赛。</div>
        </div> -->
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
import smartInput from '@/components/smart-input'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { isEmail, isMobile } from '@/utils/validate'
import { getPubCodes } from '@/api/home'

import { getUserInfoByUid, updateUserInfoByUid } from '@/api/user'

export default {
  name: 'Info',
  components: {
    Nav,
    smartInput
  },
  data() {
    return {
      loading: false,
      hasStuRegister: 0,
      status: -1,
      info: {},
      username: '',
      school: '',
      number: '',
      email: '',
      phone: '',
      attr: {
        attrName: '学校：',
        value: ''
      }
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
    // this.getSchools()
    this.init()
  },
  methods: {
    syncService(data) {
      this.school = data.shortCode
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
    goBack() {
      this.$router.replace({
        path: '/my'
      })
    },
    init() {
      getUserInfoByUid()
        .then(res => {
          this.info = res.data
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
      if (this.phone.length > 0 && !isMobile(this.phone)) {
        Toast({
          message: '请填写有效的手机号',
          position: 'middle'
        })
        return
      }

      const data = {
        realName: this.username,
        school: this.school,
        number: this.number,
        email: this.email,
        mobile: this.phone
      }

      Dialog.confirm({
        title: '提示',
        message: '是否确认保存当前信息?',
        confirmButtonText: '确认',
        confirmButtonColor: '#00a400',
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            updateUserInfoByUid(data)
              .then(res => {
                Toast({
                  message: '保存成功',
                  position: 'middle'
                })
                this.$router.replace({
                  path: '/my'
                })
                done()
              })
              .catch(err => {
                done()
                console.error(err)
              })
          } else {
            done()
          }
        }
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
  justify-content: space-between;
  .content {
    flex: 1;
    width: 100%;
    // height: calc(100% - 180px);
    min-height: 800px;
    overflow: auto;
    padding: 30px 28px 0 28px;
    padding-bottom: 100px;
    .desc {
      margin-bottom: 35px;
      font-weight: 600;
    }
    .content-form {
      height: 800px;
      background-color: #fff;
      border-radius: 20px;
      padding-bottom: 20px;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .wx-user-info {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 50px;
        .wx-pic {
          margin-bottom: 10px;
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
          }
        }
        .wx-nickname {
          text-align: center;
          color: #646566;
        }
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
    margin-top: 240px;
    width: 100%;
    // position: fixed;
    height: 100px;
    // bottom: 0;
    // background-color: #fff;
    padding: 0 28px;
    z-index: 999;
    .join-btn {
      height: 90px;
      background-color: #2cad69;
    }
  }
}
</style>
