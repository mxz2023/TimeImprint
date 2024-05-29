import { formatDate } from "../utils/util"

export class Event {
  eventId: number = 0;                // 事件id
  eventTitle: string = "";         // 标题
  eventTime: string = formatDate(new Date())             // 时间
  eventTotal: number = 0                       // 大于0表示累计
  eventContent: Array<EventContentItem> = []       // 内容

  taskId?: string;  // 活动id，多个事件可以参与一个活动。活动id为0，表示未参与活动。
  taskTitle?: string;  // 活动标题 
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

