const quiz_data = [
    {
        question: "What advanced structure can be used to manage hierarchical or networked data efficiently?",
        options: [
            "variables",
            "arrays",
            "linked lists",
            "trees"
        ],
        correct: "trees",
    },
    {
        question: "Which principle involves using complex steps to solve problems efficiently, often optimizing performance and resource usage?",
        options: [
            "simple loops",
            "conditional statements",
            "advanced algorithms",
            "data types"
        ],
        correct: "advanced algorithms",
    },    {
        question: "What principle involves reading from and writing to data storage to manage information persistently?",
        options: [
            "input",
            "output",
            "file i/o",
            "error handling"
        ],
        correct: "file i/o",
    },
]

let currentQuestionIndex = 0;
let timerInterval;
let tries = 0;
const maxTries = 5;
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
        tries = 0;
    
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
                tries++;
                if (tries >= maxTries) {
                    endGame("game over");
                } else {
                    resultContainer.innerHTML = `<p>Incorrect. You have ${maxTries - tries} attempts left. Please try again.</p>`;
                }
            }
        } else {
            resultContainer.innerHTML = `<p>Please select an answer.</p>`;
        }    
    }

    submit_button.onclick = submitAnswer;
    loadQuestion();
});




