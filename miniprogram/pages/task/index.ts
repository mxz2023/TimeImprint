// pages/task/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rateType:0,
    rateTypeList: [{
      title:"默认",
      rate:0,
    },{
      title:"周期",
      rate:1,
    }]
  },

  onSelectType(event: any) {
    console.log(event);
    var rate = event.currentTarget.dataset.item.rate;
    this.setData({
      rateType: rate
    })
  },

  // onPickerDateChange(event: any) {
  //   console.log("onPickerDateChange on task")
  // },
  
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