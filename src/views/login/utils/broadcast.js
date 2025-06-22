// 频道名
export const BROADCAST_CHANNEL_NAME = 'COOKIE_1024'

// 广播频道
export let broadcastChannel = null
if (window.BroadcastChannel) {
  broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME)
}

/**
 * 发送消息
 * @description 发送消息到频道，如果频道不存在，则使用 localStorage 模拟
 * @param {*} data 消息数据
 * @returns {void}
 */
export const postMessage = (data) => {
  if (!broadcastChannel) {
    broadcastChannel.postMessage(data)
  } else {
    localStorage.setItem(BROADCAST_CHANNEL_NAME, JSON.stringify(data))
  }
}

/**
 * 接收消息
 * @description 接收频道消息，如果频道不存在，则从 localStorage 获取模拟消息
 * @returns {Promise} 接收消息的 Promise
 */
export const onMessage = () => {
  return new Promise((resolve) => {
    if (broadcastChannel) {
      broadcastChannel.onmessage = (event) => {
        resolve(event.data)
      }
    } else {
      window.addEventListener('storage', (event) => {
        if (event.key === BROADCAST_CHANNEL_NAME) {
          resolve(JSON.parse(event.newValue))
        }
      })
    }
  })
}

// 关闭频道
export const close = () => {
  if (broadcastChannel) {
    broadcastChannel.close()
    broadcastChannel = null
  }
  localStorage.removeItem(BROADCAST_CHANNEL_NAME)
}
