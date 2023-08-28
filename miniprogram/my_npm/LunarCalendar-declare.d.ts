export interface LunarCalendarObj {
  zodiac: string // getYearZodiac(GanZhiYear)
  GanZhiYear: string // getLunarYearName(GanZhiYear),
  GanZhiMonth: string // getLunarMonthName(year,GanZhiMonth),
  GanZhiDay: string // getLunarDayName(year,month,day),
  // //放假安排：0无特殊安排，1工作，2放假
  // worktime : worktime['y'+year] && worktime['y'+year][formateDayD4(month,day)] ? worktime['y'+year][formateDayD4(month,day)] : 0,
  // term : termList[formateDayD4(month,day)],
  
  // lunarYear : lunarDate[0],
  // lunarMonth : lunarDate[1]+1,
  // lunarDay : lunarDate[2],
  // lunarMonthName : lunarMonthName,
  // lunarDayName : DATA.dateCn[lunarDate[2]-1],
  // lunarLeapMonth : lunarLeapMonth,
  
  // solarFestival : solarFestival[formateDayD4(month,day)],
  // lunarFestival : lunarFtv
}