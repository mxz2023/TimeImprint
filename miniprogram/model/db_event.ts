
import { Event } from "./data_event";
import * as util from "../utils/util"


export interface DBEvent {
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
      createTime: item.createTime,
      modifyTime: item.modifyTime,
      total: item.total,
      content: item.content
    }
    return dataEvent
  }

  converToEvent(item: DBEvent): Event {
    let task = new Event(item.eventId, item.taskId)
    task.title = item.title
    task.date = util.formatDate(item.modifyTime)
    task.total = item.total
    task.content = item.content
    task.createTime = item.createTime
    task.modifyTime = item.modifyTime
    return task
  }

  // 获取事件数量
  public getCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.collection(this.tableName).count().then((res) => {
        resolve(res.total)
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }

  // 获取最新的事件
  public getLastEvent(): Promise<Event> {
    return new Promise((resolve, reject) => {
      this.db.collection(this.tableName).orderBy('_openid', 'desc').limit(1).get().then((res) => {
        if (res.data.length > 0) {
          let event: Event = this.converToEvent(res.data[0] as DBEvent)
          resolve(event)
        } else {
          util.warn("未获取到数据")
        }
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }

  // 增删改查（CRUD）
  // 增加事件
  public createEvent(item: Event): Promise<boolean> {
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

  // 查询任务
  public readEvent(eventIds: Array<string>): Promise<Array<Event>> {
    return new Promise((resolve, reject) => {
      this.db.collection(this.tableName).where({
        eventId: this.db.command.in(eventIds)
      }).get().then((res) => {
        util.log(res)
        let dbItems = res.data
        let eventList: Array<Event> = dbItems.map((item) => {
          return this.converToEvent(item as DBEvent)
        })
        resolve(eventList)
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }

  // 修改事件
  public updateEvent(item: Event): Promise<boolean> {
    let dbItem = this.convertToDBEvent(item)
    return new Promise((resolve, reject) => {
      this.db.collection(this.tableName).where({
        eventId: item.eventId
      }).get().then((res)=>{
        let item = res.data[0]
        if (item._id) {
          this.db.collection(this.tableName).doc(item._id).update({
            data: dbItem,
          }).then((res)=>{
            let { stats, errMsg } = res
            util.log(stats.updated)
            util.log(errMsg)
            resolve(true)
          }).catch((err)=>{
            util.error(err)
            reject(err)
          });
        } else {
          resolve(false)
        }
      }).catch((err)=>{
        util.error(err)
        reject(err)
      })
    })
  }

  // 删除
  public deleteEvent(eventId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {

    })
  }
}