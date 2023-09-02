const LunarCalendar = require('../my_npm/LunarCalendar')
import type { LunarCalendarObj } from '../my_npm/LunarCalendar-declare'

export interface Day {
  date: Date;
  title1: string; // 日期
  title2: string; // 农历
  color: string;  // 文字颜色
  bgColor: string; // 单元格背景色
  title3: string; // 详细日期
  title4: string; // 详细农历（节日）
}

export interface Week {
  index: number;
  text: string;
}

export class Calendar {
  private currentDate: Date;  // 当前日期或当前选中的日期
  private lunarDate: LunarCalendarObj;
  private days: Day[];
  private currentIndex: number; // 当前日期或当前选中的日期在数据中的索引

  constructor() {
    this.currentDate = new Date();

    this.lunarDate = LunarCalendar.solarToLunar(
      this.currentDate.getFullYear(), 
      this.currentDate.getMonth() + 1, 
      this.currentDate.getDate(),
    );

    this.days = this.generateDays(this.currentDate);
  }

  private generateDays(date: Date):Day[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const days: Day[] = [];

    //默认为0
    this.currentIndex = 0;

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthLastDate = prevMonthLastDay.getDate();
    const prevMonthDays = firstDay.getDay();

    // 前一个月需要显示的数据个数
    const prevCount = prevMonthLastDate - prevMonthDays + 1
    for (let i = prevCount; i <= prevMonthLastDate; i++) {
      const prevDateObj = new Date(year, month - 1, i);
      days.push(this.generateDay(prevDateObj))

      this.currentIndex++
    }

    var hasFind = false
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const curDateObj = new Date(year, month, i);
      days.push(this.generateDay(curDateObj));

      var isCurrent = curDateObj.getDate() == this.currentDate.getDate() && curDateObj.getMonth() == this.currentDate.getMonth();

      // 找到当天日期索引
      if (!hasFind && !isCurrent) {
        this.currentIndex++;
      } else if (isCurrent) {
        hasFind = true
      }
    }

    // Add days from next month
    const nextMonthDays = 7 - lastDay.getDay() - 1;
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextDateObj = new Date(year, month + 1, i);
      days.push(this.generateDay(nextDateObj));
    }

    return days;
  }

  public getDays(): Day[] {
    console.log(this.days)
    return this.days;
  }

  public getCurrentDay(): Day {
    return this.days[this.currentIndex]
  }

  public nextDays(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.days = this.generateDays(this.currentDate);

    this.updateLunarDate()
  }

  public prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.days = this.generateDays(this.currentDate);

    this.updateLunarDate()
  }

  private updateLunarDate():void {
    this.lunarDate = LunarCalendar.solarToLunar(
      this.currentDate.getFullYear(), 
      this.currentDate.getMonth() + 1, 
      this.currentDate.getDate()
    );
  }

  private generateDay(obj:Date): Day {
    const date = obj.getDate();
    const moth = obj.getMonth();
    const lunarDate: LunarCalendarObj = LunarCalendar.solarToLunar(
      obj.getFullYear(), 
      obj.getMonth() + 1, 
      obj.getDate()
    );

    var isCurrent = date == this.currentDate.getDate() && moth == this.currentDate.getMonth();

    return {
      date: obj, 
        title1: date.toString(),
        title2: lunarDate.GanZhiDay,
        color: this.transColor(obj),
        bgColor : isCurrent ? 'var(--day-bg-select-color)' : 'var(--day-bg-color)',
        title3: `${obj.getFullYear()}年${obj.getMonth()+1}月 农历${lunarDate.lunarMonthName}${lunarDate.lunarDayName}`,
        title4: `${lunarDate.GanZhiYear}年${lunarDate.GanZhiMonth}月${lunarDate.GanZhiDay}日【属${lunarDate.zodiac}】`,
    }
  }

  private transColor(obj:Date): string {
    const moth = obj.getMonth();
    const date = obj.getDate();
    const week = obj.getDay();
    
    if (date == this.currentDate.getDate()) {
      return 'var(--day-select-color)';
    } else if (moth == this.currentDate.getMonth()) {
      if (week == 0 || week == 6) {
        return 'var(--day-weekend-color)'
      } else {
        return 'var(--day-default-color)'
      }
    } else {
      if (week == 0 || week == 6) {
        return 'var(--day-disable-weekend-color)'
      } else {
        return 'var(--day-disable-color)'
      }
    }
  }
}
