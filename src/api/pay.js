import request from '@/utils/request'

/**
 * 获取 VIP 支付数据
 * @returns {*} 支付数据
 */
export const getVipPayList = () => request.get('/user/vip/pay/list')

/**
 * 支付宝下单
 * @param {*} subject 订单标题
 * @param {*} totalAmount 订单金额
 * @param {*} body 订单描述
 * @param {*} isMobile 是否是移动端
 * @returns {*} 订单信息
 */
export const alipayOrder = (subject, totalAmount, body, isMobile) => {
  return request.get('/user/alipay', {
    params: {
      subject,
      totalAmount,
      body,
      isMobile
    }
  })
}

/**
 * 获取支付结果
 * @param {*} out_trade_no 订单号
 * @returns {*} 支付结果
 */
export const getPayResult = (out_trade_no) => {
  return request.get('/sys/pay/result', {
    params: {
      out_trade_no
    }
  })
}
