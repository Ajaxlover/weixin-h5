/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <van-nav-bar :title="title" left-text="" right-text="" fixed placeholder left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template v-if="isShowTime" #title>
        <van-count-down ref="countColor" :style="{ color: textColor }" :time="time" @change="change" @finish="finish" />
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
      default: 20 * 60 * 1000
    }
  },
  data() {
    return {
      textColor: '#323232'
    }
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$emit('go-back')
    },
    onClickRight() {
      this.$emit('right-click')
    },
    finish() {
      this.$emit('finish')
    },
    change(timeData) {
      const { hours, minutes, seconds, milliseconds } = timeData
      const down = (hours * 60 * 60 + minutes * 60 + seconds) * 1000 + milliseconds
      if (down <= 15 * 60 * 1000) {
        this.textColor = 'red'
      } else {
        this.textColor = '#323232'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar .van-icon {
  color: #666;
}
</style>
