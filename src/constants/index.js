// PC 设备指定宽度
export const PC_DEVICE_WIDTH = 1280

// 最大 front-size
export const MAX_FONT_SIZE = 40

// Category 本地构建数据
export const ALL_CATEGORY_ITEM = {
  id: 'all',
  name: '全部'
}

// 主题数据 - dark 极夜模式，light 白天模式，system 跟随系统
export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system'
}

// 气泡延迟关闭时间
export const DELAY_TIME = 100

// category 缓存 key
export const CATEGORY_KEY = 'category'

// category 初始数据
export const CATEGORY_DATA = [
  ALL_CATEGORY_ITEM,
  { id: 'web_app_icon', name: 'UI/UX' },
  { id: 'design', name: '平面' },
  { id: 'illustration', name: '插画/漫画' },
  { id: 'photography', name: '摄影' },
  { id: 'games', name: '游戏' },
  { id: 'anime', name: '动漫' },
  {
    id: 'industrial_design',
    name: '工业设计'
  },
  { id: 'architecture', name: '建筑设计' },
  { id: 'art', name: '人文艺术' },
  { id: 'home', name: '家居/家装' }
]

// 反馈地址
export const FEEDBACK_URL = 'https://support.qq.com/embed/383681/new-post'

// logo 地址
export const LOGO_URL =
  'https://himg.bdimg.com/sys/portraitn/item/public.1.787fa7c8._FEORP-kBzptJmxhAH4u9A'

// 用户协议与隐私政策
export const USER_AGREEMENT_URL =
  'https://www.baidu.com/s?wd=用户协议与隐私政策'
export const PRIVACY_POLICY_URL =
  'https://www.baidu.com/s?wd=用户协议与隐私政策'

// 微博 APP KEY
export const WEIBO_APP_KEY = '3454329089'

// 微博 APP UID
export const WEIBO_APP_UID = '5984245953'

// OSS Bucket
export const OSS_BUCKET = 'imooc-front'

// OSS Region
export const OSS_REGION = 'oss-cn-beijing'

// QQ 登录 URL
export const QQ_LOGIN_URL =
  'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'

// QQ 登录未注册
export const LOGIN_CODE_QQ_LOGIN_NOT_REGISTER = 204
export const LOGIN_TYPE_QQ = 'QQ'

// 微信登录
export const LOGIN_TYPE_WX = 'WX'
