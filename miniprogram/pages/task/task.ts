// pages/task/task.ts
import { event_title, event_abcde } from "../../data/config_task"
import { Event, TaskState } from '../../model/data_event'


import { TaskManager } from '../../utils/task'

import { shareABCDEMessage } from '../../utils/share'
import * as util from '../../utils/util'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "打卡 📌",

    configTitle: event_title,   // 标题设置
    configItems: event_abcde,   // 项设置

    // 展示数据
    lastEvent: new Event(util.generateUniqueId()),
    // 保存数据
    dataEvent: new Event(util.generateUniqueId()),

    state: TaskState.TaskStateDefault, // 当前状态

    mode: "",     // 无用变量，特殊用法，见onShowPicker和onHidePicker
    dateVisible: false,   // picker开关变量 `${mode}Visible`

    activeImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox-checked.png',
    inActiveImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox.png',
  },

  onGoHome() {
    // wx.reLaunch({
    //   url: '../main/main',
    // })
    wx.redirectTo({
      url: '../main/main',
    })
  },

  onBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 打开日期设置
   * @param event WechatMiniprogram.CustomEvent
   */
  onShowPicker(_: WechatMiniprogram.CustomEvent) {
    const mode = "date";
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },

  /**
   * 关闭日期设置
   * @param event 
   */
  onHidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },

  /**
   * 确定日期
   * @param event 
   */
  onConfirm(event: WechatMiniprogram.CustomEvent) {
    const { value } = event.detail;
    const { lastEvent } = this.data
    lastEvent.createTime = value

    this.setData({
      lastEvent: lastEvent,
    });

    this.onHidePicker();
  },

  /**
   * 混动选项回调
   * @param _ 
   */
  onColumnChange(_: WechatMiniprogram.CustomEvent) {

  },

  /**
   * 修改标题
   * @param event 
   */
  onBlur(event: WechatMiniprogram.CustomEvent) {
    const { lastEvent } = this.data
    if (event?.currentTarget?.dataset?.target == "title") {
      lastEvent.title = event.detail.value
      this.setData({
        lastEvent: lastEvent
      })
    } else {
      const index = event?.currentTarget?.dataset?.index
      var item = lastEvent.content[index]
      if (!item) {
        return
      }
      item.content = event.detail.value
      this.setData({
        lastEvent: lastEvent
      })
    }
  },

  onEditTask() {
    var { state } = this.data
    if (state == TaskState.TaskStateEdit) {
      var copyData = JSON.parse(JSON.stringify(this.data.dataEvent));
      this.setData({
        state: TaskState.TaskStateShow,
        lastEvent: copyData
      })
    } else if (state == TaskState.TaskStateShow) {
      this.setData({
        state: TaskState.TaskStateEdit
      })
    }
  },

  onPushTask(_: WechatMiniprogram.CustomEvent) {
    var { state } = this.data
    switch (state) {
      case TaskState.TaskStateDefault: {
        this.handleSaveEvent().then((res)=>{
          if (res) {
            this.onBack()
          }
        })
        break;
      }
      case TaskState.TaskStateShow: {
        this.handleCleanContent()
        break;
      }
      case TaskState.TaskStateEdit: {
        this.handleSaveEvent().then((res)=>{
          if (res) {
            this.onBack()
          }
        })
        break;
      }
      case TaskState.TaskStateMore: {
        this.handleSaveEvent().then((res)=>{
          if (res) {
            this.onBack()
          }
        })
        break;
      }
      default: {
        break;
      }
    }
  },

  handleSaveEvent(): Promise<boolean> {
    return new Promise((resolve)=>{
      var { lastEvent, state } = this.data
      if (lastEvent.title.length == 0) {
        wx.showToast({
          title: '标题不能为空',
          icon: 'none',
          duration: 2000
        })
        resolve(false)
        return
      }
  
      if (lastEvent.content[0].content.length == 0 || lastEvent.content[1].content.length == 0 || lastEvent.content[2].content.length == 0) {
        wx.showToast({
          title: '必填内容不能为空',
          icon: 'none',
          duration: 2000
        })
        resolve(false)
        return
      }
  
      if (state == TaskState.TaskStateDefault || state == TaskState.TaskStateMore) {
        TaskManager.getInstance().createEvent(lastEvent).then((res)=>{
          util.log(res)
          resolve(true)
        }).catch(()=>{
          wx.showToast({
            title: '创建任务失败',
            icon: 'none',
            duration: 2000
          })
        })
      } else {
        TaskManager.getInstance().updateEvent(lastEvent).then((res)=>{
          util.log(res)
          resolve(true)
        }).catch(()=>{
          wx.showToast({
            title: '修改任务失败',
            icon: 'none',
            duration: 2000
          })
        })
      }
    })
  },

  handleCleanContent() {
    var { lastEvent } = this.data
    var task = new Event(util.generateUniqueId())
    task.title = lastEvent.title
    task.total = lastEvent.total + 1
    this.setData({
      lastEvent: task,
      state: TaskState.TaskStateMore
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    const { state } = option
    if (state == undefined) {
      util.error("state 未知")
      return
    }

    var taskState = Number(state)
    // 为后面请求数据做准备
    // let { lastEvent } = this.data
    this.setData({
      state: taskState,
      // lastEvent: lastEvent
    })

    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel.on) {
      // 先父页面发送信息
      //eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });

      const blockThis = this
      eventChannel.on('showTaskInfo', function (dataItem) {
        util.log(dataItem.data)
        var copyData1 = JSON.parse(JSON.stringify(dataItem.data));
        var copyData2 = JSON.parse(JSON.stringify(dataItem.data));
        blockThis.setData({
          state: TaskState.TaskStateShow,
          lastEvent: copyData1,
          dataEvent: copyData2,
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res): Promise<WechatMiniprogram.Page.ICustomShareContent> {
    return shareABCDEMessage(this.data.lastEvent, res.from, res.target)
  },
})