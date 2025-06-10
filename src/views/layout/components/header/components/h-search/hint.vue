<script setup>
import { ref } from 'vue'
import { getSearchHint } from '@/api/pexels'
import { EMITS_ITEM_CLICK } from './config'
import { watchDebounced } from '@vueuse/core'

// 接收搜索数据
const props = defineProps({
  keyword: {
    type: String,
    required: true
  }
})

// 事件
const emits = defineEmits([EMITS_ITEM_CLICK])

/**
 * 搜索建议
 */
const hintData = ref([])
const handleSearchHint = async () => {
  const res = await getSearchHint(props.keyword)
  hintData.value = res.result
}

/**
 * 监听搜索关键字变化（防抖）
 */
watchDebounced(
  () => props.keyword,
  () => {
    handleSearchHint()
  },
  {
    immediate: true, // 立即执行
    throttle: 500 // 防抖时间
  }
)

/**
 * 处理关键字高亮
 */
const handleHighlight = (keyword) => {
  // 没有搜索关键字
  if (!props.keyword) return keyword

  // 创建正则表达式，g 表示全局匹配， i 表示忽略大小写
  const reg = new RegExp(props.keyword, 'gi')

  // 替换关键字为 span 标签，并返回 => match 为匹配到的关键字
  return keyword.replace(reg, (match) => {
    return `<span class="text-zinc-900 dark:text-zinc-200">${match}</span>`
  })
}

/**
 * 点击搜索建议
 */
const handleItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
</script>

<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="handleItemClick(item)"
      v-html="handleHighlight(item)"
    ></div>
  </div>
</template>

<style scoped></style>
