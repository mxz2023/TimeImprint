import { Task } from '../model/data_event'
import { Event } from '../model/data_task';
import { TaskDataBase } from "../model/db_event"
import { EventDataBase } from "../model/db_task";
import { taskListKey, eventListKey } from "../data/config_storage"

import * as util from './util'



export class TaskManager {
  private eventList: Array<Event>
  private maxTotal: number

  static instance: TaskManager

  private constructor() {
    this.eventList = new Array<Event>()
    this.maxTotal = 1
  }

  static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager()
    }
    return TaskManager.instance
  }

  /**
   * 获取事件数
   */
  getEventCount(): number {
    return this.eventList.length
  }

  /**
   * 获取任务数
   */
  getTaskCount(): number {
    let count = 0
    this.eventList.forEach((item)=>{
      count += item.taskList.length
    })
    return count
  }

  /**
   * 获取最大持续数
   */
  getMaxTotal() {
    return this.maxTotal
  }

  /**
   * 获取事件列表数据
   */
  getEventList(): Promise<Array<Event>> {
    return new Promise((resolve, reject)=>{
      EventDataBase.getInstance().getEvents().then((res) => {
        this.eventList = res
        wx.setStorageSync(eventListKey, this.eventList)
        resolve(this.eventList)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  /**
   * 获取打卡列表数据
   */
  getTaskList(eventId: string): Promise<Array<Task>> {
    return new Promise((resolve, reject) => {
      TaskDataBase.getInstance().queryTask(eventId).then((res) => {
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  /**
   * 获取最新打卡
   */
  getLastTask(): Promise<Task> {
    return new Promise((resolve) => {
      this.getTaskList().then((listData) => {
        let length = listData.length
        if (length > 0) {
          resolve(listData[0])
        }
      })
    })
  }

  /**
   * 
   * @param item 创建任务
   */
  createTask(item: Task): Promise<void> {
    debugger
    let event = new Event()
    event.eventTitle = item.taskTitle
    event.eventCreateTime = item.taskCreateTime
    event.eventModifyTime = item.taskModifyTime
    event.taskList.push(item.taskId)

    return new Promise((resolve) => {
      if (this.isSyncData) {
        EventDataBase.getInstance().addEvent(event).then(() => {
          TaskDataBase.getInstance().addTask(item).then(() => {
            this.eventList.push(event)
            wx.setStorageSync(eventListKey, this.eventList)
            this.taskList.push(item)
            wx.setStorageSync(taskListKey, this.taskList)
            resolve()
          })
        })
      } else {
        this.eventList.push(event)
        wx.setStorageSync(eventListKey, this.eventList)
        this.taskList.push(item)
        wx.setStorageSync(taskListKey, this.taskList)
        resolve()
      }
    })
  }

  /**
   * 删除任务
   * @param takeId
   */
  destoryTask(takeId: string): void {
    if (this.isSyncData) {
      TaskDataBase.getInstance().deleteTask(takeId).then(() => {
        this.taskList = this.taskList.filter((item) => {
          return item.taskId != takeId
        })
        wx.setStorageSync(taskListKey, this.taskList)
      })
    } else {
      this.taskList = this.taskList.filter((item) => {
        return item.taskId != takeId
      })
      wx.setStorageSync(taskListKey, this.taskList)
    }
  }

  /**
   * 修改任务
   * @param item 
   */
  modifyTask(item: Task): Promise<void> {
    return new Promise((resolve) => {
      if (this.isSyncData) {
        TaskDataBase.getInstance().changeTask(item).then(() => {
          this.taskList = this.taskList.map((data) => {
            if (data.taskId == item.taskId) {
              data = item
            }
            return data
          })
          wx.setStorageSync(taskListKey, this.taskList)
          resolve()
        }).catch((err) => {
          util.error(err)
        })
      } else {
        this.taskList = this.taskList.map((data) => {
          if (data.taskId == item.taskId) {
            data = item
          }
          return data
        })
        wx.setStorageSync(taskListKey, this.taskList)
        resolve()
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
    if (task == undefined && this.isSyncData) {
      TaskDataBase.getInstance().queryTask(taskId)
    }
    return task
  }
}