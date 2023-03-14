let quizes = [
    {
        "question": "JavaScript strings are for ________ text.",
        "options": ["storing","manipulating","both a and b","none of the above"],
        "answer": 2,
        "answered": "-1",
        "points": 5
    },
    {
        "question": "To find the length of a string, use the built-in _______ property.",
        "options": ["size","length","area","strlen"],
        "answer": 1,
        "answered": "-1",
        "points": 5
    },
    {
        "question": "The ________ escape character turns special characters into string characters",
        "options": ["\\","/","|","#"],
        "answer": 0,
        "answered": "-1",
        "points": 5
    },
    {
        "question": "Comparing two JavaScript objects always returns?",
        "options": ["TRUE","FALSE","Can be true or false","Can not say"],
        "answer": 1,
        "answered": "-1",
        "points": 5
    },
    {
        "question": "_______ extracts a part of a string and returns the extracted part in a new string.",
        "options": ["substring()","substr()","strlen()","slice()"],
        "answer": 3,
        "answered": "-1",
        "points": 5
    },
]

const indications = document.getElementById("indications");
const quiz = document.getElementById("quiz");
const quizCompleted = document.getElementById("quiz__completed");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const retakeBtn = document.getElementById("retakeBtn");
const submitBtn = document.getElementById("submitBtn");

const size = quizes.length;
let currentQuestion = 0;

const init = () => {
    // let len = currentQuestion+1;
    // while(len--)
    //     indications.innerHTML += `<div class="indication"></div>`;

    showQuestion(currentQuestion);
}

const showQuestion = (questionNumber) => {
    quiz.innerHTML = `<p class="quiz__number">QUESTION ${questionNumber+1} / ${size}</p>`;
    quiz.innerHTML += `<p class="quiz__question">${quizes[questionNumber].question}</p>`;
    generateOptions(questionNumber);
    showControls(questionNumber);
}

const generateOptions = (questionNumber) => {
    const quizOptions = document.createElement("div");
    quizOptions.className = "quiz__options";
    quizOptions.id = "quiz__options";
    let value = 0;

    for(let option of quizes[questionNumber].options){
        if(`${value}` == quizes[questionNumber].answered)
            generateOption(option, quizOptions, true, value++);
        else
            generateOption(option, quizOptions, false, value++);
    }

    quiz.appendChild(quizOptions);
}

const generateOption = (option, quizOptions, checked, value) => {
    const optionTag = document.createElement("label");
    optionTag.className = "option";

    const inputTag = document.createElement("input");
    inputTag.setAttribute("type", "radio");
    inputTag.name = "quiz_option";
    inputTag.id = `option${value}`;
    inputTag.value = value;
    inputTag.checked = checked;
    inputTag.onclick = (e) => {
        quizes[currentQuestion].answered = e.target.value;
    };

    const pTag = document.createElement("p");
    pTag.innerHTML = option;

    optionTag.appendChild(inputTag);
    optionTag.appendChild(pTag);

    quizOptions.appendChild(optionTag);
}

const showControls = (questionNumber) => {
    if(questionNumber == 0){
        prevBtn.style.display = "none";
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    } else if(questionNumber+1 == size){
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else{
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }
}

const goToNext = () => {
    currentQuestion++;
    init();
}

const goToPrev = () => {
    currentQuestion--;
    init();
}

const handleSubmit = () => {
    quiz.style.display = "none";

    let result = getResult();

    quizCompleted.innerHTML = `<p class="heading">Quiz completed</p>
    <p class="score">Scored ${result.optainedPoints} out of ${result.totalPoints}</p>
    <p class="correct__answer">Correct answered questions ${result.totalCorrectAnswers} out of ${size}</p>`

    retakeBtn.style.display = "inline-block";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
}

const retakeQuiz = () => {
    location.reload();
}

const getResult = () => {
    let totalPoints = 0;
    let optainedPoints = 0;
    let totalCorrectAnswers = 0;

    for(let qstn of quizes){
        totalPoints += qstn.points;
        if(qstn.answered == qstn.answer){
            optainedPoints += qstn.points;
            totalCorrectAnswers++;
        }
    }

    return {
        "totalPoints": totalPoints,
        "optainedPoints": optainedPoints,
        "totalCorrectAnswers": totalCorrectAnswers
    }
}

init();