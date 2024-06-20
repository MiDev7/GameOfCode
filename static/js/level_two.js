const quiz_data = [
    {
        question: "What principle refers to the different ways of organizing and storing data to enable efficient access and modification?",
        options: [
            "variables",
            "data structures",
            "functions",
            "algorithms"
        ],
        correct: "data structures",
    },
    {
        question: "What principle involves breaking down a program into smaller, manageable, and reusable pieces?",
        options: [
            "conditional statement",
            "modular programming",
            "loops",
            "data types"
        ],
        correct: "modular programming",
    },    {
        question: "What principle involves anticipating and managing potential errors in a program to ensure it runs smoothly?",
        options: [
            "debugging",
            "error handling",
            "data types",
            "output"
        ],
        correct: "error handling",
    },
]

let currentQuestionIndex = 0;
let timerInterval;
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const timerElement = document.getElementById("timer");
const timeLimit = 30;

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




