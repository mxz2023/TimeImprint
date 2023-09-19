// pages/login/index.ts
Page({
  data: {
    logoUrl: '',
    agreement: '登陆即表示同意<a href="#">《隐私协议》</a>'
  },

  onGetUserInfo: function (e: any) {
    if (e.detail.userInfo) {
      wx.login({
        success: (res: any) => {
          if (res.code) {
            // 登录成功，跳转到首页
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

      // 更新 logoUrl
      this.setData({
        logoUrl: e.detail.userInfo.avatarUrl
      })
    } else {
      console.log('用户拒绝授权！')
    }
  }
})