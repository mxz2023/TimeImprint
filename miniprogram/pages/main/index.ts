// pages/main/index.ts

import { gDataCenter } from '../../data/data_center'

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
    gridListMonth: gDataCenter.getThreeMonthDays(),
  },

  onUpdateCurrentDay(event: any) {
    // console.log(event);
    this.updateUIData()
  },

  onLocationToday(event: any) {
    // console.log(event);
    var date = new Date();
    gDataCenter.changeCurrentDate(date);
    this.updateUIData()
  },

  onPublishAction(event: any) {
    wx.navigateTo({
      url:'/pages/task/index'
    })
  },

  onPickerDateChange(event: any) {
    var day = event.currentTarget.dataset.day;
    var dateStr = event.detail.value;
    var date = new Date(`${dateStr}-${day}`);
    gDataCenter.changeCurrentDate(date);
    this.updateUIData()
  },

  updateUIData() {
    this.setData({
      currentDay: gDataCenter.getCurrentDay(),
      currentMonth: gDataCenter.getCurrentMonth(),
      needShowToday: gDataCenter.needShowToday(),
      gridListMonth: gDataCenter.getThreeMonthDays(),
    }, ()=> {
      
    });
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
    // console.log('导航栏高度：', navBarHeight);
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