import Data from './Data';
import Face from './Face';
import Init from './index';
import Clock from './Clock';

var activeFilter,
    arrowEl,
    clockEl,
    filterListEl,
    clockPauser,
    arrow;

const SLICES = Data.get('slices');


// wires display controls at footer to their functions
function wireControls() {

    arrowEl = document.getElementById("arrow");
    filterListEl = document.getElementById("filter_list");
    clockPauser = document.getElementById("clock_pauser");

    // retrieve prefs from localStorage
    activeFilter = localStorage.getItem("filter");
    arrow = localStorage.getItem("arrow");

    // if there is a filter preference saved, use it
    if (activeFilter !== null) {
        filterListEl.value = activeFilter;
        applyFilter(activeFilter);
    }

    checkArrow()
    checkFlux()

    // then do the actual wiring
    wireCtrl("clock_pauser", "click", toggleClock);
    wireCtrl("time_reverser", "click", reverseTime);
    wireCtrl("slice_restorer", "click", restoreSlices);
    wireCtrl("filter_list", "change", e => applyFilter(e.target.value), false);
    // wireCtrl("mode_list", "change", e => applyFilter(e.target.value), false);

    // return false;
}

function checkArrow() {
    // if there isn't a arrow saved in the browser, default to left
    if (arrow === null) {
        arrow = "left";
        localStorage.setItem("arrow", arrow);
    } else if (arrow === "right") {
        arrowEl.classList.add('reversed');
        return false;
    } else if (arrow === 'left') {
        arrowEl.classList.remove('reversed');
        return true;
    }
}

function checkFlux() {
    if (localStorage.getItem('fluxState') === "flowing") {
        clockPauser.textContent = "Be still";
        return true;
    } else {
        clockPauser.textContent = "Flow on";
        return false;
    }
}

function toggleClock() {
    if (localStorage.getItem('fluxState') === "flowing") {
        Clock.stop()
        localStorage.setItem('fluxState', 'still')
        checkFlux();
    } else {
        Clock.start();
        localStorage.setItem('fluxState', 'flowing');
        checkFlux();
    } // return false;
}

// when the reverse button is hit, flip the bit in localStorage
function reverseTime () {
    arrow = arrow === "right" ? "left" : "right";
    localStorage.setItem("arrow", arrow);
    checkArrow();
    if (!checkFlux()) Face.update()
}

function restoreSlices () {
    for (let slice of SLICES) {
        localStorage.setItem(slice + "Slice", "");
    }
    Init.restart();

};

// for swapping out modes and filters on the component parent div
function applyFilter(bodyClass) {
    clockEl = document.getElementById("clock");
    clockEl.classList.remove(activeFilter);
    clockEl.classList.add(bodyClass);
    activeFilter = bodyClass;
    return localStorage.setItem("filter", bodyClass);
}

var wired = {};
// a DRYer way to wire the buttons
function wireCtrl (el, evt, clbk, opts) {
    const ctrl = document.getElementById(el)
    if (!wired[el]) {
        ctrl.addEventListener(evt, clbk, opts);
        wired[el] = true;
    }
    return true;
};

function getArrow() {
    return arrow;
}

export default {
    arrow: getArrow,
    install: wireControls
}
