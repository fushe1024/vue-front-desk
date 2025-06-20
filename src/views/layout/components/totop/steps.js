export default [
  {
    element: '#guide-home', // 在哪个元素中高亮
    // 配置对象
    popover: {
      title: 'Logo', // 网站图标
      description: '点击可返回首页' // 描述
    }
  },
  {
    element: '#guide-search',
    popover: {
      title: '搜索',
      description: '搜索您期望的图片'
    }
  },
  {
    element: '#guide-github',
    popover: {
      title: 'GitHub',
      description: '这里是项目的GitHub地址',
      position: 'left'
    }
  },
  {
    element: '#guide-theme',
    popover: {
      title: '风格',
      description: '选择一个您喜欢的风格',
      position: 'left' // 弹出的位置
    }
  },
  {
    element: '#guide-my',
    popover: {
      title: '账户',
      description: '这里标记了您的账户信息',
      position: 'left'
    }
  },
  {
    element: '#guide-start',
    popover: {
      title: '引导',
      description: '这里可再次查看引导信息',
      position: 'left'
    }
  },
  {
    element: '#guide-feedback',
    popover: {
      title: '反馈',
      description: '您的任何不满都可以在这里告诉我们',
      position: 'left'
    }
  }
]
