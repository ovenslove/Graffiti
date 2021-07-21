"use strict"

/**
 * @function getSystemInfo
 * @description 获取系统信息
 * @returns
 */
function getSystemInfo() {
  return wx.getSystemInfoSync()
}
/**
 * @function 角度转化为弧度
 * @param {number} deg
 * @returns {number} radian 
 */
function degree2radian(deg) {
  return (deg / 360) * 2 * Math.PI;
}
/**
 * @function 去除字符串前后空格
 * @param {string} str 
 * @returns {string} str
 */
function trim(str) {
  return str
    .replace(/^(\s|\u00A0)+/, '')
    .replace(/(\s|\u00A0)+$/, '');
}

/**
 * @function formatRadius
 * @description 格式化圆角参数
 * @param {*} [opts={}]
 * @returns []
 */
function formatRadius(opts = {}) {
  if (Array.isArray(opts.radius)) {
    return opts.radius
  }
  let radiusList = (opts.radius.split(' ') || []).map(e => parseFloat(0 + e) > opts.width / 2 ? opts.width / 2 : parseFloat(0 + e))
  switch (radiusList.length) {
    case 1:
      radiusList = [radiusList[0], radiusList[0], radiusList[0], radiusList[0]];
      break;
    case 2:
      radiusList = [radiusList[0], radiusList[1], radiusList[0], radiusList[1]];
      break;
    case 3:
      radiusList = [radiusList[0], radiusList[1], radiusList[2], radiusList[1]];
      break;
    case 4:
      radiusList = [radiusList[0], radiusList[1], radiusList[2], radiusList[3]];
      break;
    default:
      radiusList = [0, 0, 0, 0];
      break;
  }
  return radiusList;
}

/**
 * @function formatBoxShadow
 * @description 格式化盒阴影
 * @param {*} [opts={}]
 * @returns
 */
function formatBoxShadow(opts = {}) {
  let boxShadow = opts.boxShadow
  if (!boxShadow) {
    return [0, 0, 0, "#000000"]
  }
  if (Array.isArray(boxShadow)) {
    return boxShadow
  }
  boxShadow = boxShadow.split(' ')
  if (boxShadow.length === 4) {
    boxShadow[0] = parseFloat(boxShadow[0])
    boxShadow[1] = parseFloat(boxShadow[1])
    boxShadow[2] = parseFloat(boxShadow[2])
  } else {
    throw new Error('boxShadow 参数错误')
  }
  return boxShadow;
}

/**
 * @function formatRotateOrigin
 * @description 格式化旋转中心
 * @param {*} [opts={}]
 * @returns
 */
function formatRotateOrigin(opts = {}) {
  let rotateOrigin = opts.rotateOrigin
  if (!rotateOrigin) {
    return [0, 0]
  }
  if (Array.isArray(rotateOrigin)) {
    return rotateOrigin
  }
  rotateOrigin = rotateOrigin.split(' ');
  if (rotateOrigin.length === 2) {
    rotateOrigin = rotateOrigin.map(e => {
      if (/[\d]%/g.test(e)) {
        return parseFloat(e) / 100
      } else {
        switch (e) {
          case 'left':
          case 'top':
            return 0;
          case 'right':
          case 'bottom':
            return 1;
          case 'center':
          case 'middle':
            return 0.5;
          default:
            return 0;
        }
      }
    })
  } else {
    rotateOrigin = [0, 0]
  }
  return rotateOrigin;
}

export default {
  getSystemInfo,
  degree2radian,
  trim,
  formatRadius,
  formatBoxShadow,
  formatRotateOrigin
}