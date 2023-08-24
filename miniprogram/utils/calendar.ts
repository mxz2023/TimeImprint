import { solarToLunar } from "lunar-calendar"
const LunarCalendar = require('lunar-calendar')

export interface Day {
  date: Date;
  text: string;
  color: string;
  bgColor: string;
}

export interface Week {
  index: number;
  text: string;
}

export class Calendar {
  private currentDate: Date;
  private lunarDate: Object;
  private days: Day[];

  constructor() {
    this.currentDate = new Date();

    console.log(LunarCalendar)
    console.log(solarToLunar)
    // this.lunarDate = solarToLunar(
    //   this.currentDate.getFullYear(), 
    //   this.currentDate.getMonth() + 1, 
    //   this.currentDate.getDate());

    this.days = this.generateDays(this.currentDate);
  }

  private generateDays(date: Date):Day[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const days: Day[] = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthLastDate = prevMonthLastDay.getDate();
    const prevMonthDays = firstDay.getDay();
    for (let i = prevMonthLastDate - prevMonthDays + 1; i <= prevMonthLastDate; i++) {
      const prevDateObj = new Date(year, month - 1, i);
      const prevDate = prevDateObj.getDate();
      const prevWeek = prevDateObj.getDay();
      days.push({ 
        date: prevDateObj, 
        text: prevDate.toString(),
        color : (prevWeek == 0 || prevWeek == 6) ? 'var(--day-disable-weekend-color)' : 'var(--day-disable-color)',
        bgColor : 'var(--day-bg-color)',
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const curDateObj = new Date(year, month, i);
      const curDate = curDateObj.getDate();
      const week = curDateObj.getDay();
      days.push({
        date: curDateObj,
        text: curDate.toString(),
        color: curDate == date.getDate() ? 'var(--day-select-color)' : (week == 0 || week == 6) ? 'var(--day-weekend-color)' : 'var(--day-default-color)',
        bgColor : curDate == date.getDate() ? 'var(--day-bg-select-color)' : 'var(--day-bg-color)'
      });
    }

    // Add days from next month
    const nextMonthDays = 7 - lastDay.getDay() - 1;
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextDateObj = new Date(year, month + 1, i);
      const nextDate = nextDateObj.getDate();
      const nextWeek = nextDateObj.getDay();
      days.push({
        date: nextDateObj, 
        text: nextDate.toString(),
        color : (nextWeek == 0 || nextWeek == 6)  ? 'var(--day-disable-weekend-color)' : 'var(--day-disable-color)',
        bgColor : 'var(--day-bg-color)',
      });
    }

    return days;
  }

  public getDays(): Day[] {
    console.log(this.days)
    return this.days;
  }

  public nextDays(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.days = this.generateDays(this.currentDate);
  }

  public prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.days = this.generateDays(this.currentDate);
  }
}
