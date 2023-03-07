<template>
  <div class="page-test">
    <div class="content">
      <div class="list-item">
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
      </div>
      <div class="list-item">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {}
  },
  computed: {},
  methods: {}
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
