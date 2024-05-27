
export class Event {
  eventId: string = "1";           // 事件id
  eventTitle: string = "123";        // 标题
  eventTime: Date = new Date()    // 时间
  eventTotal: number = 10          // 大于0表示累计
  eventCentent: Array<EventCententItem> = []       // 内容

  taskId?: string;  // 活动id，多个事件可以参与一个活动。活动id为0，表示未参与活动。
  taskTitle?: string;  // 活动标题 

  showTime: string
  constructor() {
    this.showTime = this.eventTime.getFullYear() + "/" + (this.eventTime.getMonth() + 1) + "/" + this.eventTime.getDate()
  }
}

export class EventCententItemExtend {
  type: number = 1;   // 当type=1，index=4时，表示反驳中最好、最坏、最可能
  centent: Array<string> = []
}

export class EventCententItem {
  type: number = 1;   // 1、表示ABCDE；2、待定
  index: number = 1;  // item索引，当type为1时，索引表示ABCDE
  text: string = "";   // item内容
  extend?: EventCententItemExtend
}