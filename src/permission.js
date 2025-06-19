import router from '@/router'
import { useUserStore } from '@/stores/modules/user'
import { message } from '@/libs'

router.beforeEach((to) => {
  const userStore = useUserStore()
  // 不需要登录
  if (!to.meta.user) {
    return true
  }

  // 需要登录的页面
  if (to.meta.user) {
    if (userStore.token) {
      return true
    } else {
      message({ type: 'error', content: '您需要先登录' })
      return '/login'
    }
  }

  // 有 token 访问登录页
  if (userStore.token) {
    if (to.path === '/login') {
      message({ type: 'warning', content: '您已经登录过了' })
      return '/'
    }
  }
})

router.afterEach(() => {})
