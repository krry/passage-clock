import Data from "./Data";
import Calendar from "./Calendar";

const DAYS = Data.get("days");
const MONTHS = Data.get("months");

let debug = false;

// splits time into units and relates those units to each other
// gets called by updateTime every TICK_DELAY milliseconds
function tickTime() {
  var nwt;
  // get the current time
  let nd = new Date();

  // slice now time into units
  nwt = {
    tick: nd.getMilliseconds(),
    second: nd.getSeconds(),
    minute: nd.getMinutes(),
    hour: nd.getHours(),
    day: nd.getDay(),
    week: Calendar.weekOfYear(nd),
    date: nd.getDate(),
    month: nd.getMonth(),
    year: nd.getFullYear()
  };

  let msInA = Calendar.countMillis(nwt);

  let utt = {}; // utt ~= up to this
  // calculates the count in ms of each unit that has passed
  var roundUp;
  for (var prop in nwt) {
    if (prop === "month") nwt[prop] = nwt[prop] + 1;
    if (prop === "tick") {
      utt[prop] = nwt[prop];
    } else if (prop === "date") {
      utt[prop] = nwt[prop] * msInA["day"] + utt["hour"];
    } else {
      utt[prop] = nwt[prop] * msInA[prop] + roundUp;
    }
    roundUp = nwt[prop];
  }

  // how much of each slice has passed in percentages
  let psg = {};
  var soFar;
  // calculates the proportion/ratio of each unit that has passed
  // WARNING: depends on the order of the slices in the object
  for (var prop in utt) {
    if (prop === "tick") {
      soFar = utt[prop];
      // in first step, store the ms value for second step
      psg[prop] = soFar;
      continue;
    } else if (prop === "date") {
      soFar = utt[prop];
      continue;
    } else {
      psg[prop] = soFar / msInA[prop];
    }
    soFar = utt[prop]; // keep the value one step behind key
  }

  // tidies up the nwt clock readouts for display
  let dsp = {};

  for (var prop in nwt) {
    if (prop === "year") {
      // years already have 4 digits
      dsp[prop] = nwt[prop].toString().substr(2);
    } else if (prop === "tick") {
      // ms might have 1-3 digits
      dsp[prop] = nwt[prop].toString().padStart(3, "0");
    } else {
      // the rest dsp nicely with 2
      dsp[prop] = nwt[prop].toString().padStart(2, "0");
    }
  }

  // add time names
  dsp["dayOfWeek"] = DAYS[nwt.day];
  dsp["monthName"] = MONTHS[nwt.month];

  if (debug) console.dir(pc);

  // returns the ratios and the clock readouts
  return {
    psg,
    dsp
  };
}

export default {
  tick: tickTime
};
