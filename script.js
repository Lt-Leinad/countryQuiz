let points = 0;
document.querySelector(".points").textContent = points;

const flagFunc = function () {
  const req = fetch("https://restcountries.com/v3.1/all");
  req.then((response) =>
    response.json().then((data) => {
      let randomFlag = () => Math.floor(Math.random() * 250);
      let randomLetter = () => Math.floor(Math.random() * 5);
      let index = Math.floor(Math.random() * 250);
      console.log(
        `Flag: ${data[index].flag} A ${data[index].name.common}`,
        `B ${data[randomFlag()].name.common}`,
        `C ${data[randomFlag()].name.common}`,
        `D ${data[randomFlag()].name.common}`
      );
      document.querySelector(".flag").textContent = data[index].flag;
      document.querySelector(".answer-a").textContent = data[index].name.common;
      document.querySelector(".answer-b").textContent =
        data[randomFlag()].name.common;
      document.querySelector(".answer-c").textContent =
        data[randomFlag()].name.common;
      document.querySelector(".answer-d").textContent =
        data[randomFlag()].name.common;
    })
  );
};

flagFunc();

const pointsFunc = function () {
  points += 1;
  document.querySelector(".points").textContent = points;
  flagFunc();
};

const gameOver = function () {
  points = 0;
  document.querySelector(".points").textContent = points;
  flagFunc();
};

document.querySelector(".answer-a").addEventListener("click", pointsFunc);
document.querySelector(".answer-b").addEventListener("click", gameOver);
document.querySelector(".answer-c").addEventListener("click", gameOver);
document.querySelector(".answer-d").addEventListener("click", gameOver);
