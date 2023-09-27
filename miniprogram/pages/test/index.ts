// pages/login/index.ts
Page({
  data: {
    logoUrl: '',
    agreement: '登陆即表示同意<a href="#">《隐私协议》</a>'
  },

  onGetUserProfile: function (e: any) {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  onGetUserInfo: function (e: any) {
    if (e.detail.avatarUrl) {
      // 更新 logoUrl
      this.setData({
        logoUrl: e.detail.avatarUrl
      })
      wx.setStorageSync("time-imprint-avatar", e.detail.avatarUrl)
    } else {
      console.log('用户拒绝授权！')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var avatar = wx.getStorageSync("time-imprint-avatar")
    this.setData({
      logoUrl: avatar
    })
  }
})