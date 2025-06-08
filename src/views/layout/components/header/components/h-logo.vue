<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <img
      v-lazy
      @click="goHome"
      class="h-4 cursor-pointer"
      src="https://himg.bdimg.com/sys/portraitn/item/public.1.787fa7c8._FEORP-kBzptJmxhAH4u9A"
    />
  </div>
</template>

<style scoped></style>
