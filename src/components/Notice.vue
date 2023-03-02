/* eslint-disable vue/html-self-closing */
<template>
  <div class="com-notice">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>
<style lang="scss" scoped>
.com-notice {
  width: 100%;
  height: 30px;
  background-color: #1989fa;
  text-align: center;
  line-height: 30px;
  span {
    color: #666;
  }
}
</style>
