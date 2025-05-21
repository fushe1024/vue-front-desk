import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

/**
 * 判断是否为移动端设备 (判断宽度是否小于等于一个值)
 * @returns {boolean}
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 判断是否为移动端设备
 * @returns {boolean}
 */
export const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})
