
import { Task } from "../model/data_task";
import { formatDate } from "../utils/util"

export interface DataBaseTask {
  taskTitle: string
  taskCreateTime: Date
  taskModifyTime: Date
  taskTotal: number   
  taskContent: Array<DataBaseTaskContentItem> 
}

export interface DataCreateTask extends DataBaseTask {
  _id: string    // 只有创建时为非空
}

export interface DataBaseTaskContentItem {
  type: number
  index: number
  content: string
}


export class DataBase {
  private static instance: DataBase;
  private db: DB.Database

  // 私有化构造函数，防止外部通过 new 关键字创建实例
  private constructor() {
    // 初始化操作
    this.db = wx.cloud.database()
  }

  // 提供一个静态方法来获取这个类的实例
  public static getInstance(): DataBase {
    // 如果实例不存在，则创建它；否则返回已有的实例
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }

  convertToDBItem(task:Task) :DataBaseTask {
    let dataTask: DataBaseTask = {
      taskTitle: task.taskTitle,
      taskCreateTime: new Date(task.taskCreateTime),
      taskModifyTime: new Date(),
      taskTotal: task.taskTotal,
      taskContent: task.taskContent
    }
    return dataTask
  }

  convertToDBCreateItem(task:Task) :DataCreateTask {
    let dataTask:DataCreateTask = {
      _id: task.taskId,
      taskTitle: task.taskTitle,
      taskCreateTime: new Date(),
      taskModifyTime: new Date(),
      taskTotal: task.taskTotal,
      taskContent: task.taskContent
    }
    return dataTask
  }

  converToTask(item:DataCreateTask) :Task {
    let task = new Task(item._id)
    task.taskTitle = item.taskTitle
    task.taskCreateTime = formatDate(item.taskCreateTime)
    task.taskModifyTime = formatDate(item.taskModifyTime)
    task.taskContent = item.taskContent
    return task
  }

  // 增加任务
  public addTask(task:Task): Promise<boolean> {
    let dbItem = this.convertToDBCreateItem(task)
    return new Promise((resolve, reject)=>{
      this.db.collection("taskList").add({
        data:dbItem
      }).then((res)=>{
        resolve(true)
      }).catch((err: object)=>{
        reject(err)
      })
    })
  }

  // 删除任务
  public deleteTask(taskId:string): Promise<boolean> {
    debugger
    return new Promise((resolve, reject)=>{
      this.db.collection("taskList").doc(taskId).remove().then((res)=>{
        resolve(true)
      }).catch((err: object)=>{
        reject(err)
      })
    })
  }

  // 修改任务
  public changeTask(task:Task): Promise<boolean> {
    debugger
    let dbItem = this.convertToDBItem(task)
    return new Promise((resolve, reject)=>{
      this.db.collection("taskList").doc(task.taskId).update({
        data: dbItem
      }).then((res)=>{
        let {stats, errMsg} = res
        console.log(stats.updated)
        console.log(errMsg)
        resolve(true)
      }).catch((err: object)=>{
        reject(err)
      })
    })
  }

  // 查询任务
  public queryTask(taskId:string): Promise<Task> {
    debugger
    return new Promise((resolve, reject)=>{
      this.db.collection("taskList").doc(taskId).get().then((res)=>{
        console.log(res)
        // let task = this.converToTask(res.data)
        // resolve(task)
      }).catch((err: object)=>{
        reject(err)
      })
    })
  }

  // 获取全部任务
  public getTasks(): Promise<Array<Task>> {
    return new Promise((resolve, reject)=>{
      this.db.collection("taskList").get().then((res)=>{
        let dataList = res.data
        let taskList = new Array()
        dataList.forEach((item)=>{
          let task = this.converToTask(item as DataCreateTask)
          taskList.push(task)
        })
        resolve(taskList)
      }).catch((err: object)=>{
        reject(err)
      })
    })
  }
}