// pages/setting/setting.ts
import { userInfoKey } from "../../data/config_storage"
import * as util from "../../utils/util"

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "设置 📌",

    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '游客',
      id: '******'
    },

    listData: ["🔥 情绪ABC介绍", "关于"],

    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
  },

  onGoHome() {
    // wx.reLaunch({
    //   url: '../main/main',
    // })
    wx.redirectTo({
      url: '../main/main',
    })
  },

  onBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  loginRequest() {
    wx.login({
      success: function (res) {
        if (res.code) {
          // 获取到登录凭证 res.code
        } else {
          util.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  getUserProfile() {
    let { canIUseGetUserProfile } = this.data
    if (!canIUseGetUserProfile) {
      return
    }
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        util.log(res)
        let data = res.userInfo
        let { userInfo } = this.data
        userInfo.avatarUrl = data.avatarUrl
        userInfo.nickName = data.nickName
        userInfo.id = "000001"
        wx.setStorageSync(userInfoKey, userInfo)
        this.setData({
          userInfo: userInfo,
        })
      },
      fail:(err) =>{
        util.error(err)
      }
    })
  },

  onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail
    const { userInfo } = this.data
    userInfo.avatarUrl = avatarUrl
    wx.setStorageSync(userInfoKey, userInfo)
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
    })
  },

  onInputChange(e: any) {
    const nickName = e.detail.value
    const { userInfo } = this.data
    userInfo.nickName = nickName
    wx.setStorageSync(userInfoKey, userInfo)
    this.setData({
      "userInfo.nickName": nickName,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var userInfo = wx.getStorageSync(userInfoKey)
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
      })
    }
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