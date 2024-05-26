// views/home.ts
import { gDataCenter } from '../../data/data_center'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "叶记时光 🍀",
    opacity: 0,
    titleImage: "/static/welcome_text_2.png",
    forwardIcon: "caret-left-small",
    backwardsIcon: "caret-right-small",
    canMainScroll: true,

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
    wx.navigateTo({
      url: '/pages/task/task'
    })
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
})