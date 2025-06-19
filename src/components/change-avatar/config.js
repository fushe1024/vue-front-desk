export const EMITS_CLOSE = 'close'

// 移动端配置对象
export const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
export const pcOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: true,
  // 不可调整裁剪框大小
  cropBoxResizable: true
}
