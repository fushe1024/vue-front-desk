<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 图标前缀
  prefix: {
    type: String,
    default: 'icon'
  },
  // 图标类名
  iconClass: {
    type: String,
    required: false
  },
  // 图标颜色
  color: {
    type: String
  },
  // 颜色类名
  fillClass: {
    type: String
  }
})

// 图标id
const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`)
</script>

<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" :class="fillClass" />
  </svg>
</template>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
