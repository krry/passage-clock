import "../css/styles.css";
import "../css/themes.css";

import Data from './Data';
import Face from './Face';
import Hider from "./Hider";
import Clock from "./Clock";
import Crown from "./Crown";

const TICK_DELAY = 32; // every few ms
const SLICES = Data.get('slices');

// let's get tickin
function init(delay = TICK_DELAY) {
    // populate the DOM with the SLICES
    generateSlices();

    // the crown controls the watch
    Crown.install();

    // with slices in the DOM, plot their demise
    Hider.wire();

    // if the user hasn't paused the flow, tick away
    if (localStorage.getItem('fluxState') !== "still") {
        Clock.start(delay);
    } else {
        Face.update();
    }
}

// populates DOM with slices and spaces them out vertically
function generateSlices() {

    console.count('generating slices');

    const sliceList = document.getElementById("slice_list");
    const sliceTemplate = document.getElementById("slice_template").textContent;
    // const sliceTemplate = document.getElementById("slice_template").innerHTML;
    // what is different about textContent and innerHTML?

    for (let slice of SLICES.reverse()) {

        // skip all this for milliseconds
        if (slice === "ms") continue;

        // roll a fresh el
        let el = document.createElement("div");

        // why can't I use textContent here?
        // el.textContent = sliceTemplate;

        // use the template from the html <script>
        el.innerHTML = sliceTemplate;

        // name it appropriately
        el.setAttribute('id', slice + "Slice");
        // class it up
        el.classList.add("time-slice");

        // record which slices are present in localStorage
        if (localStorage[el.id] === NaN) localStorage[el.id] = "true";

        // label the slice for the user
        el.getElementsByClassName("time-unit")[0].textContent = slice;

        // help the Hider find its hook
        el.getElementsByClassName("hide-slice")[0].setAttribute("slice", slice);

        // add the new slice elements to the DOM
        sliceList.appendChild(el);
    }

  // return false;
}

function restartClock() {

    const sliceList = document.getElementById("slice_list");

    // first, stop the clock
    Clock.stop();

    // remove the slices one by one
    while (sliceList.firstChild) {
        // this is WAY more performant than setting innerHTML
        sliceList.removeChild(sliceList.firstChild);
    }

    // start back to tickin
    init()
}

export default {
  init: init,
  restart: restartClock
};
