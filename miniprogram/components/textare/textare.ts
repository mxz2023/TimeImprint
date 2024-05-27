
// components/textare/textare.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    itemData: Object
  },

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
  /**
   * 生命周期
   */
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },

  /**
   * 自定义方法
   */
  methods: {
    onBlur(event:WechatMiniprogram.CustomEvent) {
      // detail对象，提供给事件监听函数
      var myEventDetail = {
        value:event.detail.value,
        target:event.currentTarget.dataset.target
      } 
      // 触发事件的选项
      var myEventOption = {} 
      this.triggerEvent('textareBlur', myEventDetail, myEventOption)
    }
  },
})