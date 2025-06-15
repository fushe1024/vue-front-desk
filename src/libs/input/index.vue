<script setup>
import { inputType } from './config'
import { computed } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text',
    validator: (val) => {
      const result = inputType.includes(val)
      if (!result) {
        throw new Error(`type 的值只能是 ${inputType.join(' | ')} 中的一个`)
      }
      return result
    }
  },
  max: {
    type: [String, Number],
    default: 20
  }
})

// emit 事件
const emit = defineEmits(['update:modelValue'])

// 按钮类型
const iptType = computed(() => props.type === 'text')

// 最大字符数
const iptMax = computed(() => {
  if (props.modelValue.length > props.max) {
    return props.max
  }
  return props.modelValue.length
})
</script>

<template>
  <div>
    <div class="relative">
      <!-- input -->
      <input
        v-if="iptType"
        class="m-input"
        type="text"
        :maxlength="max"
        :value="modelValue"
        @input="(e) => emit('update:modelValue', e.target.value)"
      />
      <!-- textarea -->
      <textarea
        v-else
        class="m-input"
        :maxlength="max"
        rows="5"
        :value="modelValue"
        @input="(e) => emit('update:modelValue', e.target.value)"
      ></textarea>

      <!-- 最大字符 -->
      <span class="absolute right-1 bottom-0.5 text-zinc-400 text-xs">
        {{ iptMax }} / {{ max }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
