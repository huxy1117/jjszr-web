<template>
    <div></div>
</template>
<script>
import { getParam } from '../utils/index'
import { login } from '../service/api'
import { initLogin } from '../service/login'
import { Toast } from 'vant'

export default {
  components: {
    // 'get-phone': getPhone
  },
  created () {
    const url = this.$route?.query?.url // 重定向地址
    const code = getParam('code')
    console.warn('code', code)

    if (!code && url) {
      // 登录
      login({
        code,
      })
        .then((res) => {
          console.warn('res', res)
          // if (res.data.errCode && res.data.errMsg !== '') {
          //   Toast(res.data.errMsg)
          // } else if (res.data.openId && res.data.openId !== '') {
          //   initLogin(res.data.openId) // 缓存登录态
          //   window.location.href = url // 重定向到原页面
          // }
        })
        .catch((err) => {
          Toast(err)
        })
    }
  },
  data () {
    return {
      showGift: false,
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
