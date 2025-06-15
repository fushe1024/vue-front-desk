import { WEIBO_APP_KEY, WEIBO_APP_UID } from '@/constants'
/**
 * 微博分享
 */
export const weiboShare = (title, pic, url) => {
  window.open(
    `https://service.weibo.com/share/share.php?appkey=${WEIBO_APP_KEY}&ralateUid=${WEIBO_APP_UID}&title=${title}&pic=${pic}&url=${url}`,
    '_blank'
  )
}
