// pages/main/index.ts

import { DataCenter } from '../../data/data_center'

const gDataCenter = new DataCenter();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    crossAxisCount: 8,
    crossAxisGap : 4,
    mainAxisGap: 4,
    currentIndex: 1,
    scrollWithAnimation: false,
    navBarHeight:0,

    gridListMonth: gDataCenter.getThreeMonthDays(),
    currentDay: gDataCenter.getCurrentDay(),
    weeks: [
      {"text":"日", "color": 'var(--week-weekend-color)'},
      {"text":"一", "color": 'var(--week-default-color)'},
      {"text":"二", "color": 'var(--week-default-color)'},
      {"text":"三", "color": 'var(--week-default-color)'},
      {"text":"四", "color": 'var(--week-default-color)'},
      {"text":"五", "color": 'var(--week-default-color)'},
      {"text":"六", "color": 'var(--week-weekend-color)'},
    ],
  },
  
  onSelectDay(event: any) {
    var index1 = event.currentTarget.dataset.index1;
    var index2 = event.currentTarget.dataset.index2;
    gDataCenter.updateCurrentDay(index1, index2);
    this.updateUIData();
  },

  onPrevMonth(event: any) {
    gDataCenter.prevMonth();
    this.updateUIData();
  },

  onNextMonth(event: any) {
    gDataCenter.nextMonth();
    this.updateUIData();
  },

  onChangecurrent(event: any) {
    var current = event.detail.current
    this.setData({
      currentIndex : current
    })
  },

  updateUIData() {
    this.setData({
      gridListMonth: gDataCenter.getThreeMonthDays(),
      currentDay: gDataCenter.getCurrentDay(),
      currentIndex: 1,
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