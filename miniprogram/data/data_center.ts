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

    this.threeMonthDays = this.generateShowDays()
  }

  /**
   * 获取手动所选日期信息
   */
  public getCurrentDay() {
    var day = this.currentDay
    return day;
  }

  /**
   * 获取界面显示日期数据
   */
  public getThreeMonthDays() {
    var days = this.threeMonthDays
    return days;
  }

  /**
   * 更新当前手动所选日期
   * @param index1 所在显示月索引
   * @param index2 所在月的日期索引
   */
  public updateCurrentDay(index1: number, index2: number) {
    var day = this.threeMonthDays[index1][index2]
    this.calendar.setCurrentDate(day.date);
    this.calendar.setShowDate(day.date);
    this.threeMonthDays = this.generateShowDays()

    // 更新当前所选天信息
    var today = this.calendar.getCurrentDay();
    // 解决引用问题
    Object.assign(this.currentDay, today);
  }

  /**
   * 上一个月
   */
  public prevMonth() {
    this.calendar.prevMonth();
    this.threeMonthDays = this.generateShowDays()
  }

  /**
   * 下一个月
   */
  public nextMonth() {
    this.calendar.nextMonth();
    this.threeMonthDays = this.generateShowDays()
  }
  
  /**
   * 定位到今天
   */
  public locationToday() {
    var todayObj = new Date()
    this.calendar.setCurrentDate(todayObj);
    this.calendar.setShowDate(todayObj);
    this.threeMonthDays = this.generateShowDays()

    // 更新当前所选天信息
    var today = this.calendar.getCurrentDay();
    // 解决引用问题
    Object.assign(this.currentDay, today);
  }

  /**
   * 构建
   * @param threeMonthDays 保存界面显示的日期数据
   */
  private generateShowDays() :any[] {
    var threeMonthDays = []
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

    // 复原当月
    this.calendar.prevMonth();
    return threeMonthDays
  }
}