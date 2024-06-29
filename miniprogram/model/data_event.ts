import * as util from "../utils/util"

export enum TaskState {
  TaskStateDefault = 0,
  TaskStateShow = 1,    // 展示打卡内容
  TaskStateEdit = 2,    // 创建-编辑打卡
  TaskStateMore = 3     // 再次打卡
}

/**
 * 事件，每个事件对应一个任务，一个任务可以有多个事件
 */
export class Event {
  taskId: string  // 任务ID
  eventId: string // 事件ID
  
  title: string = "";         // 标题
  date: string = util.formatDate(new Date())
  total: number = 1           // 累计打卡天数                   
  content: Array<EventContentItem> = []       // 内容

  createTime: Date = new Date() // 创建时间
  modifyTime: Date = new Date() // 修改时间
  
  constructor(eventId: string, taskId?: string) {
    this.eventId = eventId
    this.taskId = taskId ?? util.generateUniqueId()
    // 5个占位，如果不占位，后面如果不按照顺序输入，无法保存数据
    for (var i = 0; i < 5; i++) {
      var item = new EventContentItem()
      this.content.push(item)
    }
  }
}

export class EventContentItem {
  type: number = 1;   // 1、表示ABCDE；2、待定
  index: number = 1;  // item索引，当type为1时，索引表示ABCDE
  content: string = "";   // item内容
  extend?: EventContentItemExtend
}

export class EventContentItemExtend {
  type: number = 1;   // 当type=1，index=4时，表示反驳中最好、最坏、最可能
  centent: Array<string> = []
}
