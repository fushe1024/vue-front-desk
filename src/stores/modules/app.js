import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { isMobileTerminal } from '@/utils/flexible'

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

  // 路由跳转类型
  const routerType = ref('none')
  // 设置路由跳转类型
  const setRouterType = (newType) => {
    routerType.value = newType
  }
  // 计算当前路由跳转类型
  const computedRouterType = computed(() => {
    if (!isMobileTerminal.value) return 'none' // PC 端默认 none
    return routerType.value
  })

  return {
    categoryId,
    setCategory,
    resetCategory,
    searchText,
    setSearchText,
    routerType,
    computedRouterType,
    setRouterType
  }
})
