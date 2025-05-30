<script setup>
import { ref } from 'vue'

// 输入框的值
const inputValue = ref('')
</script>

<template>
  <div class="w-full">
    <!-- 通用组件 -->
    <m-search v-model="inputValue">
      <template #dropdown>
        <div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </template>
    </m-search>
  </div>
</template>

<style scoped></style>
