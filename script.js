let html = [
    {
        "question": "What does HTML stand for?",
        "answer_1": "A: Hyperlinks and Text Markup Language",
        "answer_2": "B: Hyper Text Markup Language",
        "answer_3": "C: Home Tool Markup Language",
        "correct-answer": 2
    },
    {
        "question": "Who is making the Web standards?",
        "answer_1": "A: Microsoft",
        "answer_2": "B: Mozilla",
        "answer_3": "C: The World Wide Web Consortium",
        "answer_4": "D: Google",
        "correct-answer": 3
    },
    {
        "question": "Choose the correct HTML element for the largest heading",
        "answer_1": "A: h1",
        "answer_2": "B: head",
        "answer_3": "C: h6",
        "answer_4": "D: heading",
        "correct-answer": 1
    },
    {
        "question": "What is the correct HTML element for inserting a line break?",
        "answer_1": "A: br",
        "answer_2": "B: break",
        "answer_3": "C: lb",
        "correct-answer": 1
    },
    {
        "question": "What is the correct HTML for adding a background color?",
        "answer_1": "A: background>yellow</background",
        "answer_2": "B: body style='background-color:yellow;'",
        "answer_3": "C: body bg='yellow'",
        "correct-answer": 2
    }
];


let currentQuestion = 0;
let finalScore = 0;
let AUDIO_SUCCESS = new Audio('audio/success.wav');
let AUDIO_FAIL = new Audio('audio/fail.wav');
let AUDIO_APPLAUSE = new Audio('audio/applause.wav');


function onload() {
    render(currentQuestion);
}


function render(currentQuestion) {
    renderQuestion(currentQuestion);
    renderAnswers(currentQuestion);
    renderCounter(currentQuestion);
}


function renderQuestion(currentQuestion) {
    let showQuestion = html[currentQuestion]["question"];
    let question = document.getElementById('question-container');
    question.innerHTML = `
    <h5 class="card-title flex-direction-center">
    </h5>
    <p class="card-text pt-sans-regular">${showQuestion}</p>
    `;
}


function renderAnswers(currentQuestion) {
    let answers = document.getElementById('answers-container');
    let answer1 = 1;
    let answer2 = 2;
    let answer3 = 3;
    let answer4 = 4;
    answers.innerHTML = ``;
    answers.innerHTML += `
    <button class="list-group-item" onclick="correctAnswer(${answer1}), enable()" id="a1">${html[currentQuestion]["answer_1"]}</button>
    <button class="list-group-item" onclick="correctAnswer(${answer2}), enable()" id="a2">${html[currentQuestion]["answer_2"]}</button>
    <button class="list-group-item" onclick="correctAnswer(${answer3}), enable()" id="a3">${html[currentQuestion]["answer_3"]}</button>
    `;
    if (html[currentQuestion]["answer_4"]) {
        answers.innerHTML += `
        <button class="list-group-item" onclick="correctAnswer(${answer4}), enable()" id="a4">${html[currentQuestion]["answer_4"]}</button>
        `
    }
}


function renderCounter(currentQuestion) {

    let button = document.getElementById('amount-questions');
    button.innerHTML = `<b>${currentQuestion + 1}</b> of <b>${html.length}</b> Questions`;
}


function nextQuestion() {
    if (html[currentQuestion]["answer_4"]) {
        document.getElementById('a4').disabled = false;
    }
    if (currentQuestion < html.length - 1) {
        currentQuestion++;
        document.getElementById('next-btn').disabled = true;
        document.getElementById('a1').disabled = false;
        document.getElementById('a2').disabled = false;
        document.getElementById('a3').disabled = false;
        render(currentQuestion)
    }
    else {
        showScoringPage();
    }
}


function correctAnswer(answer) {
    let correct = html[currentQuestion]["correct-answer"];
    if (answer === correct) {
        document.getElementById(`a${correct}`).classList.add('right-answer');
        finalScore++;
        AUDIO_SUCCESS.play();
    }
    else {
        document.getElementById(`a${answer}`).classList.add('wrong-answer');
        document.getElementById(`a${correct}`).classList.add('right-answer');
        AUDIO_FAIL.play();
    }
    disabled();
}


function disabled() {
    document.getElementById('a1').disabled = true;
    document.getElementById('a2').disabled = true;
    document.getElementById('a3').disabled = true;
    if (html[currentQuestion]["answer_4"]) {
        document.getElementById('a4').disabled = true;
    }
}


function enable() {
    document.getElementById('next-btn').removeAttribute("disabled");
}


function showScoringPage() {
    let dNoneQuestion = document.getElementById('question-container');
    dNoneQuestion.classList.add('d-none');
    let dNoneAnswers = document.getElementById('answers-container');
    dNoneAnswers.classList.add('d-none');
    let dNoneCounter = document.getElementById('amount-questions');
    dNoneCounter.classList.add('d-none');
    renderScoringPage();
}


function renderScoringPage() {
    let score = document.getElementById('score');
    score.classList.add('score');
    score.innerHTML = `
    <div><h1>Herzlichen Glückwunsch<br>
    Du hast ${finalScore} von ${html.length} Fragen richtig beantwortet</h1>    
    </div>`;
    AUDIO_APPLAUSE.play();
}