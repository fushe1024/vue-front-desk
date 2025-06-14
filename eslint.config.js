import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/slider-captcha/**'
  ]),

  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  // 自动定义规则
  {
    rules: {
      'vue/multi-word-component-names': 'off', // 关闭组件名称检查
      'vue/valid-v-model': 'off', // 关闭v-model检查
      'vue/valid-v-slot': 'off' // 关闭v-slot检查
      // ' vue/valid-define-emits': 'off' // 关闭defineEmits检查
    }
  }
])
