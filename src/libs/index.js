import { defineAsyncComponent } from 'vue'

// 导入当前目录下的所有 .vue 文件
const modules = import.meta.glob('./*/index.vue')

// 导出 confirm
export { confirm } from './confirm'
// 导出 message
export { message } from './message'

export default {
  install(app) {
    // 遍历modules对象
    for (const path in modules) {
      // 分割路径字符串，获取文件名
      const name = path.split('/')[1]

      // 通过 defineAsyncComponent 异步组件指定路径的组件
      app.component(`m-${name}`, defineAsyncComponent(modules[path]))
    }
  }
}
