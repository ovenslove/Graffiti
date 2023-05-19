// libs/graffiti/graffiti.js
import _ from '../../libs/graffiti/graffiti.utils'
import Graffiti from '../../libs/graffiti/graffiti.core'
import demoData from './data/data1'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      value: null
    },
    canvasId: {
      type: String,
      value: 'graffitiCanvas'
    },
    type: {
      type: String,
      value: '2d'
    },
    width: {
      type: Number,
      value: 350
    },
    height: {
      type: Number,
      value: 500
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    graffiti: null,
    defaultConfig: demoData,
  },
  // 数据监听器
  observers: {},
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    // 在组件实例刚刚被创建时执行	-	1.6.3
    created() {},
    // 在组件实例进入页面节点树时执行-	1.6.3
    attached: function () {
      console.log('graffiti-加载成功')
      this.setData({
        graffiti: new Graffiti({
          canvasId: this.data.canvasId,
          debug: true
        }, this).init(this.data.defaultConfig)
      })
      this.data.graffiti.onReady(() => {
        console.log('onReady', this.data.graffiti)

      })
      this.data.graffiti.onDraw(() => {
        console.log('onDraw')
      });
    },
    // 在组件在视图层布局完成后执行	-	1.6.3
    ready() {},
    // 在组件实例被移动到节点树另一个位置时执行	-	1.6.3
    moved: function () {},
    // 在组件实例被从页面节点树移除时执行 -	1.6.3
    detached: function () {},
    // 每当组件方法抛出错误时执行	-2.4.1
    error() {}
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCreateWaterMark() {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          let left = i * 200
          let top = j * 200
          this.data.graffiti.drawText({
            "type": "text",
            "text": "黄嘉杰1234",
            "style": {
              "left": left + "px",
              "top": top + "px",
              "width": "200px",
              "textIndent": "0",
              "maxLines": "1",
              "fontSize": "32px",
              "fontFamily": "PingFangSC-Regular, PingFang SC",
              "fontWeight": "500",
              "color": "#ffffff",
              "lineHeight": "22px",
              "textAlign": "left",
              "textBaseline": "top",
              "rotate": Math.random() * 100,
            }
          })
        }
      }

    },
    handleSaveImage(e) {
      this.data.graffiti.getImageUrl().then(res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res)
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {},
              fail: () => {},
              complete: () => {}
            });
          },
          fail(err) {
            console.log(err)
          },
          complete() {}
        })
      })
    }
  }
})