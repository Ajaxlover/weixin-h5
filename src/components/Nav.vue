/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <van-nav-bar title="" left-text="" right-text="" fixed placeholder left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },

  methods: {
    onClickLeft() {
      this.$router.push(this.path)
    },
    onClickRight() {}
  }
}
</script>
