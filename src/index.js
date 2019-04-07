import './styles.css';            // styles for the consumer
import './manifest.json';
import './favicons/favicon.ico';  // probably not necessary

import Passage from './passage/js';
import PsgTemplate from './passage/index.html';

if (process.env.NODE_ENV !== 'production') {
    console.log('Running in development mode');
}

function component() {
    const clockContainer = document.createElement('section');

    clockContainer.classList.add('clock');
    clockContainer.setAttribute('id', 'clock');
    clockContainer.innerHTML = PsgTemplate;

    return clockContainer;
}

// Store the element to re-render on module changes
let element = component();
document.body.appendChild(element);

const REFRESH_RATE = 32;
Passage.init(REFRESH_RATE);

if (module.hot) {
    module.hot.accept('./passage/js/index.js', function (){
        document.body.removeChild(element);
        element = component(); // Re-render the component to update handlers
        document.body.appendChild(element);
        Passage.init();
    })
}
