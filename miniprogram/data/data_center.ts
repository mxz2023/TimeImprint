import { Day, Calendar } from '../utils/calendar'

export class DataCenter {
  private calendar : Calendar;
  private today: Day;
  private currentDay: Day;
  private threeMonthDays: any[];  // 三个月数据

  constructor() {
    this.calendar = new Calendar();
    this.threeMonthDays = [];
    this.today = {date: new Date()};
    this.currentDay = {date: new Date()};

    // 构建今天的详细信息
    var today = this.calendar.getCurrentDay();
    // 解决引用问题
    Object.assign(this.today, today);
    Object.assign(this.currentDay, today)

    this.generateShowDays(this.threeMonthDays)
  }

  public getCurrentDay() {
    var day = this.currentDay
    return day;
  }

  public getThreeMonthDays() {
    var days = this.threeMonthDays
    return days;
  }

  public updateCurrentDay(index1: number, index2: number) {
    var day = this.threeMonthDays[index1][index2]
    this.calendar.setCurrentDate(day.date);
    this.calendar.setShowDate(day.date);

    this.threeMonthDays = []
    this.generateShowDays(this.threeMonthDays)
  }

  public prevMonth() {
    console.log("前一个月");
    this.calendar.prevMonth();

    this.threeMonthDays = []
    this.generateShowDays(this.threeMonthDays)
  }

  public nextMonth() {
    console.log("后一个月");
    this.calendar.nextMonth();

    this.threeMonthDays = []
    this.generateShowDays(this.threeMonthDays)
  }
  
  public locationToday() {
    var today = new Date()
    this.calendar.setShowDate(today);

    this.threeMonthDays = []
    this.generateShowDays(this.threeMonthDays)
  }

  private generateShowDays(threeMonthDays: any[]) {
    // 前一个月数据
    this.calendar.isManual = true
    this.calendar.prevMonth();
    var prevMonthDays = this.calendar.getDays();
    threeMonthDays.push(prevMonthDays);

    // 当月数据
    this.calendar.isManual = false
    this.calendar.nextMonth(); //切换到当前月
    var currentMonthDays = this.calendar.getDays();
    threeMonthDays.push(currentMonthDays);

    // 后一个月数据
    this.calendar.isManual = true
    this.calendar.nextMonth();
    var nextMothDays = this.calendar.getDays();
    threeMonthDays.push(nextMothDays);

    // 复原当月
    this.calendar.prevMonth();

    // 更新当前所选天信息
    var today = this.calendar.getCurrentDay();
    // 解决引用问题
    Object.assign(this.currentDay, today)
  }
}