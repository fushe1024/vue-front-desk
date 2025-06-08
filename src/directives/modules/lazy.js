import { useIntersectionObserver } from '@vueuse/core'

// 懒加载指令
export default {
  // el：指令绑定的元素
  mounted(el) {
    // 1. 拿到img的src
    const imgSrc = el.src
    // 2. 把src替换成默认图片
    el.src = ''

    // 3. 监听图片是否进入可视区
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 4. 进入可视区后，把src替换成真实的图片
        el.src = imgSrc
        // 5. 停止监听
        stop()
      }
    })
  }
}
