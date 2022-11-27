const developer = {
    name:"Ido Band",
    version: "1.0.0",
    desciption:"This calculator should help you do math, math is math."
};

// these 2 functios are just shortcuts to select items
const qasApp = document.querySelectorAll.bind(document);
const byIdApp = document.getElementById.bind(document);

// message
let infoMessage =  byIdApp('info-message')
    infoMessage.innerText += `Developer Name: ${developer.name} \nVersion: ${developer.version} \nDescription: ${developer.desciption}`;

let infoBtn = byIdApp('info');
infoBtn.addEventListener('click', (e)=> {
    if (modeState.info === false) {
        modeState.info = true
        infoMessage.style.display = 'block';
        infoBtn.setAttribute('class', 'on')
    }
    else {
        modeState.info = false
        infoMessage.style.display = 'none';
        infoBtn.setAttribute('class', '')
    }
});


// these 2 functios are just shortcuts to make it easier to render
const hideMains = () => qasApp('main').forEach(e => e.style.display = 'none');
const showSelectedMains = (modeState) => { 
    if (modeState.scientific === true) {
        byIdApp('scientific').style.display = 'block';}
    if (modeState.history === true) {
        byIdApp('operations-log').style.display = 'block';}
    if (modeState.settings === true) {
        byIdApp('settings-form').style.display = 'block';}
  };

  const themes = (modeState) => {
    let bodyElement = document.body;
    bodyElement.style.backgroundColor = modeState.background;
    bodyElement.style.fontFamily = modeState.font;

  }
  

// which modes are on/off
let modeState = {
    basic: true,
    scientific: false,
    history: false,
    displaylight: false,
    font: 'montserrat,sans-serif',
    background: '',
    darkmode: false,
    info: false,
    settings: false,
    remote: false,
};

// display screen light button
let lightBtn = byIdApp('light');
lightBtn.addEventListener('click', () => {
    let display = byIdApp('display');
    if (modeState.displaylight === false) {
        display.classList.add("light");
        modeState.displaylight = true;
        lightBtn.setAttribute('class', 'on');
    }
    else {
        display.classList.remove("light");
        modeState.displaylight = false;
        lightBtn.setAttribute('class', '');
    }
});

//histoy-mode button
let historyModeBtn = byIdApp('history');
historyModeBtn.addEventListener('click', () => {
    if (modeState.history === false) {
        modeState.history = true;
        historyModeBtn.setAttribute('class', 'on');
    }

    else {modeState.history = false;
        historyModeBtn.setAttribute('class', '');
    }
    render(modeState);
});


//basic-mode button
let basicModeBtn = byIdApp('basic-mode');
basicModeBtn.addEventListener('click', () => {
    modeState.scientific = false;
    scientificModeBtn.setAttribute('class', '');
    remoteBtn.setAttribute('class', '');
    modeState.remote = false;
    render(modeState);
});

//scientific-mode button
let scientificModeBtn = byIdApp('scientific-mode');
scientificModeBtn.addEventListener('click', () => {
    modeState.scientific = true;
    scientificModeBtn.setAttribute('class', 'on');
    render(modeState);
});


// settings button
let settingsBtn = byIdApp('settings');
settingsBtn.addEventListener('click', () => {
    if (modeState.settings === false) {
    modeState.settings = true;
    settingsBtn.setAttribute('class', 'on')
    render(modeState);
    }
    else {
    modeState.settings = false;
    settingsBtn.setAttribute('class', '')
    render(modeState);
    }
});

// exit & reset buttons on settings form
let exitResetBtns = qasApp('.exit-reset');
exitResetBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.value;
        if (value === 'exit') {       // clicking exit
        modeState.settings = false;
        settingsBtn.setAttribute('class', '')
        render(modeState);
        }
        else {                      // clicking reset
            darkMode('false');
            backgroundColor('white')
            fontChanger('montserrat,sans-serif')
        }
    });
});


// dark mode buttons listener
let darkModeBtns = qasApp('.dark-mode-button')
darkModeBtns.forEach(button => {
    button.addEventListener('click', (e) =>{
        console.log(e.target.value)
        darkMode(e.target.value);
    });
});

// dark mode function
function darkMode(st: string) {
    let bodyElement = document.body;
    if (st === 'true') {
        console.log(st)
        bodyElement.setAttribute('class', 'dark');
        bodyElement.style.backgroundColor = 'black';
    }
    else {
        bodyElement.setAttribute('class', '');
        bodyElement.style.backgroundColor = 'white';
    }
};

// color buttons settings listener
let colorButtons = qasApp('.color-button')
colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        backgroundColor(e.target.value);
    });
});

// background color change function
function backgroundColor(st: string) {
    let bodyElement = document.body;
    bodyElement.style.backgroundColor = st;
};

// font buttons listener
let fontBtns = qasApp('.font-button');
    fontBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            fontChanger(e.target.id);
        });
    });

// font changer function
function fontChanger(st: string) {
    let bodyElement = document.body;
    bodyElement.style.fontFamily = st;
    render(modeState);
};

// remote mode btn color change
let remoteBtn = byIdApp('remote')
remoteBtn.addEventListener('click', () => {
    if (modeState.remote === false) {
    modeState.remote = true;
    remoteBtn.setAttribute('class', 'on')
    }
    else {
    modeState.remote = false;
    remoteBtn.setAttribute('class', '')
    }
});

function render(s) {
    hideMains();
    showSelectedMains(s);
};

document.addEventListener('DOMContentLoaded', () => render(modeState));
// this line was added to create a new branch & pull request