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
   * 获取当前月信息
   */
  public getCurrentMonth() {
    var year = this.currentDay.date.getFullYear();
    var month = this.currentDay.date.getMonth() + 1;
    var res = `${year}年${month}月`;
    var resFormat = `${year}-${month}`
    return {res,resFormat};
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
    this.updateCurrentDate(day.date);
  }

  /**
   * 当调整月份和年份时，变更日期
   * @param date 日期
   */
  public changeCurrentDate(date: Date) {
    this.updateCurrentDate(date);
  }

  /**
   * 上一个月
   */
  public prevMonth() {
    // this.calendar.prevMonth();
    // this.threeMonthDays = this.generateShowDays()

    var day = this.calendar.getCurrentDay()
    var date = new Date(day.date.getFullYear(), day.date.getMonth()-1, day.date.getDate());
    this.updateCurrentDate(date);
  }

  /**
   * 下一个月
   */
  public nextMonth() {
    // this.calendar.nextMonth();
    // this.threeMonthDays = this.generateShowDays();

    var day = this.calendar.getCurrentDay()
    var date = new Date(day.date.getFullYear(), day.date.getMonth()+1, day.date.getDate());
    this.updateCurrentDate(date);
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
   * 是否需要显示“今”
   */
  public needShowToday() :boolean {
    var isSameMonth = this.today.date.getMonth() == this.currentDay.date.getMonth();
    var isSameYear = this.today.date.getFullYear() == this.currentDay.date.getFullYear()
    return (!isSameMonth) || (!isSameYear)
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

  private updateCurrentDate(date:Date) {
    this.calendar.setCurrentDate(date);
    this.calendar.setShowDate(date);
    this.threeMonthDays = this.generateShowDays()

    // 更新当前所选天信息
    var today = this.calendar.getCurrentDay();
    // 解决引用问题
    Object.assign(this.currentDay, today);
  }
}

export const gDataCenter:DataCenter = new DataCenter();