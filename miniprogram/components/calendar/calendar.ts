// compent/calendar/calendar.ts

import { gDataCenter } from '../../model/data_center'

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    viewStyle: Number,
    gridListMonth: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 1,
    scrollWithAnimation: false,
    weeks: [
      {"key":0, "text":"日", "color": 'var(--week-weekend-color)'},
      {"key":1, "text":"一", "color": 'var(--week-default-color)'},
      {"key":2, "text":"二", "color": 'var(--week-default-color)'},
      {"key":3, "text":"三", "color": 'var(--week-default-color)'},
      {"key":4, "text":"四", "color": 'var(--week-default-color)'},
      {"key":5, "text":"五", "color": 'var(--week-default-color)'},
      {"key":6, "text":"六", "color": 'var(--week-weekend-color)'},
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelectDay(event: any) {
      var index1 = event.currentTarget.dataset.index1;
      var index2 = event.currentTarget.dataset.index2;
      gDataCenter.updateCurrentDay(index1, index2);
      this.updateUIData();
    },
  
    onPrevMonth(_: any) {
      // console.log(event);
      gDataCenter.prevMonth();
      this.updateUIData();
    },
  
    onNextMonth(_: any) {
      // console.log(event);
      gDataCenter.nextMonth();
      this.updateUIData();
    },
  
    onLocationToday(_: any) {
      // console.log(event);
      gDataCenter.locationToday();
      this.updateUIData();
    },
  
    onChangecurrent(event: any) {
      var currentIndex = event.currentTarget.dataset.current;
      var current = event.detail.current
      this.setData({
        currentIndex: current,
      });
  
      if (currentIndex > current) {
        gDataCenter.prevMonth();
      } else if (currentIndex < current) {
        gDataCenter.nextMonth();
      } else {
        return
      }
      this.updateUIData();
    },
  
    updateUIData() {
      this.setData({
        currentIndex: 1,
        gridListMonth: gDataCenter.getThreeMonthDays(),
      }, ()=> {
        this.sendDataChangeEvent();
      });
    },

    sendDataChangeEvent() {
      // detail对象，提供给事件监听函数
      var myEventDetail = {} 
      // 触发事件的选项
      var myEventOption = {} 
      this.triggerEvent('updateCurrentDay', myEventDetail, myEventOption)
    }
  },

  lifetimes:{
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.sendDataChangeEvent();
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
    hide: function () {

    },
    resize: function () {

    },
  },
})