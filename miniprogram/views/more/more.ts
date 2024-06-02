// views/more/more.ts
import { taskListKey } from "../../data/config_storage"
import { Task } from '../../model/data_task'

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
      var taskList: Array<Task> = wx.getStorageSync(taskListKey)
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

  }
})