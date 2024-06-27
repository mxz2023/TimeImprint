import * as util from "../utils/util"

/**
 * 任务，每个任务对应多个事件，一个事件可以有一个任务
 */

export class Task {
  taskId: string
  title: string = ""
  createTime: string = util.formatDate(new Date())  // 创建时间
  modifyTime: string = util.formatDate(new Date())  // 修改时间

  total: number = 0
  eventIdList: Array<string> = []

  constructor(taskId: string) {
    this.taskId = taskId
  }
}