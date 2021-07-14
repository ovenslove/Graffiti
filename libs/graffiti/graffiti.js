// libs/graffiti/graffiti.js
import _ from './libs/graffiti.utils'
import Graffiti from './libs/graffiti.core'
import demoData from './data/data'
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
      value: 580
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    graffiti: null,
    defaultConfig: {},
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
        }, this).init(this.data.config || demoData)
      })
      console.log(this.data.graffiti)
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

  }
})