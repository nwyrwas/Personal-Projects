let currentOperand = '';
let previousOperand = '';
let operation = null;

const display = document.getElementById('display');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const basicButtons = document.getElementById('basic-buttons');
const calculusButtons = document.getElementById('calculus-buttons');
const graphCanvas = document.getElementById('graph-canvas');
const calculusInput = document.getElementById('calculus-input');
const ctx = graphCanvas.getContext('2d');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
});

function appendNumber(number) {
    currentOperand += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
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
    display.innerHTML = formatExponents(currentOperand);
}

function formatExponents(expression) {
    return expression.replace(/(\d+)\^(\d+)/g, (match, base, exponent) => {
        return `${base}<sup>${exponent}</sup>`;
    });
}

function changeMode() {
    if (basicButtons.style.display === 'none') {
        basicButtons.style.display = 'grid';
        calculusButtons.style.display = 'none';
        graphCanvas.style.display = 'none';
    } else {
        basicButtons.style.display = 'none';
        calculusButtons.style.display = 'grid';
        graphCanvas.style.display = 'block';
    }
}

function differentiate() {
    try {
        const expression = calculusInput.value;
        const differentiated = differentiatePolynomial(expression);
        currentOperand = differentiated;
    } catch (error) {
        currentOperand = 'Error';
    }
    updateDisplay();
}

function differentiatePolynomial(expression) {
    // Simple polynomial differentiation
    return expression.replace(/([+-]?\d*)x\^(\d+)/g, (match, coeff, exp) => {
        coeff = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff);
        exp = parseInt(exp);
        return `${coeff * exp}x^${exp - 1}`;
    }).replace(/([+-]?\d*)x(?!\^)/g, (match, coeff) => {
        coeff = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff);
        return `${coeff}`;
    });
}

function integrate() {
    // Simple integration example: ∫ of 2x is x^2
    if (currentOperand.includes('2x')) {
        currentOperand = currentOperand.replace('2x', 'x^2');
    } else {
        currentOperand = 'Unsupported function';
    }
    updateDisplay();
}

function plotGraph() {
    // Clear the canvas
    ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

    // Draw x and y axes
    ctx.beginPath();
    ctx.moveTo(graphCanvas.width / 2, 0);
    ctx.lineTo(graphCanvas.width / 2, graphCanvas.height);
    ctx.moveTo(0, graphCanvas.height / 2);
    ctx.lineTo(graphCanvas.width, graphCanvas.height / 2);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw numbers on x and y axes
    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    for (let i = -10; i <= 10; i++) {
        if (i !== 0) {
            ctx.fillText(i, graphCanvas.width / 2 + i * 20, graphCanvas.height / 2 + 15);
            ctx.fillText(i, graphCanvas.width / 2 + 5, graphCanvas.height / 2 - i * 20);
        }
    }

    // Example: Plot y = x^2
    ctx.beginPath();
    ctx.moveTo(0, graphCanvas.height / 2);
    for (let x = 0; x <= graphCanvas.width; x++) {
        let y = Math.pow((x - graphCanvas.width / 2) / 20, 2);
        ctx.lineTo(x, graphCanvas.height / 2 - y * 20);
    }
    ctx.strokeStyle = '#f00';
    ctx.stroke();
}

// Initialize display
updateDisplay();