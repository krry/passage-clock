import './styles.css';
import './themes.css';

// set CONSTANTS
// TODO: put the milliseconds in the header
// var SLICES = ['ms', 'sec', 'min', 'hr', 'day', 'wk', 'mo', 'yr'],
var SLICES = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
    MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayOfWeek,
    monthName,
    REFRESH_RATE = 25,
    clock; // every few ms

function startTicking(interval) {
  var interval = interval || REFRESH_RATE;
  generateSlices();
  wireControls();
  wireHiders();
  updateClock();
  startClock();
}

// populates DOM with slices and spaces them out vertically
function generateSlices() {

  var sliceList,
      sliceTemplate,
      sliceHeight,
      suffix,
      slices;

  slices = SLICES.reverse();
  sliceList = document.getElementById('slice_list');
  sliceList.innerHTML = "";
  sliceTemplate = document.getElementById('slice_template').innerHTML;

  for (var i = 0; i < slices.length; i++) {
    var el = document.createElement('div');
    el.innerHTML = sliceTemplate;
    el.classList.add('time-slice');
    el.id = slices[i] + 'Slice';
    el.getElementsByClassName('time-unit')[0].innerHTML = slices[i];
    el.getElementsByClassName('hide-slice')[0].setAttribute('slice', slices[i]);
    sliceList.appendChild(el);
  }

  return false;
}

// wire up the color scheme controller
function wireControls() {

  var filterList = document.getElementById('filter_list');
  var playPause = document.getElementById('play_pause');
  var flipClasses = function(evt) {
    // TODO: toggle inverted instead of removing it
    document.body.classList = [];
    document.body.classList.add(evt.target.value);
    return false;
  };
  playPause.addEventListener('click', pauseClock, {once: true});
  filterList.addEventListener( 'change', flipClasses, false);
  return false;
}

function pauseClock(evt) {
  var playPauseBtn = (typeof(evt) !== 'undefined') ? evt.target : document.getElementById('play_pause');
  clearInterval(clock);
  playPauseBtn.addEventListener('click', startClock, {once: true});
  return false;
}

function startClock(evt) {
  var playPauseBtn = (typeof(evt) !== 'undefined') ? evt.target : document.getElementById('play_pause');
  clock = setInterval(updateClock, REFRESH_RATE);
  playPauseBtn.addEventListener('click', pauseClock, {once: true});
}

// gets slices and parses them into the DOM
function updateClock() {

  var slices = sliceTime();

  function percent(i) {
    return (slices.passage[SLICES[i]] * 100).toFixed(2) + '%';
  }
  function display(i) {
    return slices.display[SLICES[i]];
  }

  for (var i = 0; i < SLICES.length; i++) {
    document.querySelector('#' + SLICES[i] + 'Slice > .current-time').innerHTML = display(i);
    document.querySelector('#' + SLICES[i] + 'Slice > .percent-gone').innerHTML = percent(i);
    document.querySelector('#' + SLICES[i] + 'Slice > .time-band').style.width = percent(i);
  }
  return false;
}

var pc = {
  thisMoment: {},
  current: {},
  msInA: {},
  upToThis: {},
  passage: {},
  display: {},
};

function sliceTime() {

    // get the current time
    pc.thisMoment = {};
    pc.thisMoment = new Date();

    // cache the pc.current time in various unit slices
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
    dayOfWeek = DAYS[pc.current.day];
    monthName = MONTHS[pc.current.month];

    // number the weeks of the year
    function weekOfYear(d) {
      d.setHours(0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
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
      if (((pc.current.year % 4 == 0) && (pc.current.year % 100 != 0)) || (pc.current.year % 400 == 0)) {
        MONTH_DAYS[1] = 29;
        return 366;
      } else {
        return 365;
      }
    }

    // pc.upToThis.ms = pc.current.ms;
    pc.upToThis.second = (pc.current.second * pc.msInA.second) + pc.current.ms;
    pc.upToThis.minute = (pc.current.minute * pc.msInA.minute) + pc.upToThis.second;
    pc.upToThis.hour = (pc.current.hour * pc.msInA.hour) + pc.upToThis.minute;
    pc.upToThis.day = (pc.current.day * pc.msInA.day) + pc.upToThis.hour;
    pc.upToThis.week = (pc.current.week * pc.msInA.week) + pc.upToThis.day;
    pc.upToThis.date = (pc.current.date * pc.msInA.day) + pc.upToThis.hour;
    pc.upToThis.month = (pc.current.month+1 * pc.msInA.month) + pc.upToThis.date;
    pc.upToThis.year = (pc.current.year * pc.msInA.year) + pc.upToThis.month;

    pc.passage = {
      // ms: pc.current.ms,
      second: pc.current.ms / pc.msInA.second,
      minute: pc.upToThis.second / pc.msInA.minute,
      hour: pc.upToThis.minute / pc.msInA.hour,
      day: pc.upToThis.hour / pc.msInA.day,
      week: pc.upToThis.day / pc.msInA.week,
      month: pc.upToThis.date / pc.msInA.month,
      year: pc.upToThis.month / pc.msInA.year
    };

    pc.display = {
      // ms: pc.upToThis.ms,
      second: pc.current.second,
      minute: twoDigify(pc.current.minute),
      hour: twoDigify(pc.current.hour),
      day: pc.current.date,
      week: pc.current.week,
      month: twoDigify(pc.current.month),
      year: pc.current.year
    };

    return {passage: pc.passage, display: pc.display};
}

function twoDigify(numba) {
  return (numba > 9 ? numba : '0' + numba);
}

function wireHiders () {

  var hiders = document.getElementsByClassName('hide-slice');

  var removeSlice = function (evt) {
    var sliceDiv,
        index,
        sliceName;

    sliceName = evt.target.getAttribute('slice');
    index = SLICES.indexOf(sliceName);
    sliceDiv = document.getElementById(sliceName+'Slice');

    if (index > -1) {

      var sliceHeight,
          suffix;

      SLICES.splice(index, 1);
      sliceDiv.classList.add('hidden');

      setTimeout(function () {
        sliceDiv.style.display = 'none';
      }, 500);
    }

    return false;
  };

  for (var i = 0; i < hiders.length; i++) {
    hiders[i].addEventListener('click', removeSlice, {once: true});
  }
  return false;
}

export default {
  init: startTicking,
  pause: pauseClock,
  start: startClock
};
