<template>
  <div class="page-home">
    <!-- <div class="home-container"></div> -->
    <div class="wrap-home">
      <div class="t-container">
        <div class="home-title">
          <span>知识竞赛</span>
        </div>
        <div class="home-banner van-hairline--surround">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, idx) in bannerList" :key="idx">
              <img :src="item.bannerCover" alt="" />
            </van-swipe-item>
            <!-- https://test.guangyiedu.com/service/1680162740715.png -->
            <!-- <van-swipe-item>
              <img src="../../assets/image/banner.png" alt="" />
            </van-swipe-item>
            <van-swipe-item>
              <img src="../../assets/image/banner.png" alt="" />
            </van-swipe-item> -->
          </van-swipe>
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
          <van-empty v-if="list.length === 0" description="暂无竞赛" />
          <van-list v-else v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="item in list" :key="item.id" class="home-exam-item van-hairline--surround" @click="toJoin(item)">
              <!-- <img src="../../assets/image/test_pic .png" alt="" /> -->
              <!-- 报名结束显示遮罩层 -->
              <div v-if="new Date().getTime() >= item.endTime" class="img-mask"></div>
              <img :src="item.coverUrl" alt="" />
              <div class="exam-name van-ellipsis">
                <div class="exam-name van-ellipsis">
                  <span>{{ item.name }}</span>
                </div>
                <div class="join-time">
                  <span>报名时间：{{ $parseTime(item.startTime, '{y}/{m}/{d} {h}:{i}') }}-{{ $parseTime(item.endTime, '{y}/{m}/{d} {h}:{i}') }}</span>
                </div>
              </div>
            </div></van-list
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner, getContestList } from '@/api/home'
// import BetterScroll from 'better-scroll'
// import wx from 'weixin-js-sdk'

// import authUtils from '@/utils/auth.js'

export default {
  name: 'Home',
  data() {
    return {
      bannerList: [],
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 99999
    }
  },
  metaInfo() {
    return {
      meta: [
        { name: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
        { name: 'Pragma', content: 'no-cache' },
        { name: 'Expires', content: '0' }
      ]
    }
  },
  computed: {},
  mounted() {
    // eslint-disable-next-line no-unused-vars
    // const bs = new BetterScroll('.wrap-home', {
    //   scrollY: true
    // })

    // 监听IOS下物理返回键
    if (window.history && window.history.pushState) {
      window.history.pushState(null, null, document.URL)
      window.addEventListener(
        'popstate',
        () => {
          // 重定向你要的地址即可
          // wx.closeWindow()
          window.location.reload()
        },
        false
      )
    }
    // 监听 popstate 事件
    // window.history.replaceState({}, '', process.env.VUE_APP_BASEURL)
    this.getBannerList()
    this.getListData()
  },
  methods: {
    getBannerList() {
      getBanner()
        .then(res => {
          if (res.code === 200) {
            this.bannerList = res.data.list
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    onLoad() {
      if (this.finished || this.loading) {
        return
      }
      this.pageNum += 1
      this.getListData()

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    getListData() {
      this.loading = true
      getContestList({
        pageNo: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          this.loading = false

          const { records, total } = res.data
          if (this.pageNum === 1) {
            this.list = records // 刷新时替换原有数据
          } else {
            this.list = this.list.concat(res) // 上拉加载时追加数据
          }
          if (this.list.length >= total) {
            this.finished = true // 数据全部加载完毕
          }
        })
        .catch(err => {
          this.loading = false
          console.error(err)
        })
    },
    toMy() {
      this.$router.replace('/my')
    },
    toExamList() {
      this.$router.replace('/test')
    },
    toJoin(item) {
      this.$router.replace({
        path: '/join',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-home {
  // position: relative;
  height: 100%;
  width: 100%;

  background-color: #fff;
  // padding-bottom: 160px;
  // bottom: 100px;
  .wrap-home {
    display: flex;
    flex-direction: column;
    // overflow: auto;
    // height: calc(100% - 50px);

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
        overflow: hidden;
        height: 290px;
        border-radius: 20px;

        .van-swipe {
          height: 100%;
          overflow: hidden;
          border-radius: 20px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            vertical-align: middle;
          }
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
      overflow: auto;
      .home-text {
        text-align: center;
        margin-bottom: 20px;
      }
      .home-exams {
        overflow: auto;
        min-height: 600px;
        .home-exam-item {
          position: relative;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;
          .img-mask {
            position: absolute;
            width: 100%;
            height: 300px;
            border-radius: 8px;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.3);
          }
          img {
            width: 100%;
            height: 300px;
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
}
</style>
