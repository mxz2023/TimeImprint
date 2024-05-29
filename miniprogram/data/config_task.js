
var fontsize = 22
var maxlength = 30

module.exports = {
  "task_title": {
    "icon":"letters-h",
    "iconSize": "32px",
    "size": "24px",
    "color": "var(--cyan-color)",
    "text": "标题",
    "tipIcon": "calendar-edit",
    "tipSize": "24px",
    "tipColor": "var(--grey10-color)",
    "tipTextSize": "12px",
    "tipTextColor": "var(--grey5-color)",
    "start": "1984-01-01",
    "end": "2134-12-31",
  },

  "task_abcde": [
    {
      "icon": "letters-a",
      "size": fontsize,
      "color": "var(--red-color)",
      "text": "事情",
      "target": "event",
      "index": "0",
      "placeholder": "请输入什么事情",
      "maxlength": maxlength
    },
    {
      "icon": "letters-b",
      "size": fontsize,
      "color": "var(--yellow-color)",
      "text": "想法",
      "target": "idea",
      "index": "1",
      "placeholder": "请输入什么想法",
      "maxlength": maxlength
    },
    {
      "icon": "letters-c",
      "size": fontsize,
      "color": "var(--blue-color)",
      "text": "情绪",
      "target": "feeling",
      "index": "2",
      "placeholder": "请输入什么情绪",
      "maxlength": maxlength
    },
    {
      "icon": "letters-d",
      "size": fontsize,
      "color": "var(--green-color)",
      "text": "反驳",
      "target": "oppose",
      "index": "3",
      "placeholder": "请输入怎么反驳",
      "maxlength": maxlength
    },
    {
      "icon": "letters-e",
      "size": fontsize,
      "color": "var(--pink-color)",
      "text": "激发",
      "target": "new_feeling",
      "index": "4",
      "placeholder": "请输入激发情绪",
      "maxlength": maxlength
    }
  ]
}
