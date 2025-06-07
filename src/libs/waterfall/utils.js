/**
 * 从 itemElements 中抽离出所有 imgElements
 * @param {HTMLElement[]} itemElements item 元素数组
 * @returns {HTMLImageElement[]} 图片元素数组
 */
export const getImgElements = (itemElements) => {
  let imgElements = []

  // 遍历 itemElements，获取所有 imgElements
  itemElements.forEach((item) => {
    imgElements = imgElements.concat(Array.from(item.querySelectorAll('img')))
  })

  return imgElements
}

/**
 * 从 imgElements 中抽离出所有 src
 * @param {HTMLImageElement[]} imgElements 图片元素数组
 * @returns {string[]} 图片 src 数组
 */
export const getImgSrcs = (imgElements) => imgElements.map((img) => img.src)

/**
 * 监听图片数组加载完成（promise）
 * @param {string[]} imgs 图片 src 数组
 * @returns {Promise<{ src: string }[]>} 图片加载完成的 promise 集合
 */
export const waitImgsLoaded = (imgs) => {
  // 图片加载完成的 promise 集合
  const promiseAll = []

  // 遍历图片数组，创建 promise， 并将 promise 放入集合
  imgs.forEach((imgSrc) => {
    const promise = new Promise((resolve) => {
      // 创建图片对象
      const imageObj = new Image()
      imageObj.src = imgSrc

      // 加载成功 & 失败
      imageObj.onload = () => resolve({ src: imgSrc })
      imageObj.onerror = () => resolve({ src: imgSrc })
    })

    promiseAll.push(promise)
  })

  // 返回 promise 集合
  return Promise.all(promiseAll)
}

/**
 * 返回列高对象中的最小高度
 * @param {Object} HeightObj 列高对象
 * @returns {number} 最小高度
 */
export const getMinHeight = (HeightObj) => {
  return Math.min(...Object.values(HeightObj))
}

/**
 * 返回列高对象中的最大高度
 * @param {Object} HeightObj 列高对象
 * @returns {number} 最大高度
 */
export const getMaxHeight = (HeightObj) => {
  return Math.max(...Object.values(HeightObj))
}

/**
 * 返回列高对象中的最小高度所在列
 * @param {Object} HeightObj 列高对象
 * @returns {string} 最小高度所在列
 */
export const getMinColumn = (HeightObj) => {
  // 获取列高对象中的最小高度
  const minHeight = getMinHeight(HeightObj)
  return Object.keys(HeightObj).find((key) => HeightObj[key] === minHeight)
}
