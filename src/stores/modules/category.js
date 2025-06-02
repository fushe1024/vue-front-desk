import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_DATA } from '@/constants'

export const useCategoryStore = defineStore(
  'category',
  () => {
    // 分类初始数据
    const categorys = ref([CATEGORY_DATA])

    // 获取分类数据
    const getCategoryData = async () => {
      const res = await getCategoryAPI()
      categorys.value = [ALL_CATEGORY_ITEM, ...res.categorys]
    }

    return { categorys, getCategoryData }
  },
  {
    persist: true
  }
)
