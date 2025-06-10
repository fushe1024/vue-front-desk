import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore(
  'search',
  () => {
    // 搜索搜索历史
    const searchHistory = ref([])

    // 添加搜索历史
    const addSearchHistory = (keyword) => {
      // 判断是否已经存在
      const index = searchHistory.value.findIndex((item) => item === keyword)
      if (index !== -1) {
        // 存在 => 删除旧数据
        searchHistory.value.splice(index, 1)
      }
      // 头部插入新数据
      searchHistory.value.unshift(keyword)
    }

    // 删除搜索历史
    const deleteSearchHistory = (keyword) => {
      // 找到索引
      const index = searchHistory.value.findIndex((item) => item === keyword)
      // 删除
      searchHistory.value.splice(index, 1)
    }

    // 清空搜索历史
    const clearSearchHistory = () => {
      searchHistory.value = []
    }

    return {
      searchHistory,
      addSearchHistory,
      deleteSearchHistory,
      clearSearchHistory
    }
  },
  {
    persist: true
  }
)
