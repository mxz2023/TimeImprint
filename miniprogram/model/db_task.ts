
import { Task } from "./data_task";
import * as util from "../utils/util"

export interface DBTask {
  taskId: string  // 任务ID
  
  title: string
  createTime: Date
  modifyTime: Date
  
  eventIdList: Array<string>
}


export class TaskDataBase {
  private static instance: TaskDataBase;
  private db: DB.Database
  private tableName: string = "taskList"

  // 私有化构造函数，防止外部通过 new 关键字创建实例
  private constructor() {
    // 初始化操作
    this.db = wx.cloud.database()
  }

  // 提供一个静态方法来获取这个类的实例
  public static getInstance(): TaskDataBase {
    // 如果实例不存在，则创建它；否则返回已有的实例
    if (!TaskDataBase.instance) {
      TaskDataBase.instance = new TaskDataBase();
    }
    return TaskDataBase.instance;
  }

  convertToDBTask(item: Task): DBTask {
    let dataTask: DBTask = {
      taskId: item.taskId,
      title: item.title,
      createTime: new Date(item.createTime),
      modifyTime: new Date(item.modifyTime),
      eventIdList: item.eventIdList
    }
    return dataTask
  }

  converToTask(item: DBTask): Task {
    let task = new Task(item.taskId)
    task.title = item.title
    task.createTime = util.formatDate(item.createTime)
    task.modifyTime = util.formatDate(item.modifyTime)
    return task
  }

  // 获取全部任务
  public getTask(): Promise<Array<Task>> {
    return new Promise((resolve, reject) => {
      this.db.collection(this.tableName).get().then((res) => {
        let dataList = res.data
        let eventList = new Array()
        dataList.forEach((item) => {
          let event = this.converToTask(item as DBTask)
          eventList.push(event)
        })
        resolve(eventList)
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }

  // 增加事件
  public addTask(item: Task): Promise<boolean> {
    let dbItem = this.convertToDBTask(item)
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
}