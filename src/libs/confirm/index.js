import { h, render } from 'vue'
import Confirm from './index.vue'

export const confirm = (options) => {
  return new Promise((resolve, reject) => {
    // 移除组件
    const remove = () => {
      render(null, document.body)
    }

    // 确认回调
    const handleConfirm = () => {
      resolve()
      remove()
    }

    // 取消回调
    const handleCancel = () => {
      reject()
      remove()
    }

    // 创建VNode
    const vnode = h(Confirm, {
      ...options,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
      close: remove
    })

    // 渲染到DOM
    render(vnode, document.body)
  })
}
