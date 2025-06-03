// 可选按钮风格 - 按钮背景色 + 按钮文字颜色
export const typeEnum = {
  primary:
    'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700'
}

// 可选按钮尺寸 - 按钮尺寸 + 图标尺寸
export const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}

// 可触发的事件
export const EMIT_CLICK = 'click'
