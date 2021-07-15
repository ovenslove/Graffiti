## Graffiti-wx

> 多端 canvas 海报绘制插件

### 预览图

![img](https://image.jqstudy.cn/pic/20210714185043-20210715150335129.png)

### 使用方法

```javascript
import Graffiti from './libs/graffiti.core'
const graffiti = new Graffiti(canvasId, this).init(config)
```

### 配置项

1. Graffiti.init(config)

   > 初始化配置

   | 参数       | 是否必须 | 默认值  | 说明                         | 最低版本 |
   | ---------- | -------- | ------- | ---------------------------- | -------- |
   | width      | 是       | 750px   | 图片宽度（一般为设计稿宽度） |          |
   | height     | 是       | 1000px  | 图片高度（一般为设计稿高度） |          |
   | background | 否       | #FFFFFF | 背景色                       |          |
   | radius     | 否       | 0px     | 图片圆角                     |          |

2. Graffiti.drawLine(config)

   > 绘制线条

   | 参数           | 是否必须 | 默认值  | 说明                                                         | 最低版本 |
   | -------------- | -------- | ------- | ------------------------------------------------------------ | -------- |
   | left           | 是       | 0px     | X坐标（起始点）                                              |          |
   | top            | 是       | 0px     | Y坐标（起始点）                                              |          |
   | toLeft         | 是       | 0px     | X坐标（结束点）                                              |          |
   | toTop          | 是       | 0px     | Y坐标（结束点）                                              |          |
   | width          | 是       | 750px   | 图片宽度（一般为设计稿宽度）                                 |          |
   | height         | 是       | 1000px  | 图片高度（一般为设计稿高度）                                 |          |
   | color          | 否       | #333333 | 线条颜色                                                     |          |
   | lineType       | 否       | line    | 线条样式【line, dash】                                       |          |
   | lineCap        | 否       | butt    | 线条端点样式【butt, round , square】                         |          |
   | lineJoin       | 否       | miter   | 线条交接处样式【round, bevel ,miter】                        |          |
   | lineDash       | 否       | [5, 5]  | 虚线偏样式 [官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash) |          |
   | lineDashOffset | 否       | 10      | 虚线偏移量[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset) |          |

3. Graffiti.drawHollow(config)

   > 绘制镂空
   >
   > 镂空区域要晚于目标图层调用，详情参考 [官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

   | 参数   | 是否必须 | 默认值 | 说明  | 最低版本 |
   | ------ | -------- | ------ | ----- | -------- |
   | left   | 是       | 0px    | X坐标 |          |
   | top    | 是       | 0px    | Y坐标 |          |
   | width  | 是       | 30px   | 宽度  |          |
   | height | 是       | 30px   | 高度  |          |
   | radius | 否       | 0px    | 圆角  |          |

4. Graffiti.drawImage(config)

   > 绘制图片

   | 参数       | 是否必须 | 默认值      | 说明                         | 最低版本 |
   | ---------- | -------- | ----------- | ---------------------------- | -------- |
   | url        | 是       | ''          | 图片地址                     |          |
   | left       | 是       | 0px         | X坐标                        |          |
   | top        | 是       | 0px         | Y坐标                        |          |
   | width      | 是       | 30px        | 宽度                         |          |
   | height     | 是       | 30px        | 高度                         |          |
   | radius     | 否       | 0px         | 圆角                         |          |
   | background | 否       | #f5f5f5     | 背景色                       |          |
   | rotate     | 否       | 0deg        | 旋转角度(开发中)             |          |
   | mode       | 否       | scaleToFill | 图片裁剪、缩放的模式(开发中) |          |

   **mode 的合法值**

   | 值           | 说明                                                         | 最低版本 |
   | :----------- | :----------------------------------------------------------- | :------- |
   | scaleToFill  | 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 |          |
   | aspectFit    | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |          |
   | aspectFill   | 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |          |
   | widthFix     | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变         |          |
   | heightFix    | 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变         |          |
   | top          | 裁剪模式，不缩放图片，只显示图片的顶部区域                   |          |
   | bottom       | 裁剪模式，不缩放图片，只显示图片的底部区域                   |          |
   | center       | 裁剪模式，不缩放图片，只显示图片的中间区域                   |          |
   | left         | 裁剪模式，不缩放图片，只显示图片的左边区域                   |          |
   | right        | 裁剪模式，不缩放图片，只显示图片的右边区域                   |          |
   | top left     | 裁剪模式，不缩放图片，只显示图片的左上边区域                 |          |
   | top right    | 裁剪模式，不缩放图片，只显示图片的右上边区域                 |          |
   | bottom left  | 裁剪模式，不缩放图片，只显示图片的左下边区域                 |          |
   | bottom right | 裁剪模式，不缩放图片，只显示图片的右下边区域                 |          |

   

5. Graffiti.drawText(config)

   > 绘制文本

   | 参数         | 是否必须 | 默认值    | 说明                                      | 最低版本 |
   | ------------ | -------- | --------- | ----------------------------------------- | -------- |
   | text         | 是       | 默认文本  | 需要绘制的文本内容                        |          |
   | left         | 是       | 0px       | X坐标                                     |          |
   | top          | 是       | 0px       | Y坐标                                     |          |
   | fontSize     | 否       | 32px      | 字号大小                                  |          |
   | fontFamily   | 否       | webfontzk | 字体                                      |          |
   | color        | 否       | #333333   | 字体颜色                                  |          |
   | maxWidth     | 否       | 200       | 最大宽度，超过宽度会换行                  |          |
   | maxLines     | 否       | 4         | 最大行数，超过行数，最后一行添加省略号... |          |
   | textAlign    | 否       | left      | 文字左右对其方式                          |          |
   | textBaseline | 否       | top       | 文字上下对其方式                          |          |
   | lineHeight   | 否       | 40px      | 行间距                                    |          |

6. Graffiti.drawRect(config)

   > 绘制矩形

   | 参数        | 是否必须 | 默认值  | 说明         | 最低版本 |
   | ----------- | -------- | ------- | ------------ | -------- |
   | left        | 是       | 0px     | X坐标        |          |
   | top         | 是       | 0px     | Y坐标        |          |
   | width       | 是       | 300     | 宽度         |          |
   | height      | 是       | 500     | 高度         |          |
   | radius      | 否       | 0px     | 圆角         |          |
   | border      | 否       | 0       | 边框宽度     |          |
   | borderColor | 否       | #FFFFFF | 边框颜色     |          |
   | background  | 否       | #FFFFFF | 背景色       |          |
   | hollow      | 否       | false   | 是否镂空     |          |
   | fill        | 否       | true    | 是否填充     |          |
   | stroke      | 否       | false   | 是否绘制边框 |          |
   | clip        | 否       | false   | 是否裁切     |          |

7. Graffiti.drawQrCode(config)

   > 绘制二维码

   | 参数         | 是否必须 | 默认值         | 说明                      | 最低版本 |
   | ------------ | -------- | -------------- | ------------------------- | -------- |
   | text         | 是       | Hello Graffiti | 二维码内容                |          |
   | left         | 是       | 0px            | X坐标                     |          |
   | top          | 是       | 0px            | Y坐标                     |          |
   | width        | 是       | 300            | 宽度                      |          |
   | height       | 是       | 500            | 高度                      |          |
   | radius       | 否       | 0px            | 圆角                      |          |
   | border       | 否       | 0              | 边框宽度                  |          |
   | borderColor  | 否       | #FFFFFF        | 边框颜色                  |          |
   | background   | 否       | #FFFFFF        | 背景色                    |          |
   | correctLevel | 否       | Q              | 二维码纠错等级【L,M,Q,H】 |          |
   | style        | 否       | square         | 二维码点阵样式            |          |

8. Graffiti.getDrawData()

   > 获取画板数据（开发中）

### 二次开发

```bash
git clone https://e.coding.net/ovenslover/tecs/graffiti.git
cd graffiti
# 打开微信开发工具并导入
```

### 开源协议

[MIT License](.i/LICENSE.md)

### 参考文档

1. https://github.com/Kujiale-Mobile/Painter
2. https://github.com/davidshimjs/qrcodejs
3. https://github.com/tomfriwel/weapp-qrcode
4. https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API