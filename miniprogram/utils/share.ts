
export function shareAppMessage(from?:string, target?:string) {
  if (from === 'button') {
    // 来自页面内转发按钮
    console.log(target)
  }
  return {
    title: "欢迎使用，让时间证明一起",
    path: '/page/index/index?id=123'
  }
}

export function shareTimeline() {
  return {
    title: '自定义转发标题',
    query: 'id=123'
  }
}