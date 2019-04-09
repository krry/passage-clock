import Data from "./Data";

const MONTH_DAYS = Data.get("monthDays");

let lastKnownMonth,
  msInA = {};

// returns the week no. out of the year
function weekOfYear(d) {
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
}

// handle leap years
function daysThisYear(year) {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    MONTH_DAYS[1] = 29;
    return 366;
  } else {
    return 365;
  }
}
function countMillis(now) {
  if (now.month !== lastKnownMonth) {
    msInA.ms = 1;
    msInA.second = 1000;
    msInA.minute = msInA.second * 60;
    msInA.hour = msInA.minute * 60;
    msInA.day = msInA.hour * 24;
    msInA.week = msInA.day * 7;
    msInA.month = msInA.day * MONTH_DAYS[now.month - 1];
    msInA.year = msInA.day * daysThisYear(now.year);
    lastKnownMonth = now.month;
  }
  return msInA;
}

export default {
  countMillis,
  weekOfYear
};
