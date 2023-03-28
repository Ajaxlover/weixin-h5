<template>
  <div class="page-wrap">
    <div class="content">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <van-button round block type="info" native-type="submit" @click.native="onSubmit">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request'

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit(values) {
      this.$router.replace('/test')
      // const res = await request({
      //   url: '/v1/login',
      //   method: 'post',
      //   data: {
      //     username: 15011478038,
      //     password: 111111
      //   }
      // })
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  margin-top: 200px;
  @include flexbox($jc: center, $ai: flex-start);
}
</style>
