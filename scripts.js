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
    if(result > (9.99999999 * 10**99)){
        return NaN
    }
    else {
        return +result.toFixed(12);
    }
}

const updateDisplay = function() {
    if(String(displayText).length > 12){
        displayText = parseFloat(displayText).toExponential(8);
    }
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
        if(operationState == 0){
            firstNumber = parseFloat(displayText);
        }

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
    if(number){
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
    if(operationState == 0 || operationState == 2){
        if(!(String(displayText).includes("."))){
            displayText += ".";
        }
    }
    unselectButtons();
    updateDisplay();
});

document.querySelector("#delete").addEventListener("click", button => {
    displayText = String(displayText);
    if(operationState == 0 || operationState == 2){
        if(displayText.length > 1){
            displayText = displayText.slice(0, -1); 
        }
        else{
            displayText = 0;
        }
    }
    unselectButtons();
    updateDisplay();
});

let keyMap = {
    "0" : "zero",
    "1" : "one",
    "2" : "two",
    "3" : "three",
    "4" : "four",
    "5" : "five",
    "6" : "six",
    "7" : "seven",
    "8" : "eight",
    "9" : "nine",
    "+" : "add",
    "-" : "subtract",
    "*" : "multiply",
    "x" : "multiply",
    "/" : "divide",
    "=" : "equal",
    "Enter" : "equal",
    "%" : "percentage",
    "." : "decimal",
    "Backspace" : "delete",
    "Delete" : "clear",
};

document.querySelector("body").addEventListener("keydown", event => {
    let elementID = keyMap[event.key];
    console.log(event.key);
    if(elementID){
        let clickEvent = new Event('click');
        document.querySelector("#"+elementID).dispatchEvent(clickEvent);
    }
})

unselectButtons();
updateDisplay();