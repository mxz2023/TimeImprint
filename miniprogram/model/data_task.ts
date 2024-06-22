import { taskListKey } from "../data/config_storage"
import { formatDate } from "../utils/util"
import { DataBase } from "../utils/database"

export enum TaskState {
  TaskStateDefault = 0,
  TaskStateShow = 1,    // 展示打卡内容
  TaskStateEdit = 2,    // 创建-编辑打卡
  TaskStateMore = 3     // 再次打卡
}

export class Task {
  taskId: string = ""
  taskTitle: string = "";         // 标题
  taskCreateTime: string = formatDate(new Date())           // 创建时间
  taskModifyTime: string = formatDate(new Date())      // 修改时间
  taskTotal: number = 1           // 累计打卡天数                   
  taskContent: Array<TaskContentItem> = []       // 内容

  constructor() {
    this.taskId = this.generateUniqueId()
    // 5个占位，如果不占位，后面如果不按照顺序输入，无法保存数据
    for (var i = 0; i < 5; i++) {
      var item = new TaskContentItem()
      this.taskContent.push(item)
    }
  }

  generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 16) + '-' + Date.now().toString(36);
  }
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

export class TaskManager {
  private taskList: Array<Task>
  private maxTotal: number
  private isSync: boolean

  static instance: TaskManager

  private constructor() {
    this.taskList = new Array<Task>()
    this.isSync = true
    this.maxTotal = 1
  }

  static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager()
    }
    return TaskManager.instance
  }

  /**
   * 获取任务数
   */
  getTaskCount(): number {
    return this.taskList.length
  }

  /**
   * 获取最大持续数
   */
  getMaxTotal() {
    return this.maxTotal
  }

  /**
   * 获取打卡列表数据
   */
  getTaskList(): Promise<Array<Task>> {
    return new Promise((resolve) => {
      // 本地缓存
      var taskList = wx.getStorageSync(taskListKey)
      if (typeof taskList == 'object') {
        this.taskList = taskList
        this.taskList.forEach((item) => {
          this.maxTotal = Math.max(this.maxTotal, item.taskTotal)
        })
        // 正序插入，反序显示
        Object.assign(taskList, this.taskList)
        resolve(taskList.reverse())
      }

      if (this.isSync) {
        DataBase.getInstance().getTasks().then((res) => {
          this.taskList = res
          this.taskList.forEach((item) => {
            this.maxTotal = Math.max(this.maxTotal, item.taskTotal)
          })
          wx.setStorageSync(taskListKey, this.taskList)
          // 正序插入，反序显示
          let tempList = new Array<Task>()
          Object.assign(tempList, this.taskList)
          resolve(tempList.reverse())
        })
      }
    })
  }

  /**
   * 获取最新打卡
   */
  getLastTask(): Promise<Task> {
    return new Promise((resolve)=>{
      let length = this.taskList.length
      if (length > 0) {
        resolve(this.taskList[length - 1])
      }
      if (this.isSync) {
        this.getTaskList().then((listData)=>{
          let length = listData.length
          if (length > 0) {
            resolve(listData[length - 1])
          }
        })
      }
    })
  }

  /**
   * 
   * @param item 创建任务
   */
  createTask(item: Task): void {
    this.taskList.push(item)
    wx.setStorageSync(taskListKey, this.taskList)
    if (this.isSync) {
      DataBase.getInstance().addTask(item)
    }
  }

  /**
   * 删除任务
   * @param takeId
   */
  destoryTask(takeId: string): void {
    this.taskList = this.taskList.filter((item) => {
      return item.taskId != takeId
    })
    wx.setStorageSync(taskListKey, this.taskList)
    if (this.isSync) {
      DataBase.getInstance().deleteTask(takeId)
    }
  }

  /**
   * 修改任务
   * @param item 
   */
  modifyTask(item: Task): Promise<void> {
    return new Promise((resolve)=>{
      this.taskList = this.taskList.map((data) => {
        if (data.taskId == item.taskId) {
          data = item
        }
        return data
      })
      wx.setStorageSync(taskListKey, this.taskList)
      resolve()

      if (this.isSync) {
        DataBase.getInstance().changeTask(item).then(()=>{
          resolve()
        })
      }
    })
  }

  /**
   * 查询任务
   * @param taskId 
   */
  searchTask(taskId: string): Task | undefined {
    let task = this.taskList.find((data) => {
      return data.taskId == taskId
    })
    if (task == undefined && this.isSync) {
      DataBase.getInstance().queryTask(taskId)
    }
    return task
  }
}