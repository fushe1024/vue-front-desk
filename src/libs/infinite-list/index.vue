<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  // 提示文本
  tipText: {
    type: String,
    default: '已经没有更多数据了！'
  },
  // 数据是否加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})

// 是否处于 loading 状态
const loading = defineModel('loading')

// 可触发的事件
const emits = defineEmits(['onLoad'])

// 监听元素的 ref
const loadingRef = ref(null)
// 记录当前是否在底部
const isBottom = ref(false)

// 监听元素是否进入可视区域
useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
  // 获取当前状态
  isBottom.value = isIntersecting
  // 触发加载
  emitLoad()
})

/**
 * 触发加载事件
 */
const emitLoad = () => {
  // 如果元素进入可视区域并且没有加载完成
  if (isBottom.value && !loading.value && !props.isFinished) {
    // 设置 loading 状态
    loading.value = true
    // 触发 onLoad 事件 - 触发后会执行 getPexelsData 方法
    emits('onLoad')
  }
}

/**
 * 监听 loading 状态
 * 解决数据加载完成后， 首屏未铺满的问题
 */
watch(loading, () => {
  setTimeout(() => {
    emitLoad()
  }, 100)
})

// 暴露方法
defineExpose({
  emitLoad
})
</script>

<template>
  <div>
    <!-- 内容 -->
    <slot></slot>
    <div ref="loadingRef" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        icon-class="infinite-load"
        class="w-4 h-4 mx-auto animate-spin"
      ></m-svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        {{ tipText }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
