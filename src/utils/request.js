import axios from 'axios'
import { message as Mmessage } from '@/libs'
import { useUserStore } from '@/stores/modules/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // 请求前携带 token
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data, success, message } = response.data
    // 根据后端返回的状态码进行处理
    if (success) {
      return data
    }
    // 弹窗提示
    Mmessage({
      type: 'error',
      content: message
    })
    // 处理业务失败
    return Promise.reject(new Error(message))
  },
  (error) => {
    const userStore = useUserStore()
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error?.response?.data?.code === 401) {
      Mmessage({
        type: 'error',
        content: 'Token 超时请重新登录'
      })
      userStore.logout()
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
