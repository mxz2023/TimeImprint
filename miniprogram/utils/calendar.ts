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
  private days: Day[];
  private currentIndex: number; // 当前日期或当前选中的日期在数据中的索引

  private needShowCurrent: boolean; // 是否需要显示当前天
  private currentDay: Day; // 当前天数据

  constructor() {
    this.currentIndex = -1;
    this.needShowCurrent = true;

    this.currentDate = new Date();
    this.currentDay = this.generateDay(this.currentDate);

    this.days = this.generateDays(this.currentDate);
  }

  private generateDays(date: Date):Day[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const days: Day[] = [];

    //临时变量计算当前天的索引
    var currentIndex = 0;

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthLastDate = prevMonthLastDay.getDate();
    const prevMonthDays = firstDay.getDay();

    // 前一个月需要显示的数据个数
    const prevCount = prevMonthLastDate - prevMonthDays + 1
    for (let i = prevCount; i <= prevMonthLastDate; i++) {
      const prevDateObj = new Date(year, month - 1, i);
      days.push(this.generateDay(prevDateObj))

      currentIndex++
    }

    var hasFind = false
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const curDateObj = new Date(year, month, i);
      var item = this.generateDay(curDateObj)
      days.push(item);

      if (this.currentIndex == -1) {
        var isCurrent = curDateObj.getDate() == this.currentDate.getDate() && curDateObj.getMonth() == this.currentDate.getMonth();

        // 找到当天日期索引
        if (!hasFind && !isCurrent) {
          currentIndex++;
        } else if (isCurrent) {
          hasFind = true;
          this.currentIndex = currentIndex;
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

  public getDays(): Day[] {
    // console.log(this.days)
    return this.days;
  }

  public getCurrentDay(): Day {
    // return this.days[this.currentIndex]
    return this.currentDay;
  }

  public nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    // 判断是否需要显示当前天
    var currentDate = new Date();
    if (currentDate.getMonth() == this.currentDate.getMonth()) {
      this.needShowCurrent = true;
    }else{
      this.needShowCurrent = false;
    }

    this.days = this.generateDays(this.currentDate);
  }

  public prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);

    // 判断是否需要显示当前天
    var currentDate = new Date();
    if (currentDate.getMonth() == this.currentDate.getMonth()) {
      this.needShowCurrent = true;
    }else{
      this.needShowCurrent = false;
    }

    this.days = this.generateDays(this.currentDate);
  }

  public updateCurrentDay(index:number) {
    var oldIndex = this.currentIndex;
    
    var item = this.days[oldIndex];
    var currentItem = this.days[index];
    this.currentDate = currentItem.date;

    item = this.generateDay(item.date);
    this.days[oldIndex] = item
    currentItem = this.generateDay(currentItem.date);
    this.days[index] = currentItem;

    this.currentIndex = index;
    Object.assign(this.currentDay, currentItem);
  }

  // Private Method
  private generateDay(obj:Date): Day {
    const date = obj.getDate();
    const moth = obj.getMonth();
    const lunarDate: LunarCalendarObj = LunarCalendar.solarToLunar(
      obj.getFullYear(), 
      obj.getMonth() + 1, 
      obj.getDate(),
    );

    var needShowCurrent = this.needShowCurrent && (date == this.currentDate.getDate() && moth == this.currentDate.getMonth());

    return {
      date: obj, 
      title1: date.toString(),
      title2: lunarDate.GanZhiDay,
      color: this.transColor(obj),
      bgColor : needShowCurrent ? 'var(--day-bg-select-color)' : 'var(--day-bg-color)',
      title3: `${obj.getFullYear()}年${obj.getMonth()+1}月 农历${lunarDate.lunarMonthName}${lunarDate.lunarDayName}`,
      title4: `${lunarDate.GanZhiYear}年${lunarDate.GanZhiMonth}月${lunarDate.GanZhiDay}日【属${lunarDate.zodiac}】`,
    }
  }

  private transColor(obj:Date): string {
    const moth = obj.getMonth();
    const date = obj.getDate();
    const week = obj.getDay();
    
    if (this.needShowCurrent && date == this.currentDate.getDate()) {
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
