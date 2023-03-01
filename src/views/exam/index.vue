<template>
  <div class="page-test">竞赛</div>
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
  .box-wrap {
    width: 100%;
    height: 100px;
    @include flexbox($jc: center, $ai: center, $fd: column);
    .box-text {
      text-align: center;
      font-size: 32px;
      color: blue;
    }
  }
  .svg-icon-wrap {
    @include border($direction: bottom, $color: #ccc);
    margin: 20px;
    .svg-icon-demo {
      // 通过font-size 调整大小
      font-size: 32px;
    }
  }
  .png-icon-wrap {
    margin: 20px;
    @include flexbox($jc: flex-start, $ai: flex-start, $fw: wrap);
    @include border($direction: bottom, $color: #ccc);
    .png-icon-demo {
      // 1px边框
      @include border($direction: bottom, $color: #ccc);
      transform: scale(0.5);
      transform-origin: top left;
    }
  }
}
</style>
