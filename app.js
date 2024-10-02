let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (started === false) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerHTML = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let ranBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(ranBtn);
}

function checkInput(idx) {
  // console.log(`curr level ${level}`);

  // let idx = level - 1;
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start again.`;
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 300);
    document.querySelector("body").style.backgroundColor = "red";
    reset();
  }
}

function btnPressed() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkInput(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPressed);
}

function reset() {
  userSeq = [];
  gameSeq = [];
  started = false;
  level = 0;
}
