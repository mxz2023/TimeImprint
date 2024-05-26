export interface Task {
  taskid: string;   // 活动id
  title: string;    // 标题
  content: string;  // 活动内容
  begin: Date;    // 开始时间
  end: Date;      // 结束时间
}