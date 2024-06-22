// pages/cloud/cloud.ts
import { DataBase } from "../../utils/database"
import { formatDate } from "../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "云开发",

    listData:[
      [
        {
          "name":"获取数据",
          "option":"get"
        },
        {
          "name":"添加数据",
          "option":"add"
        },
      ],
      [
        {
          "name":"保留",
          "option":"getData"
        },
      ]
    ],
  },

  onHandleOption(event: any) {
    /**
     * taskId: string = "";             // 事件id
     * taskTitle: string = "";         // 标题
     * taskCreateTime: Date = new Date()      // 创建时间
     * taskModifyTime: Date = new Date()      // 修改时间
     * taskTotal: number = 1           // 累计打卡天数                   
     * taskContent: Array<TaskContentItem> = []       // 内容
     */
     /**
      * type: number = 1;   // 1、表示ABCDE；2、待定
      * index: number = 1;  // item索引，当type为1时，索引表示ABCDE
      * content: string = "";   // item内容
      */
    let data = event.currentTarget.dataset.item;
    switch(data.option) {
      case "add":{
        DataBase.getInstance().addTask({
          "taskTitle":"坚持情绪打卡",
          "taskCreateTime": formatDate(new Date()),
          "taskModifyTime": formatDate(new Date()),
          "taskTotal": 1,
          "taskContent": [
            {
              "type":1,
              "index":1,
              "content":"程序要上线了"
            },
            {
              "type":1,
              "index":2,
              "content":"终于有自己的小程序了"
            },
            {
              "type":1,
              "index":3,
              "content":"开心"
            }
          ]
        })
        break
      }
      case "get":{
        // db.collection("taskList").get().then((res)=>{
        //   console.log(res)
        // })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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