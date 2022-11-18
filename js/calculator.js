let valueCalculated;

let firstOperand = '';

let currentOperator = 0;

let secondOperand = '';

let display = document.getElementById("display");

let buttons = Array.from(document.getElementsByTagName("button"));


// how do i get operators inner text from document.getElementsByclassName("operator")????????????
let operators = ['+','-','/','*'];


function operatorClick (e, lastChar) {
    if (currentOperator === 0){                // operator not assigned yet.
        display.innerText += e.target.id;
        currentOperator = e.target.innerText;
    }
    else if (currentOperator !== 0 && operators.includes(lastChar)){ // an operator has already been clicked once.
        display.innerText = display.innerText.slice(0,-1);  // delete operator from display.
        display.innerText += e.target.id;                         // add new operator to display.
        currentOperator = e.target.innerText;                            // set new currentOperator.
    }
    else if (currentOperator !== 0){                                     // operator been clicked after two operands and operator are already been clickd.
        display.innerText = eval(display.innerText.replace(/[^-+/.*\d]/g, ''));
        firstOperand = +display.innerText;
        secondOperand = '';
        display.innerText += e.target.id;
        currentOperator = e.target.innerText;
    }
};

function digitClick (e) {
    if (currentOperator === 0){
        display.innerText += e.target.innerText;
        firstOperand = +display.innerText
    }
    else if (currentOperator !== 0) {
    display.innerText += e.target.innerText;
    secondOperand += +e.target.innerText;
    }
    else {
        display.innerText += e.target.innerText;
        secondOperand += e.target.innerText;
    }
};

function backClick () {
    if (currentOperator === 0) {
        firstOperand = '';
        display.innerText = '';
    }
    else if (secondOperand === '' && currentOperator !== 0) {
        currentOperator = 0;
        display.innerText = firstOperand;
    }
    else {
        secondOperand = '';
        display.innerText = firstOperand + currentOperator;
    }
};


buttons.map(button => {
    button.addEventListener('click', (e) => {

        let clickedItemID = e.target.id;
        let clickedItemClass = e.target.className;
        let lastChar = display.innerText.charAt(display.innerText.length-1);

        if (clickedItemClass === 'digit'){
            digitClick(e);
        }
        else if (clickedItemID === "C"){               // C resets display and all variables
            firstOperand = 0;
            secondOperand = 0;
            currentOperator = 0;
            display.innerText = '';
        }
        else if (clickedItemClass === 'operator') {    // when an Operator btn is clicked we have 3 cases to handle
            operatorClick (e, lastChar);
        }
        else if (clickedItemClass === 'eval') {                       // equal, solve the equation
            firstOperand = +firstOperand
            secondOperand = +secondOperand                           
            display.innerText = eval(display.innerText.replace(/[^-+/.*\d]/g, ''));
            valueCalculated = display.innerText;
            alert(display.innerText);
        }
        else if (clickedItemID === 'back') {                            // back button
            backClick();
        }

        // console.log(`clickedItemID : ${clickedItemID}`);             //  debugging
        // console.log(`clickedItemClass : ${clickedItemClass}`);
        // console.log(`lastChar : ${lastChar}`);
        // console.log(`firstOperand : ${firstOperand}`);
        // console.log(`secondOperand : ${secondOperand}`);
        // console.log(`currentOperator : ${currentOperator}`);
        // console.log(`valueCalculated : ${valueCalculated}`);
        // console.log('---------------------------------');
    });
});