const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Kolkata", correct: false },
            { text: "Bangalore", correct: false }
        ]
    },
    {
        question: "Who was the first Prime Minister of India?",
        answers: [
            { text: "Mahatma Gandhi", correct: false },
            { text: "Dr. B.R. Ambedkar", correct: false },
            { text: "Jawaharlal Nehru", correct: true },
            { text: "Sardar Vallabhbhai Patel", correct: false }
        ]
    },
    {
        question: "Which is the national flower of India?",
        answers: [
            { text: "Rose", correct: false },
            { text: "Lily", correct: false },
            { text: "Lotus", correct: true },
            { text: "Marigold", correct: false }
        ]
    },
    {
        question: "How many states are there in India (as of 2025)?",
        answers: [
            { text: "28", correct: false },
            { text: "29", correct: true },
            { text: "27", correct: false },
            { text: "30", correct: false }
        ]
    },
    {
        question: "Which river is considered the holiest in India?",
        answers: [
            { text: "Yamuna", correct: false },
            { text: "Godavari", correct: false },
            { text: "Ganga", correct: true },
            { text: "Krishna", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (nextButton.innerText === 'Play Again') {
        startQuiz();
    } else {
        handleNextButton();
    }
});

startQuiz();