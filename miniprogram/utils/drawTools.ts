type CRC2D = WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D;
type Canvas = WechatMiniprogram.Canvas

export class DrawTools {
  canvas: Canvas
  width: number
  height: number
  ctx: CRC2D

  /**
   * 
   * @param canvas Canvas对象
   * @param width  画布的实际绘制宽
   * @param height  画布的实际绘制高
   */
  constructor(canvas:Canvas, width:number, height:number){
    this.canvas = canvas
    this.width = width
    this.height = height

    // 渲染上下文
    this.ctx = canvas.getContext('2d')

    // 初始化画布大小
    const dpr = wx.getWindowInfo().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    this.ctx.scale(dpr, dpr)
  }

  clearRect() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawText(text:string, x:number, y:number, color:string = "#000000", fontSize:number = 12) {
    this.ctx.fillStyle = color
    this.ctx.textBaseline = 'top'
    this.ctx.font = `${fontSize}px PingFangSC-Semibold, PingFang SC`
    this.ctx.fillText(text, x, y)
  }
  
  ellipsisText(text:string, limit:number = 20) {
    if (!text) {
      return ''
    }
    
    if (text.length > limit) {
      return `${text.substring(0, limit)}...`
    } else {
      return text
    }
  }
  
  drawDashedLine (startX:number, startY:number, endX:number, endY:number, 
    dashArray: Array<number> = [8, 8], color:string = '#D8D8D8', lineWidth:number = 2) {
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = color
    this.ctx.beginPath()
    this.ctx.setLineDash(dashArray) // 两个值为实处的宽度和虚处的宽度,为数组
    this.ctx.moveTo(startX, startY)
    this.ctx.lineTo(endX, endY)
    this.ctx.stroke()
  }
  
  drawFillRoundRect(x:number, y:number, width:number, height:number, radius:number, fillColor:string = '#000') {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) {
      return
    }
  
    this.ctx.save()
    this.ctx.translate(x, y)
    //绘制圆角矩形的各个边
    this.drawRoundRectPath(width, height, radius)
    this.ctx.fillStyle = fillColor
    this.ctx.fill()
    this.ctx.restore()
  }
  
  drawRoundRectPath(width:number, height:number, radius:number = 0) {
    this.ctx.beginPath()
    //从右下角顺时针绘制，弧度从0到1/2PI
    this.ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
  
    //矩形下边线
    this.ctx.lineTo(radius, height)
  
    //左下角圆弧，弧度从1/2PI到PI
    this.ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
  
    //矩形左边线
    this.ctx.lineTo(0, radius)
  
    //左上角圆弧，弧度从PI到3/2PI
    this.ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2)
  
    //上边线
    this.ctx.lineTo(width - radius, 0)
  
    //右上角圆弧
    this.ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2)
  
    //右边线
    this.ctx.lineTo(width, height - radius)
    this.ctx.closePath()
  }
  
  drawImage(src:string, width:number, height:number, x:number = 0, y:number = 0, opacity:number = 1) {
    return new Promise((resolve, reject) => {
      const img = this.canvas.createImage()
      img.src = src
      img.onload = () => {
        let ctx = this.canvas.getContext('2d')
        ctx.globalAlpha = opacity
        ctx.drawImage(img, x, y, width, height)
        ctx.globalAlpha = 1
        resolve(true)
      }
      img.onerror = () => {
        reject()
      }
    })
  }
  
  canvasToTempFilePath ():Promise<string> {
    return new Promise((resolve, reject) => {
      // 生成图片
      wx.canvasToTempFilePath({
        canvas:this.canvas,
        success: (res) => {
          // 生成的图片临时文件路径
          const tempFilePath = res.tempFilePath
          resolve(tempFilePath)
        },
        fail: (err) => {
          console.log(err)
          reject(err)
        },
      })
    })
  }
}

