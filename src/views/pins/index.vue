<script setup>
import pinsVue from './components/pins.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <pinsVue :id="route.params.id" />
  </div>
</template>

<style scoped></style>
