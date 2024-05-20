// pages/main/main.ts
import { gDataCenter } from '../../data/data_center'
import { shareAppMessage, shareTimeline } from '../../utils/share'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 'home',
    list: [
      { value: 'home', icon: 'home', ariaLabel: '首页' },
      { value: 'task', icon: 'collection', ariaLabel: '任务' },
      { value: 'user', icon: 'user', ariaLabel: '我的' },
    ],

    title: "叶记时光 🍀",
    opacity: 0,
    titleImage: "/static/welcome_text_2.png",
    forwardIcon: "caret-left-small",
    backwardsIcon: "caret-right-small",
    canMainScroll: true,
    stateBarHeight: 0,

    currentDay: {},
    currentMonth: {},
    needShowToday: true,
    gridListMonth: gDataCenter.getThreeMonthDays(),
  },

  /************* 自定义方法 ****************/
  updateUIData() {
    this.setData({
      currentDay: gDataCenter.getCurrentDay(),
      currentMonth: gDataCenter.getCurrentMonth(),
      needShowToday: gDataCenter.needShowToday(),
      gridListMonth: gDataCenter.getThreeMonthDays(),
    }, () => {

    });
  },

  // 日历更新，通知主页面事件响应
  onUpdateCurrentDay(_: any) {
    // console.log(event);
    this.updateUIData()
  },

  // 月份更改，通知主页面事件响应
  onUpdateMonth(event: any) {
    if (event.detail.isNextMonth) {
      this.nextMonth()
    } else {
      this.forwardMonth()
    }
  },

  onChange(e:any) {
    this.setData({
      value: e.detail.value,
    });
  },

  // 定位到今天
  onLocationToday(_: any) {
    // console.log(event);
    var date = new Date();
    gDataCenter.changeCurrentDate(date);
    this.updateUIData()
  },

  // 点击按钮更改月份
  onIconTap(event: any) {
    // console.log(event);
    if (event.currentTarget.id == "forwardIcon") {
      this.forwardMonth()
    } else {
      this.nextMonth()
    }
  },

  // 前一个月
  forwardMonth() {
    var date = gDataCenter.getCurrentDay().date
    var year = date.getFullYear()
    var month = date.getMonth()
    if (month - 1 == -1) {
      date.setMonth(11)
      date.setFullYear(year - 1)
    } else {
      date.setMonth(month - 1)
    }
    gDataCenter.changeCurrentDate(date);
    this.updateUIData()
  },

  // 后一个月
  nextMonth() {
    var date = gDataCenter.getCurrentDay().date
    var year = date.getFullYear()
    var month = date.getMonth()
    if (month + 1 == 12) {
      date.setMonth(0)
      date.setFullYear(year + 1)
    } else {
      date.setMonth(month + 1)
    }
    gDataCenter.changeCurrentDate(date);
    this.updateUIData()
  },

  // 调整日历月份
  onPickerDateChange(event: any) {
    // Todo 临时屏蔽picker事件
    var day = event.currentTarget.dataset.day;
    var dateStr = event.detail.value;
    var date = new Date(`${dateStr}-${day}`);
    gDataCenter.changeCurrentDate(date);
    this.updateUIData()
  },

  // 发布按钮
  onPublishAction(_: any) {
    // wx.navigateTo({
    //   url: '/pages/task/task'
    // })
  },

  onScroll(event: any) {
    // console.log(event)
    let scrollTop = event.detail.scrollTop
    let opacityOffset = scrollTop > 30 ? 30 : event.detail.scrollTop
    if (opacityOffset > 10) {
      this.setData({
        opacity: opacityOffset / 30
      })
    } else {
      this.setData({
        opacity: 0
      })
    }
  },

  /************* 系统方法，生命周期 ****************/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.updateUIData()

    let info = wx.getSystemInfoSync()
    this.setData({
      stateBarHeight: info.statusBarHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    // 动态获取标签高度
    // const query = wx.createSelectorQuery();
    // query.select('#scrollarea').boundingClientRect();
    // query.select('#header-logo').boundingClientRect();
    // query.select('#details').boundingClientRect()
    // query.exec((res) => {
    //   const scrollarea = res[0].height;
    //   const details = res[2].height;
    //   this.setData({
    //     innerScrollViewHeight : scrollarea - details
    //   })
    // });
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