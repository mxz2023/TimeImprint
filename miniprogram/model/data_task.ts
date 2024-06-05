import { formatDate } from "../utils/util"
import { taskListKey } from "../data/config_storage"

export enum TaskState {
  TaskStateDefault = 0,
  TaskStateShow = 1,
  TaskStateEdit = 2,
  TaskStateMore = 3
}

export class Task {
  taskId: string = "";             // 事件id
  taskTitle: string = "";         // 标题
  taskCreateTime: string = formatDate(new Date())           // 创建时间
  taskModifyTime: string = formatDate(new Date())      // 修改时间
  taskTotal: number = 1           // 累计打卡天数                   
  taskContent: Array<TaskContentItem> = []       // 内容

  constructor() {
    // 5个占位，如果不占位，后面如果不按照顺序输入，无法保存数据
    for(var i = 0; i < 5; i++) {
      var item = new TaskContentItem()
      this.taskContent.push(item)
    }
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
  taskList: Array<Task>

  static instance: TaskManager

  private constructor() {
    var taskList = wx.getStorageSync(taskListKey)
    if (typeof taskList == 'object') {
      this.taskList = taskList
    } else {
      this.taskList = new Array<Task>()
    }
  }

  static getInstance() {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager()
    }
    return TaskManager.instance
  }

  getTaskList() {
    // 正序插入，反序显示
    let taskList = new Array<Task>()
    Object.assign(taskList, this.taskList)
    return taskList.reverse()
  }

  getLastTask() {
    let length = this.taskList.length
    return this.taskList[length-1]
  }

  createTask(item:Task) {
    item.taskId = this.generateUniqueId()
    this.taskList.push(item)
    wx.setStorageSync(taskListKey, this.taskList)
  }

  modifyTask(item: Task) {
    this.taskList = this.taskList.map((data)=>{
      if (data.taskId == item.taskId) {
        data = item
      }
      return data
    })
    wx.setStorageSync(taskListKey, this.taskList)
  }

  deleteTask(takeId: string) {
    this.taskList = this.taskList.filter((item)=>{
      return item.taskId != takeId
    })
    wx.setStorageSync(taskListKey, this.taskList)
  }

  generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16) + '-' + Date.now().toString(36);
  }
}