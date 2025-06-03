import { THEME } from '@/constants/index'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore(
  'theme',
  () => {
    // 默认主题
    const theme = ref(THEME.LIGHT)

    // 设置主题
    const setTheme = (newTheme) => {
      theme.value = newTheme
    }

    return { theme, setTheme }
  },
  {
    persist: true
  }
)
