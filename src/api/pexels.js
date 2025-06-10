import request from '@/utils/request'

/**
 * 获取图片列表 - { page: 1, size: 15, categoryId: all, searchText: '' }
 */
export const getPexelsList = (params) => {
  return request.get('/pexels/list', { params })
}

/**
 * 获取搜索提示
 * @param {*} keyword
 */
export const getSearchHint = (keyword) => {
  return request.get('/pexels/hint', { params: { q: keyword } })
}

/**
 * 获取热门精选
 */
export const getHotSelection = () => request.get('/pexels/themes')
