export interface LunarCalendarObj {
  zodiac: string
  
  GanZhiYear: string
  GanZhiMonth: string
  GanZhiDay: string

  lunarYear : number,
  lunarMonth : number,
  lunarDay : number,

  lunarMonthName : string,
  lunarDayName : string,
  lunarLeapMonth : string,
  
  // 放假安排：0无特殊安排，1工作，2放假
  worktime : number,

  term : string,

  solarFestival : string,

  lunarFestival : string
}