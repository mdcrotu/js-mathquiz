// quiz.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const questionEl = document.getElementById('question');
    const feedbackEl = document.getElementById('feedback');
    const submitButton = document.getElementById('submit');
    const keys = document.querySelectorAll('.key');

    let currentQuestion = {};
    let score = 0;

    // Generate a random math question
    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const answer = eval(`${num1} ${operator} ${num2}`);

        currentQuestion = { num1, num2, operator, answer };
        questionEl.textContent = `${num1} ${operator} ${num2} = ?`;
        display.value = '';
        feedbackEl.textContent = '';
    }

    // Initialize the first question
    generateQuestion();

    // Keypad button functionality
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.dataset.value;

            if (value) {
                display.value += value;
            } else if (key.id === 'clear') {
                display.value = '';
            } else if (key.id === 'delete') {
                display.value = display.value.slice(0, -1);
            }
        });
    });

    // Submit answer and check correctness
    submitButton.addEventListener('click', () => {
        const userAnswer = parseInt(display.value, 10);

        if (isNaN(userAnswer)) {
            feedbackEl.textContent = 'Please enter a valid number.';
            return;
        }

        if (userAnswer === currentQuestion.answer) {
            score++;
            feedbackEl.textContent = 'Correct! Well done.';
        } else {
            feedbackEl.textContent = `Wrong! The correct answer was ${currentQuestion.answer}.`;
        }

        // Generate a new question after feedback
        setTimeout(generateQuestion, 2000);
    });
});
