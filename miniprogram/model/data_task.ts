import { formatDate } from "../utils/util"

export class Task {
  taskId: number = 0;                // 事件id
  taskTitle: string = "";         // 标题
  taskTime: string = formatDate(new Date())             // 时间
  taskTotal: number = 0                       // 大于0表示累计
  taskContent: Array<TaskContentItem> = []       // 内容
}

export class TaskContentItem {
  type: number = 1;   // 1、表示ABCDE；2、待定
  index: number = 1;  // item索引，当type为1时，索引表示ABCDE
  content: string = "";   // item内容
  extend?: TaskContentItemExtend
}

export class TaskContentItemExtend {
  type: number = 1;   // 当type=1，index=4时，表示反驳中最好、最坏、最可能
  centent: Array<string> = []
}

