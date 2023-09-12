const LunarCalendar = require('../my_npm/LunarCalendar')
import type { LunarCalendarObj } from '../my_npm/LunarCalendar-declare'

export interface Day {
  date: Date;
  color?: string;  // 文字颜色
  bgColor?: string; // 单元格背景色
  title1?: string; // 日期
  title2?: string; // 节日(公历节日 > 农历节日 > 节气)
  title3?: string; // 公历节日 || 农历节日 || 节气 || 农历
  title4?: string; // 年月
  title5?: string; // 农历
  title6?: string; // 生肖属相
}

export interface Week {
  index: number;
  text: string;
}

export class Calendar {
  private currentDate: Date;  // 当前选中的日期
  private showDate: Date;  // 当前显示的日期

  private days: Day[];  // 当前月信息
  private currentDay: Day; // 当前天信息

  constructor() {
    this.currentDate = new Date();
    this.showDate = new Date();
    
    // 用于显示当前天信息
    this.currentDay = this.generateDay(this.showDate);

    // 构建展示数据
    this.days = this.generateDays();
  }

  /**
   * 设置当前手动所选日期
   * @param date 日期
   */
  public setCurrentDate(date: Date) {
    // 解决引用问题
    // this.currentDate = date;
    this.currentDate = new Date(date);
  }

  /**
   * 获取当前所选日期
   */
  public getCurrentDate() {
    return this.currentDate
  }

  /**
   * 设置当前显示的三个月的中间月日期
   * @param date 中间月日期
   */
  public setShowDate(date: Date) {
    // 解决引用问题
    // this.showDate = date;
    this.showDate = new Date(date);
  }

  /**
   * 获取当前月信息（用于显示月份日期信息数据）
   */
  public getDays(): Day[] {
    return this.days;
  }

  /**
   * 当前手动选择的日期详细信息（阳历及农历信息）
   */
  public getCurrentDay(): Day {
    return this.currentDay;
  }

  /**
   * 下一个月，并更新显示月份日期数据
   */
  public nextMonth(): void {
    this.showDate.setMonth(this.showDate.getMonth() + 1);
    this.days = this.generateDays();
  }

  /**
   * 前一个月，并更新显示月份日期数据
   */
  public prevMonth(): void {
    this.showDate.setMonth(this.showDate.getMonth() - 1);
    this.days = this.generateDays();
  }

  // Private Method
  /**
   * 构建月份的日期信息
   */
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
      const itemDateObj = new Date(year, month, i);
      var item = this.generateDay(itemDateObj)
      days.push(item);

      // 找到选中不再进行查找
      if (!hasFind) {
        var isCurrent = itemDateObj.getDate() == this.currentDate.getDate() && itemDateObj.getMonth() == this.currentDate.getMonth();

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

  /**
   * 构建显示的日期数据
   * @param obj 
   */
  public generateDay(obj:Date): Day {
    const date = obj.getDate();
    const moth = obj.getMonth();
    const lunarDate: LunarCalendarObj = LunarCalendar.solarToLunar(
      obj.getFullYear(), 
      obj.getMonth() + 1, 
      obj.getDate(),
    );

    var needShowCurrent = (date == this.currentDate.getDate() && moth == this.currentDate.getMonth());

    // 是否是今天
    var today = new Date()
    var isToday = (obj.toDateString() == today.toDateString());

    var title1 = date.toString();
    // 公历节日 > 农历节日 > 节气
    var title2 = lunarDate.solarFestival || lunarDate.lunarFestival || lunarDate.term;
    var title3 = lunarDate.solarFestivalShort || lunarDate.lunarFestival || lunarDate.term || lunarDate.GanZhiDay;
    var title4 = `${obj.getFullYear()}年${obj.getMonth()+1}月`;
    var title5 = `${lunarDate.GanZhiYear} ${lunarDate.lunarMonthName}${lunarDate.lunarDayName}`;
    var title6 = lunarDate.zodiac;

    var color = this.transColor(obj, isToday, needShowCurrent);
    var bgColor = isToday ? 'var(--day-bg-today-color)' : (needShowCurrent ? 'var(--day-bg-select-color)' : 'var(--day-bg-color)');

    return {
      date: obj, 
      color,
      bgColor,
      title1,
      title2,
      title3,
      title4,
      title5,
      title6,
    }
  }

  /**
   * 构建日期中文字颜色数据
   * @param obj 日期
   * @param isToday 是否是今天
   * @param needShowCurrent 是否是手动所选日期
   */
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
