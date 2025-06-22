<script setup>
import { EMITS_CHANGE, EMITS_FINISH, INTERVAL } from './config'
import { ref, watch, computed, onBeforeUnmount } from 'vue'
import dayjs from '@/utils/dayjs'

const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMITS_CHANGE, EMITS_FINISH])

const duration = ref(0) // 倒计时时长
let timerId = null // 定时器id

/**
 * 开始倒计时
 */
const start = () => {
  close() // 关闭之前的定时器
  timerId = setInterval(() => {
    duration.value -= INTERVAL
    emits(EMITS_CHANGE, duration.value)

    // 倒计时结束
    if (duration.value <= 0) {
      duration.value = 0
      close()
      emits(EMITS_FINISH)
    }
  }, INTERVAL)
}

/**
 * 倒计时结束
 */
const close = () => {
  if (timerId) {
    clearInterval(timerId)
  }
}

/**
 * 监听 -> 开启倒计时
 */
watch(
  () => props.time,
  (newVal) => {
    duration.value = newVal
    start()
  },
  {
    immediate: true // 初始化时立即执行
  }
)

/**
 * 组件销毁时 -> 关闭定时器
 */
onBeforeUnmount(() => {
  close()
})

/**
 * 显示时间
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
</script>

<template>
  <div v-bind="$attrs">
    <slot>
      <span>{{ showTime }}</span>
    </slot>
  </div>
</template>

<style scoped></style>
