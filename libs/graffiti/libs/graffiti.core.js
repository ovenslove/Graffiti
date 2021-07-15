"use strict"
import downLoad from './graffiti.download'
import utils from './graffiti.utils'
const QRCode = require('../libs/graffiti.qrcode')
const PI = Math.PI
class Graffiti {
  /**
   *Creates an instance of Graffiti.
   * @param {*} [opts={}]
   * @memberof Graffiti
   */
  constructor(canvasId = '', context = null) {
    if (!canvasId) throw new Error('canvasId this is required')
    if (!context) throw new Error('parent context is required')
    this.ctx = null
    this.canvasNode = null
    this.sysInfo = utils.getSystemInfo()
    this.canvasId = canvasId
    this.query = context.createSelectorQuery()
    this.dpr = this.sysInfo.pixelRatio || 2
    this.scale = 1;
    this.CANVAS_W = 300
    this.CANVAS_H = 400
    this.DESIGN_W = 750
    this.DESIGN_H = 1000
    this.data = {}
    return this;
  }
  /**
   * @function init
   * @description 初始化对象
   * @memberof Graffiti
   */
  init(data = null) {
    if (data) {
      this.data = data;
      this.DESIGN_W = parseFloat(data.width)
      this.DESIGN_H = parseFloat(data.height)
    }
    this.query.select('#' + this.canvasId)
      .fields({
        node: true,
        size: true
      }).exec(res => {
        const scale = (this.DESIGN_W / res[0].width) * this.dpr
        const canvas = res[0].node
        canvas.width = res[0].width * scale
        canvas.height = res[0].height * scale
        this.canvasNode = canvas
        this.ctx = canvas.getContext('2d')
        this.CANVAS_W = canvas.width
        this.CANVAS_H = canvas.height
        this.scale = scale
        this.ctx.scale(this.dpr, this.dpr)
        // 初始化默认画板
        this.initDrawingBoard(this.data)
        this.downLoadImage(this.data.views).then(list => {
          for (let i in list) {
            switch (list[i].type) {
              case 'text':
                this.drawText(list[i]);
                break;
              case 'image':
                this.drawImage(list[i]);
                break;
              case 'qrcode':
                this.drawQrCode(list[i]);
                break;
              case 'hollow':
                this.drawHollow(list[i])
                break;
              case 'line':
                this.drawLine(list[i])
                break;
              default:
                break;
            }
          }
        })
      })
    return this;
  }
  /**
   * @function initDrawingBoard
   * @description 初始化默认画板
   * @param {*} [opts={}]
   * @returns this
   * @memberof Graffiti
   */
  initDrawingBoard(opts = {}) {
    this.ctx.save()
    let _opts = {
      left: 0,
      top: 0,
      width: this.DESIGN_W,
      height: this.DESIGN_H,
      background: '#ffffff',
      radius: [0, 0, 0, 0]
    }
    // 处理单位
    Object.assign(_opts, opts)
    _opts.width = parseFloat(_opts.width);
    _opts.height = parseFloat(_opts.height);
    _opts.radius = utils.formatRadius(_opts)
    this.drawRect(_opts)
    if (_opts.background) {
      this.ctx.fillStyle = _opts.background
    }
    this.ctx.fillRect(_opts.left, _opts.top, _opts.width, _opts.height);
    this.ctx.restore()
    return this
  }
  /**
   * @function downLoadImage
   * @description 下载图片
   * @param {*} [list=[]]
   * @returns Promise
   * @memberof Graffiti
   */
  downLoadImage(list = []) {
    let dlist = [];
    for (let i in list) {
      if (list[i].type === 'image') {
        dlist.push({
          index: i,
          handle: downLoad.downLoad(list[i].url, this.canvasNode)
        })
      }
    }
    return new Promise((resolve, reject) => {
      Promise.all(dlist.map(e => e.handle)).then(res => {
        console.log(res)
        for (let i in res) {
          list[dlist[i].index].tmpUrl = res[i]
        }
        this.data.views = list;
        resolve(list)
      }).catch(err => {
        reject(err)
      })
    });
  }
  /**
   * @function drawLine
   * @description 绘制线条
   * @param {*} [opts={}]
   * @memberof Graffiti
   */
  drawLine(opts = {}) {
    let _opts = {
      lineWidth: 2,
      left: 0,
      top: 0,
      toLeft: 0,
      toTop: 0,
      color: "#333333",
      lineType: 'line',
      lineCap: "butt", // butt, round and square
      lineJoin: "miter", //round, bevel and miter
      lineDash: [5, 5], // 设置虚线偏样式
      lineDashOffset: 10 // 设置虚线偏移量
    }
    Object.assign(_opts, opts.style)
    console.log('line', _opts)
    _opts.left = parseFloat(_opts.left)
    _opts.top = parseFloat(_opts.top)
    _opts.toLeft = parseFloat(_opts.toLeft)
    _opts.toTop = parseFloat(_opts.toTop)
    _opts.lineWidth = parseFloat(_opts.lineWidth)
    this.ctx.save()
    this.ctx.strokeStyle = _opts.color
    this.ctx.lineWidth = _opts.lineWidth
    if (_opts.lineType === 'dash') {
      this.ctx.lineCap = _opts.lineCap
      this.ctx.lineJoin = _opts.lineJoin
      this.ctx.setLineDash(_opts.lineDash)
      this.ctx.lineDashOffset = _opts.lineDashOffset
    }
    this.ctx.beginPath()
    this.ctx.moveTo(_opts.left, _opts.top)
    this.ctx.lineTo(_opts.toLeft, _opts.toTop)
    this.ctx.closePath()
    this.ctx.stroke();
    this.ctx.restore()
  }
  /**
   * @function drawHollow
   * @description 绘制镂空
   * @param {*} [opts={}]
   * @memberof Graffiti
   */
  drawHollow(opts = {}) {
    let _opts = {
      left: 0,
      top: 0,
      width: 30,
      height: 30,
      radius: [0, 0, 0, 0],
    }
    Object.assign(_opts, opts.style)
    _opts.left = parseFloat(_opts.left)
    _opts.top = parseFloat(_opts.top)
    _opts.width = parseFloat(_opts.width)
    _opts.height = parseFloat(_opts.height)
    _opts.radius = utils.formatRadius(_opts)
    Object.assign(_opts, {
      border: 0,
      hollow: true,
      fill: true,
      stroke: false,
      clip: false
    })
    this.ctx.save()
    this.drawRect(_opts)
    this.ctx.restore()
  }
  /**
   * @function drawImage
   * @description 绘制图片
   * @param {*} [opts={}]
   * @returns this
   * @memberof Graffiti
   */
  drawImage(opts = {}) {
    let _opts = {
      image: null,
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      rotate: 0,
      radius: [0, 0, 0, 0],
      border: 0,
      borderColor: "#ffffff",
      background: '#ffffff',
    };
    Object.assign(_opts, opts.style);
    _opts.left = parseFloat(_opts.left)
    _opts.top = parseFloat(_opts.top)
    _opts.width = parseFloat(_opts.width)
    _opts.height = parseFloat(_opts.height)
    _opts.border = parseFloat(_opts.border)
    _opts.radius = utils.formatRadius(_opts)
    this.ctx.save()
    if (_opts.radius.findIndex(r => r > 0) > -1) {
      this.drawRect({
        left: _opts.left,
        top: _opts.top,
        width: _opts.width,
        height: _opts.height,
        border: _opts.border,
        borderColor: _opts.borderColor,
        background: _opts.background,
        radius: _opts.radius,
        clip: true,
        stroke: false,
        fill: true
      })
    }
    this.ctx.drawImage(opts.tmpUrl, _opts.left + _opts.border / 2, _opts.top + _opts.border / 2, _opts.width - _opts.border, _opts.height - _opts.border)
    this.ctx.restore()
  }
  /**
   * @function drawText
   * @description 绘制文本
   * @param {*} [opts={}]
   * @returns this
   * @memberof Graffiti
   */
  drawText(opts = {}) {
    let text = opts.text || '默认文本'
    // 默认样式
    let _styles = {
      left: 100, // 坐标x
      top: 100, // 坐标y
      fontSize: 32, // 字号大小
      fontFamily: 'webfontzk', // 字体
      color: '#333333', // 字体颜色
      maxWidth: 200, // 最大宽度
      maxLines: 4, // 最大行数
      textAlign: 'left', // 左右对齐方式
      textBaseline: 'top', // 垂直对齐方式
      lineHeight: 40, // 行距
    };

    Object.assign(_styles, opts.style);
    this.ctx.save();
    // 文本颜色配置
    this.ctx.fillStyle = _styles.color
    // 设置字体
    this.ctx.font = `${_styles.fontWeight} ${_styles.fontSize}/${_styles.lineHeight} ${_styles.fontFamily}`;
    // 设置对齐方式
    this.ctx.textAlign = _styles.textAlign || 'left'
    // 设置基线
    this.ctx.textBaseline = _styles.textBaseline || 'top'

    // 换行-匹配到\r\n
    let textList = text.split(/[\n]/g) || []
    let textAllList = []
    // 单行换行
    for (let i in textList) {
      // 超过最大宽度就拆新行
      let tmpTextList = textList[i].split('') || []
      let _tmpList = []
      let _tmpStr = ''
      for (let j in tmpTextList) {
        if (Math.ceil(this.ctx.measureText(_tmpStr + tmpTextList[j]).width) > parseInt(_styles.width)) {
          if (_tmpStr) {
            _tmpList.push(_tmpStr);
          }
          _tmpStr = tmpTextList[j];
        } else {
          _tmpStr += tmpTextList[j]
        }
      }
      _tmpList.push(_tmpStr);
      textAllList.push(..._tmpList)
    }
    // 处理省略号
    if (textAllList.length > _styles.maxLines) {
      textAllList.splice(_styles.maxLines, textAllList.length)
      // 处理最后一行添加...
      let ellipsisLength = Math.ceil(this.ctx.measureText('...').width)
      let lastTextArr = textAllList[textAllList.length - 1].split('')
      // 从倒数选择文本填充...直到能放下
      for (let i = lastTextArr.length - 1; i > 0; i--) {
        if (Math.ceil(this.ctx.measureText(lastTextArr.slice(i, lastTextArr.length)).width) > ellipsisLength) {
          lastTextArr = lastTextArr.slice(0, i)
          lastTextArr.push('...')
          break;
        }
      }
      textAllList[textAllList.length - 1] = lastTextArr.join('')
    }
    // 计算文本垂直偏移量（行距）
    let lineHeight = parseFloat(_styles.lineHeight)
    // 处理旋转中心
    let rotateOrigin = _styles.rotateOrigin && _styles.rotateOrigin.split(' ') || [0, 0]
    rotateOrigin = rotateOrigin.map(e => {
      if (/[\d]%/g.test(e)) {
        return parseFloat(e) / 100
      } else {
        switch (e) {
          case 'left':
          case 'top':
            return 0;
            break;
          case 'right':
          case 'bottom':
            return 1;
            break;
          case 'center':
          case 'middle':
            return 0.5;
          default:
            return 0;
            break;
        }
      }
    })
    // 旋转偏移量
    let offsetWidth = parseInt(_styles.width) * rotateOrigin[0];
    let offsetHeight = textAllList.length * lineHeight * rotateOrigin[1];
    // 设置偏转中心
    this.ctx.translate(parseInt(_styles.left) + offsetWidth, parseInt(_styles.top) + offsetHeight)
    this.ctx.rotate(parseFloat(_styles.rotate) * Math.PI / 180);
    // 循环绘制文本
    for (let i in textAllList) {
      this.ctx.fillText(textAllList[i], -offsetWidth, -offsetHeight + i * lineHeight);
    }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.restore();
    return this
  }

