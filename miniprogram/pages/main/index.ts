// pages/main/index.ts
import { Calendar } from '../../utils/calendar'

const gCalendar = new Calendar();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    crossAxisCount: 8,
    crossAxisGap : 4,
    mainAxisGap: 4,
    gridListDays: gCalendar.getDays(),
    currentDay: gCalendar.getCurrentDay(),
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
    var index = event.currentTarget.dataset.index;
    gCalendar.updateCurrentDay(index);
    this.updateUIData();
  },

  onPrevMonth(event: any) {
    gCalendar.prevMonth();
    this.updateUIData();
  },

  onNextMonth(event: any) {
    gCalendar.nextMonth();
    this.updateUIData();
  },

  updateUIData() {
    this.setData({
      gridListDays: gCalendar.getDays(),
      currentDay: gCalendar.getCurrentDay()
    });
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