// views/more/more.ts
import { Event, Task } from '../../model/data_task'
import { TaskManager } from '../../utils/task'

import * as util from '../../utils/util'

Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    taskList: Array<Task>(),  // 事件列表
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      TaskManager.getInstance().getTaskList().then((dataList)=>{
        this.setData({
          taskList: dataList
        })
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行

    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      debugger
      TaskManager.getInstance().getTaskList().then((dataList)=>{
        this.setData({
          taskList: dataList
        })
      })
    },
    hide: function () {

    },
    resize: function () {

    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 发布按钮
    onPublishAction(_: WechatMiniprogram.CustomEvent) {
      wx.navigateTo({
        url: `/pages/abc/abc?state=0`
      })
    },
    
    onOpenTaskExtend(event: WechatMiniprogram.CustomEvent) {
      // const taskItem:Task = event.currentTarget.dataset.taskItem
      // taskItem.showExtend = !taskItem.showExtend

      const taskIndex = event.currentTarget.dataset.taskIndex
      let { taskList } = this.data
      const taskItem = taskList[taskIndex]
      taskItem.showExtend = !taskItem.showExtend

      this.setData({
        taskList : taskList
      })
    },

    // 打开详情页
    onOpenEventDetail(event: WechatMiniprogram.CustomEvent) {
      const eventItem = event.currentTarget.dataset.eventItem
      wx.navigateTo({
        url: `/pages/abc/abc?state=1`,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data: object) {
            util.log(data)
          },
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('showABCInfo', {
            data: eventItem,
          })
        }
      })
    }
  }
})