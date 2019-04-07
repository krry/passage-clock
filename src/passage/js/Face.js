import Data from './Data';
import Time from './Time';
import Crown from './Crown';

var position,
    moment;

const SLICES = Data.get('slices');

// sends parsed time to divs and css
// gets called every TICK ms

function updateFace() {
    moment = Time.tick();

    // parses out the pc object slice by slice
    for (let slice of SLICES) {

    if (slice === "ms") {
        document.getElementById("millis").textContent = display(slice);
        continue;
    }

    document.querySelector(
        "#" + slice + "Slice > .current-time"
    ).textContent = display(slice);

    document.querySelector(
        "#" + slice + "Slice > .percent-gone"
    ).textContent = percent(slice);

    document.querySelector(
        "#" + slice + "Slice > .time-band"
    ).style.transform = "translateX(" + bandShift(slice) + ")";

  }
  // return false;
}

// formats the passage ratios into percentages
function percent(slice) {
    return (moment.passage[slice] * 100).toFixed(2) + "%";
}

// returns the clock readouts from the sliceTime object
function display(slice) {
    return moment.display[slice];
}

// determines how much to move the passage bars
// returns a negative percentage when time goes backward
function bandShift(slice) {

    position = 100 - moment.passage[slice] * 100 * 2;

    if (Crown.arrow() === "right") {
        position *= -1;
    }

    return position.toString() + "%";
}

export default {
    update: updateFace
}
