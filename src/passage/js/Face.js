import Data from "./Data";
import Time from "./TimeAbs";
import Emitter from './Emitter';

var position, moment, millis, flipped,
    currentTimes = {},
    percentGones = {},
    timeBands = {};

const emt = new Emitter();
const SLICES = Data.get("slices");

function wireFace() {
  data_dump = document.getElementById("data_dump");
  millis = document.getElementById("millis");

  for (let slice of SLICES) {
    currentTimes[slice] = document.querySelector(
      "#" + slice + "Slice > .current-time"
    );
    percentGones[slice] = document.querySelector(
      "#" + slice + "Slice > .percent-gone"
    );
    timeBands[slice] = document.querySelector(
      "#" + slice + "Slice > .time-band"
    );
  }
  emt.on('arrow', flipBands);
  emt.on('debug', deBug);
}

const deBug = (bugged) => debug = bugged;
const flipBands = (dir) => flipped = (dir === 'right');

// sends parsed time to divs and css
// gets called every TICK ms

function updateFace() {
  moment = Time.tick();

  // parses out the pc object slice by slice
  for (let slice of SLICES) {
    if (slice === "ms") {
      millis.textContent = display(slice);
      continue;
    }

    currentTimes[slice].textContent = display(slice);
    percentGones[slice].textContent = percent(slice);
    timeBands[slice].style.transform = "translateX(" + bandShift(slice) + ")";
  }
  if (debug) {
    console.dir(moment);
  }
}

// formats the passage ratios into percentages
function percent(slice) {
  return (moment.psg[slice] * 100).toFixed(2) + "%";
}

// returns the clock readouts from the sliceTime object
function display(slice) {
  return moment.dsp[slice];
}

// determines how much to move the passage bars
// returns a negative percentage when time goes backward
function bandShift(slice) {
  position = (1 - moment.psg[slice]) * 100 * 2;
  if (flipped) position *= -1;

  return position.toString() + "%";
}

export default {
  wire: wireFace,
  update: updateFace
};
