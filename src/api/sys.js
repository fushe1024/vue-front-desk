import request from '@/utils/request'

/**
 * 登录
 */
export const userLogin = (data) => request.post('/sys/login', data)

/**
 * 注册
 */
export const userRegister = (data) => request.post('/sys/register', data)

/**
 * 获取用户信息
 */
export const getUserInfo = () => request.get('/user/profile')

/**
 * 人类行为验证
 */
export const getCaptcha = (data) => request.post('/sys/captcha', data)

/**
 * 更新用户信息
 */
export const updateUserInfo = (data) => request.put('/user/profile', data)

/**
 * 获取上传凭证
 */
export const getSts = () => request.get('/user/sts')

/**
 * 获取微信登录前置数据
 */
export const getWxLoginConfig = () => request.get('/sys/wxlogin/data')

/**
 * 获取微信登录 access_token
 */
export const getWxLoginAccessToken = (appid, secret, code) => {
  return request.get('/sys/wxlogin/access_token', {
    params: { appid, secret, code }
  })
}

/**
 * 获取微信用户信息
 */
export const getWxUserInfo = (accessToken, openid) => {
  return request.get('/sys/wxlogin/userinfo', {
    params: { accessToken, openid }
  })
}
