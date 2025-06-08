// 导入当前目录下的所有 .js 文件
const modules = import.meta.glob('./modules/*.js')

/**
 * 注册全局自定义指令
 * @param {*} app 应用实例
 */
export default {
  async install(app) {
    // 遍历modules对象
    for (const path in modules) {
      // 分割路径字符串，获取文件名
      const name = path.split('/')[2].split('.')[0]

      // 异步加载模块并注册全局自定义指令
      const module = modules[path]
      const d = await module()

      // 注册全局自定义指令
      app.directive(name, d.default)
    }
  }
}
