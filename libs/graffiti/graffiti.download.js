"use strict"

/**
 * @function downLoad
 * @description 图片下载
 * @param {*} url
 * @param {*} node
 * @returns
 */
function downLoad(url, node) {
  const img = node.createImage()
  return new Promise((resolve, reject) => {
    img.onload = (res) => {
      resolve(img)
    }
    img.error = (err) => {
      reject(err)
    }
    img.src = url
  })
}

export default {
  downLoad
}