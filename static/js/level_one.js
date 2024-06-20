const quiz_data = [
    {
        question: "What is the term used to describe different kinds of information (like numbrs, text, etc.) that a program can work with?",
        options: [
            "variables",
            "data types",
            "functions",
            "algorithms"
        ],
        correct: "data types",
    },
    {
        question: "What is the process of sending information from a program to the outside world called?",
        options: [
            "input",
            "output",
            "storage",
            "processing"
        ],
        correct: "output",
    },    
    {
        question: "What principle allows a program to make decisions and execute different actions based on those decisions?",
        options: [
            "looping",
            "functions",
            "conditional statements",
            "data structures"
        ],
        correct: "conditional statements",
    },
    {
        question: "What principle allows a program to repeat actions multiple times?",
        options: [
            "variables",
            "functions",
            "conditional statements",
            "loops"
        ],
        correct: "loops",
    },
    {
        question: "What is the principle of grouping a set of actions together so they can be reused called?",
        options: [
            "variables",
            "data types",
            "functions",
            "loops"
        ],
        correct: "functions",
    },
]

let currentQuestionIndex = 0;
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");

document.addEventListener('DOMContentLoaded', (event) => {
    const submit_button = document.getElementById("submit_button");
    if (!submit_button) {
        console.error("submit button not found");
        return;
    }

    function loadQuestion() {

    
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
                    resultContainer.innerHTML += '<p>Congratulations! You have completed the quiz.</p>';
                    document.querySelector('button').disabled = true;
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




