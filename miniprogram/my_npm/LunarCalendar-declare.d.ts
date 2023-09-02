export interface LunarCalendarObj {
  zodiac: string  // 生肖
  
  // 天干地支 癸卯 庚申 丁巳
  GanZhiYear: string
  GanZhiMonth: string
  GanZhiDay: string

  // 公历2023年9月2日
  lunarYear : number,
  lunarMonth : number,
  lunarDay : number,

  // 农历 七月十二
  lunarMonthName : string,
  lunarDayName : string,

  // 闰月
  lunarLeapMonth : string,
  
  // 放假安排：0无特殊安排，1工作，2放假
  worktime : number,

  // 二十四节气
  term : string,

  // 公历节日
  solarFestival : string,

  // 农历节日
  lunarFestival : string
}