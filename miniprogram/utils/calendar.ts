const LunarCalendar = require('../my_npm/LunarCalendar')
import type { LunarCalendarObj } from '../my_npm/LunarCalendar-declare'

export interface Day {
  date: Date;
  title1?: string; // 日期
  title2?: string; // 农历
  color?: string;  // 文字颜色
  bgColor?: string; // 单元格背景色
  title3?: string; // 详细日期
  title4?: string; // 详细农历（节日）
}

export interface Week {
  index: number;
  text: string;
}

export class Calendar {
  private currentDate: Date;  // 当前选中的日期
  private days: Day[];  // 当前选中日期所在月的日期情况
  private currentDay: Day; // 当前天数据

  public isManual: boolean; // 标记当前是否为中间月
  private showDate: Date;  // 当前显示的日期

  constructor() {
    this.currentDate = new Date();
    this.showDate = new Date();
    
    // 用于显示当前天信息
    this.currentDay = this.generateDay(this.showDate);

    // 构建展示数据
    this.days = this.generateDays();

    this.isManual = false
  }
  
  public getCurrentDate() {
    return this.currentDate;
  }

  public setCurrentDate(date: Date) {
    this.currentDate = date;
    this.showDate = date;
  }

  public getDays(): Day[] {
    return this.days;
  }

  public getCurrentDay(): Day {
    return this.currentDay;
  }

  public nextMonth(): void {
    this.showDate.setMonth(this.showDate.getMonth() + 1);
    this.days = this.generateDays();
  }

  public prevMonth(): void {
    this.showDate.setMonth(this.showDate.getMonth() - 1);
    this.days = this.generateDays();
  }

  // Private Method
  private generateDays():Day[] {
    var date = this.showDate
    
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const days: Day[] = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthLastDate = prevMonthLastDay.getDate();
    const prevMonthDays = firstDay.getDay();

    // 前一个月需要显示的数据个数
    const prevCount = prevMonthLastDate - prevMonthDays + 1
    for (let i = prevCount; i <= prevMonthLastDate; i++) {
      const prevDateObj = new Date(year, month - 1, i);
      days.push(this.generateDay(prevDateObj))
    }

    var hasFind = false
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const curDateObj = new Date(year, month, i);
      var item = this.generateDay(curDateObj)
      days.push(item);

      // 找到选中不再进行查找
      if (!hasFind) {
        var isCurrent = curDateObj.getDate() == this.currentDate.getDate() && curDateObj.getMonth() == this.currentDate.getMonth();

        // 找到当天日期索引
        if (isCurrent) {
          hasFind = true;
          Object.assign(this.currentDay, item);
        }
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

  public generateDay(obj:Date): Day {
    const date = obj.getDate();
    const moth = obj.getMonth();
    const lunarDate: LunarCalendarObj = LunarCalendar.solarToLunar(
      obj.getFullYear(), 
      obj.getMonth() + 1, 
      obj.getDate(),
    );

    var needShowCurrent = !this.isManual && (date == this.currentDate.getDate() && moth == this.currentDate.getMonth());

    // 是否是今天
    var today = new Date()
    var isToday = (obj.toDateString() == today.toDateString());

    return {
      date: obj, 
      title1: date.toString(),
      title2: lunarDate.GanZhiDay,
      color: this.transColor(obj, isToday, needShowCurrent),
      bgColor : isToday ? 'var(--day-bg-today-color)' : (needShowCurrent ? 'var(--day-bg-select-color)' : 'var(--day-bg-color)'),
      title3: `${obj.getFullYear()}年${obj.getMonth()+1}月 农历${lunarDate.lunarMonthName}${lunarDate.lunarDayName}`,
      title4: `${lunarDate.GanZhiYear}年${lunarDate.GanZhiMonth}月${lunarDate.GanZhiDay}日【属${lunarDate.zodiac}】`,
    }
  }

  private transColor(obj:Date, isToday: boolean, needShowCurrent: boolean): string {
    const moth = obj.getMonth();
    const week = obj.getDay();
  
    if (isToday || needShowCurrent) {
      return 'var(--day-select-color)';
    } else if (moth == this.showDate.getMonth()) {
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
