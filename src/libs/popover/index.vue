<script setup>
import { DELAY_TIME } from '@/constants'
import {
  placementEnums,
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
} from './config'
import { ref, watch, nextTick } from 'vue'
import { useSlots } from 'vue'
const slots = useSlots()

// 定义 props
const props = defineProps({
  // 气泡位置
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT, // 默认位置 - 左下
    validator(value) {
      const result = placementEnums.includes(value)
      if (!result) {
        throw new Error(
          `placement 的值只能是 ${placementEnums.join(' | ')} 中的一个`
        )
      }
      return result
    }
  }
})

// 是否显示气泡
const isShow = ref(false)

/**
 * 鼠标移入
 */
let timer = null
const onMouseenter = () => {
  if (!slots.default) return
  isShow.value = true
  if (timer) clearTimeout(timer) // 清除定时器
}

/**
 * 鼠标移出
 */
const onMouseleave = () => {
  if (!slots.default) return
  timer = setTimeout(() => {
    isShow.value = false
  }, DELAY_TIME)
}

/**
 * 获取元素位置
 */
const getElementPosition = (el) => {
  return el.getBoundingClientRect()
}

/**
 * 气泡显示 - 计算气泡位置
 */
const referenceRef = ref(null) // 参考元素
const popoverRef = ref(null) // 气泡元素 - 设置位置
watch(isShow, (value) => {
  // 未显示 - 直接返回
  if (!value) {
    return
  }

  // 显示 - 等待渲染完成后 - 计算
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT: // 左上
        popoverRef.value.style.top = 0
        popoverRef.value.style.left =
          -getElementPosition(popoverRef.value).width + 'px'
        break
      case PROP_TOP_RIGHT: // 右上
        popoverRef.value.style.top = 0
        popoverRef.value.style.left =
          getElementPosition(referenceRef.value).width + 'px'
        break
      case PROP_BOTTOM_LEFT: // 左下
        popoverRef.value.style.top =
          getElementPosition(referenceRef.value).height + 'px'
        popoverRef.value.style.left =
          -getElementPosition(popoverRef.value).width + 'px'
        break
      case PROP_BOTTOM_RIGHT: // 右下
        popoverRef.value.style.top =
          getElementPosition(referenceRef.value).height + 'px'
        popoverRef.value.style.left =
          getElementPosition(referenceRef.value).width + 'px'
        break
    }
  })
})
</script>

<template>
  <div
    ref="referenceRef"
    class="relative"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <!-- 具名插槽 -->
    <div>
      <slot name="reference"></slot>
    </div>
    <!-- 动画展示 -->
    <Transition name="side">
      <div
        ref="popoverRef"
        v-if="isShow && slots.default"
        class="absolute p-1 z-20 bg-white border border-zinc-200/60 rounded-md dark:bg-zinc-900 dark:border-zinc-700"
      >
        <!-- 默认插槽 -->
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.side-enter-active,
.side-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.side-enter-from,
.side-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
