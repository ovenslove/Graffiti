"use strict"

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