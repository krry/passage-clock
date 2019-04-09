import Data from "./Data";
import Face from "./Face";
import Init from "./index";
import Clock from "./Clock";

var activeFilter, arrowEl, clockEl, clockPauser, arrow, emitter, wired = {}, filterListEl;

const SLICES = Data.get("slices");

// wires display controls at footer to their functions
function wireCrown(emt) {
  // make the emitter available to the helper functions herein
  emitter = emt;

  // cache the ctrl elements
  arrowEl = document.getElementById("arrow");
  filterListEl = document.getElementById("filter_list");
  clockPauser = document.getElementById("clock_pauser");

  activeFilter = localStorage.getItem('filter');
  // if there is a filter preference saved, use it
  if (activeFilter !== null) {
    filterListEl.value = activeFilter;
    applyFilter(activeFilter);
  }

  // add listeners on event channels
  emitter.on("arrow", checkArrow);
  emitter.on("flux", checkFlux);


  // then do the actual wiring
  wireCtrl("clock_pauser", "click", toggleClock);
  wireCtrl("time_reverser", "click", reverseTime);
  wireCtrl("slice_restorer", "click", restoreSlices);
  wireCtrl("filter_list", "change", e => applyFilter(e.target.value), false);
  // wireCtrl("mode_list", "change", e => applyFilter(e.target.value), false);

  // initiate channels with locally stored prefs
  emitter.emit("arrow", localStorage.getItem("arrowDir"));
  emitter.emit("flux", localStorage.getItem("fluxState"));
}

// a DRYer way to wire the buttons
function wireCtrl(el, evt, clbk, opts) {
  const ctrl = document.getElementById(el);
  if (!wired[el]) {
    ctrl.addEventListener(evt, clbk, opts);
    wired[el] = true;
  }
  return true;
}

// for swapping out modes and filters on the component parent div
function applyFilter(bodyClass) {
  clockEl = document.getElementById("clock");
  clockEl.classList.remove(activeFilter);
  clockEl.classList.add(bodyClass);
  activeFilter = bodyClass;
  emitter.emit("filter", activeFilter);
  return localStorage.setItem("filter", bodyClass);
}

function checkArrow(dir) {
  // if there isn't a arrow saved in the browser, default to left
  if (dir === null) {
    dir = "left";
    localStorage.setItem("arrowDir", dir);
  } else if (dir === "right") {
    arrowEl.classList.add("reversed");
    return false;
  } else if (dir === "left") {
    arrowEl.classList.remove("reversed");
    return true;
  }
  debugger;
  if (localStorage.getItem("fluxState") === "still") Face.update();
}

function checkFlux(state) {
  if (state !== "still") {
    clockPauser.textContent = "Be still";
    return true;
  } else {
    clockPauser.textContent = "Flow on";
    return false;
  }
}

function toggleClock() {
  if (localStorage.getItem("fluxState") === "flowing") {
    Clock.stop();
    localStorage.setItem("fluxState", "still");
    emitter.emit("flux", "still");
  } else {
    Clock.start();
    localStorage.setItem("fluxState", "flowing");
    emitter.emit("flux", "flowing");
  }
}

// when the reverse button is hit, flip the bit in localStorage
function reverseTime() {
  arrow = arrow === "right" ? "left" : "right";
  localStorage.setItem("arrow", arrow);
  emitter.emit("arrow", arrow);
}

function restoreSlices() {
  for (let slice of SLICES) {
    localStorage.setItem(slice + "Slice", "");
  }
  Init.restart();
}

export default {
  wire: wireCrown
};
