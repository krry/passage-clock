import Face from "./Face";
import LS from "./Cacher";

let clock;

function startClock() {
  clock = setInterval(Face.update, LS.load("delay"));
}

function stopClock() {
  clearInterval(clock);
}

function toggle(prop, val) {
  if (prop === "fluxState") {
    if (val === "flowing") {
      startClock()
    } else if (val === "still") {
      stopClock()
    }
  }
}

export default {
  toggle
};
