// pages/task/task.ts
import { task_title, task_abcde } from "../../data/config_task"
import { taskListKey } from "../../data/config_storage"
import { Task } from '../../model/data_task'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "打卡 📌",
  
    configTitle: task_title,   // 标题设置
    configItems: task_abcde,   // 项设置

    mode: "",     // 无用变量，特殊用法，见onShowPicker和onHidePicker
    dateVisible: false,   // picker开关变量 `${mode}Visible`

    isDisabled: false,   // 是否禁止所有输入
    canCancel: false,   // 进入编辑状态后控制取消编辑
    needTotal: true,  // 是否累计
    total: 1,

    lastTask: new Task(),
    activeImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox-checked.png',
    inActiveImage: 'https://tdesign.gtimg.com/mobile/demos/checkbox.png',
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

  /**
   * 打开日期设置
   * @param event WechatMiniprogram.CustomEvent
   */
  onShowPicker(_: WechatMiniprogram.CustomEvent) {
    const mode = "date";
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },

  /**
   * 关闭日期设置
   * @param event 
   */
  onHidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },

  /**
   * 确定日期
   * @param event 
   */
  onConfirm(event: WechatMiniprogram.CustomEvent) {
    const { value } = event.detail;
    const { lastTask } = this.data
    lastTask.taskTime = value

    this.setData({
      lastTask: lastTask,
    });

    this.onHidePicker();
  },

  /**
   * 混动选项回调
   * @param _ 
   */
  onColumnChange(_: WechatMiniprogram.CustomEvent) {

  },

  /**
   * 是否启动累计打卡
   * @param event 
   */
  onNeedTotal(event: WechatMiniprogram.CustomEvent) {
    this.setData({
      needTotal: event.detail.checked
    })
  },

  /**
   * 修改标题
   * @param event 
   */
  onBlur(event: WechatMiniprogram.CustomEvent) {
    const { lastTask } = this.data
    if (event?.currentTarget?.dataset?.target == "title") {
      lastTask.taskTitle = event.detail.value
      this.setData({
        lastTask: lastTask
      })
    } else {
      const index = event?.currentTarget?.dataset?.index
      var item = lastTask.taskContent[index]
      if (!item) {
        return
      }
      item.content = event.detail.value
      this.setData({
        lastTask: lastTask
      })
    }
  },

  onEditTask() {
    this.setData({
      isDisabled: false,
      canCancel: true
    })
  },

  onCancelTask() {
    this.setData({
      isDisabled: true,
      canCancel: false
    })
  },

  onPushTask(_: WechatMiniprogram.CustomEvent) {
    // 解决按钮响应时，最后一个输入框文字没有被保存问题
    setTimeout(() => {
      try {
        var taskList: Array<Task> = wx.getStorageSync(taskListKey)
        if (!taskList) {
          taskList = new Array<Task>()
        }
        let { lastTask } = this.data
        if (lastTask.taskTitle.length == 0) {
          wx.showToast({
            title: '标题不能为空',
            icon:'none',
            duration: 2000
          })
          return
        }

        if (lastTask.taskContent[0].content.length == 0 || lastTask.taskContent[1].content.length == 0 || lastTask.taskContent[2].content.length == 0) {
          wx.showToast({
            title: '必填内容不能为空',
            icon:'none',
            duration: 2000
          })
          return
        }

        taskList.push(lastTask)
        wx.setStorageSync(taskListKey, taskList)
        this.onBack()
      } catch (e) {
        // Do something when catch error
      }
    }, 100)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    const { taskid, isShow } = option
    this.setData({
      isDisabled: (isShow == "1")
    })

    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });

    const blockThis = this
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('showTaskInfo', function (dataItem) {
      blockThis.setData({
        lastTask: dataItem.data
      })
    })

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