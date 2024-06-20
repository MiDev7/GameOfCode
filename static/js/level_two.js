const quiz_data = [
    {
        question: "In a stack data structure, the last element added is the first one to be removed.",
        options: [
            "true",
            "false"
        ],
        correct: "true",
    },
    {
        question: "Modular programming is a technique where a program is divided into smaller, self-contained units called modules, which can be developed and tested independently.",
        options: [
            "true",
            "false"
        ],
        correct: "true",
    },    
    {
        question: "What principle involves anticipating and managing potential errors in a program to ensure it runs smoothly?",
        options: [
            "debugging",
            "error handling",
            "data types",
            "output"
        ],
        correct: "error handling",
    },
    {
        question: "What principle refers to a well-defined sequence of steps to solve a specific problem or perform a task?",
        options: [
            "variables",
            "functions",
            "algorithms",
            "data structures"
        ],
        correct: "algorithms",
    },
    {
        question: "What programming paradigm involves organizing code into objects that combine data and behavior?",
        options: [
            "procedural programming",
            "object oriented programming",
            "functional programming",
            "modular programming"
        ],
        correct: "object-oriented programming",
    },
]

let currentQuestionIndex = 0;
let timerInterval;
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const timerElement = document.getElementById("timer");
const timeLimit = 60;

document.addEventListener('DOMContentLoaded', (event) => {
    const submit_button = document.getElementById("submit_button");
    if (!submit_button) {
        console.error("submit button not found");
        return;
    }

    function loadQuestion() {
        clearInterval(timerInterval);
        startTimer();
    
        quizContainer.innerHTML = '';
        const item = quiz_data[currentQuestionIndex];
    
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
    
        const questionTitle = document.createElement('div');
        questionTitle.textContent = `${currentQuestionIndex + 1}. ${item.question}`;
        questionDiv.appendChild(questionTitle);
    
        const optionList = document.createElement('ul');
        optionList.classList.add('options');
    
        item.options.forEach(option => {
            const optionItem = document.createElement('li');
            const opitonInput = document.createElement('input');
            opitonInput.type = 'radio';
            opitonInput.name = `question${currentQuestionIndex}`;
            opitonInput.value = option;
            optionItem.appendChild(opitonInput);
    
            const optionLabel = document.createElement('label');
            optionLabel.textContent = option;
            optionItem.appendChild(optionLabel);
    
            optionList.appendChild(optionItem);
        });
        questionDiv.appendChild(optionList);
        quizContainer.appendChild(questionDiv);
    }

    function startTimer() {
        let timeLeft = timeLimit;
        timerElement.textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame("timer's up! you have run out of time");
            }
        }, 1000);
    }
    
    function endGame(message) {
        quizContainer.innerHTML = '';
        resultContainer.innerHTML = `<p>${message}</p>`;
        document.querySelector('button').disabled = true;
    }

    function submitAnswer() {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        resultContainer.innerHTML = '';
    
        if (selectedOption) {
            if (selectedOption.value === quiz_data[currentQuestionIndex]. correct) {
                resultContainer.innerHTML = `<p>Correct! ${quiz_data[currentQuestionIndex].explanation}</p>`;
                currentQuestionIndex++;
                if (currentQuestionIndex < quiz_data.length) {
                    loadQuestion();
                } else {
                    endGame("congratulations!");
                }
            } else {
                resultContainer.innerHTML = `<p>Incorrect. Please try again.</p>`;
            }
        } else {
            resultContainer.innerHTML = `<p>Please select an answer.</p>`;
        }    
    }

    submit_button.onclick = submitAnswer;
    loadQuestion();
});




