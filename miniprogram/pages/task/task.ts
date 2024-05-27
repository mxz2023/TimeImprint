// pages/task/task.ts
import { task_abcde } from "../../data/config_task"
import { Event, EventContentItem, EventContentItemExtend } from '../../model/data_event'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    testData:"TTTTTT",
    title: "打卡 📌",
    listData: task_abcde,
    // lastEvent: {
    //   eventId: 0,
    //   eventTitle:"打卡",
    //   eventTime: new Date(),
    //   eventTotal: 0,
    //   eventCentent: [],
    //   showTime:""
    // },
    lastEvent: new Event()
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

  onBlur(event:WechatMiniprogram.CustomEvent) {
    if(event?.currentTarget?.dataset?.target == "title") {
      let lastEvent:Event = this.data.lastEvent
      lastEvent.eventTitle = event.detail.value
      this.setData({
        lastTask:lastEvent
      })
    }
  },

  onTextareBlur(event:WechatMiniprogram.CustomEvent) {
    debugger
    // event?.detail?.target
    // event?.detail?.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let lastEvent = new Event()
    lastEvent.eventTitle = "彤彤打卡"
    lastEvent.eventTime = new Date()
    
    let item1 = new EventContentItem()
    item1.type = 1
    item1.index = 1
    item1.content = "晚上羽毛球换了教练"

    let item2 = new EventContentItem()
    item2.type = 1
    item2.index = 2
    item2.content = "我喜欢这个教练"

    let item3 = new EventContentItem()
    item3.type = 1
    item3.index = 3
    item3.content = "兴奋"

    let item4 = new EventContentItem()
    item4.type = 1
    item4.index = 4
    item4.content = "可能是临时的"

    let item5 = new EventContentItem()
    item5.type = 1
    item5.index = 5
    item5.content = "平静"

    lastEvent.eventContent.push(item1)
    lastEvent.eventContent.push(item2)
    lastEvent.eventContent.push(item3)
    lastEvent.eventContent.push(item4)
    lastEvent.eventContent.push(item5)
    this.setData({
      lastEvent : lastEvent
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