<template>
  <div class="page-control">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="contest-name">{{ info.mhName }}</div>
      <div class="contest-time">
        <div class="clock"></div>
        <span>报名时间：{{ $parseTime(info.startTime, '{y}/{m}/{d} {h}:{i}') }}-{{ $parseTime(info.endTime, '{y}/{m}/{d} {h}:{i}') }}</span>
      </div>
      <div class="contest-icons">
        <div v-for="(item, idx) in tabs" :key="idx" class="icon-item" @click="goPath(item, idx)">
          <img :src="item.url" alt="" />
          <span>{{ item.text }}</span>
        </div>
      </div>
      <div class="contest-line">报名流程</div>
      <div class="contest-timeline">
        <van-steps direction="vertical" :active="active">
          <van-step>
            <span>阅读报名须知</span>
          </van-step>
          <van-step>
            <span>签订竞赛诚信承诺书</span>
          </van-step>
          <van-step>
            <span>填写个人信息</span>
          </van-step>
          <van-step>
            <span>等待审核</span>
          </van-step>
          <van-step>
            <span>立即参赛</span>
          </van-step>
        </van-steps>
        <div class="msg-tip">注意事项：提交审核后，审核通知会发送到微信公众号，请及时关注。</div>
      </div>
    </div>
    <!-- <div class="footer van-hairline--top">
      <van-button class="join-btn" :disabled="isDisable" type="primary" size="large" round to="/sign">提交</van-button>
    </div> -->
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getContestDetail } from '@/api/home'
import { contestBegin, contestMockBegin } from '@/api/exam'
import { contestCredential } from '@/api/credential'
import { Toast } from 'vant'

export default {
  name: 'Control',
  components: {
    Nav
  },
  data() {
    return {
      id: this.$route.query.id,
      info: {},
      active: -1,
      tabs: [
        { url: require('../../assets/image/rule.png'), text: '报名须知', path: '/rule' },
        { url: require('../../assets/image/promise.png'), text: '诚信承诺书', path: '/promise' },
        { url: require('../../assets/image/info_write.png'), text: '信息填写', path: '/info' },
        { url: require('../../assets/image/contest_in.png'), text: '立即参赛', path: '/start' },
        { url: require('../../assets/image/mock_in.png'), text: '模拟练习', path: '/start' },
        { url: require('../../assets/image/credential.png'), text: '证书查看', path: '/credentials-detail' }
      ]
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
        path: '/join',
        query: {
          id: this.id
        }
      })
    },
    goPath(item, idx) {
      if (idx === 3) {
        contestBegin({
          masterHeadId: this.id
        }).then(res => {
          if (res.code === 200) {
            const { examId } = res.data
            this.$router.push({
              path: item.path,
              query: {
                examId,
                id: this.id
              }
            })
          } else {
            Toast({
              message: res.msg,
              position: 'middle'
            })
          }
        })
      } else if (idx === 4) {
        contestMockBegin({
          masterHeadId: this.id
        }).then(res => {
          if (res.code === 200) {
            const { examId } = res.data
            this.$router.push({
              path: item.path,
              query: {
                examId,
                id: this.id
              }
            })
          } else {
            Toast({
              message: res.msg,
              position: 'middle'
            })
          }
        })
      } else if (idx === 5) {
        contestCredential({
          masterHeadId: this.id
        }).then(res => {
          if (res.code === 200) {
            this.$router.push({
              path: item.path,
              query: {
                id: this.id,
                type: 1 // control进入证书详情
              }
            })
          } else {
            Toast({
              message: res.msg,
              position: 'middle'
            })
          }
        })
      } else {
        this.$router.push({
          path: item.path,
          query: {
            id: this.id
          }
        })
      }
    },
    init() {
      getContestDetail({
        masterheadId: this.id
      })
        .then(res => {
          this.info = res.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-control {
  // height: 1800px;
  /deep/ .van-step__circle {
    background-color: #07c160;
  }
  background-color: #f4f4f4;
  width: 100%;
  position: relative;
  .content {
    width: 100%;
    // height: calc(100% - 180px);
    height: 100%;
    overflow: auto;
    padding: 30px 28px 0 28px;
    padding-bottom: 100px;
    .contest-name {
      text-align: center;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .contest-time {
      width: 100%;
      height: 70px;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      .clock {
        width: 23px;
        height: 23px;
        background: url('../../assets/image/clock.png') no-repeat;
        background-size: contain;
        margin-right: 10px;
      }
      span {
        color: #666;
      }
    }
    .contest-icons {
      width: 100%;
      height: 400px;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      .icon-item {
        width: 25%;
        height: 50%;
        // background-color: red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 82px;
          height: 82px;
          margin-bottom: 20px;
        }
        span {
          color: #666;
        }
      }
    }
    .contest-line {
      margin-bottom: 20px;
    }
    .contest-timeline {
      width: 100%;
      height: 530px;
      background-color: #fff;
      border-radius: 10px;
      padding-top: 27px;
      padding-left: 27px;
      color: #666;
      .msg-tip {
        font-size: 26px;
        padding-left: 16px;
        margin-top: 30px;
      }
    }
  }
  // .content p {
  //   height: 300px;
  // }
  .footer {
    width: 100%;
    // position: fixed;
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
