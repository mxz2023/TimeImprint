// components/tab-bar/tab-bar.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        currentIndex: this.properties.index
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行

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