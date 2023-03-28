<template>
  <div class="page-join">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="pic">
        <img :src="info.coverUrl" alt="" />
      </div>
      <div class="contest-info">
        <div class="contest-name">{{ info.mhName }}</div>
        <div class="contest-time van-hairline--bottom">
          报名时间：{{ $parseTime(info.startTime, '{y}/{m}/{d} {h}:{i}') }}-{{ $parseTime(info.endTime, '{y}/{m}/{d} {h}:{i}') }}
        </div>
        <div class="contest-time van-hairline--bottom">
          竞赛时间：{{ $parseTime(info.competeStartTime, '{y}/{m}/{d} {h}:{i}') }}-{{ $parseTime(info.competeEndTime, '{y}/{m}/{d} {h}:{i}') }}
        </div>
        <div class="contest-time van-hairline--bottom">主办单位：<span>国防科技大学</span></div>
        <div class="contest-time">竞赛方式：<span>线上知识竞赛</span></div>
      </div>
      <div class="contest-detail">
        <div class="contest-detail-title">详情</div>
        <div class="contest-detail-content" v-html="info.introduction"></div>
        <!-- <div style="width: 400px; height: 100%">
          <div class="contest-detail-title">详情</div>
          <div>6666666</div>
        </div> -->
      </div>
      <!-- <div class="share-btn">
        <van-button square type="primary" :icon="iconUrl" @click="toShare"> 分享 </van-button>
        <van-button square type="primary" @click="goControl">报名</van-button>
      </div> -->
    </div>
    <div class="footer van-hairline--top">
      <van-button square type="primary" :icon="iconUrl" @click="toShare">分享 </van-button>
      <van-button :disabled="isDisabled" :class="isDisabled ? 'time-down-bgc' : ''" square type="primary" @click="goControl">{{
        isDisabled ? '已结束' : '报名'
      }}</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import wxUtils from '@/utils/weixin'
// import wx from 'weixin-js-sdk'
import { getContestDetail } from '@/api/home'
import { Toast } from 'vant'

export default {
  name: 'Join',
  components: {
    Nav
  },
  data() {
    return {
      id: this.$route.query.id,
      iconUrl: require('../../assets/image/share.png'),
      info: {},
      isDisabled: false
    }
  },
  computed: {},
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getContestDetail({
        masterheadId: this.id
      })
        .then(res => {
          this.info = res.data
          if (new Date().getTime() >= res.data.endTime) {
            this.isDisabled = true
          }
          const desc = res.data.introduction ? res.data.introduction.replace(/<\/?.+?\/?>/g, '') : '' // 去除html标签
          const params = {
            title: this.info.mhName, // 分享标题
            desc, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            // imgUrl: 'http://www.ay1.cc/img?w=30&h=30' // 分享图标
            imgUrl: ''
          }
          wxUtils.share(params)
        })
        .catch(err => {
          console.error(err)
        })
    },
    toShare() {
      Toast({
        message: '请您点击微信右上角的“...”进行分享',
        position: 'middle'
      })
    },
    goBack() {
      this.$router.replace({
        path: '/',
        query: {}
      })
    },
    goControl() {
      this.$router.replace({
        path: '/control',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-join {
  height: 100%;
  width: 100%;
  position: relative;
  .content {
    width: 100%;
    height: 100%;
    overflow: auto;
    // padding-bottom: 100px;
    padding: 30px 28px 200px 28px;
    position: relative;
    // background-color: #fff;
    .pic {
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 28px;
      img {
        width: 100%;
        height: 290px;
      }
    }
    .contest-info {
      height: 300px;
      border-radius: 10px;
      margin-bottom: 28px;
      padding-top: 10px;
      padding-left: 10px;
      // padding-right: 35px;
      background-color: #fff;
      .contest-name {
        margin-bottom: 28px;
        color: #333;
        font-weight: 600;
      }
      .contest-time {
        margin-bottom: 18px;
        color: #666;
      }
    }
    .contest-detail {
      width: 100%;
      min-height: 260px;
      border-radius: 10px;
      padding: 10px 10px;
      background-color: #fff;
      .contest-detail-title {
        margin-bottom: 20px;
        color: #333;
        font-weight: 600;
      }
      .contest-detail-content {
        word-break: break-word;
        color: #666;
      }
    }
    .share-btn {
      margin-top: 90px;
      display: flex;
      justify-content: space-between;
      /deep/ .van-button {
        width: 49%;
        height: 70px;
        background-color: #2cad69;
        border-radius: 10px;
      }
    }
  }

  .footer {
    width: 100%;
    position: fixed;
    height: 100px;
    bottom: 0;
    background-color: #f4f4f4;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    padding: 0 28px;
    /deep/ .van-button {
      width: 49%;
      height: 70px;
      background-color: #2cad69;
      border-radius: 10px;
    }
    .time-down-bgc {
      background-color: #cafee5;
      color: #000;
      border-color: #cafee5;
    }
  }
}
</style>
