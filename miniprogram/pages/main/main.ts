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