<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  iconClass: {
    type: String
  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200'
  },
  path: {
    type: String
  }
})

const router = useRouter()

/**
 * item 点击事件
 */
const onItemClick = () => {
  if (props.path) {
    router.push(props.path)
  }
}
</script>

<template>
  <!-- item  -->
  <div
    class="w-5 flex flex-col items-center justify-center mx-0.5"
    @click="onItemClick"
  >
    <!-- 图标 -->
    <m-svg-icon :icon-class="icon" :fill-class="iconClass" class="w-2 h-2" />
    <!-- 文字 -->
    <p class="text-sm mt-0.5" :class="textClass">
      <slot></slot>
    </p>
  </div>
</template>

<style scoped></style>
