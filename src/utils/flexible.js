import { computed } from 'vue'
import { PC_DEVICE_WIDTH, MAX_FONT_SIZE } from '@/constants'
import { useWindowSize } from '@vueuse/core'

// https://vueuse.org/core/useWindowSize
const { width } = useWindowSize()

/**
 * 判断是否为移动端设备 (判断宽度是否小于等于一个值)
 * @returns {boolean}
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 动态指定rem基准值 (最大为40px)
 * 根据用户的屏幕宽度，进行一些计算，把计算出来的值赋值给根标签作为font-size大小
 */
export const useREM = () => {
  // 监听html文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 获得html标签
    const html = document.querySelector('html')

    // 计算 fontsize 根据屏幕宽度 / 10 并且最大为40px
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize

    // 赋值给html
    html.style.fontSize = fontSize + 'px'
  })
}

/**
 * 判断是否为移动端设备
 * @returns {boolean}
 */
export const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})
