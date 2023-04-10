<template>
  <div class="page-credentials">
    <Nav title="证书" @go-back="goBack"></Nav>
    <div class="content">
      <van-empty v-if="list.length === 0" description="您还没有证书" />
      <div v-for="(item, idx) in list" v-else :key="idx" class="list-item" @click="goDetail(item)">
        <div class="item-box">
          <div class="item-name">{{ item.masterheadName }}</div>
          <div class="item-honor">
            <div class="item-icon"></div>
            <span>{{ item.awardName }}</span>
          </div>
          <div class="item-num">证书编号：{{ item.certificateNo }}</div>
          <div class="item-btn">进入</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getCredentialList } from '@/api/credential'

export default {
  name: 'Credentials',
  components: {
    Nav
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 9999
    }
  },
  computed: {},
  mounted() {
    this.getListData()
  },
  methods: {
    getListData() {
      getCredentialList({
        pageNo: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          const { records } = res.data
          if (records.length === 0 || records.length < this.pageSize) {
            this.finished = true // 数据全部加载完毕
          }
          if (this.pageNum === 1) {
            this.list = records // 刷新时替换原有数据
          } else {
            this.list = this.list.concat(res) // 上拉加载时追加数据
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    goBack() {
      this.$router.replace({
        path: '/my',
        query: {}
      })
    },
    goDetail(item) {
      this.$router.replace({
        path: '/credentials-detail',
        query: {
          competeStuId: item.competeStuId,
          type: 2 // 证书列表进入
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-credentials {
  // height: 1400px;
  width: 100%;
  background-color: #f4f4f4;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .content {
    background-color: #f4f4f4;
    padding: 30px 28px 0 28px;
    .list-item {
      width: 100%;
      height: 270px;
      background-color: #fff;
      border-radius: 10px;
      padding: 42px 44px;
      margin-bottom: 26px;
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
          bottom: 50px;
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
