import LS from "./Cacher";

let emitter;

// wires display controls at footer to their functions
function initCtrls(emt) {
  // make the emitter available to the helper functions herein
  emitter = emt;

  // wire controls for prefs
  wireCtrl("clock_pauser", "click", toggleClock);
  wireCtrl("time_reverser", "click", reverseTime);
  wireCtrl("filter_ctrl", "change", e => {
    applyFilter(e.target.value) }, false);

  // add listeners for pref changes
  emitter.on("arrow", applyPref);
  emitter.on("flux", applyPref);
  emitter.on("filter", applyPref);

  // load prefs from LS and emit them
  emitter.emit("arrow", "arrowDir", LS.load("arrowDir"));
  emitter.emit("flux", "fluxState", LS.load("fluxState"));
  emitter.emit("filter", "activeFilter", LS.load("activeFilter"));
}

// a DRYer way to wire the buttons
function wireCtrl(el, evt, clbk, opts = {}) {
  let ctrl = document.getElementById(el);
  ctrl.addEventListener(evt, clbk, opts);
  emitter.emit("ctrls", el, true);
}

function toggleClock() {
  let state = ( LS.load("fluxState") === "flowing" ) ? "still" : "flowing";
  emitter.emit("flux", "fluxState", state);
}

// when the reverse button is hit, flip the bit in localStorage
function reverseTime() {
  let arrow = ( LS.load("arrowDir") === "right" ) ? "left" : "right";
  emitter.emit("arrow", "arrowDir", arrow);
}

function applyPref(prop, val) {
  switch (prop) {
    case "arrowDir":
      applyArrow(val);
      break;
    case "fluxState":
      applyFlux(val);
      break;
    case "activeFilter":
      applyFilter(val);
      break;
    default:
      return false;
  }
}

function applyFilter(fltr) {
  if (!fltr) return false;
  let clockEl = document.getElementById("clock");
  let appliedFilters = clockEl.classList;
  if (appliedFilters.contains(fltr)) return true; // make sure it's a new filter
  let filterCtrl = document.getElementById("filter_ctrl");
  filterCtrl.value = fltr; // keep select in sync
  clockEl.classList.add(fltr); // apply the new filter
  LS.save("activeFilter", fltr);
  for (let x of [...clockEl.classList]) {
    if (x !== "clock" && x !== fltr) {
      clockEl.classList.remove(x); // apply the new filter
    }
  }
}

function applyArrow(dir) {
  if (!dir) dir = "left";
  let arrowEl = document.getElementById("arrow");
  if (dir === "right") {
    arrowEl.classList.add("reversed");
  } else if (dir === "left") {
      arrowEl.classList.remove("reversed");
  }
}

function applyFlux(state) {
  let clockPauser = document.getElementById("clock_pauser");
  if (state !== "still") {
    clockPauser.textContent = "Be still";
  } else {
    clockPauser.textContent = "Flow on";
  }
}

export default {
  init: initCtrls
};
