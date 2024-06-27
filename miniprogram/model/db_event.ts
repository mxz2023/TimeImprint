
import { Event } from "./data_event";
import * as util from "../utils/util"

export interface DBEvent{
  eventId: string
  taskId: string

  title: string
  createTime: Date
  modifyTime: Date
  total: number
  content: Array<DBEventContentItem>
}

export interface DBEventContentItem {
  type: number
  index: number
  content: string
}

// export interface DBTask extends DBBaseTask {
//   _id: string         // 只有创建时为非空
//   _openid?: string    // 授权id
// }


export class EventDataBase {
  private static instance: EventDataBase;
  private db: DB.Database
  private tableName: string = "eventList"

  // 私有化构造函数，防止外部通过 new 关键字创建实例
  private constructor() {
    // 初始化操作
    this.db = wx.cloud.database()
  }

  // 提供一个静态方法来获取这个类的实例
  public static getInstance(): EventDataBase {
    // 如果实例不存在，则创建它；否则返回已有的实例
    if (!EventDataBase.instance) {
      EventDataBase.instance = new EventDataBase();
    }
    return EventDataBase.instance;
  }

  convertToDBEvent(item: Event): DBEvent {
    let dataEvent: DBEvent = {
      taskId: item.taskId,
      eventId: item.eventId,

      title: item.title,
      createTime: new Date(item.createTime),
      modifyTime: new Date(item.modifyTime),
      total: item.total,
      content: item.content
    }
    return dataEvent
  }

  converToEvent(item: DBEvent): Event {
    let task = new Event(item.eventId, item.taskId)
    task.title = item.title
    task.createTime = util.formatDate(item.createTime)
    task.modifyTime = util.formatDate(item.modifyTime)
    task.total = item.total
    task.content = item.content
    return task
  }

  // 增加事件
  public addEvent(item: Event): Promise<boolean> {
    let dbItem = this.convertToDBEvent(item)
    return new Promise((resolve, reject) => {
      this.db.collection(this.tableName).add({
        data: dbItem
      }).then((res) => {
        util.log(res)
        resolve(true)
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }

  // 修改事件
  public changeTask(item: Event): Promise<boolean> {
    debugger
    let dbItem = this.convertToDBEvent(item)
    return new Promise((resolve, reject) => {
      this.db.collection(this.tableName).where({
        eventId: item.eventId
      }).update({
        data: dbItem
      }).then((res) => {
        let { stats, errMsg } = res
        util.log(stats.updated)
        util.log(errMsg)
        resolve(true)
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }

  // 查询任务
  public queryTask(eventId: string): Promise<Array<Event>> {
    debugger
    return new Promise((resolve, reject) => {
      this.db.collection(this.tableName).where({
        eventId: eventId
      }).get().then((res) => {
        util.log(res)
        debugger
        let event = res
        resolve(event)
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }
}