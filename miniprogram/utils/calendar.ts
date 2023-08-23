export interface Day {
  date: Date;
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
  text: string;
}

export interface Week {
  index: number;
  text: string;
}

export class Calendar {
  private currentDate: Date;
  private days: Day[];

  constructor() {
    this.currentDate = new Date();
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
      const prevMonthDate = new Date(year, month - 1, i);
      days.push({ 
        date: prevMonthDate, 
        isCurrentMonth: false, 
        isCurrentDay: false, 
        text: prevMonthDate.getDate().toString()
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isCurrentDay: currentDate.getDate() == date.getDate(),
        text: currentDate.getDate().toString()
      });
    }

    // Add days from next month
    const nextMonthDays = 7 - lastDay.getDay() - 1;
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      days.push({
        date: nextMonthDate, 
        isCurrentMonth: false,
        isCurrentDay: false,
        text: nextMonthDate.getDate().toString() });
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
