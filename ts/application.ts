// info message content
const developer = {
    name:"Ido Band",
    version: "1.0.0",
    desciption:"This calculator should help you do math, math is math."
};

// these 2 functios are just shortcuts to select items
const qsaApp = document.querySelectorAll.bind(document);
const byIdApp = document.getElementById.bind(document);

// info message pop up
const infoMessage = byIdApp('info');
infoMessage.innerText = `Developer Name: ${developer.name} \nVersion: ${developer.version} \nDescription: ${developer.desciption}`;

// true = <main> is displayed on screen
const mainsState = {
    // basic: true,       basic is ALWAYS ON!
    scientific: false,
    history: false,
    info: false,
    settingsForm: false,
    remote: false,
};

// bg color, font, dark mode
const styilingThemes = {
    displaylight: false,
    font: 'montserrat,sans-serif',
    background: '',
    darkmode: false,
}

// change buttons color and state according to state
const isBtnOn = (e) => {
    let button = byIdApp(e.target.id)
    button.getAttribute('class') === '' ? button.setAttribute('class', 'on') : button.setAttribute('class', '');
};

const onOffButtons = qsaApp("[value='onOff']");
onOffButtons.forEach(button  => {
    button.addEventListener('click', (e) => {
        isBtnOn(e);
    });
});

const scientificBtn = byIdApp('scientificBtn')
scientificBtn.addEventListener('click', (e) => {
    mainsState.scientific === false ? mainsState.scientific = true : mainsState.scientific = false;
    render(mainsState);
});

const historyBtn = byIdApp('historyBtn')
historyBtn.addEventListener('click', (e) => {
    mainsState.history === false ? mainsState.history = true : mainsState.history = false;
    render(mainsState);
});

const settingsBtn = byIdApp('settingsBtn')
settingsBtn.addEventListener('click', (e) => {
    mainsState.settingsForm === false ? mainsState.settingsForm = true : mainsState.settingsForm = false;
    render(mainsState);
});

const infoBtn = byIdApp('infoBtn')
infoBtn.addEventListener('click', (e) => {
    mainsState.info === false ? mainsState.info = true : mainsState.info = false;
    render(mainsState);
});

const lightBtn = byIdApp('lightBtn')
lightBtn.addEventListener('click', (e) => {
    const displyScreen = byIdApp('display');
    displyScreen.getAttribute('class') === '' ? displyScreen.setAttribute('class', 'light') : displyScreen.setAttribute('class', '');

});


//#########################################################################################


// these 2 functios are just shortcuts to make it easier to render
const hideMains = () => qsaApp('main').forEach(e => e.style.display = 'none');
const showSelectedMains = (mainsState) => { 
    byIdApp('basic').style.display = 'grid';
    for (const [key,val] of Object.entries(mainsState)) {
        if (val === true) {
            byIdApp(`${key}`).style.display = 'block';
        }
    }
};
  

// exit & reset buttons on settings form
const exitResetBtns = qsaApp('.exit-reset');
exitResetBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.value;
        if (value === 'exit') {       // clicking exit
        mainsState.settingsForm = false;
        byIdApp('settingsBtn').setAttribute('class', '')
        render(mainsState);
        
        }
        else {                      // clicking reset
            darkMode('false');
            backgroundColor('white')
            fontChanger('montserrat,sans-serif')
        }
    });
});

// dark mode buttons listener
let darkModeBtns = qsaApp('.dark-mode-button')
darkModeBtns.forEach(button => {
    button.addEventListener('click', (e) =>{
        darkMode(e.target.value);
    });
});

// dark mode function
function darkMode(st: string) {
    let bodyElement = document.body;
    if (st === 'true') {
        bodyElement.setAttribute('class', 'dark');
        bodyElement.style.backgroundColor = 'black';
    }
    else {
        bodyElement.setAttribute('class', '');
        bodyElement.style.backgroundColor = 'white';
    }
};

// color buttons settings listener
let colorButtons = qsaApp('.color-button')
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
let fontBtns = qsaApp('.font-button');
    fontBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            fontChanger(e.target.id);
        });
    });

// font changer function
function fontChanger(st: string) {
    let bodyElement = document.body;
    bodyElement.style.fontFamily = st;
    render(mainsState);
};

function render(s) {
    hideMains();
    showSelectedMains(s);
};



document.addEventListener('DOMContentLoaded', () => {

        // 2 ways to change page color/dark/font - 1) hidden settings div.   
        //                                         2) query params from a different html page.


        // const queryString = window.location.search;
        // const urlParams = new URLSearchParams(queryString);
        // const color = urlParams.get('color'); // 'color' can receive 5 diff options
        // backgroundColor(color);
        // const dark = urlParams.get('dark') ;  // 'dark' can be true / false
        // darkMode(dark);
        // const fonts = urlParams.get('fonts'); // font has 2 options
        // fontChanger(fonts)
    
    render(mainsState)
    // window.history.replaceState(null, null, window.location.pathname);  // clean url from params

});
