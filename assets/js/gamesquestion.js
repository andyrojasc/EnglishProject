let url ='./json/questionsMedium.json';

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressBarFull = document.getElementById("progressBarFull");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

const home = document.getElementById("home");
const playing = document.getElementById("playing");
const playButton = document.getElementById("playButton");
const explanation = document.querySelector('.explanation');
const selectoptions = document.getElementById("selectoptions");
const endPage = document.querySelector('.endPage');
const result = document.querySelector('.result');
const playAgainButton = document.querySelector('#playAgainButton');

const point = 10;
const maxQuestion = 10;
let score = 0;
let questionCounter = 0;
let acceptingAnswers = false;
let resultvalue = 0;

let allQuestionsArray = [];
let currentQuestion = {};


function play() {
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(response => {
        allQuestionsArray = response.results.map(q => {
            let allQuestionsObject = {};
            allQuestionsObject.question = q.question;
            allQuestionsObject.answer = Math.floor(Math.random() * 3) + 1;
            const choices = [...q.incorrect_answers];
            choices.splice(allQuestionsObject.answer - 1, 0, q['correct_answer']);
            choices.forEach((eachChoice, index) => {
                allQuestionsObject["choice" + (index + 1)] = eachChoice;
            });
            return allQuestionsObject;
            });
        startGame();
    })
}
playButton.addEventListener('click', play)

function startGame() {
    remainedQuestions = [...allQuestionsArray];
    getQuestion();
    
}

function getQuestion() {
    if (remainedQuestions.length === 0 || questionCounter >= maxQuestion) {
        endGame();
        return;
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestion}`;
    progressBarFull.style.width = `${(questionCounter / maxQuestion) * 100}%`;
    const questionIndex = Math.floor(Math.random() * remainedQuestions.length);
    currentQuestion = remainedQuestions[questionIndex];
    question.innerText = decoding(currentQuestion.question);
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = decoding(currentQuestion["choice" + number]);
    });
    remainedQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

let incrementScore = num => {
    score += num;
    scoreText.innerText = score;
    resultvalue += num;
    result.innerHTML = `${resultvalue}%`;
}

function decoding(html) {
    let el = document.createElement( 'html' );
    el.innerHTML = html;
    return el.textContent;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
      if (classToApply === "correct") {
        incrementScore(point);
      }
  
      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getQuestion();
      }, 500);
    });
  });




