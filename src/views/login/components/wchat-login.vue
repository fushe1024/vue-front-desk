<script setup>
import {
  getWxLoginConfig,
  getWxLoginAccessToken,
  getWxUserInfo
} from '@/api/sys'
import { onMessage, postMessage, close } from '../utils/broadcast'
import { oauthLogin } from '../utils/oauth'
import { LOGIN_TYPE_WX } from '@/constants'

/**
 * 触发微信登录
 */
const wechatLogin = async () => {
  // 1.获取微信登录配置
  const { appId, appSecret, redirectUri, scope, state } =
    await getWxLoginConfig()

  // 2.打开微信登录窗口
  window.open(
    `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`,
    '_blank',
    'left=400,top=300,width=620,height=620,scrollbars=no,resizable=yes,location=yes,status=no,menubar=no,toolbar=no'
  )

  // 等待用户扫码
  onMessage().then(async ({ code }) => {
    // 关闭频道
    close()

    // 3.获取 access_token
    const { access_token, openid } = await getWxLoginAccessToken(
      appId,
      appSecret,
      code
    )

    // 4.获取用户信息
    const { nickname, headimgurl } = await getWxUserInfo(access_token, openid)

    // 5.执行登录操作
    oauthLogin(LOGIN_TYPE_WX, {
      openid,
      nickname,
      headimgurl
    })
  })
}

/**
 * 微信登录成功后窗口数据解析
 */
if (window.location.search) {
  const code = /code=((.*))&state/.exec(window.location.search)[1]
  if (code) {
    postMessage({ code })
  }
  // 关闭微信登录窗口
  window.close()
}
</script>

<template>
  <div @click="wechatLogin">
    <m-svg-icon class="w-4 cursor-pointer" icon-class="wexin"></m-svg-icon>
    <div id="login_container"></div>
  </div>
</template>

<style scoped></style>
