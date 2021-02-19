
var startPage = document.querySelector("#start-page");
var startBtn = document.querySelector("#start-btn");
var quizDiv = document.querySelector("#quiz");
var currentQuestion = document.querySelector("#current-question");
var answerGrid = document.querySelector("#answer-grid");
var inputSection = document.querySelector(".input-page");
var timeEl = document.querySelector(".seconds-left");
var userInput = document.querySelector("#user-input");
var highscoresSection = document.querySelector(".highscores");
var initialsColumn = document.querySelector(".initials-column");
var scoreColumn = document.querySelector(".score-column");


var optionButtons = document.querySelector(".option-btn");
var submitButton = document.querySelector(".submit-button");
var restartBtn = document.querySelector(".restart");
var clearBtn = document.querySelector(".clear");
var highscoresHyperlink = document.querySelector(".highscores-hyperlink");

var currentQuestionIndex = 0;
var secondsLeft = 20;


startBtn.addEventListener("click", startQuiz);
optionButtons.addEventListener("click", updateQuestion);
optionButtons.addEventListener("click", checkAnswer);


var initialsArray = [];
var scoreArray = [];

//start quiz
function startQuiz () {
    startPage.classList.add("hide");
    quizDiv.classList.remove("hide");
    currentQuestionIndex = -1;
    quizDiv.setAttribute("data-display", true);
    secondsLeft = 20;
    updateQuestion();
    setTime();
};


function updateQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);

};

function navigateToInput() {
    quizDiv.classList.add("hide");
    inputSection.classList.remove("hide");
};


function navigateToHighScore() {
    inputSection.classList.add("hide");
    highscoresSection.classList.remove("hide");
    displayHighScores();
};


function displayHighScores() {
    initialsColumn.innerHTML = "";
    scoreColumn.innerHTML = "";

    for(var i=0; i<initialsArray.length; i++) {
        var initialsP = document.createElement("p");
        initialsP.textContent = initialsArray[i];
        initialsColumn.append(initialsP);

        var scoreP = document.createElement("p");
        scoreP.textContent = scoreArray[i];
        scoreColumn.append(scoreP);
      };
};

function showQuestion(question) {
    if (currentQuestionIndex < questions.length) {
        currentQuestion.textContent = question.question
        question.answers.forEach(answer => {
            var button = document.createElement("button");
            button.innerText = answer.text;
            button.value = answer.response;
            button.classList.add("btn", "btn-secondary", "btn-md", "m-1", "text-left");
            button.addEventListener("click", checkAnswer);
            answerGrid.appendChild(button);
        
    })

    }
    else {
        navigateToInput();
    }

};


function checkAnswer(event) {
    var element = event.target
    
    if (element.matches("button") === true && Number(element.value) === 1) {
        displayCorrect()
        
    }
    else if (element.matches("button") === true && Number(element.value) === 0) {
        displayIncorrect()
        secondsLeft = secondsLeft - 3

    }
    updateQuestion()
};


function displayCorrect() {
    var correctAlert = document.querySelector(".correct-alert");
    setTimeout(function(){ 
        correctAlert.classList.remove("hide")
    }, 0)
    setTimeout(function(){ 
        correctAlert.classList.add("hide")
    }, 1000)

};

function displayIncorrect() {
    var incorrectAlert = document.querySelector(".incorrect-alert");
    setTimeout(function(){ 
        incorrectAlert.classList.remove("hide")
    }, 0)
    setTimeout(function(){ 
        incorrectAlert.classList.add("hide")
    }, 1000)
};


function resetState() {
    while (answerGrid.firstChild) {
        answerGrid.removeChild(answerGrid.firstChild);
    }
    currentQuestionIndex++;
};


function setTime() {
    var timerInterval = setInterval(function() {
        timeEl.textContent = "Time: " + secondsLeft--;
        
        
        if(secondsLeft === 0 || currentQuestionIndex > (questions.length - 1) || highscoresSection.getAttribute("data-display") === "true") {
        
          clearInterval(timerInterval);
        }
    
      }, 1000);
};


function init() {
    
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    var storedScores = JSON.parse(localStorage.getItem("score"));
  
    
    if (storedInitials !== null || storedScores !==null) {
      initialsArray = storedInitials;
      scoreArray = storedScores;
    }
  
    
    displayHighScores();
};


function storeScores() {
    localStorage.setItem("initials", JSON.stringify(initialsArray));
    localStorage.setItem("score", JSON.stringify(scoreArray));
};


submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var userInitials = userInput.value.trim();
    var userScore = secondsLeft

    initialsArray.push(userInitials);
    scoreArray.push(userScore);

    userInput.value = "";

    storeScores();
    navigateToHighScore();
     
});


restartBtn.addEventListener("click", function(event) {
    event.preventDefault();
    startPage.classList.remove("hide");
    highscoresSection.classList.add("hide");
    inputSection.classList.add("hide");
    highscoresSection.setAttribute("data-display", "false");
});


clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    inputSection.classList.add("hide");
    initialsColumn.innerHTML = "";
    scoreColumn.innerHTML = "";
    initialsArray = [];
    scoreArray = [];
});


highscoresHyperlink.addEventListener("click", function(event) {
    quizDiv.classList.add("hide");
    startPage.classList.add("hide");
    inputSection.classList.add("hide");
    highscoresSection.classList.remove("hide");
    highscoresSection.setAttribute("data-display", "true");
    var timerInterval = setInterval(function() {
        
          clearInterval(timerInterval);

    
      }, 1000);
});

init();


var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
        {text: "1. strings", response: 0},
        {text: "2. booleans", response: 0},
        {text: "3. alerts", response: 1},
        {text: "4. numbers", response: 0}
        ]

    },
    {
        question: "Which of the following string methods will remove extra white space?",
        answers: [
        {text: "1. .concat()", response: 0},
        {text: "2. .trim()", response: 1},
        {text: "3. .splice()", response: 0},
        {text: "4. .split()", response: 0}
        ]

    },
    {
        question: "Which of the following is NOT way to define a variable in JavaScript?",
        answers: [
        {text: "1. assign", response: 1},
        {text: "2. var", response: 0},
        {text: "3. const", response: 0},
        {text: "4. let", response: 0}
        ]

    },
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        answers: [
        {text: "1. <javascript>", response: 0},
        {text: "2. <scripted>", response: 0},
        {text: "3. <script>", response: 1},
        {text: "4. <js>", response: 0}
        ]

    }
];