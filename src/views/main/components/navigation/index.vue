<script setup>
import mobile from './mobile/index.vue'
// import pc from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
</script>

<template>
  <mobile v-if="isMobileTerminal" />
</template>

<style scoped></style>
