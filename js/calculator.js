let valueCalculated;

let firstOperand = '';

let currentOperator = 0;

let secondOperand = '';

let display = document.getElementById("display");

let buttons = Array.from(document.getElementsByTagName("button"));

    buttons.map(button => {
        button.addEventListener('click', (e) => {

            let clickedItemID = e.target.id;
            let clickedItemClass = e.target.className;
            let lastChar = display.innerText.charAt(display.innerText.length-1);
            

            if (clickedItemClass === 'digit'){
                if (currentOperator === 0){
                display.innerText += e.target.innerText;
                firstOperand = +display.innerText
                }
                else {
                    display.innerText += e.target.innerText;
                    secondOperand += e.target.innerText;
                }
            }
            else if (clickedItemID === "C"){               // C reset display and all variables
                firstOperand = 0;
                secondOperand = 0;
                currentOperator = 0;
                display.innerText = '';
            }
            else if (clickedItemClass === 'operator') {    // when an Operator btn is clicked we have 3 cases to handle
                if (currentOperator === 0){                // operator not assigned yet
                    display.innerText += e.target.innerText;
                    currentOperator = e.target.innerText;
                }
                else if (currentOperator !== 0 && lastChar === '+' || lastChar === '-'  || lastChar === '/' || lastChar === '*'){ // an operator has already been clicked once
                    display.innerText = display.innerText.slice(0,-1);  // delete operator from display
                    display.innerText += e.target.innerText;            // add new operator to display
                    currentOperator = e.target.innerText;              // set new currentOperator
                }
                // else if (currentOperator !== 0 && lastChar ){
                //     continue
            }
            else if (currentOperator !== 0 && clickedItemClass === 'digit') { //
                display.innerText += e.target.innerText;
                secondOperand += +e.target.innerText;
            }
            else if (clickedItemClass === 'eval') {                       // equal, solve the equation
                firstOperand = +firstOperand
                secondOperand = +secondOperand                           
                display.innerText = eval(display.innerText.replace(/[^-+/.*\d]/g, ''));
                valueCalculated = display.innerText;
                alert(display.innerText);
            }
            else if (clickedItemID === 'back') {                            // back button
                if (currentOperator === 0) {
                    firstOperand = ''
                    display.innerText = ''
                }
                else if (secondOperand === '' && currentOperator !== 0) {
                    currentOperator = 0;
                    display.innerText = firstOperand;
                }
                else {
                    secondOperand = '';
                    display.innerText = firstOperand + currentOperator;
                }
            }
            console.log(`clickedItemID : ${clickedItemID}`);             //  debugging
            console.log(`clickedItemClass : ${clickedItemClass}`);
            console.log(`lastChar : ${lastChar}`);
            console.log(`firstOperand : ${firstOperand}`);
            console.log(`secondOperand : ${secondOperand}`);
            console.log(`currentOperator : ${currentOperator}`);
            console.log('---------------------------------------------');
         
        });
    });

    

// buttons.map(button => {
//     button.addEventListener('click', (e) => {
//         // console.log(`firstOperand : ${firstOperand}`);
//         // console.log(`${currentOperator === 0}`,`currentOperator:${currentOperator}` );
//         // console.log(typeof firstOperand);

//         switch(e.target.innerText){
//             case 'Back':
//                 backButton();
//                 break
//             case 'C':                                      // resets all variables and display
//                 display.innerText = '';
//                 firstOperand = 0;
//                 secondOperand = 0;
//                 currentOperator = null;
//                 break
//             case currentOperator === 0:                 // meaning 1st operand is not defined yet
//                 display.innerText += e.target.innerText;
//                 firstOperand = 3;
//                 console.log(firstOperand);
//             case currentOperator !== null:                // meaning an operator button has been clicked, start work on 2nd operand
//                 display.innerText += e.target.innerText;
//                 secondOperand += parseInt(e.target.innerText);
//             case '+' || '-'  || '/' || '*':               // meaning an operator button has just been clicked, current operator not null anymore
//                 currentOperator = e.target.innerText;
//                 display.innerText += e.target.innerText;
//             case '=':
//                 display.innerText = eval(display.innerText.replace(/[^-+/*\d]/g, ''));
//                 valueCalculated = display.innerText
//                 alert(display.innerText)
//                 break
//             default:
//                 display.innerText += e.target.innerText;
//         }
//     });
// });

