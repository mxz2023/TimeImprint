// pages/tally/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup: false,
    gridListItem:[
      {"name":"餐饮"},
      {"name":"购物"},
      {"name":"日用"},
      {"name":"交通"},
      {"name":"蔬菜"},
      {"name":"水果"},
      {"name":"零食"},
      {"name":"娱乐"},
      {"name":"通讯"},
      {"name":"服装"},
      {"name":"住房"},
      {"name":"社交"},
      {"name":"旅行"},
      {"name":"数码"},
      {"name":"医疗"},
      {"name":"礼物"},
      {"name":"家居"},
      {"name":"汽车"}
    ]
  },

  onAddRecord(event:any) {
    this.setData({
      showPopup:true
    })
  },

  onHidePopup(event:any) {
    this.setData({
      showPopup:false
    })
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