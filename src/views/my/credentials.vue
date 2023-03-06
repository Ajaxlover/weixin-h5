<template>
  <div class="page-credentials">
    <Nav :path="path"></Nav>
    <div class="content">
      <div class="list-item">
        <div class="item-box">
          <div class="item-name">第一届全国物理知识竞赛</div>
          <div class="item-honor">
            <div class="item-icon"></div>
            <span>一等奖</span>
          </div>
          <div class="item-num">证书编号：111111111111</div>
          <div class="item-btn">进入</div>
        </div>
      </div>
    </div>
    <!-- <van-empty description="您还没有证书" /> -->
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Credentials',
  components: {
    Nav
  },
  data() {
    return {
      path: '/my',
      list: []
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-credentials {
  height: 1400px;
  width: 100%;
  background-color: #f4f4f4;
  .content {
    background-color: #f4f4f4;
    padding: 30px 28px 0 28px;
    .list-item {
      width: 100%;
      height: 270px;
      background-color: #fff;
      border-radius: 10px;
      padding: 42px 44px;
      .item-box {
        position: relative;
        height: 100%;
        .item-name {
          margin-bottom: 40px;
          color: #222;
          font-weight: 600;
        }
        .item-honor {
          margin-bottom: 40px;
          display: flex;

          .item-icon {
            width: 36px;
            height: 42px;
            background: url('../../assets/image/icon_01.png') no-repeat;
            background-size: 100%;
            margin-right: 10px;
          }
        }
        .item-num {
          margin-bottom: 10px;
        }
        .item-btn {
          bottom: 0;
          right: 0;
          position: absolute;
          background-color: #2cad69;
          width: 200px;
          height: 80px;
          color: #fff;
          text-align: center;
          line-height: 80px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
