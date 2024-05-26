// pages/main/main.ts
import { shareAppMessage, shareTimeline } from '../../utils/share'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateBarHeight: 0,
    selectIndex:0,
    list: [
      { 
        value: 'home',
        icon_d: '../../static/tab-bar/tab-bar-home-d.png',
        icon_s: '../../static/tab-bar/tab-bar-home-s.png',
        ariaLabel: '首页' 
      },
    //   { 
    //     value: 'more', 
    //     icon_d: '../../static/tab-bar/tab-bar-more-d.png',
    //     icon_s: '../../static/tab-bar/tab-bar-more-s.png',
    //     ariaLabel: '任务' 
    //   },
    //   { 
    //     value: 'user', 
    //     icon_d: '../../static/tab-bar/tab-bar-medal-d.png',
    //     icon_s: '../../static/tab-bar/tab-bar-medal-s.png',
    //     ariaLabel: '我的' 
    //   }
    ],
  },

  onUpdateSelectIndex(e:any) {
    this.setData({
      selectIndex: e.detail.index,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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