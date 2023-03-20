<template>
  <div class="page-my">
    <div class="my-box">
      <div class="content">
        <div class="wx-pic">
          <!-- <img src="../../assets/image/home.png" alt="" /> -->
          <img :src="info.pic" alt="" />
        </div>
        <div class="wx-nickname">昵称：{{ info.username }}</div>
      </div>
      <div class="b-part"></div>
      <div class="tab-box">
        <div class="tab-box-content">
          <div v-for="(item, idx) in tabs" :key="idx" class="tab-item" @click="goPath(item, idx)">
            <img :src="item.url" alt="" />
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authUtils from '@/utils/auth.js'

export default {
  name: 'My',
  data() {
    return {
      info: {},
      tabs: [
        { url: require('../../assets/image/my_contest.png'), text: '我的竞赛', path: '/test' },
        { url: require('../../assets/image/my_info.png'), text: '个人信息', path: '/personal' },
        { url: require('../../assets/image/my_credential.png'), text: '我的证书', path: '/credentials' },
        { url: require('../../assets/image/tool.png'), text: '技术支持', path: '' }
      ]
    }
  },
  computed: {},
  mounted() {
    const info = authUtils.getUserInfo()
    if (info) {
      this.info = JSON.parse(info)
    }
  },
  methods: {
    goPath(item, idx) {
      if (idx === 3) {
        return false
      } else {
        this.$router.push({
          path: item.path
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-my {
  width: 100%;
  .my-box {
    position: relative;
    overflow: hidden;
    min-height: 700px;
    .content {
      height: 520px;
      background-color: #2cad69;
      padding: 0 28px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .wx-pic {
        margin-bottom: 20px;
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
        color: #fff;
      }
    }
    .b-part {
      height: 400px;
      background-color: #f4f4f4;
    }
    .tab-box {
      position: absolute;
      top: 400px;
      width: 100%;
      height: 240px;
      background-color: transparent;
      padding: 0 28px;
      .tab-box-content {
        background-color: #fff;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        display: flex;
        .tab-item {
          width: 25%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 60px;
            height: 60px;
            margin-bottom: 20px;
          }
          span {
            color: #666;
          }
        }
      }
    }
  }
}
</style>
