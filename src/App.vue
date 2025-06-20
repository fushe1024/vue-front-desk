<script setup>
import { watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
const router = useRouter()
const appStore = useAppStore()

watch(isMobileTerminal, () => {
  router.go(0)
})
</script>

<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <m-transition-router-view
      :router-type="appStore.computedRouterType"
      main-component-name="home"
    ></m-transition-router-view>
  </div>
</template>

<style scoped lang="scss"></style>
