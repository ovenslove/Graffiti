"use strict"

function getSystemInfo() {
  return wx.getSystemInfoSync()
}

"use strict";

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
 * @function 按照
 * @param {*} opts 
 * @param {*} $this 
 */
function splitString(opts, $this) {
  let strArr = [];
  var lineWidth = 0;
  let lineText = '';
  let _opts = {
    fontSize: 16,
    text: '',
    maxWidth: 100,
  };
  Object.assign(_opts, opts);
  $this.ctx.setFontSize(_opts.fontSize);
  for (let i = 0; i < _opts.text.length; i++) {
    lineWidth += $this.ctx.measureText(_opts.text[i]).width;
    lineText += _opts.text[i];
    if (lineWidth > _opts.maxWidth) {
      strArr.push(lineText);
      lineWidth = 0;
      lineText = '';
    }
    if (i == _opts.text.length - 1) { //绘制剩余部分
      strArr.push(lineText);
    }
  }
  return strArr;
}

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
  splitString,
  formatRadius
}