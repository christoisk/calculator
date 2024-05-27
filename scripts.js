const add = function(firstNumber, secondNumber) {
	return firstNumber + secondNumber;
};

const subtract = function(firstNumber, secondNumber) {
	return firstNumber - secondNumber;
};


const multiply = function(firstNumber, secondNumber) {
    return firstNumber * secondNumber; 
};

const divide = function(firstNumber, secondNumber) {
    if(secondNumber == 0){
        return NaN;
    }
    return firstNumber / secondNumber; 
};

const operate = function(firstNumber, secondNumber, operator) {
    let result = 0;
    switch(operator){
        case "add":
            result = add(firstNumber, secondNumber);
            break;
        case "subtract":
            result = subtract(firstNumber, secondNumber);
            break;
        case "multiply":
            result = multiply(firstNumber, secondNumber);
            break;
        case "divide":
            result = divide(firstNumber, secondNumber);
            break;
        default:
    }

    return +result.toFixed(12);
}

const updateDisplay = function() {
    display.textContent = displayText;
}

const unselectButtons = function() {
    document.querySelectorAll(".selected").forEach(button => {
        button.classList.toggle("selected");
    });
}

let firstNumber;
let secondNumber;
let operator = "";
let displayText = 0;
let operationState = 0;

const display = document.querySelector("#display");

document.querySelectorAll(".row > .number").forEach(button => {
    button.addEventListener("click", (e) => {
        if(displayText == "0" || displayText == "NaN"){
            displayText = "";
        }
        if(operationState == 1){
            firstNumber = parseFloat(displayText);
            displayText = "";
            operationState = 2;
        }
        number = e.target.textContent;
        displayText += number;
        updateDisplay();
    })
});

document.querySelectorAll(".row > .operator").forEach(button => {
    button.addEventListener("click", (e) => {
        if(operationState == 2){
            secondNumber = parseFloat(displayText);
            firstNumber = operate(firstNumber, secondNumber, operator);
            displayText = firstNumber;
        }
        unselectButtons();
        e.target.classList.toggle("selected")
        operationState = 1;
        operator = e.target.id;
        updateDisplay();
    })
});

document.querySelector("#equal").addEventListener("click", button => {
    if(operationState == 2){
        secondNumber = parseFloat(displayText);
        firstNumber = operate(firstNumber, secondNumber, operator);
        displayText = firstNumber;
        operationState = 1;
        operator = "";
        unselectButtons();
        updateDisplay();
    }
});

document.querySelector("#clear").addEventListener("click", button => {
    operationState = 0;
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
    displayText = 0;
    unselectButtons();
    updateDisplay();
});

document.querySelector("#sign").addEventListener("click", button => {
    number = parseFloat(displayText)
    if(!number){
        number *= -1;
    }
    displayText = number;
    operationState = 0;
    unselectButtons();
    updateDisplay();
});

document.querySelector("#percentage").addEventListener("click", button => {
    number = parseFloat(displayText)
    if(number){
        number = number/100;
    }
    displayText = number;
    operationState = 0;
    unselectButtons();
    updateDisplay();
});

document.querySelector("#decimal").addEventListener("click", button => {
    if(!(String(displayText).includes("."))){
        displayText += ".";
    }
    unselectButtons();
    updateDisplay();
});

unselectButtons();
updateDisplay();