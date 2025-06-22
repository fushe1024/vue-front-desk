<script setup>
import { onMounted } from 'vue'
import { QQ_LOGIN_URL, LOGIN_TYPE_QQ } from '@/constants'
import { postMessage, onMessage, close } from '../utils/broadcast'
import { oauthLogin } from '../utils/oauth'
import { isMobileTerminal } from '@/utils/flexible'

onMounted(() => {
  // eslint-disable-next-line
  QC.Login(
    {
      btnId: 'qq_login_Btn' // 按钮id
    },
    (data) => {
      // eslint-disable-next-line
      QC.Login.singOut() // 注销登录

      // 获取用户唯一表示
      const accessToken = /access_token=((.*))&expires/.exec(
        window.location.hash
      )?.[1]

      // 拼接请求对象
      const params = {
        accessToken,
        nickName: data.nickname,
        figureurl_qq_2: data.figureurl_qq_2
      }

      // 发送消息(跨页面传输)
      postMessage(params)

      // 移动端下直接登录
      if (isMobileTerminal) {
        oauthLogin(LOGIN_TYPE_QQ, params)
        return
      }

      // 关闭窗口
      window.close()
    }
  )
})

/**
 * qq登录按钮
 */
const qqLogin = () => {
  qqLoginView()
}

/**
 * qq登录视窗
 */
const qqLoginView = async () => {
  // 打开qq登录视窗
  window.open(
    QQ_LOGIN_URL,
    'oauth2Login_10609',
    'left=400,top=300,width=620,height=620,scrollbars=no,resizable=yes,location=yes,status=no,menubar=no,toolbar=no'
  )

  // 监听消息
  onMessage().then((data) => {
    // 处理qq登录
    oauthLogin(LOGIN_TYPE_QQ, data)
    // 关闭频道
    close()
  })
}
</script>

<template>
  <div>
    <span id="qq_login_Btn" v-show="false"></span>
    <m-svg-icon
      class="w-4 cursor-pointer"
      icon-class="qq"
      @click="qqLogin"
    ></m-svg-icon>
  </div>
</template>

<style scoped></style>
