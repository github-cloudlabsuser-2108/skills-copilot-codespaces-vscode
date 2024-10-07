// Create the HTML structure
document.body.innerHTML = `
    <div class="calculator">
        <div class="display" id="display"></div>
        <div class="buttons">
            <button class="btn" onclick="appendNumber('1')">1</button>
            <button class="btn" onclick="appendNumber('2')">2</button>
            <button class="btn" onclick="appendNumber('3')">3</button>
            <button class="btn" onclick="chooseOperation('+')">+</button>
            <button class="btn" onclick="appendNumber('4')">4</button>
            <button class="btn" onclick="appendNumber('5')">5</button>
            <button class="btn" onclick="appendNumber('6')">6</button>
            <button class="btn" onclick="chooseOperation('-')">-</button>
            <button class="btn" onclick="appendNumber('7')">7</button>
            <button class="btn" onclick="appendNumber('8')">8</button>
            <button class="btn" onclick="appendNumber('9')">9</button>
            <button class="btn" onclick="chooseOperation('*')">*</button>
            <button class="btn" onclick="appendNumber('0')">0</button>
            <button class="btn" onclick="clearDisplay()">C</button>
            <button class="btn" onclick="calculate()">=</button>
            <button class="btn" onclick="chooseOperation('/')">/</button>
        </div>
    </div>
`;

// Add CSS styles
const style = document.createElement('style');
style.innerHTML = `
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f0f0;
        margin: 0;
    }

    .calculator {
        border: 1px solid #ccc;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .display {
        background-color: #222;
        color: #fff;
        font-size: 2em;
        padding: 20px;
        text-align: right;
    }

    .buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .btn {
        padding: 20px;
        font-size: 1.5em;
        border: 1px solid #ccc;
        background-color: #fff;
        cursor: pointer;
        outline: none;
    }

    .btn:hover {
        background-color: #f0f0f0;
    }
`;
document.head.appendChild(style);

// Calculator logic
let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {
    currentOperand += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentOperand = result;
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = currentOperand;
}