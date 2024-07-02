import { Event } from '../model/data_event'
import { Task } from '../model/data_task';
import { EventDataBase } from "../model/db_event"
import { TaskDataBase } from "../model/db_task";

import * as util from './util'


export class TaskManager {
  static instance: TaskManager

  private constructor() {

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
  getTaskCount(): Promise<number> {
    return TaskDataBase.getInstance().getEventMaxTotal()
  }

  /**
   * 获取事件数
   */
  getEventCount(): Promise<number> {
    return EventDataBase.getInstance().getCount()
  }

  /**
   * 获取最大持续数
   */
  getMaxTotal(): Promise<number>{
    return TaskDataBase.getInstance().getEventMaxTotal()
  }

  /**
   * 获取任务列表信息
   */
  getTaskList(): Promise<Array<Task>> {
    return new Promise((resolve, reject) => {
      TaskDataBase.getInstance().getListInfo().then((taskList) => {
        const promises = taskList.map((item) => {
          return EventDataBase.getInstance().readEvent(item.eventIdList).then((res)=>{
            item.eventList = res
          })
        })

        Promise.all(promises).then(() => {
          resolve(taskList)
        }).catch((err) => {
          util.error(err)
          reject(err)
        })
        
      }).catch((err) => {
        reject(err)
      })
    })
  }

  /**
   * 根据任务id获取事件列表信息
   * @param taskId 任务id
   */
  getEventList(taskId: string): Promise<Array<Event>> {
    return new Promise((resolve, reject) => {
      TaskDataBase.getInstance().readTask(taskId).then((res) => {
        if (res) {
          EventDataBase.getInstance().readEvent(res.eventIdList).then((res)=>{
            resolve(res)
          }).catch((err)=>{
            util.error(err)
            reject(err)
          })
        } else {
          resolve([])
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  /**
   * 获取最新事件
   */
  getLastEvent(): Promise<Event> {
    return new Promise((resolve, reject) => {
      EventDataBase.getInstance().getLastEvent().then((res) => {
        util.log(res)
        resolve(res)
      }).catch((err) => {
        util.error(err)
        reject(reject)
      })
    })
  }

  // 增删改查 CRUD
  /**
   * 
   * @param item 创建任务
   */
  createEvent(item: Event): Promise<boolean> {
    return new Promise((resolve, reject) => {
      EventDataBase.getInstance().createEvent(item).then((res) => {
        if (res) {
          TaskDataBase.getInstance().readTask(item.taskId).then((res)=>{
            if (res) {
              res.eventIdList.push(item.eventId)
              res.total = res.total+1
              TaskDataBase.getInstance().updateTask(res).then((res)=>{
                resolve(res)
              })
            } else {
              let task = new Task(item.taskId)
              task.title = item.title
              task.eventIdList.push(item.eventId)
              task.total = 1
              TaskDataBase.getInstance().createTask(task).then((res)=>{
                resolve(res)
              }).catch((err)=>{
                util.error(err)
                reject(err)
              })
            }
          }).catch((err)=>{
            util.error(err)
            reject(err)
          })
        } else {
          resolve(false)
        }
      }).catch((err)=>{
        util.error(err)
        reject(err)
      })
    })
  }

  /**
   * 查询事件
   * @param taskId 
   */
  readEvent(eventId: string): Promise<Event | undefined> {
    return new Promise((resolve, reject)=>{
      EventDataBase.getInstance().readEvent([eventId]).then((res)=>{
        if (res.length > 0) {
          resolve(res[0])
        } else {
          resolve(undefined)
        }
      }).catch((err)=>{
        util.error(err)
        reject(err)
      })
    })
  }

  /**
   * 修改任务
   * @param item 
   */
  updateEvent(item: Event): Promise<boolean> {
    return new Promise((resolve, reject) => {
      EventDataBase.getInstance().updateEvent(item).then((res) => {
        resolve(res)
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }

  /**
   * 删除任务
   * @param eventId
   */
  deleteEvent(eventId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      EventDataBase.getInstance().deleteEvent(eventId).then((res) => {
        resolve(res)
      }).catch((err) => {
        util.error(err)
        reject(err)
      })
    })
  }
}