// components/tab-bar/tab-bar.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      { 
        value: 'home', 
        icon_d: '../../static/tab-bar/tab-bar-home-d.png',
        icon_s: '../../static/tab-bar/tab-bar-home-s.png',
        ariaLabel: '首页' 
      },
      { 
        value: 'more', 
        icon_d: '../../static/tab-bar/tab-bar-more-d.png',
        icon_s: '../../static/tab-bar/tab-bar-more-s.png',
        ariaLabel: '任务' 
      },
      { 
        value: 'user', 
        icon_d: '../../static/tab-bar/tab-bar-medal-d.png',
        icon_s: '../../static/tab-bar/tab-bar-medal-s.png',
        ariaLabel: '我的' 
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelectItem(e: any) {

    }
  }
})