<template>
  <div class="page-home">
    <!-- <div class="home-container"></div> -->
    <div class="t-container">
      <div class="home-title">
        <span>国防科大竞赛</span>
      </div>
      <div class="home-banner van-hairline--surround">
        <img src="../../assets/image/banner.png" alt="" />
      </div>
      <div class="home-btn">
        <div class="home-btn-l" @click="toExamList">
          <span>竞赛</span>
        </div>
        <div class="home-btn-r" @click="toMy">
          <span>个人中心</span>
        </div>
      </div>
    </div>
    <div class="m-line">
      <img src="../../assets/image/line.png" alt="" />
    </div>
    <div class="b-container">
      <div class="home-text">
        <span>竞赛活动</span>
      </div>
      <div class="home-exams">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="item in list" :key="item" class="home-exam-item van-hairline--surround" @click="toJoin">
            <img src="../../assets/image/test_pic .png" alt="" />
            <div class="exam-name van-ellipsis">
              <span>第一届全国大学物理竞赛</span>
            </div>
            <div class="join-time">
              <span>报名时间：{{ $parseTime('1672812596000', '{y}/{m}/{d} {h}:{i}') }}-2023/06/01 23:59</span>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 5
    }
  },
  computed: {},
  methods: {
    onLoad() {
      //  if (this.isFinished || this.isLoading) {
      //         return;
      //       }
      //       this.pageNum += 1;
      //       this.getListData();

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    getListData() {
      // this.isLoading = true
      // yourApi
      //   .getListData(this.pageNum, this.pageSize)
      //   .then(res => {
      //     this.isLoading = false
      //     if (res.length === 0 || res.length < this.pageSize) {
      //       this.isFinished = true // 数据全部加载完毕
      //     }
      //     if (this.pageNum === 1) {
      //       this.listData = res // 刷新时替换原有数据
      //     } else {
      //       this.listData = this.listData.concat(res) // 上拉加载时追加数据
      //     }
      //   })
      //   .catch(err => {
      //     this.isLoading = false
      //     console.error(err)
      //   })
    },
    toMy() {
      this.$router.push('/my')
    },
    toExamList() {
      this.$router.push('/test')
    },
    toJoin() {
      this.$router.push('/join')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  .t-container {
    padding: 0 28px;

    .home-title {
      text-align: center;
      height: 90px;
      line-height: 90px;
      font-size: 34px;
      font-weight: 600;
      color: #222222;
    }
    .home-banner {
      border-radius: 8px;
      overflow: hidden;
      height: 290px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .home-btn {
      margin-top: 42px;
      display: flex;
      justify-content: space-between;
      .home-btn-l {
        width: 330px;
        height: 108px;
        background-image: url('../../assets/image/exam.png');
        background-size: 100%;
        display: flex;
        align-items: center;
        padding-left: 30px;
      }
      .home-btn-r {
        width: 330px;
        height: 108px;
        background-image: url('../../assets/image/info.png');
        background-size: 100%;
        display: flex;
        align-items: center;
        padding-left: 30px;
      }
    }
  }
  .m-line {
    img {
      height: 12px;
      width: 100%;
    }
  }
  .b-container {
    margin-top: 30px;
    padding: 0 28px;
    .home-text {
      text-align: center;
      margin-bottom: 20px;
    }
    .home-exams {
      .home-exam-item {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        img {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
        }
        .exam-name {
          margin-top: 10px;
          color: #333;
          font-size: 26px;
        }
        .join-time {
          margin-top: 16px;
          color: #999;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
