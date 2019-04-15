import LS from "./Cacher";
import Puppeteer from "./Puppeteer";

let emitter, filterCtrl, glyphCtrl;

// wires display controls at footer to their functions
function initCtrls(emt) {
  // make the emitter available to the helper functions herein
  emitter = emt;

  // wire controls for prefs
  wireCtrl("clock_pauser", "click", toggleClock);
  wireCtrl("cycle_filter", "click", cycleFilter);
  wireCtrl("cycle_glyphs", "click", cycleGlyphs);
  wireCtrl("time_reverser", "click", reverseTime);
  wireCtrl("chill_burner", "click", Puppeteer.tempCheck);
  wireCtrl( "filter_ctrl", "change", e => {
      applyFilter(e.target.value);
    }, false
  );

  // add listeners for pref changes
  emitter.on("arrow", applyPref);
  emitter.on("flux", applyPref);
  emitter.on("face", applyPref);

  // load prefs from LS and emit them
  emitter.emit("arrow", "arrowDir", LS.load("arrowDir"));
  emitter.emit("flux", "fluxState", LS.load("fluxState"));
  emitter.emit("face", "activeFilter", LS.load("activeFilter"));
  emitter.emit("face", "activeGlyphs", LS.load("activeGlyphs"));

  Puppeteer.init(emt);
}

// a DRYer way to wire the buttons
function wireCtrl(el, evt, clbk, opts = {}) {
  let ctrl = document.getElementById(el);
  ctrl.addEventListener(evt, clbk, opts);
  emitter.emit("ctrls", el, true);
}

function cycleFilter() {
  if (filterCtrl === undefined) {
    filterCtrl = document.getElementById("filter_ctrl");
  }
  let opts = filterCtrl.options;
  if (!LS.load("activeFilter")) {
    emitter.emit("face", "activeFilter", filterCtrl.value);
    return;
  }
  for (let i = 0; i < opts.length; i++) {
    if (opts[i].value === LS.load("activeFilter")) {
      let newFltr = i === opts.length - 1 ? opts[0].value : opts[i + 1].value;
      emitter.emit("face", "activeFilter", newFltr);
      break;
    }
  }
}

function cycleGlyphs() {
  if (glyphCtrl === undefined) {
    glyphCtrl = document.getElementById("glyph_ctrl");
  }
  let opts = glyphCtrl.options;
  if (!LS.load("activeGlyphs")) {
    emitter.emit("face", "activeGlyphs", glyphCtrl.value);
    return;
  }
  for (let i = 0; i < opts.length; i++) {
    if (opts[i].value === LS.load("activeGlyphs")) {
      let newGlyphs = i === opts.length - 1 ? opts[0].value : opts[i + 1].value;
      emitter.emit("face", "activeGlyphs", newGlyphs);
      break;
    }
  }
}

function toggleClock() {
  let state = LS.load("fluxState") === "flowing" ? "still" : "flowing";
  emitter.emit("flux", "fluxState", state);
}

// when the reverse button is hit, flip the bit in localStorage
function reverseTime() {
  let arrow = LS.load("arrowDir") === "right" ? "left" : "right";
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
  filterCtrl = document.getElementById("filter_ctrl");
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
  let toggleText = document.getElementById("toggle_text");
  if (state !== "still") {
    toggleText.textContent = "Be still";
  } else {
    toggleText.textContent = "Flow on";
  }
}

export default {
  init: initCtrls
};
