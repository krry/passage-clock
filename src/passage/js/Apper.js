import LS from './Cacher';
var deferredPrompt, asker, emitter;

const listenToPrompt = emt => {
  emitter = emt;
  emitter.on("app", nixAsker);
  asker = document.getElementById("app_asker");
  window.addEventListener("beforeinstallprompt", e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    setTimeout(showAppAsker, 22222);
  });
};

const showAppAsker = () => {
  // once the install promptability message has been received
  // check whether the user has tried anything
  // and give them a modicum of passage
  let askStatus = LS.load("askStatus") || "";
  if (askStatus !== "refused") {
    wireAppNoper();
    wireAppAdder();
    asker.classList.remove("hidden");
    emitter.emit("app", "askStatus", "shown");
  }
};

const wireAppNoper = () => {
  const appNoper = document.getElementById("app_noper");
  appNoper.addEventListener("click", () => {
    emitter.emit("app", "askStatus", "refused");
  });
};

const wireAppAdder = () => {
  const appAdder = document.getElementById("app_adder");
  appAdder.addEventListener("click", () => addToHomeScreen);
};

const addToHomeScreen = () => {
  // hide our user interface that shows our A2HS button
  emitter.emit("app", "askStatus", "refused");
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === "accepted") {
      emitter.emit("app", "askStatus", "accepted");
    } else {
      emitter.emit("app", "askStatus", "stalled");
    }
    deferredPrompt = null;
  });
};

const nixAsker = (prop, val) => {
  if (prop === "askStatus" && val === "refused") {
    asker.style.opacity = 0;
    setTimeout(() => {
      asker.style.display = "none";
    }, 500);
  }
};

export default {
  listenToPrompt
};
