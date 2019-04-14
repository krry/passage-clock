import LS from "./Cacher";

let millis,
  emitter,
  burner,
  waltzingEls = [],
  frenziedEls = [];

function initPuppeteer(emt) {
  emitter = emt;
  millis = document.getElementById("millis");
  burner = document.getElementById("burner");
  waltzingEls.push(document.getElementById("clock"));
  waltzingEls.push(document.getElementById("slice_list"));
  waltzingEls.push(millis);
  frenziedEls.push(millis);
  frenziedEls.push(document.querySelector("#secondSlice .time-band"));
  frenziedEls.push(document.getElementById("chiller"));
  emitter.on("flux", waltzAlong);
  emitter.emit("flux", "clockTemp", LS.load("clockTemp"));
}

function waltzAlong(prop, val) {
  if (prop === "fluxState") {
    let playState = val === "still" ? "paused" : "running";
    for (let el of waltzingEls) {
      el.style.animationPlayState = playState;
    }
  } else if (prop === "clockTemp") {
    let playDur = val === "chill" ? "150s" : "50s";
    for (let el of waltzingEls) {
      el.style.animationDuration = playDur;
    }
    for (let el of frenziedEls) {
      el.classList.toggle("hidden", val === "chill");
    }
    burner.classList.toggle("hidden", val !== "chill");
  }
}

function chillBurn() {
  let temp = LS.load("clockTemp") === "chill" ? "burn" : "chill";
  emitter.emit("flux", "clockTemp", temp);
}

export default {
  init: initPuppeteer,
  tempCheck: chillBurn
};
