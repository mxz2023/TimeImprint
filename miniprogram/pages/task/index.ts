// pages/task/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rateType: 0,
    rateTypeList: [{
      title: "默认",
      rate: 0,
    }, {
      title: "周期",
      rate: 1,
    }],
    currentText: "开始",
    currentDate: "",
    currentTime: "",
    currentDateEnd: "",
    currentTimeEnd: "",
    isAllDayChecked: false,
    times: ["永不","每天","每周","每月","每年"],
    timesIndex: 0,
  },

  onChangeSwitch(event:any) {
    var isAllDay = event.detail.value
    this.setData({
      isAllDayChecked: isAllDay,
    })
  },

  onPickerChange(event: any) {
    var type = event.currentTarget.dataset.type;
    switch(type) {
      case "1-1":{
        this.setData({
          currentDate: event.detail.value
        })
        break;
      }
      case "1-2":{
        this.setData({
          currentTime: event.detail.value
        })
        break;
      }
      case "2-1":{
        this.setData({
          currentDateEnd: event.detail.value
        })
        break;
      }
      case "2-2":{
        this.setData({
          currentTimeEnd: event.detail.value
        })
        break;
      }
      case "3-1":{
        this.setData({
          timesIndex: event.detail.value
        })
        break;
      }
      default:{
        console.error('未知的操作类型');
      }
    }
  },

  onSaveTaskData(event:any) {

    wx.setStorageSync("time-imprint-avatar", event.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var _date = new Date()
    var strDate = _date.toLocaleDateString().replace(/\//g, "-");
    var strTime = _date.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'})
    this.setData({
      currentDate: strDate,
      currentDateEnd: strDate,
      currentTime: strTime,
      currentTimeEnd: strTime,
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