// views/home.ts
import { gDataCenter } from '../../model/data_center'
import { Event } from '../../model/data_event'
import { TaskManager } from '../../utils/task'
import * as util from '../../utils/util'

Component({

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

    eventList: Array<Event>(),  // 事件
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      let { eventList } = this.data
      TaskManager.getInstance().getLastEvent().then((event)=>{
        if (event) {
          util.log("attached", event)
          eventList.splice(0, eventList.length)
          eventList.push(event)
          this.setData({
            eventList: eventList
          })
        }
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行

    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      let { eventList } = this.data
      TaskManager.getInstance().getLastEvent().then((event)=>{
        if (event) {
          util.log("show", event)
          eventList.splice(0, eventList.length)
          eventList.push(event)
          this.setData({
            eventList: eventList
          })
        }
      })
    },
    hide: function () {
    
    },
    resize: function () {
 
    },
  },

  /************* 自定义方法 ****************/
  methods: {
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
      // util.log(event);
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
    onLocationToday(_: WechatMiniprogram.CustomEvent) {
      // util.log(event);
      var date = new Date();
      gDataCenter.changeCurrentDate(date);
      this.updateUIData()
    },

    // 点击按钮更改月份
    onIconTap(event: WechatMiniprogram.CustomEvent) {
      // util.log(event);
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
    onPickerDateChange(event: WechatMiniprogram.CustomEvent) {
      // Todo 临时屏蔽picker事件
      var day = event.currentTarget.dataset.day;
      var dateStr = event.detail.value;
      var date = new Date(`${dateStr}-${day}`);
      gDataCenter.changeCurrentDate(date);
      this.updateUIData()
    },

    // 发布按钮
    onPublishAction(_: WechatMiniprogram.CustomEvent) {
      wx.navigateTo({
        url: `/pages/abc/abc?state=0`
      })
    },

    // 滚动处理
    onScroll(event: WechatMiniprogram.CustomEvent) {
      // util.log(event)
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

    // 打开详情页
    onOpenEventDetail(event: WechatMiniprogram.CustomEvent) {
      let { eventList } = this.data
      const taskIndex = event.currentTarget.dataset.taskIndex
      const taskItem = eventList[taskIndex]
      wx.navigateTo({
        url: `/pages/abc/abc?state=1`,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data:object) {
            util.log(data)
          },
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('showABCInfo', {
            data: taskItem,
          })
        }
      })
    }
  }
})