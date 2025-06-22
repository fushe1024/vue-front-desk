import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePayStore = defineStore('pay', () => {
  // 支付数据
  const payData = ref([])

  // 设置支付数据
  const setPayData = (data) => {
    payData.value = data
  }

  return { payData, setPayData }
})
