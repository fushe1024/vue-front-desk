<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  tipText: {
    type: String,
    default: '已经没有更多数据了！'
  },
  isFinished: {
    type: Boolean,
    default: false
  }
})

const loading = defineModel('loading')
const emit = defineEmits(['onLoad'])
const loadingRef = ref(null)
const isBottom = ref(false)

// 解决定时器未清理问题
let timer = null

// 观察器逻辑优化
const { stop } = useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
  isBottom.value = isIntersecting
  emitLoad()
})

/**
 * 安全的加载触发
 */
const emitLoad = () => {
  // 添加 isFinished 状态检查
  if (isBottom.value && !loading.value && !props.isFinished) {
    loading.value = true
    emit('onLoad')
  }
}

/**
 * 监听 loading 状态变化
 */
watch(loading, () => {
  // 清理已有定时器
  if (timer) clearTimeout(timer)
  // 设置新定时器
  timer = setTimeout(() => {
    emitLoad()
  }, 100)
})

// 组件卸载时清理资源
onUnmounted(() => {
  stop()
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div>
    <slot></slot>
    <div ref="loadingRef" class="h-6 py-4">
      <m-svg-icon
        v-show="loading"
        icon-class="infinite-load"
        class="w-4 h-4 mx-auto animate-spin"
      />
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        {{ tipText }}
      </p>
    </div>
  </div>
</template>
