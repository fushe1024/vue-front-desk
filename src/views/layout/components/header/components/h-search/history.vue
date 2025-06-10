<script setup>
import { useSearchStore } from '@/stores/modules/search'
const store = useSearchStore()
import { EMITS_ITEM_CLICK } from './config'

const emits = defineEmits([EMITS_ITEM_CLICK])

/**
 * 清除搜索历史
 */
const clearHistory = () => {
  store.clearSearchHistory()
}

/**
 * 删除单个搜索历史
 */
const deleteHistory = (index) => {
  store.deleteSearchHistory(index)
}

/**
 * 点击搜索历史
 */
const handleSearchHistory = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
</script>

<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
        icon-class="delete"
        class="w-1.5 h-1.5 ml-1 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fill-class="text-zinc-400"
        @click="clearHistory"
      ></m-svg-icon>
    </div>
    <!-- item -->
    <div class="flex flex-wrap">
      <div
        v-for="item in store.searchHistory"
        :key="item"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 rounded-sm text-zinc-900 text-sm font-bold duration-300 hover:bg-zinc-200"
        @click="handleSearchHistory(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          icon-class="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="deleteHistory(item)"
        >
        </m-svg-icon>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