  /**
   * @function drawRect
   * @description 绘制圆/矩形区域，支持裁剪和镂空
   * @tips 镂空需要先放展示区域再镂空
   * @tips 裁切需要先放裁切区域再放展示区域
   * @param {*} [opts={}]
   * @returns
   * @memberof Graffiti
   */
  drawRect(opts = {}) {
    let _opts = {
      left: 100,
      top: 100,
      width: 300,
      height: 500,
      radius: [0, 0, 0, 0],
      border: 0,
      borderColor: "#ffffff",
      background: '#ffffff',
      hollow: false,
      fill: true,
      stroke: false,
      clip: false
    }
    Object.assign(_opts, opts)
    _opts.left = parseFloat(_opts.left)
    _opts.top = parseFloat(_opts.top)
    _opts.width = parseFloat(_opts.width)
    _opts.height = parseFloat(_opts.height)
    _opts.radius = utils.formatRadius(_opts)
    if (_opts.clip) {
      _opts.hollow = false;
    }
    if (_opts.hollow) {
      this.ctx.globalCompositeOperation = 'destination-out'
    }
    this.ctx.lineWidth = _opts.border;
    this.ctx.beginPath();
    this.ctx.moveTo(_opts.left + _opts.radius[0], _opts.top); //p1点
    this.ctx.lineTo(_opts.left + _opts.width - _opts.radius[1], _opts.top); //p2点
    this.ctx.arc(_opts.left + _opts.width - _opts.radius[1], _opts.top + _opts.radius[1], _opts.radius[1], 3 * PI / 2, 2 * PI, false); // c1点画1/4弧到p3
    this.ctx.lineTo(_opts.left + _opts.width, _opts.top + _opts.height - _opts.radius[2]); // p4点
    this.ctx.arc(_opts.left + _opts.width - _opts.radius[2], _opts.top + _opts.height - _opts.radius[2], _opts.radius[2], 0, PI / 2, false); // c2点画1/4弧到p5
    this.ctx.lineTo(_opts.left + _opts.radius[3], _opts.top + _opts.height); // p6点
    this.ctx.arc(_opts.left + _opts.radius[3], _opts.top + _opts.height - _opts.radius[3], _opts.radius[3], PI / 2, PI, false); // c3点画1/4弧到p7
    this.ctx.lineTo(_opts.left, _opts.top + _opts.radius[0]); // p8点
    this.ctx.arc(_opts.left + _opts.radius[0], _opts.top + _opts.radius[0], _opts.radius[0], PI, 3 * PI / 2, false); // c3点画1/4弧到p1
    this.ctx.closePath();
    // 判断绘制类型
    if (_opts.fill) {
      this.ctx.fillStyle = _opts.background
      this.ctx.fill()
    }
    if (_opts.stroke) {
      console.log('borderColor', _opts)
      this.ctx.strokeStyle = _opts.borderColor
      this.ctx.stroke();
    }
    if (_opts.clip) {
      this.ctx.clip()
    }
    return this;
  }
  /**
   * @function drawQrCode
   * @description 绘制二维码
   * @param {*} [opts={}]
   * @returns this
   * @memberof Graffiti
   */
  drawQrCode(opts = {}) {
    let _opts = {
      left: 0, // 坐标x
      top: 0, // 坐标y
      width: 200, // 二维码全部宽度
      height: 200, // 二维码全部高度
      border: 20, // 是否显示边框
      borderColor: "#ffffff",
      background: "#ffffff", // 背景
      color: "#000000", // 二维码颜色
      radius: [0, 0, 0, 0], // 边框圆角
      text: "Hello Graffiti", // 二维码内容
      correctLevel: QRCode.CorrectLevel.Q, // 容错等级
      style: 'square'
    }
    opts.correctLevel = opts.correctLevel && QRCode.CorrectLevel[opts.correctLevel] || QRCode.CorrectLevel.Q;
    Object.assign(_opts, opts.style)
    _opts.text = opts.text
    _opts.width = parseFloat(_opts.width)
    _opts.height = parseFloat(_opts.height)
    _opts.left = parseFloat(_opts.left)
    _opts.top = parseFloat(_opts.top)
    _opts.border = parseFloat(_opts.border)
    _opts.radius = utils.formatRadius(_opts)
    this.ctx.save();
    this.drawRect({
      left: _opts.left,
      top: _opts.top,
      width: _opts.width,
      height: _opts.height,
      border: _opts.border,
      borderColor: _opts.borderColor,
      background: _opts.background,
      radius: _opts.radius,
      stroke: true,
      clip: true
    })
    _opts.width = _opts.width - _opts.border
    _opts.height = _opts.height - _opts.border
    _opts.left = _opts.left + _opts.border / 2
    _opts.top = _opts.top + _opts.border / 2
    var qrCode = new QRCode({
      text: _opts.text,
      width: _opts.width,
      height: _opts.height,
      colorDark: _opts.color,
      colorLight: _opts.background,
      correctLevel: _opts.correctLevel
    });
    let qrCodeData = qrCode.getQrData();
    let nCount = qrCodeData.length;
    var nWidth = _opts.width / nCount;
    var nHeight = _opts.height / nCount;
    // 设置二维码色块
    this.ctx.fillStyle = _opts.color;
    for (var row = 0; row < nCount; row++) {
      for (var col = 0; col < nCount; col++) {
        if (qrCodeData[row][col]) {
          // 只绘制1的色块
          var nLeft = _opts.left + col * nWidth;
          var nTop = _opts.top + row * nHeight;
          if (_opts.style === 'circle') {
            this.ctx.beginPath();
            let r = nWidth / 2;
            this.ctx.arc(nLeft + r, nTop + r, r, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.closePath()
          } else if (_opts.style === 'square') {
            this.ctx.fillRect(nLeft, nTop, nWidth, nHeight);
          } else {
            throw new Error('qrCode style is error')
            break;
          }
        }
      }
    }
    this.ctx.restore();
    return this;
  }
}

export default Graffiti