// const developer = {
//     name:"Ido Band",
//     version: "1.0.0",
//     desciption:"This calculator should help you do math, math is math"
// };


// these 2 functios are just shortcuts to select items
const qasApp = document.querySelectorAll.bind(document);
const byIdApp = document.getElementById.bind(document);


// these 2 functios are just shortcuts to make it easier to render
const hideMains = () => qasApp('main').forEach(e => e.style.display = 'none');
const showSelectedMains = (modeState) => { 
    if (modeState.scientific === true) {
        byIdApp('scientific').style.display = 'block';}
    if (modeState.history === true) {
        byIdApp('operations-log').style.display = 'block';}
  };

// const subSettings = () => document.querySelector.bind('.sub-settings').forEach(e => e.style.display = 'none')
// byIdApp('hi').style.display = 'none';



// which modes are on/off
let modeState = {
    basic: true,
    scientific: false,
    history: false,
    displaylight: false,
};

// display screen light
let lightBtn = byIdApp('light')
lightBtn.addEventListener('click', () => {
    let display = byIdApp('display');
    if (modeState.displaylight === false) {
        display.classList.add("light");
        modeState.displaylight = true;
    }
    else {
        display.classList.remove("light");
        modeState.displaylight = false;
    }
});

//histoy-mode
let historyModeBtn = byIdApp('history')
historyModeBtn.addEventListener('click', () => {
    if (modeState.history === false) {
        modeState.history = true;
        historyModeBtn.style.backgroundColor = 'rgb(230, 167, 9)';}
    else {modeState.history = false;
        historyModeBtn.style.backgroundColor = 'rgb(95, 95, 219)';}
    render(modeState);
});

//basic-mode
let basicModeBtn = byIdApp('basic-mode')
basicModeBtn.addEventListener('click', () => {
    modeState.scientific = false;
    // if (modeState.scientific === true) {};
    scientificModeBtn.style.backgroundColor = 'rgb(95, 95, 219)';
    render(modeState);
});

//scientific-mode
let scientificModeBtn = byIdApp('scientific-mode')
scientificModeBtn.addEventListener('click', () => {
    modeState.scientific = true;
    scientificModeBtn.style.backgroundColor = 'rgb(230, 167, 9)';
    render(modeState);
});

// a function to change the page background color
function changeBackgroundColor(e) {
    document.body.style.backgroundColor = e.target.id;
    };
// dark mode function
function darkMode() {
    let bodyElement = document.body;
    if (bodyElement.className === '') {
        bodyElement.classList.add("dark");
    }
    else {
          bodyElement.classList.remove("dark");
    }

};



function render(s) {
    hideMains();
    showSelectedMains(s);
};


document.addEventListener('DOMContentLoaded', () => render(modeState))
