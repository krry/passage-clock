import "../css/main.css";
import Data from "./Data";
import Face from "./Face";
import Clock from "./Clock";
import Ctrls from "./Ctrls";
import Apper from "./Apper";
import Cacher from "./Cacher";
import Emitter from "./Emitter";

let emitter = new Emitter();

const SLICES = Data.get("slices");

function init(delay = 32) {
  if (delay !== 32) {
    emitter.emit("flux", "delay", delay);
  }
  generateSlices();
  Face.init(emitter);
  Cacher.init(emitter);
  emitter.on("flux", Clock.toggle);
  Ctrls.init(emitter);
  Apper.listenToPrompt(emitter);
}

// TODO: make slices draggable and hideable
function generateSlices() {
  const sliceList = document.getElementById("slice_list");
  const sliceTemplate = document.getElementById("slice_template").textContent;

  for (let slice of SLICES.reverse()) {
    if (slice === "ms") continue;

    let el = document.createElement("div");
    el.innerHTML = sliceTemplate;
    el.setAttribute("id", slice + "Slice");
    el.classList.add("time-slice");
    el.getElementsByClassName("time-unit")[0].textContent = slice;
    sliceList.appendChild(el);
  }
}

export default {
  init: init
};
