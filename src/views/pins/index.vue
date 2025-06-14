<script setup>
import pinsVue from './components/pins.vue'
</script>

<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <pinsVue :id="$route.params.id" />
  </div>
</template>

<style scoped></style>
