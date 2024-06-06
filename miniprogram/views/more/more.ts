// views/more/more.ts
import { Task, TaskManager } from '../../model/data_task'

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
    taskList: Array<Task>(),  // 任务列表
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      var taskList: Array<Task> = TaskManager.getInstance().getTaskList()
      this.setData({
        taskList: taskList
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行

    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      var taskList: Array<Task> = TaskManager.getInstance().getTaskList()
      this.setData({
        taskList: taskList
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
            console.log(data)
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