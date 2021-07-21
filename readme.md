## Graffiti-wx

> 微信小程序 canvas 海报绘制插件

### 版本更新

* v1.0.1
  * 完成基本功能开发
  * 更新文档说明

### 预览图

![预览图](https://image.jqstudy.cn/pic/preview-1.png)

### 使用方法

```javascript
import Graffiti from './libs/graffiti.core'
const graffiti = new Graffiti({
  canvasId:"graffitiCanvas",
  debug:true
}, this).init(config)
// Graffiti初始化参数-加载完成
this.data.graffiti.onReady(() => {
  console.log('onReady')
})
// Graffiti初始化参数-绘制完成
this.data.graffiti.onDrew(() => {
  console.log('onDrew')
});
```

### 配置项

1. Graffiti.init(config)

   > 初始化配置

   | 参数       | 是否必须 | 默认值  | 说明                                                         | 最低版本 |
   | ---------- | -------- | ------- | ------------------------------------------------------------ | -------- |
   | width      | 是       | 750px   | 图片宽度（一般为设计稿宽度）画布实际宽度（width * dpr）最大4096px | v1.0.1   |
   | height     | 是       | 1000px  | 图片高度（一般为设计稿高度）画布实际高度（height * dpr）最大4096px | v1.0.1   |
   | background | 否       | #FFFFFF | 背景色                                                       | v1.0.1   |
   | radius     | 否       | 0px     | 图片圆角                                                     | v1.0.1   |
   | views      | 是       | []      | 画板元素列表                                                 | v1.0.1   |

   ```json
   {
     "width": "320px",
     "height": "375px",
     "background": "#eeeeee",
     "radius": "0px 12px 0px 0px",
     "views": []
   }
   ```

   

2. Graffiti.drawLine(config)

   > 绘制线条

   | 参数           | 是否必须 | 默认值  | 说明                                                         | 最低版本 |
   | -------------- | -------- | ------- | ------------------------------------------------------------ | -------- |
   | left           | 是       | 0px     | X坐标（起始点）                                              | v1.0.1   |
   | top            | 是       | 0px     | Y坐标（起始点）                                              | v1.0.1   |
   | toLeft         | 是       | 0px     | X坐标（结束点）                                              | v1.0.1   |
   | toTop          | 是       | 0px     | Y坐标（结束点）                                              | v1.0.1   |
   | width          | 是       | 750px   | 图片宽度（一般为设计稿宽度）                                 | v1.0.1   |
   | height         | 是       | 1000px  | 图片高度（一般为设计稿高度）                                 | v1.0.1   |
   | color          | 否       | #333333 | 线条颜色                                                     | v1.0.1   |
   | lineType       | 否       | line    | 线条样式【line, dash】                                       | v1.0.1   |
   | lineCap        | 否       | butt    | 线条端点样式【butt, round , square】                         | v1.0.1   |
   | lineJoin       | 否       | miter   | 线条交接处样式【round, bevel ,miter】                        | v1.0.1   |
   | lineDash       | 否       | [5, 5]  | 虚线偏样式 [官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash) | v1.0.1   |
   | lineDashOffset | 否       | 10      | 虚线偏移量[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset) | v1.0.1   |

   ```json
   {
       "type": "line",
       "style": {
           "lineWidth": 4,
           "left": "30px",
           "top": "520px",
           "toLeft": "624px",
           "toTop": "520px",
           "color": "#dddddd",
           "lineType": "dash",
           "lineCap": "butt",
           "lineJoin": "miter",
           "lineDash": [
               5,
               15
           ],
           "lineDashOffset": 10
       }
   }
   ```

   

3. Graffiti.drawHollow(config)

   > 绘制镂空
   >
   > 镂空区域要晚于目标图层调用，详情参考 [官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

   | 参数   | 是否必须 | 默认值 | 说明  | 最低版本 |
   | ------ | -------- | ------ | ----- | -------- |
   | left   | 是       | 0px    | X坐标 | v1.0.1   |
   | top    | 是       | 0px    | Y坐标 | v1.0.1   |
   | width  | 是       | 30px   | 宽度  | v1.0.1   |
   | height | 是       | 30px   | 高度  | v1.0.1   |
   | radius | 否       | 0px    | 圆角  | v1.0.1   |

   ```json
   {
       "type": "hollow",
       "style": {
           "width": "40px",
           "height": "40px",
           "top": "500px",
           "left": "-20px",
           "rotate": "0",
           "radius": "20px 20px 20px 20px"
       }
   }
   ```

   

4. Graffiti.drawImage(config)

   > 绘制图片

   | 参数         | 是否必须 | 默认值              | 说明                                         | 最低版本 |
   | ------------ | -------- | ------------------- | -------------------------------------------- | -------- |
   | url          | 是       | ''                  | 图片地址                                     | v1.0.1   |
   | left         | 是       | 0px                 | X坐标                                        | v1.0.1   |
   | top          | 是       | 0px                 | Y坐标                                        | v1.0.1   |
   | width        | 是       | 30px                | 宽度                                         | v1.0.1   |
   | height       | 是       | 30px                | 高度                                         | v1.0.1   |
   | border       | 否       | 0px                 | 边框宽度（边框宽度不占用图片大小，为外包裹） | v1.0.1   |
   | borderColor  | 否       | #FFFFFF             | 边框颜色                                     | v1.0.1   |
   | radius       | 否       | 0px                 | 圆角                                         | v1.0.1   |
   | background   | 否       | #f5f5f5             | 背景色                                       | v1.0.1   |
   | boxShadow    | 否       | 0px 0px 0px #FFFFFF | 阴影颜色                                     | v1.0.2   |
   | rotate       | 否       | 0deg                | 旋转角度(开发中)                             |          |
   | rotateOrigin | 否       | center center       | 旋转中心(开发中)                             |          |
   | mode         | 否       | scaleToFill         | 图片裁剪、缩放的模式(开发中)                 |          |

   ```json
   {
       "type": "image",
       "url": "https://image.jqstudy.cn/pic/gh_f8afd9ebaa61_430.jpg",
       "style": {
           "left": "229px",
           "top": "268px",
           "width": "71px",
           "height": "71px",
           "background": "#F6F6F6",
           "border": "1px",
           "borderColor": "#D4D4D6",
           "radius": "40px",
         	"background": "#ffffff"
       }
   }
   ```

   

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
   | text         | 是       | 默认文本  | 需要绘制的文本内容                        | v1.0.1   |
   | left         | 是       | 0px       | X坐标                                     | v1.0.1   |
   | top          | 是       | 0px       | Y坐标                                     | v1.0.1   |
   | fontSize     | 否       | 32px      | 字号大小                                  | v1.0.1   |
   | fontFamily   | 否       | webfontzk | 字体                                      | v1.0.1   |
   | fontWeight   | 否       | 500       | 支持100-900,normal,bold,bolder,lighter    | v1.0.1   |
   | color        | 否       | #333333   | 字体颜色                                  | v1.0.1   |
   | width        | 否       | 200       | 最大宽度，超过宽度会换行                  | v1.0.1   |
   | maxLines     | 否       | 4         | 最大行数，超过行数，最后一行添加省略号... | v1.0.1   |
   | textIndent   | 否       | 0         | 首行偏移（以中文汉字为单位）              | v1.0.1   |
   | textAlign    | 否       | left      | 文字左右对其方式                          | v1.0.1   |
   | textBaseline | 否       | top       | 文字上下对其方式                          | v1.0.1   |
   | lineHeight   | 否       | 40px      | 行间距                                    | v1.0.1   |

   ```json
   {
       "type": "text",
       "text": "直播的话术请运营后台进行配置分享出去哦~",
       "style": {
           "left": "20px",
           "top": "268px",
           "width": "192px",
           "textIndent": "2",
           "maxLines": "2",
           "fontSize": "16px",
           "fontFamily": "PingFangSC-Regular, PingFang SC",
           "fontWeight": "500",
           "color": "#262626",
           "lineHeight": "22px",
         	"textAlign": "left",
         	"textBaseline": "top"
       }
   }
   ```

   

6. Graffiti.drawRect(config)

   > 绘制矩形

   | 参数        | 是否必须 | 默认值              | 说明     | 最低版本 |
   | ----------- | -------- | ------------------- | -------- | -------- |
   | left        | 是       | 0px                 | X坐标    | v1.0.1   |
   | top         | 是       | 0px                 | Y坐标    | v1.0.1   |
   | width       | 是       | 300                 | 宽度     | v1.0.1   |
   | height      | 是       | 500                 | 高度     | v1.0.1   |
   | radius      | 否       | 0px                 | 圆角     | v1.0.1   |
   | border      | 否       | 0                   | 边框宽度 | v1.0.1   |
   | borderColor | 否       | #FFFFFF             | 边框颜色 | v1.0.1   |
   | background  | 否       | #FFFFFF             | 背景色   | v1.0.1   |
   | boxShadow   | 否       | 0px 0px 0px #FFFFFF | 阴影颜色 | v1.0.2   |

   ```json
   {
       "type": "rect",
       "style": {
           "left": "20px",
           "top": "268px",
           "width": "28px",
           "height": "16px",
           "radius": "1px 5px 1px 1px",
         	"border": "0px",
         	"borderColor": "#FFFFFF",
           "background": "#D6AD80"
       }
   }
   ```

   

7. Graffiti.drawQrCode(config)

   > 绘制二维码

   | 参数         | 是否必须 | 默认值         | 说明                             | 最低版本 |
   | ------------ | -------- | -------------- | -------------------------------- | -------- |
   | text         | 是       | Hello Graffiti | 二维码内容                       | v1.0.1   |
   | left         | 是       | 0px            | X坐标                            | v1.0.1   |
   | top          | 是       | 0px            | Y坐标                            | v1.0.1   |
   | width        | 是       | 300            | 宽度                             | v1.0.1   |
   | height       | 是       | 500            | 高度                             | v1.0.1   |
   | color        | 否       | #000000        | 二维码颜色                       | v1.0.1   |
   | logoUrl      | 否       | 空             | 二维码中心图标（默认比例0.3）    | v1.0.1   |
   | radius       | 否       | 0px            | 圆角                             | v1.0.1   |
   | border       | 否       | 0              | 边框宽度                         | v1.0.1   |
   | borderColor  | 否       | #FFFFFF        | 边框颜色                         | v1.0.1   |
   | background   | 否       | #FFFFFF        | 背景色                           | v1.0.1   |
   | correctLevel | 否       | Q              | 二维码纠错等级【L,M,Q,H】        | v1.0.1   |
   | style        | 否       | square         | 二维码点阵样式（square，circle） | v1.0.1   |

   ```json
   {
       "type": "qrcode",
       "text": "https://developers.weixin.qq.com/community/develop/doc/000804d9df47b0dea489005d656800",
       "logoUrl": "https://image.jqstudy.cn/pic/964008bc05bd48478327b18cce5dc99f.gif",
       "style": {
           "top": "779px",
           "left": "29px",
           "width": "200px",
           "height": "200px",
           "color": "red",
           "background": "#ffffff",
           "border": "10px",
           "borderColor": "#ffffff",
           "radius": "10px",
         	"correctLevel": "Q",
           "style": "circle",
       }
   }
   ```

   

8. Graffiti.getDrewData()

   > 获取画板数据
   
   | 参数    | 是否必须 | 默认值 | 说明         | 最低版本 |
   | ------- | -------- | ------ | ------------ | -------- |
   | quality | 是       | 1      | 图片输出质量 | v1.0.1   |
   
   ```js
    const imageData = this.data.graffiti.getDrewData(1)
   ```
   
   
   
9. Graffiti.getDrewData()

   > 获取图片临时地址

   ```js
       handleSaveImage(e) {
         this.data.graffiti.getImageUrl().then(res => {
           wx.saveImageToPhotosAlbum({
             filePath: res.tempFilePath,
             success(res) {
               console.log(res)
               wx.showToast({
                 title: '保存成功',
                 icon: 'success'
               });
             },
             fail(err) {
               console.log(err)
             },
             complete() {}
           })
         })
       }
   ```

### 二次开发

```bash
git clone https://github.com/ovenslove/Graffiti.git
cd graffiti
# 打开微信开发工具并导入
```

### 开源协议

```markdown
The MIT License (MIT)

Copyright (c) 2021 ovenslove

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 参考文档

1. https://github.com/Kujiale-Mobile/Painter
2. https://github.com/davidshimjs/qrcodejs
3. https://github.com/tomfriwel/weapp-qrcode
4. https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API