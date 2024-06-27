import * as util from "../utils/util"
import { Event } from "./data_event"

export class Task {
  taskId: string
  title: string = ""
  createTime: string = util.formatDate(new Date())  // 创建时间
  modifyTime: string = util.formatDate(new Date())  // 修改时间

  eventIdList: Array<string> = []
  eventList: Array<Event> = []

  constructor(taskId: string) {
    this.taskId = taskId
  }
}