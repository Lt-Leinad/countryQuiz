let points = 0;
document.querySelector(".points").textContent = points;
let answer;

const gameReset = () => {
  document.querySelector(".wrong").classList.add("display-none");
  document.querySelector(".correct").classList.add("display-none");
  document.querySelector(".wrong").classList.add("fade-out");
  document.querySelector(".correct").classList.add("fade-out");
};

const gameInit = function () {
  const req = fetch("https://restcountries.com/v3.1/all");
  req.then((response) => {
    response.json().then((data) => {
      let randomIndex = (n) => Math.floor(Math.random() * (n + 1));
      let correctIndex = randomIndex(249);
      answer = data[correctIndex].capital[0];
      document.querySelector(".country").textContent =
        data[correctIndex].name.common;
      let fakeAnswers = [];
      while (fakeAnswers.length < 3) {
        let fakeAnswer = randomIndex(249);
        if (!fakeAnswers.includes(data[fakeAnswer].capital[0])) {
          fakeAnswers.push(data[fakeAnswer].capital[0]);
        }
      }
      let answerIndexes = [];
      let possibileIndex = [0, 1, 2, 3];
      while (answerIndexes.length < 4) {
        let n = possibileIndex.length;
        let cur = possibileIndex[randomIndex(n - 1)];
        answerIndexes.push(cur);
        possibileIndex.splice(possibileIndex.indexOf(cur), 1);
      }
      let answers = [fakeAnswers, data[correctIndex].capital].flat();

      let newAnswers = [];
      newAnswers.push(answers[answerIndexes[0]]);
      newAnswers.push(answers[answerIndexes[1]]);
      newAnswers.push(answers[answerIndexes[2]]);
      newAnswers.push(answers[answerIndexes[3]]);
      document.querySelector(".answer-a").textContent = newAnswers[0];
      document.querySelector(".answer-b").textContent = newAnswers[1];
      document.querySelector(".answer-c").textContent = newAnswers[2];
      document.querySelector(".answer-d").textContent = newAnswers[3];
    });
  });

  setTimeout(() => gameReset(), 500);
};

gameInit();

const correct = function () {
  document.querySelector(".correct").classList.remove("display-none");
  document.querySelector(".correct").classList.add("fade-in");
};

const wrong = function () {
  document.querySelector(".wrong").classList.remove("display-none");
  document.querySelector(".wrong").classList.add("fade-in");
};

const pointsFunc = function (e) {
  if (answer == e.target.textContent) {
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

document.querySelector(".answer-a").addEventListener("click", pointsFunc);
document.querySelector(".answer-b").addEventListener("click", pointsFunc);
document.querySelector(".answer-c").addEventListener("click", pointsFunc);
document.querySelector(".answer-d").addEventListener("click", pointsFunc);
