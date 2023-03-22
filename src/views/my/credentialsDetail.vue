<template>
  <div class="page-credentials-detail">
    <Nav @go-back="goBack"></Nav>
    <div class="content">
      <div class="content-box">
        <div class="title">{{ info.masterheadName }}</div>
        <div class="container">
          <div class="username">{{ info.stuName }}</div>
          <div class="user_pic">
            <!-- <img src="../../assets/image/avatar.png" alt="" /> -->
            <img :src="info.facePic" alt="" />
          </div>
          <div class="info">
            <div class="part">
              <div class="part-left">学校:</div>
              <div class="part-right">{{ info.school }}</div>
            </div>
            <div class="part">
              <div class="part-left">指导老师:</div>
              <div class="part-right">{{ info.appointTeacher }}</div>
            </div>
            <div class="part">
              <div class="part-left">所获奖项:</div>
              <div class="part-right">{{ info.awardName }}</div>
            </div>
            <div class="part">
              <div class="part-left">证书编号:</div>
              <div class="part-right">{{ info.certificateNo }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer van-hairline--top">
      <van-button class="join-btn" type="primary" size="large" round @click="preview(info)">查看证书</van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getCredentialDetail, contestCredential } from '@/api/credential'
import { ImagePreview } from 'vant'

export default {
  name: 'CreDetail',
  components: {
    Nav
  },
  data() {
    return {
      type: this.$route.query.type,
      id: this.$route.query.id,
      competeStuId: this.$route.query.competeStuId,
      info: {}
    }
  },
  computed: {},
  mounted() {
    if (this.type === 1) {
      this.getTypeOne()
    } else {
      this.getTypeTwo()
    }
  },
  methods: {
    preview(info) {
      ImagePreview({
        images: [info.certificateUrl],
        showIndex: false
      })
    },
    getTypeOne() {
      contestCredential({
        masterHeadId: this.id
      })
        .then(res => {
          if (res.code === 200) {
            this.info = res.data
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getTypeTwo() {
      getCredentialDetail({
        competeStuId: this.competeStuId
      })
        .then(res => {
          if (res.code === 200) {
            this.info = res.data
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    goBack() {
      if (this.type === '1') {
        this.$router.push({
          path: '/control',
          query: {
            id: this.id
          }
        })
      } else {
        this.$router.push({
          path: '/credentials',
          query: {}
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-credentials-detail {
  height: 100%;
  height: 1400px;
  background-color: #f4f4f4;
  position: relative;

  .content {
    width: 100%;
    // height: calc(100% - 180px);
    // height: 1000px;
    overflow: auto;
    // background-color: #f4f4f4;
    padding: 30px 28px 0 28px;
    padding-bottom: 100px;

    .content-box {
      width: 100%;
      // height: 800px;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;

      .title {
        width: 100%;
        height: 62px;
        background-color: #a5e3bd;
        text-align: center;
        color: #458958;
        line-height: 62px;
        margin-bottom: 55px;
      }
      .container {
        flex: 1;
        .username {
          text-align: center;
        }
        .user_pic {
          margin-top: 55px;
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
          }
        }
        .info {
          margin-top: 55px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .part {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 60px;
            margin-bottom: 60px;
            height: 50px;
            .part-left {
              color: #666;
            }
            .part-right {
              width: 420px;
              height: 50px;
              background: url('../../assets/image/text_container.png') no-repeat 100%;
              border-radius: 20px;
              line-height: 50px;
            }
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    position: fixed;
    height: 100px;
    bottom: 100px;
    background-color: #f4f4f4;
    padding: 0 28px;
    z-index: 999;
    .join-btn {
      height: 90px;
    }
  }
}
</style>
