// pages/canvas/canvas.ts

import { Task } from '../../model/data_task'
import { shareAppMessage, initShareCanvas } from '../../utils/share'
const shareBgImg = '../../static/welcome_icon.png'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    safeAreaTop:0,
    pic: shareBgImg
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
    let taskData = new Task()
    taskData.taskTitle = "坚持情绪打卡"
    taskData.taskTotal = 10
    taskData.taskCreateTime = "2024/06/07"
    taskData.taskContent[0].content = "晚上加班不能按时回家"
    taskData.taskContent[1].content = "小程序不能按时完成"
    taskData.taskContent[2].content = "心烦"
    taskData.taskContent[3].content = "为了生活还要加班"
    taskData.taskContent[4].content = "平静"

    initShareCanvas(taskData)
    
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.safeArea); // 包含top, right, bottom, left的对象
        that.setData({
          safeAreaTop: res.safeArea.top + 44
        })
      }
    });
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
  onShareAppMessage(res):Promise<WechatMiniprogram.Page.ICustomShareContent> {
    return shareAppMessage()
  },
})