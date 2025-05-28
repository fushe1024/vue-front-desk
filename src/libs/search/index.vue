<script setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import {
  EMIT_BLUR,
  EMIT_CLEAR,
  EMIT_FOCUS,
  EMIT_INPUT,
  EMIT_SEARCH
} from './config'

// 输入框的值 - 双向绑定
const inputValue = defineModel('modelValue', { required: true })

// emit 事件
const emit = defineEmits([
  EMIT_BLUR,
  EMIT_CLEAR,
  EMIT_FOCUS,
  EMIT_INPUT,
  EMIT_SEARCH
])

/**
 * 监听输入行为
 */
watch(inputValue, (value) => {
  console.log('输入事件', value) // test
  emit(EMIT_INPUT, value)
})

/**
 * 清空文本
 */
const onClearClick = () => {
  inputValue.value = ''
  emit(EMIT_CLEAR)
}

/**
 * 搜索
 */
const onSearch = () => {
  console.log('搜索', inputValue.value) // test
  emit(EMIT_SEARCH, inputValue.value)
}

/**
 * 监听焦点
 */
const isFocus = ref(false)
const onFocus = () => {
  isFocus.value = true
  emit(EMIT_FOCUS)
}

/**
 * 点击搜素区域外隐藏 dropdown
 */
const searchRef = ref(null)
onClickOutside(searchRef, () => {
  if (isFocus.value) isFocus.value = false
})

/**
 * 失去焦点
 */
const onBlur = () => {
  emit(EMIT_BLUR)
}
</script>

<template>
  <div
    ref="searchRef"
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <!-- 搜索图标 -->
    <svg-Icon
      class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      icon-class="search"
      color="#707070"
    ></svg-Icon>
    <!-- 输入框 -->
    <input
      class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
      type="text"
      placeholder="搜索"
      v-model="inputValue"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="onSearch"
    />
    <!-- 删除按钮 -->
    <svg-Icon
      v-show="inputValue"
      @click="onClearClick"
      class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
      icon-class="input-delete"
    ></svg-Icon>
    <!-- 分割线 -->
    <div
      class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
    ></div>
    <!-- 搜索按钮 - 通用组件 -->
    <m-button
      class="absolute translate-y-[-50%] top-[50%] right-1 rounded-xl duration-500 opacity-0 group-hover:opacity-100"
      icon="search"
      iconColor="#ffffff"
      @click="onSearch"
    ></m-button>
    <!-- 下拉区域 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-3xl"
      >
        <!-- 插槽 -->
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
