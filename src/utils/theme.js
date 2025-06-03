import { THEME } from '@/constants/index'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

// 主题数组
const themeArray = [THEME.LIGHT, THEME.DARK, THEME.SYSTEM]

/**
 * 监听系统主题变化 - 仅在第一次调用时添加监听器
 */
let systemTheme = null
const watchSystemTheme = () => {
  // 如果已经添加过监听器，直接返回
  if (systemTheme) return

  // 添加监听器
  systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  systemTheme.addEventListener('change', (e) => {
    // 调用 updateTheme 函数，传入新的主题
    updateTheme(e.matches ? THEME.DARK : THEME.LIGHT)
  })
}

/**
 * 更新主题添加 class
 * @param {string} newTheme 新主题 - 可选值：'light' | 'dark'
 */
const updateTheme = (newTheme) => {
  // 如果新主题不在主题数组中，使用默认主题
  const themeClass = themeArray.includes(newTheme) ? newTheme : THEME.LIGHT

  // 获取 HTML 元素
  const html = document.documentElement

  // 移除所有主题 class，然后添加新的主题 class
  html.classList.remove(...themeArray)
  html.classList.add(themeClass)
}

/**
 * 初始化主题
 * @description 监听主题变化，动态添加class
 */
export const initTheme = async () => {
  // 延迟导入 store，确保在 Pinia 激活后执行
  const { useThemeStore } = await import('@/stores/modules/theme')
  const { theme } = storeToRefs(useThemeStore())

  // 监听系统主题变化
  watchSystemTheme()

  // 初始化立即更新一次
  updateTheme(theme.value)

  // 监听后续变化
  watch(theme, (newTheme) => {
    updateTheme(newTheme)
  })
}
