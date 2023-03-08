<template>
  <div class="page-control">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="contest-name">竞赛名称</div>
      <div class="contest-time">
        <div class="clock"></div>
        <span>报名时间：2023/05/01 00:00-2023/06/01 23:59</span>
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

export default {
  name: 'Control',
  components: {
    Nav
  },
  data() {
    return {
      active: 0,
      tabs: [
        { url: require('../../assets/image/报名须知.png'), text: '报名须知', path: '/rule' },
        { url: require('../../assets/image/考生守则.png'), text: '诚信承诺书', path: '/promise' },
        { url: require('../../assets/image/信息填写.png'), text: '信息填写', path: '/info' },
        { url: require('../../assets/image/立即参赛.png'), text: '立即参赛', path: '/start' },
        { url: require('../../assets/image/模拟.png'), text: '模拟练习', path: '' },
        { url: require('../../assets/image/证书.png'), text: '证书查看', path: '/credentials' }
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
        path: '/',
        query: {}
      })
    },
    goPath(item, idx) {
      this.$router.push(item.path)
    },
    init() {}
  }
}
</script>

<style lang="scss" scoped>
.page-control {
  // height: 1800px;
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
        background: url('../../assets/image/提醒.png') no-repeat;
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
