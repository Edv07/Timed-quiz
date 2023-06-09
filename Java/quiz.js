var highScoreList = document.getElementById("highScoresList");

const highScoresBtn = document.getElementById("highScoresBtn");
const submitBtn = document.getElementById("submitBtn");
const startBtn = document.getElementById("startBtn");
const saveBtn = document.getElementById("saveBtn");
const results = document.getElementById("results");
const quizArea = document.getElementById("quizArea");
const choices = document.getElementById("choices");

// store questions and add questions
const questions = [
    {
      question: "1/10 What is HTML?",
      answers: {
        a: "Hyper Text Markup Language",
        b: "Hyper texting mediocre logistics",
        c: "Hyper texts mashup language",
        d: "Hyper typer mapping logo"
      },
      correctAnswer: "a"
    },
    {
      question: "2/10 What is CSS?",
      answers: {
        a: "Cascading Style Sheets",
        b: "Cascading Sorting System",
        c: "Cascading Selectors Script",
        d: "Cascading Special Styles"
      },
      correctAnswer: "a"
    },
    {
      question: "3/10 What is JavaScript?",
      answers: {
        a: "A live language",
        b: "A programming language",
        c: "A markup language",
        d: "A styling language"
      },
      correctAnswer: "b"
    },
    {
    question: "4/10 What is a URL?",
     answers: {
       a: "Universe routing linking",
       b: "Uniform Resource Locator",
       c: "Unlimited routing lanes",
       d: "Ultimate rapid links"
        },
        correctAnswer: "b"
      },
    {
    question: "5/10 what does div stand for in in HTML",
     answers: {
       a: "divisible",
       b: "division",
       c: "dividable",
       d: "diva"
        },
        correctAnswer: "b"
      },
    {
    question: "6/10 which of these are not HTML elements",
     answers: {
       a: "normal elements",
       b: "raw text elements",
       c: "strict elements",
       d: "void elements"
        },
        correctAnswer: "c"
      },
    {
    question: "7/10 what does nav stand for in html",
     answers: {
       a: "navigation links",
       b: "navigator links",
       c: "navvies links",
       d: "navy blue"
        },
        correctAnswer: "a"
      },
    {
    question: "8/10 what does border-color do in css",
     answers: {
       a: " changes the backround ",
       b: " colors the blank spaces ",
       c: " Sets the color of the four borders ",
       d: " something with color "
        },
        correctAnswer: "c"
      },
    {
    question: "9/10 which is NOT a concept of object oriented programming",
     answers: {
       a: "Encapsulation",
       b: "metrication",
       c: "Inheritance",
       d: "Data abstraction"
        },
        correctAnswer: "b"
      },
    {
    question: "10/10 whats 2 + 2",
     answers: {
       a: "1",
       b: "2",
       c: "3",
       d: "4 this was a test question i left in"
        },
        correctAnswer: "d"
      },
   ];

  // starting variables for the quiz to start off with
  // current question will be the index for the array of quiz questions to display the next question 0 = 1st questions 1 = 2nd question
  // score just goes up if the answer chosen with correct wrong = +0 & correct = +1 to the score shows at the end of the quiz
  // timeleft starts a counter 60 = 60 seconds that counts down when the quiz starts and answers are wrong when timeleft goes down to 0 the quiz ends
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60;
  let timerInterval = null;
// after clicking the start button the function startQUiz will run which includes:
// hiding the start button and showing the submit button
// Start the displayQuestions function that handles loading the questions using the "const questions"
// startTimer which is a countdown from  60 seconds and will run the end quiz function when timer is equal to or below 0
  function startQuiz() {
    // hide the start quiz button and show the submit button after quiz starts
    startBtn.style.display = "none";
    submitBtn.style.display = "inline";
    displayQuestion(); 
    startTimer();
  };
  
// this function is used to keep track of current answers correct and move on to the next question.
// this is defined in the dom of the html document in the submit button id where on click will run the function checkanswer.
// each time the submit button is clicked it will check to make sure something is actually selected before moving on if nothing is picked it will not continue.
// if a choice is selected and submitted it will check the value of what was selected with the current questions correct answer and either add 1 to the score or minus 7sec from the time.
// after that it will move on to the next question if the current question number is less than the current question but if it is not then the function end game will run.
  function checkAnswer() {
    const userAnswer = document.querySelector("input[name='answer']:checked");
    if (!userAnswer) {
      return;
    }
    if (userAnswer.value === questions[currentQuestion].correctAnswer) {
      score++;
    } else {
      timeLeft -= 7;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  };
// the function displayQuestion is used to show the current questions properly with a input for each option
  function displayQuestion() {
    document.getElementById("quizArea").innerHTML = questions[currentQuestion].question;
    const answers = questions[currentQuestion].answers;
    let answerList = "";
    for (let key in answers) {
      answerList += `<input type='checkbox' name='answer' value='${key}'> ${answers[key]}<br>`;
    }
    choices.innerHTML = answerList;
  };
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  };
  
  // clear everything and only display score, save score, time left,
  function endGame() {
    clearInterval(timerInterval);   
    submitBtn.style.display = "none";
    saveBtn.style.display = "inline";
    quizArea.innerHTML = "";
    choices.innerHTML = "";
    results.innerHTML = `You got ${score} out of ${questions.length} questions correct.`;
  };

  // will happen once the quiz is over store the score object with the score and initials 
function saveScore () { 
  const initials = prompt("Enter your initials:");
  const scoreObject = {
    score: score,
    initials: initials,
  };
  
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(scoreObject);
  localStorage.setItem("scores", JSON.stringify(scores));
  };

function displayHighScores() {
  results.innerHTML = "";
  highScoreList.innerHTML = "";
  const hs = document.createElement("p");
  hs.innerText = ("High Scores!");
  highScoreList.appendChild(hs);

  const scores = JSON.parse(localStorage.getItem("scores"));
  // to test make sure getItem works
  // console.log (scores);

  // for loop will create a li for each score object found.
    for (let i = 0; i < scores.length; i++) {
      const HSlist = document.createElement("li");
      HSlist.innerText = `${scores[i].initials} ${scores[i].score + "/10"}`;
      highScoreList.appendChild(HSlist);
    }
  };


highScoresBtn.addEventListener("click", displayHighScores);
submitBtn.addEventListener("click", checkAnswer);
startBtn.addEventListener("click", startQuiz);
saveBtn.addEventListener("click", saveScore);

