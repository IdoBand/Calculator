// these 2 functios are just shortcuts to select items
const qasCalc = document.querySelectorAll.bind(document);
const byIdCalc = document.getElementById.bind(document);


let mathValues = {
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
let digitBtns = qasCalc('.digit');
digitBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        let lastChar = display.innerText.charAt(display.innerText.length-1);
        digitClick(e, lastChar);
    });
});

// digit buttons event handler
function digitClick (e, lastChar) {
    if (e.target.innerText === '0' && lastChar === '/') {     //preventing division by 0
        alert("YOUR'E NOT ALLOWED TO DIVIDE BY 0!");
    }
    else if (mathValues.scientific === true) {                // scientific mode
        display.innerText += e.target.id;
    }
    else {                                                    // basic mode
        if (mathValues.currentOperator === ''){
            display.innerText += e.target.id;
            mathValues.firstOperand = display.innerText
        }
        else if (mathValues.currentOperator !== '') {
        display.innerText += e.target.id;
        mathValues.secondOperand += +e.target.id;
        }
        else {
            display.innerText += e.target.id;
            mathValues.secondOperand += e.target.id;
        }
    };
};


// operator button listener
let operators: string[] = ['+','-','/','*'];
let operatorBtns = qasCalc('.operator')
operatorBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        let lastChar = display.innerText.charAt(display.innerText.length-1);
            operatorClick(e, lastChar);
    });
});

// operator button handler
function operatorClick (e, lastChar: string) {
    if (mathValues.scientific === true) {            // scientific mode
        display.innerText += e.target.id;
    }
    else {
        if (mathValues.currentOperator === ''){                // operator not assigned yet.
            display.innerText += e.target.id;
            mathValues.currentOperator = e.target.id;
        }
        else if (mathValues.currentOperator !== '' && operators.includes(lastChar)){ // operator has already been clicked once => change operator
            display.innerText = display.innerText.slice(0,-1);        // delete operator from display.
            display.innerText += e.target.id;                         // add new operator to display.
            mathValues.currentOperator = e.target.id;          // set new operator as currentOperator.
        }
        else if (mathValues.currentOperator !== ''){             // operator been clicked after two operands and operator are already been clickd.
            let res = eval(display.innerText.replace(/[^-+/.*\d]/g, ''));   // calculate result
            log.innerText += display.innerText + '=' + res + '\n';              // add operations + result to log
            display.innerText = res;                                            // add result to screen display
            mathValues.firstOperand = display.innerText;                        // set result ass first operand
            mathValues.secondOperand = '';                                      // restart second operand
            display.innerText += e.target.id;                                   // add new operator to screen display
            mathValues.currentOperator = e.target.id;                    // set new operator as current operator
        }
    };
};

let backBtn = byIdCalc('back');
backBtn.addEventListener('click', () => {
    if (mathValues.scientific === false) {      // basic mode
        if (mathValues.currentOperator === '') {
            mathValues.firstOperand = '';
            display.innerText = '';
        }
        else if (mathValues.secondOperand === '' && mathValues.currentOperator !== '') {
            mathValues.currentOperator = '';
            display.innerText = mathValues.firstOperand;
        }
        else {
            mathValues.secondOperand = '';
            display.innerText = mathValues.firstOperand + mathValues.currentOperator;
        }
    } 
    else {                                       // scientiific mode
        display.innerText = display.innerText.slice(0,display.innerText.length-1);
    }
});

let clearBtn = byIdCalc('C')
clearBtn.addEventListener('click', () => {
    mathValues.firstOperand = '';
    mathValues.secondOperand = '';
    mathValues.currentOperator = '';
    display.innerText = '';
    log.innerText = '';
});

// eqaul button + history log
let equalBtn = byIdCalc('equal')
equalBtn.addEventListener('click', () =>{
    try {
        let res = eval(display.innerText);
    
        if (mathValues.remote === true) {              // remote mode       
            mathJSresult();
        }
        else if (mathValues.scientific === false) {  // basic mode
            basicEqual(res);
        }
        else {                                      // scientific mode
            scientificEqual(res);
        }
    } catch (err){
        console.log(`error: ${err}`)
        display.innerText = 'Math / Syntax error, please restart with "C" and try again.';
    }
});

function basicEqual(res) {
    log.innerText += mathValues.firstOperand +
        mathValues.currentOperator + 
        mathValues.secondOperand + 
        '=' + res + '\n';
        display.innerText = res;
};

function scientificEqual(res) {
    log.innerText += display.innerText + '=' +res+'\n';
    display.innerText = res;
};

// this function purpose is to stop request from math.js after 2 seconds
async function fetchWithTimeout(resource: string, options) {
    const { timeout = 2000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {...options,
                                                                signal: controller.signal //enabling abort
    });
    clearTimeout(id); //clears the abort timing function if the request completes faster than timeout time.
    return response;
}


// remote mode query - remote equal
async function mathJSresult() {
    try {
        const url:string = 'http://api.mathjs.org/v4/?expr=' + encodeURIComponent(display.innerText);
        const response = await fetchWithTimeout(url, { timeout: 2000 })
        const result = await response.text();
        display.innerText = result;
        console.log(`response from math.js was successful: ${result}`)

    } catch(err) {
        console.log(err)
        alert(`Request timed out. \nTry using basic mode instead.`)
        }
    };

// scientific mode button
let scientificMode = byIdCalc('scientific-mode');
scientificMode.addEventListener('click', () =>{
    display.innerText = '';
    mathValues.scientific = true;
    mathValues.currentOperator = '';
    mathValues.firstOperand = '';
    mathValues.secondOperand = '';
    mathValues.valueCalculated = '';
});

// basic mode button
let basicMode = byIdCalc('basic-mode');
basicMode.addEventListener('click', () => {
    display.innerText = '';
    mathValues = {
        scientific: false,
        remote: false,
        firstOperand: '',
        secondOperand: '',
        currentOperator: '',
        valueCalculated: ''
    };
});

// remote mode function
let remote = byIdCalc('remote')
remote.addEventListener('click', () => {
    if (mathValues.remote === false) {
        mathValues.remote = true
        mathValues.scientific = true
    }
    else {
        mathValues.remote = false
    }
});
// this line was added to create a new branch & pull request