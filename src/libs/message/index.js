import { h, render } from 'vue'
import Message from './index.vue'

export const message = (options) => {
  // 移除DOM
  const remove = () => {
    render(null, document.body)
  }

  // 创建VNode
  const vnode = h(Message, {
    ...options,
    onClose: remove
  })

  // 渲染到DOM
  render(vnode, document.body)
}
