export interface Event {
  eventid: string; // 事件id
  taskid: string;  // 活动id，多个事件可以参与一个活动。活动id为0，表示未参与活动。
  title: string;   // 标题
  time: Date       // 时间
  total: number    // 大于0表示累计
  centent: [       // 内容
    {
      type: number;   // 1、表示ABCDE；2、待定
      index: number;  // item索引，当type为1时，索引表示ABCDE
      text: string;   // item内容
      extend?: {
        type: number;   // 当type=1，index=4时，表示反驳中最好、最坏、最可能
        centent:[
          {
            text:string;
          },
          {
            text:string;
          },
          {
            text:string;
          }
        ]
      }
    }
  ]
}