<template>
  <div class="page-test">
    <div class="content">
      <van-empty v-if="list.length === 0" description="无参与的竞赛" />
      <div v-for="item in list" :key="item.id" class="list-item" @click="goStart(item)">
        <div class="contest-name">{{ item.name }}</div>
        <div class="contest-info">
          <div class="contest-info-l">
            <img :src="item.coverUrl" alt="" />
          </div>
          <div class="contest-info-r">
            <div class="time">
              <div class="time-s">竞赛开始时间：{{ $parseTime(item.startTime, '{y}/{m}/{d} {h}:{i}') }}</div>
              <div class="time-s">竞赛结束时间：{{ $parseTime(item.endTime, '{y}/{m}/{d} {h}:{i}') }}</div>
            </div>
            <div class="status">
              <van-tag v-if="item.status === 1 || item.status === 2" plain type="success">进行中</van-tag>
              <van-tag v-if="item.status === 3" plain type="warning">已结束</van-tag>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="list-item">
        <div class="contest-name">第一届全君物理知识竞赛</div>
        <div class="contest-info">
          <div class="contest-info-l">
            <img src="../../assets/image/test_pic .png" alt="" />
          </div>
          <div class="contest-info-r">
            <div class="time">
              <div class="time-s">竞赛开始时间：2023/04/08 00:00</div>
              <div class="time-s">竞赛开始时间：2023/04/08 00:00</div>
            </div>
            <div class="status">进行中</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getContestList, start5minBefore } from '@/api/home'
import store from '@/store'

export default {
  name: 'Test',
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
    goStart(item) {
      start5minBefore({
        masterHeadId: item.id
      })
        .then(res => {
          if (res.code === 249) {
            this.$router.push({
              path: '/control',
              query: {
                id: item.id
              }
            })
          } else if (res.code === 200) {
            const { examId } = res.data
            this.$router.push({
              path: '/start',
              query: {
                examId
              }
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getListData() {
      const stuId = store.getters.userId
      // this.loading = true
      getContestList({
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        stuId
      })
        .then(res => {
          // this.loading = false
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
          // this.loading = false
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-test {
  // height: 100%;
  width: 100%;
  .content {
    padding: 38px 28px 0 28px;
    .list-item {
      height: 290px;
      background-color: #fff;
      border-radius: 13px;
      padding: 33px 0 33px 33px;
      margin-bottom: 26px;
      .contest-name {
        font-weight: 600;
        margin-bottom: 30px;
      }
      .contest-info {
        display: flex;
        .contest-info-l {
          margin-right: 32px;
          font-size: 0;
          img {
            width: 215px;
            height: 140px;
          }
        }
        .contest-info-r {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .time {
            .time-s {
              margin-bottom: 22px;
              color: #999;
              font-size: 24px;
            }
          }
          .status {
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
