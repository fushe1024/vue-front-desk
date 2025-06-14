<script setup>
import { useRouter } from 'vue-router'
import { LOGO_URL } from '@/constants'
const router = useRouter()
const goHome = () => router.push('/')
</script>

<template>
  <div id="guide-home">
    <img
      v-lazy
      @click="goHome"
      class="h-4 cursor-pointer rounded"
      :src="LOGO_URL"
    />
  </div>
</template>

<style scoped></style>
