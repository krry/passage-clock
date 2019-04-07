import Data from './Data'

const SLICES = Data.get('slices');

// find close-x's and wire them to hide their slices
function wireHiders() {
    const hiders = document.getElementsByClassName("hide-slice");

    for (let slice of SLICES) {
        if (localStorage[slice + "Slice"] === "false") removeSlice(slice);
    }

    for (let i = 0; i < hiders.length; i++) {
        hiders[i].addEventListener("click", removeSlice, { once: true });
    }
    // return false;
}

function removeSlice (arg) {

    const sliceName = arg.target ? arg.target.getAttribute("slice") : arg;
    const index = SLICES.indexOf(sliceName);
    const sliceDiv = document.getElementById(sliceName + "Slice");

    if (index > -1) {
        // SLICES.splice(index, 1);
        sliceDiv.classList.add("hidden");
        localStorage[sliceDiv.id] = "false";
        setTimeout(function() {
            sliceDiv.style.display = "none";
        }, 500);
    }
    // return false;
};

export default {
    wire: wireHiders
}
