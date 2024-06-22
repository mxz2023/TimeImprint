// app.ts
App<IAppOption>({
  globalData: {
    
  },
  onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({
        env: "debug-9gcd636o732d682d",
        traceUser:true
      })
    } else {
      console.error("无法使用云")
    }
    this.globalData = {}
  },
})