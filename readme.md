## Graffiti-wx

> 多端 canvas 海报绘制插件

### 预览图

![](https://image.jqstudy.cn/pic/20210714185043.png)

### 使用方法

```javascript
import Graffiti from './libs/graffiti.core'
const graffiti = new Graffiti(
  {
    canvasId: this.data.canvasId,
  },
  this
).init(config)
```
配置项：
```json
{
  "width": "654px",
  "height": "1010px",
  "background": "#f5f5f5",
  "views": [
    {
      "type": "qrcode",
      "text": "https://developers.weixin.qq.com/",
      "style": {
        "color": "#333333",
        "background": "#ffffff",
        "border": "15px",
        "borderColor": "#ffffff",
        "width": "200px",
        "height": "200px",
        "top": "779px",
        "left": "29px",
        "rotate": "0",
        "style": "square"
      }
    }
  ]
}
```

### 二次开发
```bash
git clone https://e.coding.net/ovenslover/tecs/graffiti.git
cd graffiti
# 打开微信开发工具并导入
```

### 开源协议
[MIT License](./LICENSE.md)

### 参考文档
1. https://github.com/Kujiale-Mobile/Painter
2. https://github.com/davidshimjs/qrcodejs
3. https://github.com/tomfriwel/weapp-qrcode
4. https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API
