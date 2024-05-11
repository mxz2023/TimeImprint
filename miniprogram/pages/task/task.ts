// pages/task/task.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "打卡 📌",
    opacity: 1,
    date: "",
    needDate:true,
    dataColor: "#F3F4F5",
    items:["",""],
    iconBad: '\u{e666}',
    iconWeui: '\u{eA08}'
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