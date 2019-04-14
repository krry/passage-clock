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
const ABBRS = Data.get("abbrs");

function init(delay = 32) {
  generateSlices();
  window.addEventListener('keydown', handleFirstTab);
  Face.init(emitter);
  Cacher.init(emitter);
  emitter.emit("flux", "delay", delay);
  Ctrls.init(emitter);
  emitter.on("flux", Clock.toggle);
  Apper.listenToPrompt(emitter);
}

// TODO: make slices draggable and hideable
function generateSlices() {
  const sliceList = document.getElementById("slice_list");
  const sliceTemplate = document.getElementById("slice_template").textContent;

  for (let slice of SLICES.reverse()) {
    if (slice === "tick") continue;

    let el = document.createElement("div");
    el.innerHTML = sliceTemplate;
    el.setAttribute("id", slice + "Slice");
    el.classList.add("time-slice");
    el.classList.add(slice + "-slice");
    el.getElementsByClassName("time-unit")[0].textContent = ABBRS[slice];
    sliceList.appendChild(el);
  }
}

// if keyboard navver, leave the visual accommodations alone
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

export default {
  init: init
};
