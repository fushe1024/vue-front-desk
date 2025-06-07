import request from '@/utils/request'

/**
 * 获取图片列表 - { page: 1, size: 15, categoryId: all, searchText: '' }
 */
export const getPexelsList = (params) => {
  return request.get('/pexels/list', { params })
}
