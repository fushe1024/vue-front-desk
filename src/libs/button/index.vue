<script setup>
import { typeEnum, sizeEnum, EMIT_CLICK } from './config'
import { computed } from 'vue'

/**
 * 按钮属性
 */
const props = defineProps({
  // icon 图标名字
  icon: String,
  // icon 图标颜色
  iconColor: String,
  // icon 图标类名（匹配 tailwindcss）
  iconClass: String,
  // 按钮类型
  type: {
    type: String,
    default: 'main',
    validator: (value) => {
      // 获取所有可选按钮风格
      const keys = Object.keys(typeEnum)

      // 判断开发者是否传入了合法的按钮风格
      const result = keys.includes(value)

      // 如果传入了不合法的按钮风格，就打印错误信息
      if (!result) {
        throw new Error(`type 的值只能是 ${keys.join(' | ')} 中的一个`)
      }

      // 返回结果
      return result
    }
  },
  // 按钮尺寸
  size: {
    type: String,
    default: 'default',
    validator: (value) => {
      // 获取所有可选按钮尺寸
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))

      // 判断开发者是否传入了合法的按钮尺寸
      const result = keys.includes(value)

      // 如果传入了不合法的按钮尺寸，就打印错误信息
      if (!result) {
        throw new Error(`size 的值只能是 ${keys.join(' | ')} 中的一个`)
      }

      // 返回结果
      return result
    }
  },
  // 按钮点击时是否需要动画
  isAnimate: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

/**
 * 按钮事件
 */
const emit = defineEmits([EMIT_CLICK])

/**
 * 按钮尺寸
 * @description 如果是 icon 按钮，就返回 icon-xxx 的值，否则返回 xxx 的值
 * icon-small | small
 * @returns {string} 按钮尺寸
 */
const sizeKey = computed(() => {
  return props.icon ? `icon-${props.size}` : props.size
})

/**
 * 按钮点击事件
 */
const onBtnClick = () => {
  if (props.loading) {
    return
  }
  emit(EMIT_CLICK)
}
</script>

<template>
  <button
    @click.stop="onBtnClick"
    class="text-sm text-center duration-150 flex justify-center items-center rounded"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isAnimate }
    ]"
  >
    <!-- loadiing 部分 -->
    <m-svg-icon
      v-if="loading"
      iconClass="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>

    <!-- icon 按钮 -->
    <m-svg-icon
      v-if="icon"
      :icon-class="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fill-class="iconClass"
    ></m-svg-icon>
    <!-- 文字 按钮 -->
    <slot v-else></slot>
  </button>
</template>

<style scoped></style>
