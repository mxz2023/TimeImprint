// pages/index/index.ts

import { gDataCenter } from '../../data/data_center'
import { shareAppMessage, shareTimeline} from '../../utils/share'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "叶记时光 🍀",
    opacity: 0,

    currentDay: {},
    currentMonth: {},
    needShowToday: true,
    gridListMonth: gDataCenter.getThreeMonthDays(),
  },

  onUpdateCurrentDay(_: any) {
    // console.log(event);
    this.updateUIData()
  },

  onLocationToday(_: any) {
    // console.log(event);
    var date = new Date();
    gDataCenter.changeCurrentDate(date);
    this.updateUIData()
  },

  onPublishAction(_: any) {
    wx.navigateTo({
      url: '/pages/task/task'
    })
  },

  onPickerDateChange(event: any) {
    // Todo 临时屏蔽picker事件
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
    }, () => {

    });
  },

  onScrollStart(event: any) {
    console.log(event)
  },

  onScrollEnd(event: any) {
    console.log(event)
  },

  onScroll(event: any) {
    console.log(event)
    let top = event.detail.scrollTop > 30 ? 30 : event.detail.scrollTop
    this.setData({
      opacity: top / 30
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let sysInfo = wx.getSystemInfoSync();
    let menuInfo = wx.getMenuButtonBoundingClientRect();
    let navigationBarHeight = (menuInfo.top - sysInfo.statusBarHeight) * 2 + menuInfo.height;
    this.setData({
      statusBarHeight: menuInfo.bottom, // 状态栏高度
      navBarHeight: navigationBarHeight  // 棕色区域
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
  onShareAppMessage(res) {
    shareAppMessage(res.from, res.target)
  },

  /**
   * 自定义分享到朋友圈
   */
  onShareTimeline: function () {
     shareTimeline()
  },
})