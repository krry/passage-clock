import Ctrls from "./Ctrls";

const INACTIVE_USER_TIME_THRESHOLD = 10000;
const USER_ACTIVITY_THROTTLER_TIME = 2000;

let userActivityTimeout = null;
let userActivityThrottlerTimeout = null

function resetUserActivityTimeout() {
  clearTimeout(userActivityTimeout);
  Ctrls.show();
  userActivityTimeout = setTimeout(() => {
    inactiveUserAction();
  }, INACTIVE_USER_TIME_THRESHOLD);
}

function inactiveUserAction() {
  Ctrls.hide();
  // logout logic
}

function activateActivityTracker() {
  window.addEventListener("mousemove", userActivityThrottler);
  window.addEventListener("scroll", userActivityThrottler);
  window.addEventListener("keydown", userActivityThrottler);
  window.addEventListener("resize", userActivityThrottler);
}

function userActivityThrottler() {
  if (!userActivityThrottlerTimeout) {
    userActivityThrottlerTimeout = setTimeout(() => {
      resetUserActivityTimeout();

      clearTimeout(userActivityThrottlerTimeout);
      userActivityThrottlerTimeout = null;
    }, USER_ACTIVITY_THROTTLER_TIME);
  }
}

export default {
  activate: activateActivityTracker
};
