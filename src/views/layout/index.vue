<script setup>
import headerVue from './components/header/index.vue'
import mainVue from './components/main.vue'
import totopVue from './components/totop.vue'
</script>

<template>
  <div class="h-screen w-screen">
    <header-vue class="h-header"></header-vue>
    <main-vue class="h-main"></main-vue>
    <totop-vue></totop-vue>
  </div>
</template>

<style scoped></style>
