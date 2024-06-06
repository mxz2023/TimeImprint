// views/mine/mine.ts
import { userInfoKey } from "../../data/config_storage"
import { Task, TaskManager } from "../../model/data_task"

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

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
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '游客',
      id: '******'
    },

    taskCount: 0,
    maxTotal: 1,

    listData1: ["🔥 情绪ABC介绍", "关于"],
    // listData2:[1,2,3,4,5,6,7]
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      var count = TaskManager.getInstance().getTaskCount()
      var max = TaskManager.getInstance().getMaxTotal()
      this.setData({
        taskCount: count,
        maxTotal: max,
      })
      var userInfo = wx.getStorageSync(userInfoKey)
      if (userInfo) {
        this.setData({
          userInfo: userInfo,
        })
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    onOpenSetting() {
      wx.navigateTo({
        url: "/pages/setting/setting"
      })
    },
  }
})