/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <van-nav-bar :title="title" left-text="" right-text="" fixed placeholder left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template v-if="isShowTime" #title>
        <van-count-down :time="time" @finish="finish" />
      </template>
      <template v-if="isShowRight" #right>
        <van-icon name="apps-o" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    title: {
      type: String,
      default: ''
    },
    isShowRight: {
      type: Boolean,
      default: false
    },
    isShowTime: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: 10 * 1000
    }
  },
  data() {
    return {}
  },

  methods: {
    onClickLeft() {
      this.$emit('go-back')
    },
    onClickRight() {
      this.$emit('right-click')
    },
    finish() {
      this.$emit('finish')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar .van-icon {
  color: #666;
}
</style>
