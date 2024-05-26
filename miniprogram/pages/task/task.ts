// pages/task/task.ts

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "打卡 📌",
    maxlenght: 30,
    listData: [
      {
        "icon": "letters-a",
        "text": "事情",
        "placeholder": "请输入什么事情"
      },
      {
        "icon": "letters-b",
        "text": "想法",
        "placeholder": "请输入什么想法"
      },
      {
        "icon": "letters-c",
        "text": "情绪",
        "placeholder": "请输入什么情绪"
      },
      {
        "icon": "letters-d",
        "text": "反驳",
        "placeholder": "请输入怎么反驳"
      },
      {
        "icon": "letters-e",
        "text": "激发",
        "placeholder": "请输入激发情绪"
      },
    ]
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
    let date = new Date()
    this.setData({
      date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    })
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