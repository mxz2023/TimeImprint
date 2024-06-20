
export interface DataBaseTask {
  taskId: string
  taskTitle: string
  taskCreateTime: Date
  taskModifyTime: Date
  taskTotal: number   
  taskContent: Array<DataBaseTaskContentItem> 
}

export interface DataBaseTaskContentItem {
  type: number
  index: number
  content: string
}


export class DataBase {
  private static instance: DataBase;
  private db: DB.Database

  // 私有化构造函数，防止外部通过 new 关键字创建实例
  private constructor() {
    // 初始化操作
    this.db = wx.cloud.database()
  }

  // 提供一个静态方法来获取这个类的实例
  public static getInstance(): DataBase {
    // 如果实例不存在，则创建它；否则返回已有的实例
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }

  // 添加任务
  public addTask(task:DataBaseTask): void {
    this.db.collection("taskList").add({
      data:task
    })
  }
}