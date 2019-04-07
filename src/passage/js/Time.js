import Data from './Data';

const DAYS = Data.get('days');
const MONTHS = Data.get('months');
const MONTH_DAYS = Data.get('monthDays');

// splits time into units and relates those units to each other
// gets called by updateTime every TICK_DELAY milliseconds

// TODO: optimize performance of this, surely it's bad

function tickTime() {
  // the magic object with all the time data
  // the present passing current moment
  let pc = {
    thisMoment: {},
    current: {},
    msInA: {},
    utt: {},
    passage: {},
    display: {}
  };

  // get the current time
  pc.thisMoment = {};
  pc.thisMoment = new Date();

  // slice current time into units
  pc.current = {
    ms: pc.thisMoment.getMilliseconds(),
    second: pc.thisMoment.getSeconds(),
    minute: pc.thisMoment.getMinutes(),
    hour: pc.thisMoment.getHours(),
    day: pc.thisMoment.getDay(),
    date: pc.thisMoment.getDate(),
    week: weekOfYear(pc.thisMoment),
    month: pc.thisMoment.getMonth(),
    year: pc.thisMoment.getFullYear()
  };

  // TODO: display day of week and month name
  let dayOfWeek = DAYS[pc.current.day];
  let monthName = MONTHS[pc.current.month];

  // returns the week no. out of the year
  function weekOfYear(d) {
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
  }

  // set the slice conversions based on pc.thisMoment
  pc.msInA.ms = 1;
  pc.msInA.second = 1000;
  pc.msInA.minute = pc.msInA.second * 60;
  pc.msInA.hour = pc.msInA.minute * 60;
  pc.msInA.day = pc.msInA.hour * 24;
  pc.msInA.week = pc.msInA.day * 7;
  pc.msInA.month = pc.msInA.day * MONTH_DAYS[pc.current.month - 1];
  pc.msInA.year = pc.msInA.day * daysThisYear(pc.current.year);

  // handle leap years
  function daysThisYear(year) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      MONTH_DAYS[1] = 29;
      return 366;
    } else {
      return 365;
    }
  }

  // utt means UpToThis
  // calculates the count in ms of each unit that has passed
  pc.utt.ms = pc.current.ms;
  pc.utt.second = pc.current.second * pc.msInA.second + pc.utt.ms;
  pc.utt.minute = pc.current.minute * pc.msInA.minute + pc.utt.second;
  pc.utt.hour = pc.current.hour * pc.msInA.hour + pc.utt.minute;
  pc.utt.day = pc.current.day * pc.msInA.day + pc.utt.hour;
  pc.utt.week = pc.current.week * pc.msInA.week + pc.utt.day;
  pc.utt.date = pc.current.date * pc.msInA.day + pc.utt.hour;
  pc.utt.month = pc.current.month + 1 * pc.msInA.month + pc.utt.date;
  pc.utt.year = pc.current.year * pc.msInA.year + pc.utt.month;

  // calculates the proportion/ratio of each unit that has passed
  // used to display percentages
  pc.passage = {
    ms: pc.current.ms / 100,
    second: pc.current.ms / pc.msInA.second,
    minute: pc.utt.second / pc.msInA.minute,
    hour: pc.utt.minute / pc.msInA.hour,
    day: pc.utt.hour / pc.msInA.day,
    week: pc.utt.day / pc.msInA.week,
    month: pc.utt.date / pc.msInA.month,
    year: pc.utt.month / pc.msInA.year
  };

  // tidies up the current clock readouts for display
  pc.display = {
    ms: pc.utt.ms,
    second: pc.current.second,
    minute: pc.current.minute.toString().padStart(2, "0"),
    hour: pc.current.hour.toString().padStart(2, "0"),
    day: pc.current.date,
    week: pc.current.week,
    month: pc.current.month.toString().padStart(2, "0"),
    year: pc.current.year
  };

  // returns the ratios and the clock readouts
  return { passage: pc.passage, display: pc.display };
}

export default {
    tick: tickTime
}
