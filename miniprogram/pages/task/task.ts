// pages/task/task.ts
import { formatDate } from "../../utils/util"
import { task_title, task_abcde } from "../../data/config_task"
import { taskListKey } from "../../data/config_storage"
import { Event, EventContentItem, EventContentItemExtend } from '../../model/data_event'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    testData:"TTTTTT",
    title: "打卡 📌",

    configTitle: task_title,   // 标题设置
    configItems: task_abcde,   // 项设置

    mode: "",
    dateVisible: false,
    date: new Date().getTime(), // 支持时间戳传入

    needTotal: true,  // 是否累计
    total: 1,

    lastEvent: new Event(),
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
    wx.navigateBack ({
      delta:1
    })
  },

  /**
   * 打开日期设置
   * @param event WechatMiniprogram.CustomEvent
   */
  showPicker(_:WechatMiniprogram.CustomEvent) {
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
  hidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },

  /**
   * 确定日期
   * @param event 
   */
  onConfirm(event:WechatMiniprogram.CustomEvent) {
    const { value } = event.detail;
    const { lastEvent } = this.data
    lastEvent.eventTime = value

    this.setData({
      lastEvent: lastEvent,
    });

    this.hidePicker();
  },

  /**
   * 混动选项回调
   * @param _ 
   */
  onColumnChange(_:WechatMiniprogram.CustomEvent) {
    
  },

  /**
   * 是否启动累计打卡
   * @param event 
   */
  onNeedTotal(event:WechatMiniprogram.CustomEvent) {
    this.setData({
      needTotal: event.detail.checked
    })
  },

  /**
   * 修改标题
   * @param event 
   */
  onBlur(event:WechatMiniprogram.CustomEvent) {
    if(event?.currentTarget?.dataset?.target == "title") {
      const { lastEvent } = this.data
      lastEvent.eventTitle = event.detail.value
      this.setData({
        lastTask:lastEvent
      })
    }
  },

  onTextareBlur(event:WechatMiniprogram.CustomEvent) {
    const { lastEvent } = this.data
    const index = event.detail.index
    const item = lastEvent.eventContent[index]
    if (item) {
      item.content = event.detail.value
      this.setData({
        lastEvent: lastEvent
      })
    }
  },

  onPushTask(_:WechatMiniprogram.CustomEvent) {
    try {
      var taskList:Array<Event> = wx.getStorageSync(taskListKey)
      if (!taskList) {
        taskList = new Array<Event>()
      }
      taskList.push(this.data.lastEvent)
      wx.setStorageSync(taskListKey, taskList)
    } catch (e) {
      // Do something when catch error
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});

    const blockThis = this
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('showTaskInfo', function(data) {
      blockThis.setData({
        lastEvent:data
      })
    })
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
  onShareAppMessage() {

  }
})