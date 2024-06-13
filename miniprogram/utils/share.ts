import { Task } from '../model/data_task'
import { DrawTools } from './drawTools'

export function shareABCDEMessage(data:Task, from?:string, target?:string):Promise<WechatMiniprogram.Page.ICustomShareContent> {
  if (from === 'button') {
    // 来自页面内转发按钮
    console.log(target)
  }
  return new Promise((resolve, reject) => {
    initABCDECanvas(data).then((res:string)=>{
      resolve({
        title: `${data.taskTitle} ——第${data.taskTotal}天`,
        path: '/page/task/task',
        imageUrl: res
      })
    }).catch((err:object)=>{
      reject(err)
    })
  })
}

export function shareTimeline() {
  return {
    title: '自定义转发标题',
    query: 'id=123'
  }
}

/**
* 绘制ABCDE分享图片
* @param {*} data
* @returns
*/
export function initABCDECanvas(data:Task): Promise<string> {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery()
      .select('#myCanvas') // 在 WXML 中填入的 id
      .fields({ node: true, size: true })
      .exec(async (res) => {
        try {
          let draw = new DrawTools(res[0].node, res[0].width, res[0].height)

          // 清空画布
          draw.clearRect()
          
          let pic = '/static/welcome_icon.png'
          // 绘制背景图
          await draw.drawImage(pic, 400, 400, 100, 0, 0.1)

          // 标题
          // draw.drawText(data.taskTitle, 16, 16, '#93D2F3', 36)
          // draw.drawText(`${data.taskCreateTime}  打卡第${data.taskTotal}天`, 300, 36, '#9A9A9A', 12)

          let fontSize = 28
          let offsetX = 12
          let offsetY = 12
          draw.drawText("A:事情", offsetX, offsetY, '#F6685D', fontSize)

          offsetY += 38
          draw.drawText(data.taskContent[0].content, offsetX, offsetY, '#333333', fontSize)
          
          offsetY += 38
          draw.drawText("B:想法", offsetX, offsetY, '#F5BA18', fontSize)
          
          offsetY += 38
          draw.drawText(data.taskContent[1].content, offsetX, offsetY, '#333333', fontSize)

          offsetY += 38
          draw.drawText("C:情绪", offsetX, offsetY, '#618DFF', fontSize)

          offsetY += 38
          draw.drawText(data.taskContent[2].content, offsetX, offsetY, '#333333', fontSize)
          
          offsetY += 38
          draw.drawText("D:反驳", offsetX, offsetY, '#2BA471', fontSize)
          
          offsetY += 38
          draw.drawText(data.taskContent[3].content, offsetX, offsetY, '#333333', fontSize)
          
          offsetY += 38
          draw.drawText("E:激发", offsetX, offsetY, '#FF79CD', fontSize)
          
          offsetY += 38
          draw.drawText(data.taskContent[4].content, offsetX, offsetY, '#333333', fontSize)

          draw.drawText(`${data.taskCreateTime} 打卡第${data.taskTotal}天`, 350, 370,'#9A9A9A', 12)

          // 最终生成文件地址
          const imageurl = await draw.canvasToTempFilePath()
          console.log(imageurl)
          resolve(imageurl)
        } catch (error) {
          reject(error)
        }
      })
  })
}

export function initShareTask(task:Task): Promise<string> {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery()
      .select('#myCanvas') // 在 WXML 中填入的 id
      .fields({ node: true, size: true })
      .exec(async (res) => {
        try {
          let draw = new DrawTools(res[0].node, res[0].width, res[0].height)

          // 清空画布
          draw.clearRect()
          
          // 文字
          draw.drawText(task.taskTitle, 0, 0, '#FF0000')
          draw.drawText(task.taskTitle, 0, 0, '#FF0000')
          draw.drawText(task.taskTitle, 0, 0, '#FF0000')

          // 最终生成文件地址
          const imageurl = await draw.canvasToTempFilePath()
          console.log(imageurl)
          resolve(imageurl)
        } catch (error) {
          reject(error)
        }
      })
  })
}