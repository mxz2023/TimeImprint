import { Day, Calendar } from '../utils/calendar'

export class DataCenter {
  private calendar : Calendar;
  private today: Day;
  private currentDay: Day;
  private threeMonthDays: any[];  // 三个月数据

  constructor() {
    this.calendar = new Calendar();
    this.threeMonthDays = [];
    
    this.generateDays(this.threeMonthDays)
  }

  public getCurrentDay() {
    return this.currentDay;
  }

  public getThreeMonthDays() {
    return this.threeMonthDays;
  }

  public updateCurrentDay(index1: number, index2: number) {
    var day = this.threeMonthDays[index1][index2]
    this.calendar.changeCurrentDate(day.date);

    this.threeMonthDays = []
    this.generateDays(this.threeMonthDays)
  }

  private generateDays(threeMonthDays: any[]) {

    // 构建今天的详细信息
    this.today = this.calendar.getCurrentDay();
    this.currentDay = this.today;

    // 前一个月数据
    this.calendar.prevMonth();
    var prevMonthDays = this.calendar.getDays();
    threeMonthDays.push(prevMonthDays);

    // 当月数据
    this.calendar.nextMonth(); //切换到当前月
    var currentMonthDays = this.calendar.getDays();
    threeMonthDays.push(currentMonthDays);

    // 后一个月数据
    this.calendar.nextMonth();
    var nextMothDays = this.calendar.getDays();
    threeMonthDays.push(nextMothDays);
  }
}