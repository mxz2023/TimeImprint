// components/tab-bar/tab-bar.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelectItem(e: any) {
      let tapIndex = e.currentTarget.dataset.index
      if (tapIndex != this.data.currentIndex) {
        // detail对象，提供给事件监听函数
        var myEventDetail = {
          index: tapIndex
        } 
        // 触发事件的选项
        var myEventOption = {} 
        this.triggerEvent('updateSelectIndex', myEventDetail, myEventOption)
        this.setData({
          currentIndex: tapIndex
        })
      }
    }
  }
})