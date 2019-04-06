import './styles.css';
import Clock from './clock/index.js';
import clockTemplate from './clock/index.html';

if (process.env.NODE_ENV !== 'production') {
    console.log('Running in development mode');
}

function component() {
    var clockContainer = document.createElement('section');

    clockContainer.classList.add('clock');
    clockContainer.setAttribute('id', 'clock');
    clockContainer.innerHTML = clockTemplate;

    return clockContainer;
}

let element = component(); // Store the element to re-render on module changes
document.body.appendChild(element);
Clock.init();

if (module.hot) {
    module.hot.accept('./clock/index.js', function (){
        document.body.removeChild(element);
        element = component(); // Re-render the component to update handlers
        document.body.appendChild(element);
        Clock.init();
    })
}
