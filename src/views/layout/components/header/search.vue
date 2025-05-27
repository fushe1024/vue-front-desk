<script setup>
import { ref } from 'vue'

// 输入框的值
const inputValue = ref('')
</script>

<template>
  <div class="w-full">
    <!-- 通用组件 -->
    <search v-model="inputValue">
      <template #dropdown>
        <div>下拉菜单</div>
      </template>
    </search>
  </div>
</template>

<style scoped></style>
