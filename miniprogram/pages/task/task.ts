// pages/task/task.ts
import { task_abcde } from "../../data/config_task"
import { Event } from '../../model/data_event'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    testData:"TTTTTT",
    title: "打卡 📌",
    listData: task_abcde,
    lastEvent: new Event(),
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
      let lastEvent = this.data.lastEvent
      lastEvent.taskTitle = event.detail.value
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