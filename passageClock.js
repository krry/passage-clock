window.addEventListener('load', function load() {

  window.removeEventListener('load', load, false);

  var howLaunched = window.location.search.substring(1).split('=')[0];
  if (howLaunched === 'homescreen') {
    var welcome = document.getElementById('welcome_back');
    welcome.style.display = 'block';
    welcome.classList.remove('isPaused');
  }

  // set CONSTANTS
  var SLICES = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
      MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dayOfWeek,
      monthName,
      REFRESH_RATE = 100; // every 15ms

  // execute
  generateSlices();
  wireControls();
  wireRemovers();
  updateClock();
  setInterval(updateClock, REFRESH_RATE);

  // populates DOM with slices and spaces them out vertically
  function generateSlices() {

    var sliceList,
        sliceTemplate,
        sliceHeight,
        suffix,
        slices;

    slices = SLICES.reverse();
    sliceList = document.getElementById('slice_list');
    sliceTemplate = document.getElementById('slice_template').innerHTML;

    // set slice height to evenly distribute slices in viewport
    sliceHeight = 85 / slices.length;
    suffix = 'vh';
    document.documentElement.style.setProperty('--slice-height', sliceHeight + suffix);

    for (var i = 0; i < slices.length; i++) {
      var el = document.createElement('div');
      el.innerHTML = sliceTemplate;
      el.classList.add('time-slice');
      el.id = slices[i] + 'Slice';
      el.getElementsByClassName('time-unit')[0].innerHTML = slices[i];
      el.getElementsByClassName('remove-slice')[0].setAttribute('slice', slices[i]);
      sliceList.appendChild(el);
    }

    return false;
  }

  // wire up the color scheme controller
  function wireControls() {

    var filterList = document.getElementById('filterList');
    var flipClasses = function(evt) {
      // TODO: toggle inverted instead of removing it
      document.body.classList = [];
      document.body.classList.add(evt.target.value);
      return false;
    };

    filterList.addEventListener( 'change', flipClasses, false);
    return false;
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

  function sliceTime() {
      // why hoist when you can initialize?
      var thisMoment,
          current,
          leapYear,
          msInA = {},
          upToThis = {},
          passage,
          display;

      // get the current time
      thisMoment = new Date(),

      // cache the current time in various unit slices
      current = {
        ms: thisMoment.getMilliseconds(),
        second: thisMoment.getSeconds(),
        minute: thisMoment.getMinutes(),
        hour: thisMoment.getHours(),
        day: thisMoment.getDay(),
        date: thisMoment.getDate(),
        week: weekOfYear(thisMoment),
        month: thisMoment.getMonth(),
        year: thisMoment.getFullYear()
      };

      dayOfWeek = DAYS[current.day];
      monthName = MONTHS[current.month];

      // number the weeks of the year
      function weekOfYear(d) {
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
      }

      // set the slice conversions based on thisMoment
      msInA.second = 1000;
      msInA.minute = msInA.second * 60;
      msInA.hour = msInA.minute * 60;
      msInA.day = msInA.hour * 24;
      msInA.week = msInA.day * 7;
      msInA.month = msInA.day * MONTH_DAYS[current.month - 1];
      msInA.year = msInA.day * daysThisYear(current.year);

      // handle leap years
      function daysThisYear(year) {
        if (((current.year % 4 == 0) && (current.year % 100 != 0)) || (current.year % 400 == 0)) {
          MONTH_DAYS[1] = 29;
          return 366;
        } else {
          return 365;
        }
      }

      upToThis.second = (current.second * msInA.second) + current.ms;
      upToThis.minute = (current.minute * msInA.minute) + upToThis.second;
      upToThis.hour = (current.hour * msInA.hour) + upToThis.minute;
      upToThis.day = (current.day * msInA.day) + upToThis.hour;
      upToThis.week = (current.week * msInA.week) + upToThis.day;
      upToThis.date = (current.date * msInA.day) + upToThis.hour;
      upToThis.month = (current.month-1 * msInA.month) + upToThis.date;
      upToThis.year = (current.year * msInA.year) + upToThis.month;

      passage = {
        second: current.ms / msInA.second,
        minute: upToThis.second / msInA.minute,
        hour: upToThis.minute / msInA.hour,
        day: upToThis.hour / msInA.day,
        week: upToThis.day / msInA.week,
        month: upToThis.date / msInA.month,
        year: upToThis.month / msInA.year
      };

      display = {
        second: (upToThis.second / msInA.second).toFixed(3),
        minute: (current.minute > 9 ? current.minute : '0' + current.minute),
        hour: (current.hour > 9 ? current.hour : '0' + current.hour),
        day: current.date,
        week: current.week,
        month: (current.month > 9 ? current.month : '0' + current.month),
        year: current.year
      };

      return {passage: passage, display: display};
  }

  function wireRemovers () {

    var removers = document.getElementsByClassName('remove-slice');

    var removeSlice = function (evt) {
      var sliceDiv,
          index,
          sliceName;

      sliceName = evt.target.getAttribute('slice');
      index = SLICES.indexOf(sliceName);

      if (index > -1) {

        var sliceHeight,
            suffix;

        SLICES.splice(index, 1);
        document.getElementById(sliceName+'Slice').remove();
        sliceHeight = 85 / SLICES.length;
        suffix = 'vh';

        document.documentElement.style.setProperty('--slice-height', sliceHeight + suffix);
      }

      return false;
    };

    for (var i = 0; i < removers.length; i++) {
      removers[i].addEventListener('click', removeSlice, false);
    }
    return false;
  }
}, true);
