import { useUserStore } from '@/stores/modules/user'
import router from '@/router'
import { message } from '@/libs'
import { LOGIN_CODE_QQ_LOGIN_NOT_REGISTER } from '@/constants'

/**
 * 第三方登录统一处理方法
 *
 */
export const oauthLogin = async (oauthType, oauthData) => {
  const userStore = useUserStore()

  const code = await userStore.login({
    ...oauthData, // 登录参数
    loginType: oauthType // QQ
  })

  // QQ 扫码登录，用户未注册
  if (code === LOGIN_CODE_QQ_LOGIN_NOT_REGISTER) {
    message({
      type: 'success',
      content: `欢迎您，${oauthData.nickname}, 请创建您的账号`,
      duration: 6000
    })
    router.push('/login', {
      query: {
        loginType: oauthType,
        ...oauthData
      }
    })
    return
  }

  router.push('/')
}
