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

export default {
  getSystemInfo,
  degree2radian,
  trim,
  formatRadius
}