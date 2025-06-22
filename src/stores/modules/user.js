import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userLogin, getUserInfo } from '@/api/sys'
import { message } from '@/libs'
import md5 from 'md5'
import router from '@/router'
import { LOGIN_CODE_QQ_LOGIN_NOT_REGISTER } from '@/constants'

export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref('')
    // userinfo
    const userInfo = ref({})

    // set userInfo
    const setUserInfo = (data) => {
      userInfo.value = data
    }

    // 登录逻辑
    const login = async (loginData) => {
      const { password } = loginData

      console.log('登录最终参数：', {
        ...loginData,
        password: password ? md5(password) : ''
      })

      // 调用接口
      const res = await userLogin({
        ...loginData,
        password: password ? md5(password) : ''
      })

      // QQ 扫码登录，用户位注册
      if (res.code === LOGIN_CODE_QQ_LOGIN_NOT_REGISTER) {
        return res.code
      }

      token.value = res.token
      // 获取用户信息
      getUserData()
    }

    // 获取用户信息
    const getUserData = async () => {
      const res = await getUserInfo()
      userInfo.value = res
      // 消息提示
      message({
        type: 'success',
        content: userInfo.value.vipLevel
          ? `欢迎您, 尊贵的VIP${userInfo.value.vipLevel}用户
          ${userInfo.value.nickname}`
          : `欢迎您, ${userInfo.value.nickname}`,
        duration: 4000
      })
    }

    /**
     * 退出登录
     * @param {*} goHome 是否返回首页
     */
    const logout = async (goHome = false) => {
      token.value = ''
      setUserInfo({})
      if (goHome) {
        await router.push('/')
      }
      // 前台项目不登录，可能看到的数据不同，所以要刷新页面
      location.reload()
    }

    return { token, userInfo, setUserInfo, login, logout }
  },
  {
    persist: true
  }
)
