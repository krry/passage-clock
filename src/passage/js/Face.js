import Data from "./Data";
import Time from "./TimeAbs";

var position,
  moment,
  millis,
  flipped,
  emitter,
  currentTimes = {},
  percentGones = {},
  timeBands = {};

const SLICES = Data.get("slices");

function initFace(emt) {
  emitter = emt;
  millis = document.getElementById("millis");

  for (let slice of SLICES) {
    if (slice === "ms") continue;
    let sliceDiv = document.getElementById(slice+'Slice');
    currentTimes[slice] = sliceDiv.querySelector(".current-time");
    percentGones[slice] = sliceDiv.querySelector(".percent-gone");
    timeBands[slice] = sliceDiv.querySelector(".time-band");
  }

  emitter.on("arrow", flipBands);
}

function flipBands(dir) {
  flipped = dir === "right";
  updateFace();
}

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
function bandShift(slice) {
  position = 100 - 200 * moment.psg[slice];
  // reverses polarity when time goes backward
  if (flipped) position *= -1;
  return position.toString() + "%";
}

export default {
  init: initFace,
  update: updateFace
};
