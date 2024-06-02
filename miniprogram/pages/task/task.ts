// pages/task/task.ts
import { task_title, task_abcde } from "../../data/config_task"
import { taskListKey } from "../../data/config_storage"
import { Task, TaskState } from '../../model/data_task'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "打卡 📌",

    configTitle: task_title,   // 标题设置
    configItems: task_abcde,   // 项设置

    // 展示数据
    lastTask: new Task(),
    // 保存数据
    dataTask: new Task(),

    state: TaskState.TaskStateDefault, // 当前状态

    mode: "",     // 无用变量，特殊用法，见onShowPicker和onHidePicker
    dateVisible: false,   // picker开关变量 `${mode}Visible`

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
    var { state } = this.data
    if (state == TaskState.TaskStateEdit) {
      var copyData = JSON.parse(JSON.stringify(this.data.dataTask));
      this.setData({
        state: TaskState.TaskStateShow,
        lastTask: copyData
      })
    } else if (state == TaskState.TaskStateShow) {
      this.setData({
        state: TaskState.TaskStateEdit
      })
    }
  },

  onPushTask(_: WechatMiniprogram.CustomEvent) {
    var { state } = this.data
    switch (state) {
      case TaskState.TaskStateDefault: {
        if (this.handleSaveTask()) {
          this.onBack()
        }
        break;
      }
      case TaskState.TaskStateShow: {
        this.handleCleanContent()
        break;
      }
      case TaskState.TaskStateEdit: {
        if (this.handleSaveTask()) {
          this.onBack()
        }
        break;
      }
      case TaskState.TaskStateMore: {
        if (this.handleSaveTask()) {
          this.onBack()
        }
        break;
      }
      default: {
        break;
      }
    }
  },

  handleSaveTask():boolean {
    var { lastTask, state } = this.data
    if (lastTask.taskTitle.length == 0) {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (lastTask.taskContent[0].content.length == 0 || lastTask.taskContent[1].content.length == 0 || lastTask.taskContent[2].content.length == 0) {
      wx.showToast({
        title: '必填内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (state == TaskState.TaskStateDefault ||state == TaskState.TaskStateMore) {
      lastTask.taskId = Number(this.generateUniqueId())
    } 

    var taskList: Array<Task> = wx.getStorageSync(taskListKey)
    if (!taskList) {
      taskList = new Array<Task>()
      taskList.push(lastTask)
    } else {
      if (state == TaskState.TaskStateDefault ||state == TaskState.TaskStateMore) {
        taskList.push(lastTask)
      } else {
        for(var i = 0; i < taskList.length; i++) {
          const item = taskList[i]
          if (item.taskId == lastTask.taskId) {
            Object.assign(item, lastTask)
            break
          }
        }
      }
    }
    wx.setStorageSync(taskListKey, taskList)
    return true
  },

  handleCleanContent() {
    var { lastTask } = this.data
    lastTask.taskTotal = lastTask.taskTotal + 1
    lastTask.taskContent.forEach((item)=>{
      item.content = ""
    })
    this.setData({
      lastTask: lastTask,
      state: TaskState.TaskStateMore
    })
  },

  generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16) + '-' + Date.now().toString(36);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    const { state } = option
    if (state) {
      var taskState = Number(state)
      // 为后面请求数据做准备
      let { lastTask } = this.data
      if (taskState == 0) {
        lastTask.taskId = Number(this.generateUniqueId())
      }
      this.setData({
        state: taskState,
        lastTask: lastTask
      })
    }

    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel.on) {
      // 先父页面发送信息
      //eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });

      const blockThis = this
      eventChannel.on('showTaskInfo', function (dataItem) {
        var copyData1 = JSON.parse(JSON.stringify(dataItem.data));
        var copyData2 = JSON.parse(JSON.stringify(dataItem.data));
        blockThis.setData({
          state: TaskState.TaskStateShow,
          lastTask: copyData1,
          dataTask: copyData2,
        })
      })
    }
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