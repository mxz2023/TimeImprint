// components/date-picker/date-picker.ts

Component({
  /**
  * 组件的属性列表
  */
  properties: {
    
  },

  data: {
    dateTextValue: "",
    dateValue: "",
    // 指定选择区间起始值
    start: '2000-01-01 00:00:00',
    end: '2030-09-09 12:12:12',
  },

  methods:{
    formatTime(date: Date, decollator?: string) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      if (decollator) {
        return [year, month].map((n:number)=>{
          const s = n.toString()
          return s[1] ? s : '0' + s
        }).join('/')
      } else {
        return `${year}年${month}月`
      }
    },

    onConfirm(e:any) {
      const { value } = e.detail;
      
      var parts = value.split("-");
      this.setData({
        dateTextValue: `${parts[0]}年${parts[1]}月`,
        dateValue: value
      })
      this.hidePicker();
    },

    onCancel(_:any){
      this.hidePicker()
    },
  
    showPicker(){
      this.setData({
        isVisible:true
      })
    },

    hidePicker() {
      this.setData({
        isVisible:false
      })
    },
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        dateTextValue:this.formatTime(new Date()),
        dateValue: this.formatTime(new Date(), "-")
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
