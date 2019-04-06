import './styles.css';
import './themes.css';

// set CONSTANTS
// TODO: put the milliseconds in the header
var SLICES = ['ms', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
    MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'],
    MONTHS = ['January', 'February', 'March', 'April',
              'May', 'June', 'July', 'August', 'September',
              'October', 'November', 'December'],
    REFRESH_RATE = 32,
    refreshRate,
    arrowOfTime,
    clock, // every few ms
    clockPauser;

// initializes all the things
function startTicking(interval) {
    refreshRate = interval || REFRESH_RATE;
    generateSlices();
    wireControls();
    wireHiders();
    updateClock();
    if (localStorage.fluxState !== "still") {
        startClock();
    } else {
        pauseClock();
    }
}

// generateSlices
//
// populates DOM with slices and spaces them out vertically

function generateSlices() {

    let sliceList,
        sliceTemplate,
        slices;

    slices = SLICES.reverse();
    sliceList = document.getElementById('slice_list');
    sliceList.innerHTML = "";
    sliceTemplate = document.getElementById('slice_template').innerHTML;

    for (let i = 0; i < slices.length; i++) {
        if (slices[i] === 'ms') continue;
        let el = document.createElement('div');
        el.innerHTML = sliceTemplate;
        el.classList.add('time-slice');
        el.style.flexGrow = (7 - i) * 2;
        el.id = slices[i] + 'Slice';
        if (localStorage[el.id] === NaN) localStorage[el.id] = "true";
        el.getElementsByClassName('time-unit')[0].innerHTML = slices[i];
        el.getElementsByClassName('hide-slice')[0].setAttribute('slice', slices[i]);
        sliceList.appendChild(el);
    }

    return false;
}

function randomBackflip () {

    // returns a CSS transform string that effectively
    // flips the object horizontally in a fancy way
}

// wireControls
//
// wires display controls at footer to their functions
function wireControls() {

    console.count('wiring controls');
    var current = {};
    clockPauser = document.getElementById('clock_pauser');
    // if there is a filter preference saved, use it
    current.filter = localStorage.getItem('filter');
    if (current.filter !== null) {
        document.getElementById('filter_list').value = current.filter;
        applyFilter(current.filter);
    }
    // if there isn't a arrowOfTime saved in the browser, default to left
    arrowOfTime = localStorage.getItem('arrowOfTime');
    if (arrowOfTime === null) {
        arrowOfTime = 'left';
        localStorage.setItem('arrowOfTime', arrowOfTime);
    }
    // when the reverse button is hit, flip the bit in localStorage
    let reverseTime = () => {
        arrowOfTime = ( arrowOfTime === 'right' ) ? 'left' : 'right';
        // const rotation = randomBackflip();
        // document.getElementById('arrowoftime').style.transform = rotation;
        document.getElementById('arrowoftime').classList.toggle('reversed');
        localStorage.setItem('arrowOfTime', arrowOfTime);
    }
    // for swapping out modes and filters on the component parent div
    function applyFilter(bodyClass) {
        const clockDiv = document.getElementById('clock');
        clockDiv.classList.remove(current.filter);
        clockDiv.classList.add(bodyClass);
        current.filter = bodyClass;
        localStorage.setItem('filter', bodyClass);
    }
    // a DRYer way to wire the buttons
    let wireCtrl = (el, evt, clbk, opts) => {
        document.getElementById(el).addEventListener(evt, clbk, opts)
    }
    // then do the actual wiring
    wireCtrl('mode_list', 'change', (e) => applyFilter("mode", e.target.value), false)
    wireCtrl('filter_list', 'change', (e) => applyFilter(e.target.value), false)
    wireCtrl('clock_pauser', 'click', pauseClock, {once: true})
    wireCtrl('time_reverser', 'click', reverseTime)
    return true;
}

function startClock(evt) {
    let playPauseBtn = (typeof(evt) !== 'undefined') ? evt.target : clockPauser;
    clock = setInterval(updateClock, refreshRate);
    playPauseBtn.addEventListener('click', pauseClock, {once: true});
    clockPauser.innerHTML = 'Be still';
    localStorage.fluxState = "flowing";
    return false;
}

function pauseClock(evt) {
    let playPauseBtn = (typeof(evt) !== 'undefined') ? evt.target : clockPauser;
    clearInterval(clock);
    playPauseBtn.addEventListener('click', startClock, {once: true});
    clockPauser.innerHTML = 'Flow on';
    localStorage.fluxState = "still";
    return false;
}

// updateClock
//
// sends parsed time to divs and css
// gets called every REFRESH_RATE ms

function updateClock() {

    var position;
    let slices = sliceTime();

    function percent(i) {
        return (slices.passage[SLICES[i]] * 100).toFixed(2) + '%';
    }

    function display(i) {
        return slices.display[SLICES[i]];
    }

    function bandShift(i) {
        position = 100 - (slices.passage[SLICES[i]] * 100 * 2);
        if (arrowOfTime === "right") {
            position *= -1;
        }
        return position.toString() + '%';
    }

    for (let i = 0; i < SLICES.length; i++) {
        if (SLICES[i] === 'ms') {
            document.getElementById('millis').innerHTML = display(i);
            continue;
        };
        document.querySelector('#' + SLICES[i] + 'Slice > .current-time').innerHTML = display(i);
        document.querySelector('#' + SLICES[i] + 'Slice > .percent-gone').innerHTML = percent(i);
        document.querySelector('#' + SLICES[i] + 'Slice > .time-band').style.transform = 'translateX(' + bandShift(i) + ')';
    }
    return false;
}

let pc = {
    thisMoment: {},
    current: {},
    msInA: {},
    utt: {},
    passage: {},
    display: {},
};

// sliceTime
//
// splits time into units and relates those units to each other
// gets called by updateTime every REFRESH_RATE milliseconds

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
    let dayOfWeek = DAYS[pc.current.day];
    let monthName = MONTHS[pc.current.month];

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
        if (((year % 4 == 0)
            && (year % 100 != 0))
            || (year % 400 == 0)) {
            MONTH_DAYS[1] = 29;
            return 366;
        } else {
            return 365;
        }
    }

    // utt means Up To This
    pc.utt.ms = pc.current.ms;
    pc.utt.second = (pc.current.second * pc.msInA.second) + pc.current.ms;
    pc.utt.minute = (pc.current.minute * pc.msInA.minute) + pc.utt.second;
    pc.utt.hour = (pc.current.hour * pc.msInA.hour) + pc.utt.minute;
    pc.utt.day = (pc.current.day * pc.msInA.day) + pc.utt.hour;
    pc.utt.week = (pc.current.week * pc.msInA.week) + pc.utt.day;
    pc.utt.date = (pc.current.date * pc.msInA.day) + pc.utt.hour;
    pc.utt.month = (pc.current.month+1 * pc.msInA.month) + pc.utt.date;
    pc.utt.year = (pc.current.year * pc.msInA.year) + pc.utt.month;

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

    pc.display = {
        ms: pc.utt.ms,
        second: pc.current.second,
        minute: pc.current.minute.toString().padStart(2, '0'),
        hour: pc.current.hour.toString().padStart(2, '0'),
        day: pc.current.date,
        week: pc.current.week,
        month: pc.current.month.toString().padStart(2, '0'),
        year: pc.current.year
    };

    return { passage: pc.passage,
             display: pc.display };
}

// wireHiders
//
// find close-x's and wire them to hide their slices
function wireHiders () {

    let hiders = document.getElementsByClassName('hide-slice');
    let removeSlice = function (arg) {
        let sliceDiv,
            index,
            sliceName;
        sliceName = arg.target ? arg.target.getAttribute('slice') : arg;
        index = SLICES.indexOf(sliceName);
        sliceDiv = document.getElementById(sliceName+'Slice');

        if (index > -1) {

            SLICES.splice(index, 1);
            sliceDiv.classList.add('hidden');
            localStorage[sliceDiv.id] = "false";
            setTimeout(function () {
                sliceDiv.style.display = 'none';
            }, 500);
        }

        return false;
    };

    for (let slice of SLICES) {
        if (localStorage[slice + "Slice"] === "false") removeSlice(slice);
    }

    for (let i = 0; i < hiders.length; i++) {
        hiders[i].addEventListener('click', removeSlice, {once: true});
    }
    return false;
}

export default {
    init: startTicking,
    pause: pauseClock,
    start: startClock
};
