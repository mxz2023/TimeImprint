// eventBus.js

interface ArrayFunctionDictionary {
  [key: string]: ((param:any) => void)[];
}
type FunctionType = (param: any) => void;


class EventBus {
  private static instance: EventBus;
  private events: ArrayFunctionDictionary

  private constructor() {
    this.events = {}
  }

  public static getInstance(): EventBus {
    // 如果实例不存在，则创建它；否则返回已有的实例
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  emit(event:string, data:any) {
    (this.events[event] || []).forEach(callback => {
      callback(data);
    });
  }

  on(event:string, callback:FunctionType) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event:string, callback:FunctionType) {
    if (!this.events[event]){
      return
    }
    const index = this.events[event].indexOf(callback);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
  }
};
