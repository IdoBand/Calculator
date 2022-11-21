// these 2 functios are just shortcuts to select items
const qasCalc = document.querySelectorAll.bind(document);
const byIdCalc = document.getElementById.bind(document);


let mathValues = {
    scientific: false,
    firstOperand: '',
    secondOperand: '',
    currentOperator: '',
    valueCalculated: ''
};

const display = byIdCalc('display');

let digitBtns = qasCalc('.digit');


digitBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        digitClick(e);
    });
});

function digitClick (e) {
    if (mathValues.scientific === true) {            // scientific mode in ON
        display.innerText += e.target.innerText;
    }
    else {                                           // scientific mode in OFF
        if (mathValues.currentOperator === ''){
            display.innerText += e.target.innerText;
            mathValues.firstOperand = display.innerText
        }
        else if (mathValues.currentOperator !== '') {
        display.innerText += e.target.innerText;
        mathValues.secondOperand += +e.target.innerText;
        }
        else {
            display.innerText += e.target.innerText;
            mathValues.secondOperand += e.target.innerText;
        }
    }

};

let operators: string[] = ['+','-','/','*'];
let operatorBtns = qasCalc('.operator')

operatorBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        let lastChar = display.innerText.charAt(display.innerText.length-1);
            operatorClick(e, lastChar);
    });
});

function operatorClick (e, lastChar: string) {
    if (mathValues.scientific === true) {            // scientific mode in ON
        console.log(operatorBtns)
        display.innerText += e.target.innerText;
    }
    else {
        if (mathValues.currentOperator === ''){                // operator not assigned yet.
            display.innerText += e.target.id;
            mathValues.currentOperator = e.target.innerText;
        }
        else if (mathValues.currentOperator !== '' && operators.includes(lastChar)){ // an operator has already been clicked once.
            display.innerText = display.innerText.slice(0,-1);  // delete operator from display.
            display.innerText += e.target.id;                         // add new operator to display.
            mathValues.currentOperator = e.target.innerText;                            // set new currentOperator.
        }
        else if (mathValues.currentOperator !== ''){                                     // operator been clicked after two operands and operator are already been clickd.
            display.innerText = eval(display.innerText.replace(/[^-+/.*\d]/g, ''));
            mathValues.firstOperand = display.innerText;
            mathValues.secondOperand = '';
            display.innerText += e.target.id;
            mathValues.currentOperator = e.target.innerText;
        }
    };
};

let backBtn = byIdCalc('back');
backBtn.addEventListener('click', () => {
    if (mathValues.scientific === false) {
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
    };
});

let clearBtn = byIdCalc('C')
clearBtn.addEventListener('click', () => {
    mathValues.firstOperand = '';
    mathValues.secondOperand = '';
    mathValues.currentOperator = '';
    display.innerText = '';
});

let equalBtn = byIdCalc('equal')
equalBtn.addEventListener('click', () =>{
    display.innerText = eval(display.innerText.replace(/[^-+/.*\d]/g, ''));
    mathValues.valueCalculated = display.innerText;
});

let scientificMode = byIdCalc('scientific-mode');
scientificMode.addEventListener('click', () =>{
    display.innerText = '';
    mathValues = {
        scientific: true,
        firstOperand: '',
        secondOperand: '',
        currentOperator: '',
        valueCalculated: ''
    };
});

let basicMode = byIdCalc('basic-mode');
basicMode.addEventListener('click', () => {
    display.innerText = '';
    mathValues = {
        scientific: false,
        firstOperand: '',
        secondOperand: '',
        currentOperator: '',
        valueCalculated: ''
    };
});

