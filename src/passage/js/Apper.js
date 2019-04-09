var deferredPrompt,
    asker;

const listenToPrompt = () => {
    asker = document.getElementById('app_asker');
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can add to home screen
        setTimeout(showAppAsker, 22222);
    });
}

const showAppAsker = () => {
    // once the install promptability message has been received
    // check whether the user has tried anything
    // and give them a modicum of passage
    asker.classList.remove('hidden');
    wireAppNoper();
    wireAppAdder();
}

const wireAppNoper = () => {
    const appNoper = document.getElementById('app_noper');
    appNoper.addEventListener('click', () => {
        nixAsker();
    });
}

const wireAppAdder = () => {
    const appAdder = document.getElementById('app_adder');
    appAdder.addEventListener('click', () => addToHomeScreen);
}

const addToHomeScreen = () => {
    // hide our user interface that shows our A2HS button
    nixAsker();
    // Show the prompt
    console.log('waiting for a deferred prompt reply');
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
}

const nixAsker = () => {
    asker.style.opacity = 0;
    setTimeout(() => {
        asker.style.display = 'none'
    }, 500)
}

export default {
    listenToPrompt
}
