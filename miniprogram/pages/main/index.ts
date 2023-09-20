// pages/main/index.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight:0,
    opacity:0,
    title:"叶记时光🍃",
    
    currentDay: {},
    currentMonth: {},
    needShowToday: true,
  },

  onUpdateCurrentDay(event: any) {
    console.log(event);
    this.setData({
      currentDay: event.detail.currentDay,
      currentMonth: event.detail.currentMonth,
      needShowToday: event.detail.needShowToday,
    });
  },

  onLocationToday(event: any) {
    console.log(event);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo;
    let navBarHeight = 0;
    if (platform === 'android') {
      navBarHeight = 48;
    } else if (platform === 'devtools') {
      navBarHeight = 44;
    } else {
      navBarHeight = 44;
    }
    navBarHeight += statusBarHeight;
    console.log('导航栏高度：', navBarHeight);
    this.setData({
      navBarHeight:navBarHeight
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