import { defineAsyncComponent } from 'vue'

// 导入当前目录下的所有 .vue 文件
const modules = import.meta.glob('./*/index.vue')

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
