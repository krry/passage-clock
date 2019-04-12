import Data from "./Data";
import Time from "./TimeAbs";

let millis,
    flipped,
    emitter,
    currentTimes = {},
    percentGones = {},
    timeBands = {},
    lastTime = {},
    lastPercent = {},
    lastBandPos = {};

const SLICES = Data.get("slices");

function initFace(emt) {
  emitter = emt;
  millis = document.getElementById("millis");

  for (let slice of SLICES) {
    if (slice === "ms") continue;
    let sliceDiv = document.getElementById(slice + "Slice");
    currentTimes[slice] = sliceDiv.querySelector(".current-time");
    percentGones[slice] = sliceDiv.querySelector(".percent-gone");
    timeBands[slice] = sliceDiv.querySelector(".time-band");
  }
  emitter.on("arrow", flipBands);
}

function flipBands(prop, val) {
  if (prop === "arrowDir") {
    flipped = val === "right";
  }
  lastTime = {};
  lastPercent = {};
  lastBandPos = {};
  updateFace();
}

// sends parsed time to divs and css
// gets called every TICK ms
function updateFace() {
  let moment = Time.tick();

  // parses out the pc object slice by slice
  for (let slice of SLICES) {
    if (slice === "ms") {
      millis.textContent = moment.dsp[slice];
      continue;
    }
    updateDisplayTime(slice, moment);
    updatePercent(slice, moment);
  }
}

// returns the clock readouts from the sliceTime object
function updateDisplayTime(slice, moment) {
  let newDisplayTime = moment.dsp[slice];
  if (Math.abs(newDisplayTime - lastTime[slice]) > 1 || lastTime[slice] === undefined) {
    lastTime[slice] = newDisplayTime;
    currentTimes[slice].textContent = newDisplayTime;
  }
}

// formats the passage ratios into percentages
function updatePercent(slice, moment) {
  let newPercent = moment.psg[slice] * 100;
  if (Math.abs(newPercent - lastPercent[slice]) > 0.01 || lastPercent[slice] === undefined) {
    lastPercent[slice] = newPercent;
    percentGones[slice].textContent = (newPercent).toFixed(2) + "%";
    updateBandPos(slice, moment);
  }
}

function updateBandPos(slice, moment) {
  let newBandPos = 100 - 200 * moment.psg[slice];
  if (flipped) newBandPos *= -1; // reverses polarity when time goes backward
  lastBandPos = newBandPos;
  timeBands[slice].style.transform = "translateX(" + newBandPos.toString() + "%)";
}

export default {
  init: initFace,
  update: updateFace
};
