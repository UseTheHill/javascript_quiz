
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

//button variables
var optionButtons = document.querySelector(".option-btn");
var submitButton = document.querySelector(".submit-button");
var restartBtn = document.querySelector(".restart");
var clearBtn = document.querySelector(".clear");
var highscoresHyperlink = document.querySelector(".highscores-hyperlink");
//timer variables
var currentQuestionIndex = 0;
var secondsLeft = 20;

//addEventListener for start butttons and option buttons
startBtn.addEventListener("click", startQuiz);
optionButtons.addEventListener("click", updateQuestion);
optionButtons.addEventListener("click", checkAnswer);

//array variables
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

//update questions
function updateQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);

};
//navigate to input page
function navigateToInput() {
    quizDiv.classList.add("hide");
    inputSection.classList.remove("hide");
};

//navigate to high score page
function navigateToHighScore() {
    inputSection.classList.add("hide");
    highscoresSection.classList.remove("hide");
    displayHighScores();
};

//high score page for loop for initials and score
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
//function for what happens when the user answers each question
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

//checks if answer is right or wrong and presents with correct or incorrect word and moves onto next question.
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

//shows the correct alert when answer is right
function displayCorrect() {
    var correctAlert = document.querySelector(".correct-alert");
    setTimeout(function(){ 
        correctAlert.classList.remove("hide")
    }, 0)
    setTimeout(function(){ 
        correctAlert.classList.add("hide")
    }, 1000)

};
//shows incorrect allert when answer is wrong
function displayIncorrect() {
    var incorrectAlert = document.querySelector(".incorrect-alert");
    setTimeout(function(){ 
        incorrectAlert.classList.remove("hide")
    }, 0)
    setTimeout(function(){ 
        incorrectAlert.classList.add("hide")
    }, 1000)
};

//
function resetState() {
    while (answerGrid.firstChild) {
        answerGrid.removeChild(answerGrid.firstChild);
    }
    currentQuestionIndex++;
};

//timer
function setTime() {
    var timerInterval = setInterval(function() {
        timeEl.textContent = "Time: " + secondsLeft--;
        
        
        if(secondsLeft === 0 || currentQuestionIndex > (questions.length - 1) || highscoresSection.getAttribute("data-display") === "true") {
        
        clearInterval(timerInterval);
        }
        
    
    }, 1000);
};

//local storage
function init() {
    
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    var storedScores = JSON.parse(localStorage.getItem("score"));
    
    if (storedInitials !== null || storedScores !==null) {
    initialsArray = storedInitials;
    scoreArray = storedScores;
    }
    
    displayHighScores();
};

//local storage 
function storeScores() {
    localStorage.setItem("initials", JSON.stringify(initialsArray));
    localStorage.setItem("score", JSON.stringify(scoreArray));
};

//submit button
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

//restart button
restartBtn.addEventListener("click", function(event) {
    event.preventDefault();
    startPage.classList.remove("hide");
    highscoresSection.classList.add("hide");
    inputSection.classList.add("hide");
    highscoresSection.setAttribute("data-display", "false");
});

//clearing results button
clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    inputSection.classList.add("hide");
    initialsColumn.innerHTML = "";
    scoreColumn.innerHTML = "";
    initialsArray = [];
    scoreArray = [];
});

//link to the high score page
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
        question: "Which of the following statements will show a message as well as ask for user input in a popup?",
        answers: [
        {text: "1. alert()", response: 0},
        {text: "2. prompt()", response: 0},
        {text: "3. confirm()", response: 1},
        {text: "4. message()", response: 0}
        ]

    },
    {
        question: "what is the property to change a Background color in Css?",
        answers: [
        {text: "1. color-background", response: 0},
        {text: "2. Background-color", response: 1},
        {text: "3. (Color-background)", response: 0},
        {text: "4. <background-color>", response: 0}
        ]

    },
    {
        question: "How many <H> tags are there?",
        answers: [
        {text: "1. 6", response: 1},
        {text: "2. 4", response: 0},
        {text: "3. 5", response: 0},
        {text: "4. 3", response: 0}
        ]

    },
    {
        question: "What is Bootstrap Used for?",
        answers: [
        {text: "1. CSS library", response: 0},
        {text: "2. HTML library", response: 0},
        {text: "3. CSS & JavaScript", response: 1},
        {text: "4. To hold up your shoes", response: 0}
        ]

    }
];