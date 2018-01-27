window.addEventListener('load', function load() {

    window.removeEventListener('load', load, false);

    // times in seconds except for day-counts of months
    var secsInDay = 24 * 60 * 60,
        daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        secsInYear = 31536000,
        dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        clocks = ['second', 'minute', 'hour', 'day', 'month', 'year']
        canvas = [],
        context = [],
        band = [];

    function determineValues() {

        var newDate = new Date(),
            percentTime = [];

        percentTime[0] = []; // first column, percents
        percentTime[1] = []; // second column, labels

        // handle leap years
        var year = newDate.getFullYear();

        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            daysInMonth[1] = 29;
            secsInYear = 31622400;
        }

        // second completion
        var milliseconds,
            seconds,
            minutes,
            hours,
            currentSecond,
            currentMinute,
            currentHour,
            dayOfWeek,
            thisDate,
            month,
            currentMonth,
            timeOfMonth,
            timeOfYear;

        milliseconds = newDate.getMilliseconds();
        currentSecond = (newDate.getSeconds() * 1000) + milliseconds;
        currentMinute = (newDate.getMinutes() * 60 * 1000) + currentSecond;
        currentHour = (newDate.getHours() * 60 * 60 * 1000) + currentMinute;
        dayOfWeek = newDate.getDay();
        thisDate = newDate.getDate();
        month = newDate.getMonth();
        currentMonth = daysInMonth[month] * secsInDay;
        timeOfMonth = (thisDate - 1) * secsInDay + (currentHour / 1000);
        timeOfYear = timeOfMonth;

        percentTime[0][0] = milliseconds / 1000;
        percentTime[1][0] = (currentSecond / 1000).toFixed(3);

        percentTime[0][1] = currentSecond / 60000;
        percentTime[1][1] = ((currentMinute / 60000).toFixed(0) > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes());

        percentTime[0][2] = currentMinute / 3600000;
        percentTime[1][2] = ((currentHour / (secsInDay * 1000)).toFixed(0) > 9 ? newDate.getHours() : '0' + newDate.getHours());

        percentTime[0][3] = currentHour / (secsInDay * 1000);
        percentTime[1][3] = thisDate + ' ' + dayNames[dayOfWeek];

        percentTime[0][4] = timeOfMonth / currentMonth;
        percentTime[1][4] = monthNames[month];

        for (var i = 0; i <= (month - 1); i++) {
            timeOfYear = timeOfYear + daysInMonth[i] * secsInDay;
        }

        percentTime[0][5] = timeOfYear / secsInYear;
        percentTime[1][5] = year;

        return percentTime;
    }

    function printTime(i, percentTime) {

        thisPercent = percentTime[0][i] * 100;
        thisPercent = thisPercent.toFixed(2);
        thisPercent = thisPercent + '%';

        var percentBand = document.querySelector('#' + clocks[i] + 'Slice > .percent-gone');
        percentBand.innerHTML = thisPercent;
        var time = document.querySelector('#' + clocks[i] + 'Slice > .current-time');
        time.innerHTML = percentTime[1][i];
    }

    function drawCanvas(i, percentTime) {

        var thisPercentTime = [],
            thisTime;

        thisPercentTime[i] = percentTime[0][i];

        band[i] = document.querySelector('#' + clocks[i] + 'Slice > .time-band');
        thisTime = percentTime[0][i] * 100;
        thisTime = thisTime.toFixed(2);
        thisTime = thisTime + '%';

        band[i].style.width = thisTime;
    }

    function setupClocks() {

      var j = 0,
          text,
          unit;

      percentTime = determineValues();

      while (j < clocks.length) {
        unit = document.querySelector('#' + clocks[j] + 'Slice > .time-unit');
        unit.innerHTML = clocks[j];
        j++;
      }
    }

    function updateClock() {

        percentTime = determineValues();
        var i = 0;

        while (i < clocks.length) {
            printTime(i, percentTime);
            drawCanvas(i, percentTime);
            i++;
        }
    }

    function wireControls() {
      var filterList = document.getElementById('filterList');
      filterList.addEventListener( 'change', function() {
        document.getElementsByTagName('main')[0].classList = [];
        if(this.value === "grayscale") {
          document.getElementsByTagName('main')[0].classList.add('grayscale');
        } else if (this.value === "sepia") {
          document.getElementsByTagName('main')[0].classList.add('sepia');
        } else if (this.value === "invert") {
          document.getElementsByTagName('main')[0].classList.add('invert');
        } else if (this.value === "warmer") {
          document.getElementsByTagName('main')[0].classList.add('warmer');
        } else if (this.value === "greener") {
          document.getElementsByTagName('main')[0].classList.add('greener');
        }
      });
    }

    wireControls();
    setupClocks();
    updateClock();
    setInterval(updateClock, 10);

}, true);
