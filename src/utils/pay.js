import { alipayOrder } from '@/api/pay'
import { isMobileTerminal } from '@/utils/flexible'
/**
 * 支付宝支付
 * @param {*} title 订单标题
 * @param {*} price 订单金额
 * @param {*} desc 订单描述
 */
export const alipay = async (title, desc) => {
  const res = await alipayOrder(title, 0.01, desc, isMobileTerminal.value)

  // 支付地址
  window.location.href = decodeURIComponent(res.encodeURI)
}
