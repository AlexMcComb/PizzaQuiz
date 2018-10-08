'use strict';

function handleQuiz() {
    handleStart();
    handleSubmitButton();
    handleNextButton();
    handleRestartButton();
}

// when the page loads, call `handleQuiz`
$(handleQuiz);


let questionCount = 0;
let correctAnswers = 0;

//responsible for generating questions 
function generateQuiz(correctAnswers, question) {
    return ` <section id="question-page" role="main">
    <form>
      <fieldset>
        <legend class="quest-box" id="question">${question.text}</legend>
        <label>
          <input class="answer" type="radio" name="option" required>
          <span>${question.a}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option" required>
          <span>${question.b}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option" required>
          <span>${question.c}</span>
        </label>
        
        <label>
          <input class="answer" type="radio" name="option" required>
          <span>${question.d}</span>
        </label>

      </fieldset>  
      <button id="submitButton">Submit</button>
    </form>
    <div id="status-bar">
    <span class='count-box' id="question-count">Question: ${(questionCount + 1)}/10
    <br>
    Score: ${correctAnswers}/10 </span>
  </div>
    </section>;`


}

//function to handle starting quiz clicking start button
function handleStart() {
    $('.begin-button').click(function () {
        handleNextQuestion();
    });
}


//loads the questions
function handleNextQuestion() {
    const question = STORE[questionCount];
    const questionsAnswered = questionCount;

    $('.beginQuiz').html(generateQuiz(correctAnswers, question));
}

//function for submit button
function handleSubmitButton() {
    $('.beginQuiz').on('submit', 'form', function (event) {
        event.preventDefault()

        const selectedInput = $(".answer").is(":checked");

        if (selectedInput) {
            const answer = $('input:checked').siblings('span');

            const userIsCorrect = checkUserAnswer(answer);
            if (userIsCorrect) {
                generateCorrectFeedback();
            } else {
                generateIncorrectFeedback();
            }
        }
    });
}

//
function handleNextButton() {
    $('.beginQuiz').on('click', '.button', function (event) {

        if (questionCount === 9) {
            createResultsPage(correctAnswers);
        } else {
            iterateQuestion();
            handleNextQuestion();
        }
    });
}


//Checks the users answer
function checkUserAnswer(answer) {
    if (answer.text() === STORE[questionCount].answer) {
        return true;
    } else {
        return false;
    }
}

//gives feedback for correct answers
function generateCorrectFeedback() {
    $('.beginQuiz').html(correctFeedback);
    iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2 class="quest-box">Bravo!</h2>
    <img src="https://media.giphy.com/media/3o7TKJG8p39T1hJFLO/giphy.gif" alt="A+ correct answer">
    <button class="button">Next</button>
  </section>
`;


//incorrect answer page
function generateIncorrectFeedback() {
    $('.beginQuiz').html(incorrectFeedbackTemplate(questionCount));
}


function incorrectFeedbackTemplate(questionCount) {
    return `
      <section class="feedback-page" role="main">
        <h2 class="quest-box">Sorry, the right answer is ${ANSWERS[questionCount]}</h2>
        <img src="https://media.giphy.com/media/l41lFYikZWh2eucog/giphy.gif" alt="Wrong Answer">
        <button class="button">Next</button>
      </section>
  `;
}

//adds 1 when the question is answered 
function iterateQuestion() {
    questionCount++;
}

//adds 1 when a correct answer is chosen 
function iterateCorrectAnswers() {
    correctAnswers++;
}

//Restarts the quiz and resets the question count and correct answers to 0
function handleRestartButton() {
    $('.beginQuiz').on('click', '#restartButton', function (event) {

        questionCount = 0;
        correctAnswers = 0;
        handleNextQuestion();
    });
}


//gives the results
function createResultsPage(correctAnswers) {
    $('.beginQuiz').html(`
      <section id="final-page">
        <h2 class="quest-box">Final Score: ${correctAnswers} out of 10</h2>
        <button id="restartButton">Try Again?</button>
      </section>
    `);
}