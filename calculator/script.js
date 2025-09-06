/*
1. grab the html elements ✅
2. track the calculator state ✅
3. add a click listener for every button
4. handle numbers and decimal points
5. handle AC (clear)
6. Handle +/- (negate)
7. handle percentage
8. handle changing calculator type [Basic, Scientific, ...]
9. Handle operators
10. Handle '=' (calculate)
*/ 

const display = document.getElementById("display");
const buttons = document.querySelectorAll("#calculator button");
const clearButton = document.getElementById("clear-btn");
const iconSpan = document.querySelector('.btn-icon');
const labelSpan = document.querySelector('.btn-label');


let currentInput = '';
let operator = '';
let firstOperand = null;

function processInput(value) {
    if(value >= '0' && value<= '9' || value === '.') {
        currentInput += value;
        display.value = currentInput;
        iconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff"><path fill="#ffffff" d="M19 5H9.83a3 3 0 0 0-2.12.88l-5.42 5.41a1 1 0 0 0 0 1.42l5.42 5.41a3 3 0 0 0 2.12.88H19a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm1 11a1 1 0 0 1-1 1H9.83a1.05 1.05 0 0 1-.71-.29L4.41 12l4.71-4.71A1.05 1.05 0 0 1 9.83 7H19a1 1 0 0 1 1 1Zm-3.29-6.71a1 1 0 0 0-1.42 0L14 10.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29l-1.3 1.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l1.29-1.3l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L15.41 12l1.3-1.29a1 1 0 0 0 0-1.42Z"/></svg>';
        labelSpan.textContent = '';
    }
    else if (value === '+/-') {
        currentInput = currentInput ? String(parseFloat(currentInput) * -1) : '';
        display.value = currentInput;
    }
    else if (value === '%') {
        currentInput = currentInput ? String(parseFloat(currentInput)/100) : '';
        display.value = currentInput;
    }
    else if (['+', '-', '×', '÷'].includes(value)) {
        firstOperand = parseFloat(currentInput);
        operator = value;
        currentInput = '';
    }
    else if (value === '=') {
        if (firstOperand !== null && operator && currentInput !== '') {
            let result;
            const secondOperand = parseFloat(currentInput);
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '×': result = firstOperand * secondOperand; break;
                case '÷': result = firstOperand / secondOperand; break;
            }
            display.value = result;
            currentInput = String(result);
            firstOperand = null;
            operator = '';
        }
    }
    if (value === 'AC' || value === clearButton.textContent || value === 'BACKSPACE'){
        if(currentInput.length > 0) {
            iconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff"><path fill="#ffffff" d="M19 5H9.83a3 3 0 0 0-2.12.88l-5.42 5.41a1 1 0 0 0 0 1.42l5.42 5.41a3 3 0 0 0 2.12.88H19a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm1 11a1 1 0 0 1-1 1H9.83a1.05 1.05 0 0 1-.71-.29L4.41 12l4.71-4.71A1.05 1.05 0 0 1 9.83 7H19a1 1 0 0 1 1 1Zm-3.29-6.71a1 1 0 0 0-1.42 0L14 10.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29l-1.3 1.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l1.29-1.3l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L15.41 12l1.3-1.29a1 1 0 0 0 0-1.42Z"/></svg>';
            labelSpan.textContent = '';
            currentInput = currentInput.slice(0,-1);
            display.value = currentInput;
        } else{
            iconSpan.textContent = '';
            labelSpan.innerHTML = 'AC';
            currentInput = '';
            operator = '';
            firstOperand = null;
            display.value = '';
        }
    }

}


    buttons.forEach(button => {
        button.addEventListener('click', ()=> {
            const value = button.textContent;
            processInput(value);
        });
    });

    document.addEventListener("keydown", (event) => {
        let key = event.key; // key that was pressed on keyboard
        let mappedValue;

        // Mapping keys to keyboard buttons
        if (key >= 0 && key <= 9) mappedValue = key;
        else if (key === '.') mappedValue = '.';
        else if (key === '+') mappedValue = '+';
        else if (key === '-') mappedValue = '-';
        else if (key === '/') mappedValue = '÷';
        else if (key === '*') mappedValue = '×';
        else if (key === 'Enter') mappedValue = '=';
        else if (key === 'Backspace') mappedValue = 'AC';
        
        if(mappedValue) {
            processInput(mappedValue);
        }

    })
