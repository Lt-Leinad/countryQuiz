let randomIndex = (n) => Math.floor(Math.random() * (n + 1));

const colorsReset = () => {
  document.querySelector(".correct").classList.remove("fade-in");
  document.querySelector(".wrong").classList.remove("fade-in");
  document.querySelector(".wrong").classList.add("fade-out");
  document.querySelector(".correct").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".wrong").classList.add("display-none");
    document.querySelector(".correct").classList.add("display-none");
    document.querySelector(".wrong").classList.remove("fade-out");
    document.querySelector(".correct").classList.remove("fade-out");
  }, 1000);
};

let answer;
let points = 0;
let prevAnswers = [];

const questionReset = () => {
  const req = fetch("https://restcountries.com/v3.1/all");
  req.then(async (response) => {
    if (!response) {
      console.error("error", error);
    } else {
      const data = await response.json();
      let dataArr = data.filter((x) => x.capital);
      prevAnswers.forEach((x) => dataArr.splice(dataArr.indexOf(x), 1));
      let answerIndex = randomIndex(dataArr.length - 1);
      answer = dataArr[answerIndex];
      dataArr.splice(answerIndex, 1);
      if (dataArr.length > 3) {
        let answers = [0, 0, 0, 0];
        answers[randomIndex(3)] = answer.capital[0];
        let falseAnswerArr = dataArr.slice();
        let falseAnswers = [];
        while (falseAnswers.length < 4) {
          let falseAnswerIndex = randomIndex(falseAnswerArr.length - 1);
          falseAnswers.push(falseAnswerArr[falseAnswerIndex].capital[0]);
          falseAnswerArr.splice(falseAnswerIndex, 1);
        }

        answers = answers.map((x, i) =>
          x == 0 ? (x = falseAnswers[i]) : (x = x)
        );

        document.querySelector(".country").textContent = answer.name.common;
        [...document.querySelectorAll(".answer")].forEach(
          (x, i) => (x.textContent = answers[i])
        );
      } else {
        alert("Restart");
        gameRestart();
      }
    }
  });
};

const gameInit = () => {
  document.querySelector(".points").textContent = points;
  questionReset();
  colorsReset();
};

const correct = function () {
  document.querySelector(".correct").classList.remove("display-none");
  document.querySelector(".correct").classList.add("fade-in");
  document.querySelector(".ding").play();
};

const wrong = function () {
  document.querySelector(".wrong").classList.remove("display-none");
  document.querySelector(".wrong").classList.add("fade-in");
  document.querySelector(".wrong").textContent = answer.capital[0];
  document.querySelector(".buzzer").play();
};

const pointsFunc = function (e) {
  prevAnswers.push(answer.capital[0]);
  if (answer.capital[0] == e.target.textContent) {
    points += 1;
    document.querySelector(".points").textContent = points;
    correct();
    gameInit();
  } else {
    points = 0;
    document.querySelector(".points").textContent = points;
    wrong();
    gameInit();
  }
};

gameInit();

document.querySelector(".answer-a").addEventListener("click", pointsFunc);
document.querySelector(".answer-b").addEventListener("click", pointsFunc);
document.querySelector(".answer-c").addEventListener("click", pointsFunc);
document.querySelector(".answer-d").addEventListener("click", pointsFunc);

const gameRestart = function () {
  answer;
  points = 0;
  prevAnswers = [];
  gameInit();
};
