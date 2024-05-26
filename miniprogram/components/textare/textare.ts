// components/textare/textare.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: Object,
    maxlenght: Number
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

  },
})