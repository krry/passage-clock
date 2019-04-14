import Face from "./Face";
import LS from "./Cacher";

var clock;

function startClock() {
  let delay = LS.load("delay") || 32;
  clock = setInterval(Face.update, delay);
}

function stopClock() {
  clearInterval(clock);
}

function toggle(prop, val) {
  if (prop === "fluxState") {
    if (val === "still") {
      stopClock()
    } else {
      startClock()
    }
  }
}

export default {
  toggle
};
