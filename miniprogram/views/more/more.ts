// views/more/more.ts
import { Event } from '../../model/data_task'
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
    eventList: Array<Event>(),  // 事件列表
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      TaskManager.getInstance().getEventList().then((dataList)=>{
        this.setData({
          eventList: dataList
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
      TaskManager.getInstance().getEventList().then((dataList)=>{
        this.setData({
          eventList: dataList
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
        url: `/pages/task/task?state=0`
      })
    },
    
    // 打开详情页
    onOpenTaskDetail(event: WechatMiniprogram.CustomEvent) {
      const taskItem = event.currentTarget.dataset.taskItem
      wx.navigateTo({
        url: `/pages/task/task?state=1`,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data: object) {
            util.log(data)
          },
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('showTaskInfo', {
            data: taskItem,
          })
        }
      })
    }
  }
})