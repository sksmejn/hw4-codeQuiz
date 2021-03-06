//
//
// hw4 - code quiz
// Jonathan Soukaseume
//

// Element Selector
elsel = (x) => document.querySelector(x);
elselall = (x) => document.querySelectorAll(x);

//DOM Variables
var startBtn = elsel(".start-btn");
var main = elsel("#main");
var landing = elsel("#landing");
var timer = elsel(".timer");
var questions = elsel(".questions-display");
var choices = Array.from(elselall(".choice-text"));
var footer = elsel(".main-card-footer");
var main = elsel("#main");
var scoreBtn = elsel(".score-btn");
var play = true;

var endScreen = elsel("#end-screen");
var finalScore = elsel("#final-score");
var initialEl = elsel("#initials");
var submitBtn = elsel("#submit");

var timeLeft = 75;
var subtractTime = 15;

var currentQuestion = {};
var availableQuestions = [];

// Question List
var questionsList = [
    {
        question: "The main page of a website is usually referred to as ______________.",
        choice1: "main.html",
        choice2: "index.html",
        choice3: "webpage.html",
        choice4: "landing.html",
        answer: 2
    },
    {
        question: "How do you print 'Hello World' in console with javascript?",
        choice1: "print('Hello World')",
        choice2: "std::cout >> 'Hello World'",
        choice3: "System.out.println('Hello World')",
        choice4: "console.log('Hello World')",
        answer: 4
    },
    {
        question: "Which main language is used in tandem with HTML and CSS?",
        choice1: "Javascript",
        choice2: "PHP",
        choice3: "JAVA",
        choice4: "C++",
        answer: 1
    },
    {
        question: "Which tag is used to link the javascript file to the HTML?",
        choice1: "<link>",
        choice2: "<script>",
        choice3: "<href>",
        choice4: "<javascript>",
        answer: 2
    },
    {
        question: "What is Bootstrap in relation to web development?",
        choice1: "A different language for web development",
        choice2: "A device used to strap down your boots",
        choice3: "A collective framework",
        choice4: "Foundation's newly developed API",
        answer: 3
    },
    {
        question: "What is the correct syntax to link your CSS file?",
        choice1: "<link href=''./css.style>''",
        choice2: "<link src=''./css.style>''",
        choice3: "<link =''./css.style>''",
        choice4: "<link style=''./css.style>''",
        answer: 1
    },
];

// Making into array
availableQuestions = [...questionsList];

// Ending function
function ending() {
    play = false;
    timeLeft += 1;
    endScreen.classList.add("center-flex");
    endScreen.classList.remove("hidden");
    main.classList.add("hidden");

    finalScore.textContent = timeLeft;
};

// Kick Start
startBtn.addEventListener('click', function() {
    landing.classList.remove("center-flex")
    landing.classList.add("hidden");
    main.classList.remove("hidden");

    if(play === true) {
        function setTimer() {
            var timeInterval = setInterval(function() {
                timeLeft--;
                timer.textContent = "Time: " + timeLeft;

                if(timeLeft === 0) {
                    clearInterval(timeInterval);
                    timesUp();
                };
                if(timeLeft < 0) {
                    clearInterval(timeInterval);
                    timeLeft = 0;
                    timesUp();
                };

                if(play === false) {
                    clearInterval(timeInterval);
                    timesUp();
                };
        
            }, 1000);
        };

        function timesUp() {
            timer.textContent = "Time is up!";
            clearInterval(setTimer);
            setTimeout( () => {
                ending();
                play = false;
            }, 1000);

        };

        function displayQuestion() {

            var questionIndex = Math.floor(Math.random() * availableQuestions.length);
            currentQuestion = availableQuestions[questionIndex];
            questions.textContent = currentQuestion.question;

            choices.forEach(choice => {
                var number = choice.dataset['value'];
                choice.textContent = currentQuestion['choice' + number];
            });

            availableQuestions.splice(questionIndex, 1);

            if(availableQuestions.length === 0) { 
                ending();
                play = false;
            };
        };

        // Adding choices to see if they are wrong or not
        choices.forEach(choice => {
            choice.addEventListener("click", e => {
                var selectedChoice = e.target;
                var selectedAnswer = selectedChoice.dataset["value"];

                var changeColor = 'incorrect';
                if(selectedAnswer == currentQuestion.answer) {
                    changeColor = 'correct';
                };

                selectedChoice.parentElement.classList.add(changeColor);

                var changeText = 'incorrect';
                if(selectedAnswer == currentQuestion.answer) {
                    changeText = 'correct';
                };
            
                footer.textContent = changeText;

                setTimeout( () => {
                    selectedChoice.parentElement.classList.remove(changeColor);
                    footer.textContent = "";
                    displayQuestion();
                }, 1000)

                if(selectedChoice.dataset["value"] != currentQuestion.answer) {
                    timeLeft = timeLeft - subtractTime;
                };
            });
        });

        setTimer();
        displayQuestion();
    };
});

function saveHighScores() {
    var initials = initialEl.value.trim();
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
            score: timeLeft,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "highscores.html";
    };
};

function checkForEnter(e) {
    if (e.key === "Enter") {
        saveHighScores();
    };
};

scoreBtn.addEventListener('click', function() {
    window.location.href = "highscores.html";
});

submitBtn.onclick = saveHighScores;
initialEl.onkeyup = checkForEnter;
