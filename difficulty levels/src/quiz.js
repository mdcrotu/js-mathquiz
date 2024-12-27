document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const questionEl = document.getElementById('question');
    const feedbackEl = document.getElementById('feedback');
    const submitButton = document.getElementById('submit');
    const keys = document.querySelectorAll('.key');
    const toggleSignButton = document.getElementById('toggle-sign');
    const difficultySelect = document.getElementById('difficulty');

    let currentQuestion = {};
    let score = 0;

    // Difficulty configurations
    const difficultyConfig = {
        easy: { range: 10, operators: ['+', '-'] },
        medium: { range: 50, operators: ['+', '-', '*'] },
        hard: { range: 100, operators: ['+', '-', '*', '/'] },
    };

    // Generate a random math question
    function generateQuestion() {
        const difficulty = difficultySelect.value;
        const { range, operators } = difficultyConfig[difficulty];
        const num1 = Math.floor(Math.random() * range) + 1;
        const num2 = Math.floor(Math.random() * range) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];
        let answer = eval(`${num1} ${operator} ${num2}`);

        // Round answer for division questions
        if (operator === '/') {
            answer = Math.round(answer * 100) / 100;
        }

        currentQuestion = { num1, num2, operator, answer };
        questionEl.textContent = `${num1} ${operator} ${num2} = ?`;
        display.value = '';
        feedbackEl.textContent = '';
    }

    // Initialize the first question
    generateQuestion();

    // Handle keypad button clicks
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

    // Handle toggle sign functionality
    toggleSignButton.addEventListener('click', () => {
        const currentValue = display.value;

        if (currentValue) {
            if (currentValue.startsWith('-')) {
                display.value = currentValue.slice(1);
            } else {
                display.value = `-${currentValue}`;
            }
        }
    });

    submitButton.addEventListener('click', () => {
        const userAnswer = parseFloat(display.value);
    
        if (isNaN(userAnswer)) {
            feedbackEl.textContent = 'Please enter a valid number.';
            feedbackEl.className = ''; // Clear existing classes
            feedbackEl.style.color = 'orange'; // Optional warning
            return;
        }
    
        if (userAnswer === currentQuestion.answer) {
            score++;
            feedbackEl.textContent = 'Correct! Well done.';
            feedbackEl.className = 'correct';
        } else {
            feedbackEl.textContent = `Wrong! The correct answer was ${currentQuestion.answer}.`;
            feedbackEl.className = 'wrong';
        }
    
        setTimeout(generateQuestion, 2000);
    });
    
    // Update question when difficulty changes
    difficultySelect.addEventListener('change', generateQuestion);
});
