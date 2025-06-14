<script setup>
import { watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'
const router = useRouter()

watch(isMobileTerminal, () => {
  router.go(0)
})
</script>

<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
