import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM } from '@/constants'

export const useAppStore = defineStore('app', () => {
  // 当前选中的分类id => 初始值为所有分类
  const categoryId = ref(ALL_CATEGORY_ITEM.id)
  // 切换分类
  const setCategory = (id) => {
    categoryId.value = id
  }
  // 重置分类
  const resetCategory = () => {
    categoryId.value = ALL_CATEGORY_ITEM.id
  }

  // 搜索的文本
  const searchText = ref('')
  // 设置搜索的文本
  const setSearchText = (text) => {
    searchText.value = text
  }

  return { categoryId, setCategory, resetCategory, searchText, setSearchText }
})
