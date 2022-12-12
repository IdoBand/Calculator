// these 2 functios are just shortcuts to select items
const qsaCalc = document.querySelectorAll.bind(document);
const byIdCalc = document.getElementById.bind(document);
// basic mode values
let basicMathValues = {
    scientific: false,
    remote: false,
    firstOperand: '',
    secondOperand: '',
    currentOperator: '',
    valueCalculated: ''
};
// screen display 
const display = byIdCalc('display');
// history log
const log = byIdCalc('log');
// digit buttons event listener
let digitBtns = qsaCalc('.digit');
digitBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        let lastChar = display.innerText.charAt(display.innerText.length - 1);
        digitClick(e, lastChar);
    });
});
// digit buttons event handler
function digitClick(e, lastChar) {
    if (e.target.innerText === '0' && lastChar === '/') { //preventing division by 0
        alert("YOUR'E NOT ALLOWED TO DIVIDE BY 0!");
    }
    else if (basicMathValues.scientific === true) { // scientific mode
        display.innerText += e.target.id;
    }
    else { // basic mode
        if (basicMathValues.currentOperator === '') {
            display.innerText += e.target.id;
            basicMathValues.firstOperand = display.innerText;
        }
        else if (basicMathValues.currentOperator !== '') {
            display.innerText += e.target.id;
            basicMathValues.secondOperand += +e.target.id;
        }
        else {
            display.innerText += e.target.id;
            basicMathValues.secondOperand += e.target.id;
        }
    }
    ;
}
;
// operator button listener
let operators = ['+', '-', '/', '*'];
let operatorBtns = qsaCalc('.operator');
operatorBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        let lastChar = display.innerText.charAt(display.innerText.length - 1);
        operatorClick(e, lastChar);
    });
});
// operator button handler
function operatorClick(e, lastChar) {
    if (basicMathValues.scientific === true) { // scientific mode
        display.innerText += e.target.id;
    }
    else {
        if (basicMathValues.currentOperator === '') { // operator not assigned yet.
            display.innerText += e.target.id;
            basicMathValues.currentOperator = e.target.id;
        }
        else if (basicMathValues.currentOperator !== '' && operators.includes(lastChar)) { // operator has already been clicked once => change operator
            display.innerText = display.innerText.slice(0, -1); // delete operator from display.
            display.innerText += e.target.id; // add new operator to display.
            basicMathValues.currentOperator = e.target.id; // set new operator as currentOperator.
        }
        else if (basicMathValues.currentOperator !== '') { // operator been clicked after two operands and operator are already been clickd.
            let res = eval(display.innerText.replace(/[^-+/.*\d]/g, '')); // calculate result
            log.innerText += display.innerText + '=' + res + '\n'; // add operations + result to log
            display.innerText = res; // add result to screen display
            basicMathValues.firstOperand = display.innerText; // set result ass first operand
            basicMathValues.secondOperand = ''; // restart second operand
            display.innerText += e.target.id; // add new operator to screen display
            basicMathValues.currentOperator = e.target.id; // set new operator as current operator
        }
    }
    ;
}
;
let backBtn = byIdCalc('back');
backBtn.addEventListener('click', () => {
    if (basicMathValues.scientific === false) { // basic mode
        if (basicMathValues.currentOperator === '') {
            basicMathValues.firstOperand = '';
            display.innerText = '';
        }
        else if (basicMathValues.secondOperand === '' && basicMathValues.currentOperator !== '') {
            basicMathValues.currentOperator = '';
            display.innerText = basicMathValues.firstOperand;
        }
        else {
            basicMathValues.secondOperand = '';
            display.innerText = basicMathValues.firstOperand + basicMathValues.currentOperator;
        }
    }
    else { // scientiific mode
        display.innerText = display.innerText.slice(0, display.innerText.length - 1);
    }
});
// clear data & display
let clearBtn = byIdCalc('C');
clearBtn.addEventListener('click', () => {
    basicMathValues.firstOperand = '';
    basicMathValues.secondOperand = '';
    basicMathValues.currentOperator = '';
    display.innerText = '';
    log.innerText = '';
});
// eqaul button + history log
let equalBtn = byIdCalc('equal');
equalBtn.addEventListener('click', () => {
    try {
        let res = eval(display.innerText);
        if (basicMathValues.remote === true) { // remote mode       
            mathJSresult();
        }
        else if (basicMathValues.scientific === false) { // basic mode
            basicEqual(res);
        }
        else { // scientific mode
            scientificEqual(res);
        }
    }
    catch (err) {
        console.log(`error: ${err}`);
        display.innerText = 'Math / Syntax error, please restart with "C" and try again.';
    }
});
// basic mode equal
function basicEqual(res) {
    log.innerText += basicMathValues.firstOperand +
        basicMathValues.currentOperator +
        basicMathValues.secondOperand +
        '=' + res + '\n';
    display.innerText = res;
}
;
//scientific mode equal
function scientificEqual(res) {
    log.innerText += display.innerText + '=' + res + '\n';
    display.innerText = res;
}
;
// try fetching from math.js API. abort is no response after 2 seconds
async function fetchWithTimeout(resource, options) {
    const { timeout = 2000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, { ...options,
        signal: controller.signal //enabling abort
    });
    clearTimeout(id); //clears the abort timing function if the request completes faster than timeout time.
    return response;
}
// remote mode - remote equal
async function mathJSresult() {
    try {
        const url = 'http://api.mathjs.org/v4/?expr=' + encodeURIComponent(display.innerText);
        const response = await fetchWithTimeout(url, { timeout: 2000 });
        const result = await response.text();
        display.innerText = result;
        console.log(`response from math.js was successful: ${result}`);
    }
    catch (err) {
        console.log(err);
        alert(`Request timed out. \nTry using basic mode instead.`);
    }
}
;
// scientific mode button
let scientificMode = byIdCalc('scientificBtn');
scientificMode.addEventListener('click', () => {
    display.innerText = '';
    basicMathValues.scientific = true;
    basicMathValues.currentOperator = '';
    basicMathValues.firstOperand = '';
    basicMathValues.secondOperand = '';
    basicMathValues.valueCalculated = '';
});
// basic mode button
let basicMode = byIdCalc('basicBtn');
basicMode.addEventListener('click', () => {
    display.innerText = '';
    basicMathValues = {
        scientific: false,
        remote: false,
        firstOperand: '',
        secondOperand: '',
        currentOperator: '',
        valueCalculated: ''
    };
});
// remote mode (mathJS) state function
let remote = byIdCalc('remoteBtn');
remote.addEventListener('click', () => {
    if (basicMathValues.remote === false) {
        basicMathValues.remote = true;
        basicMathValues.scientific = true;
    }
    else {
        basicMathValues.remote = false;
    }
});
