const LunarCalendar = require('../my_npm/LunarCalendar')
import type { LunarCalendarObj } from '../my_npm/LunarCalendar-declare'

export interface Day {
  date: Date;
  title1: string;
  title2: string;
  color: string;
  bgColor: string;
}

export interface Week {
  index: number;
  text: string;
}

export class Calendar {
  private currentDate: Date;
  private lunarDate: LunarCalendarObj;
  private days: Day[];

  constructor() {
    this.currentDate = new Date();

    this.lunarDate = LunarCalendar.solarToLunar(
      this.currentDate.getFullYear(), 
      this.currentDate.getMonth() + 1, 
      this.currentDate.getDate()
    );

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

      const prevLunarDate: LunarCalendarObj = LunarCalendar.solarToLunar(
        prevDateObj.getFullYear(), 
        prevDateObj.getMonth() + 1, 
        prevDateObj.getDate()
      );

      days.push({ 
        date: prevDateObj, 
        title1: prevDate.toString(),
        title2: prevLunarDate.GanZhiDay,
        color : (prevWeek == 0 || prevWeek == 6) ? 'var(--day-disable-weekend-color)' : 'var(--day-disable-color)',
        bgColor : 'var(--day-bg-color)',
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const curDateObj = new Date(year, month, i);
      const curDate = curDateObj.getDate();
      const week = curDateObj.getDay();
      
      const curLunarDate: LunarCalendarObj = LunarCalendar.solarToLunar(
        curDateObj.getFullYear(), 
        curDateObj.getMonth() + 1, 
        curDateObj.getDate()
      );

      days.push({
        date: curDateObj,
        title1: curDate.toString(),
        title2: curLunarDate.GanZhiDay,
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

      const nextLunarDate: LunarCalendarObj = LunarCalendar.solarToLunar(
        nextDateObj.getFullYear(), 
        nextDateObj.getMonth() + 1, 
        nextDateObj.getDate()
      );

      days.push({
        date: nextDateObj, 
        title1: nextDate.toString(),
        title2: nextLunarDate.GanZhiDay,
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
}
