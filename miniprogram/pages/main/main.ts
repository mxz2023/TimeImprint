// pages/main/main.ts
import { gDataCenter } from '../../data/data_center'
import { shareAppMessage, shareTimeline} from '../../utils/share'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "叶记时光 🍀",
    opacity: 0,
    titleImage: "/static/welcome_text_2.png",
    canMainScroll:true,
    innerScrollViewHeight:0,

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

  // 定位到今天
  onLocationToday(_: any) {
    // console.log(event);
    var date = new Date();
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

  onScrollStart(event: any) {
    console.log(event)
  },

  onScrollEnd(event: any) {
    console.log(event)
  },

  onScroll(event: any) {
    console.log(event)
    let top = event.detail.scrollTop > 30 ? 30 : event.detail.scrollTop
    if (top > 10) {
      this.setData({
        opacity: top / 30
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const query = wx.createSelectorQuery();
    query.select('#scrollarea').boundingClientRect();
    query.select('#header-logo').boundingClientRect();
    query.exec((res) => {
      debugger
      const scrollarea = res[0].height;
      const header = res[1].height;
      this.setData({
        innerScrollViewHeight : scrollarea - header
      })
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