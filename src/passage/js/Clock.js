import Face from './Face'

var clock;

function startClock(tick = 32) {
    clock = setInterval(Face.update, tick);
    localStorage.setItem('fluxState', "flowing");
}

function stopClock() {
    clearInterval(clock)
}

export default {
    start: startClock,
    stop: stopClock,
}
