<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden last:mr-4"
    >
      <li
        v-for="item in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200"
      >
        {{ item.name }}
      </li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] z-20 h-4 px-1 flex items-center shadow-[-10px_0_10px_#fff]"
      >
        <SvgIcon class="w-1.5 h-1.5" iconClass="hamburger"></SvgIcon>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
