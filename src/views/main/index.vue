<script setup>
import navigation from './components/navigation/index.vue'
import list from './components/list/index.vue'
</script>

<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation></navigation>
    <div class="max-w-lg mx-auto relative m-1 lg:mt-4">
      <list></list>
    </div>
  </div>
</template>

<style scoped></style>
