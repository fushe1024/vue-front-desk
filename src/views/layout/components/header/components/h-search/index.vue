<script setup>
import { ref, computed } from 'vue'
import History from './history.vue'
import Hot from './hot.vue'
import Hint from './hint.vue'
import { useSearchStore } from '@/stores/modules/search'
const historyStore = useSearchStore()
import { useAppStore } from '@/stores/modules/app'
const { setSearchText } = useAppStore()

// 输入框的值
const inputValue = ref('')
// 是否显示搜索提示 => 输入框有值就显示(长度不为0)
const showHint = computed(() => inputValue.value.length !== 0)
// 是否取消下拉框

// 搜索事件
const handleSearch = (keyword) => {
  if (!keyword) return
  setSearchText(keyword)
  // 添加搜索历史
  historyStore.addSearchHistory(keyword)
}

/**
 * 历史项与搜索建议的点击事件
 */
const handleItemClick = (item) => {
  inputValue.value = item
  setSearchText(item)
}

// 失去焦点 - 关闭下拉框
const searchRef = ref(null)
const blurFun = () => {
  searchRef.value.closeDropdown()
}
</script>

<template>
  <div class="w-full">
    <!-- 通用组件 -->
    <m-search
      ref="searchRef"
      v-model="inputValue"
      @search="handleSearch"
      @blur="blurFun"
    >
      <template #dropdown>
        <!-- 搜索历史 & 热门精选 -->
        <div v-show="!showHint">
          <History @item-click="handleItemClick"></History>
          <Hot @item-click="handleItemClick"></Hot>
        </div>
        <!-- 搜索提示 -->
        <div v-show="showHint">
          <Hint @item-click="handleItemClick" :keyword="inputValue"></Hint>
        </div>
      </template>
    </m-search>
  </div>
</template>

<style scoped></style>
