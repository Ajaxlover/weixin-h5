<template>
  <div class="page-join">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="pic">
        <img src="../../assets/image/test_pic .png" alt="" />
      </div>
      <div class="contest-info">
        <div class="contest-name">第一届全君大学物理竞赛</div>
        <div class="contest-time van-hairline--bottom">报名时间：2023/04/02 00:00-2023/05/01 00:00</div>
        <div class="contest-time van-hairline--bottom">报名时间：2023/04/02 00:00-2023/05/01 00:00</div>
        <div class="contest-time van-hairline--bottom">主办单位：<span>国防科技大学</span></div>
        <div class="contest-time">竞赛方式：<span>线上知识竞赛</span></div>
      </div>
      <div class="contest-detail">
        <div class="contest-detail-title">详情</div>
        <div class="contest-detail-content">
          第一届全君大学物理竞赛第一届全君大学物理竞赛第一 届全君大学物理竞赛第一届全君大学物理竞赛第一届全 君大学物理竞赛。
          第一届全君大学物理竞赛第一届全君大学物理竞赛第一 届全君大学物理竞赛第一届全君大学物理竞赛第一届全 君大学物理竞赛。
        </div>
        <!-- <div style="width: 400px; height: 100%">
          <div class="contest-detail-title">详情</div>
          <div>6666666</div>
        </div> -->
      </div>
      <div class="share-btn">
        <van-button square type="primary" :icon="iconUrl"> 分享 </van-button>
        <van-button square type="primary" @click="goControl">报名</van-button>
      </div>
    </div>
    <!-- <div class="footer van-hairline--top">
      <van-button class="join-btn" type="primary" size="large" round>去报名</van-button>
    </div> -->
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Join',
  components: {
    Nav
  },
  data() {
    return {
      iconUrl: require('../../assets/image/share.png')
    }
  },
  computed: {},
  methods: {
    getInfo() {},
    goBack() {
      this.$router.push({
        path: '/',
        query: {}
      })
    },
    goControl() {
      this.$router.push({
        path: '/control',
        query: {}
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
      padding-top: 37px;
      padding-left: 35px;
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
      padding: 37px 35px;
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
      display: flex;
      margin-top: 90px;
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
    background-color: #fff;
    z-index: 999;
    .join-btn {
      height: 90px;
    }
  }
}
</style>
