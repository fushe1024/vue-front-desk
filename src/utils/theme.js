import { THEME } from '@/constants/index'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

// 可切换主题数组
const themeArray = [THEME.LIGHT, THEME.DARK, THEME.SYSTEM]

/**
 * 添加 class
 * @param {string} theme 主题 - 可选值：'light' | 'dark'
 * @description 动态添加 class，用于切换主题
 */
export const addThemeClass = (themeClassName) => {
  // 如果新主题不在主题数组中，使用默认主题
  const themeClass = themeArray.includes(themeClassName)
    ? themeClassName
    : THEME.LIGHT

  // 获取 HTML 元素
  const html = document.documentElement

  // 移除所有主题 class，然后添加新的主题 class
  html.classList.remove(...themeArray)
  html.classList.add(themeClass)
}

/**
 * 监听系统主题变化 - 仅在第一次调用时添加监听器
 * @description 监听系统主题变化，动态添加class
 */
let systemTheme = null
const watchSystemTheme = () => {
  if (systemTheme) return // 只在第一次调用时添加监听器

  // 添加监听器
  systemTheme = window.matchMedia('(prefers-color-scheme: dark)')

  // 监听系统主题变化 - 添加 class
  systemTheme.addEventListener('change', (e) => {
    addThemeClass(e.matches ? THEME.DARK : THEME.LIGHT)
  })
}

/**
 * 更新主题添加 class
 * @param {string} newTheme 新主题 - 可选值：'light' | 'dark'
 */
const updateTheme = (newTheme) => {
  // 如果新主题是系统主题，调用监听系统主题变化
  if (newTheme === THEME.SYSTEM) {
    watchSystemTheme()
  } else {
    // 移除监听器
    systemTheme?.removeEventListener('change', () => {})
    systemTheme = null
  }
  // 添加 class
  addThemeClass(newTheme)
}

/**
 * 初始化主题
 * @description 监听主题变化，动态添加class
 */
export const initTheme = async () => {
  // 延迟导入 store，确保在 Pinia 激活后执行
  const { useThemeStore } = await import('@/stores/modules/theme')
  const { theme } = storeToRefs(useThemeStore())

  // 初始化立即更新一次
  updateTheme(theme.value)

  // 监听后续变化
  watch(theme, (newTheme) => {
    updateTheme(newTheme)
  })
}
