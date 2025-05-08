let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // Player O starts
let count = 0; // Move counter

const winPattens = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.textContent = "O";
      turn0 = false;
    } else {
      box.textContent = "X";
      turn0 = true;
    }
    box.disabled = true;
    count++;

    checkWinner();
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBox();
};

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winPattens) {
    let a = boxes[pattern[0]].innerText;
    let b = boxes[pattern[1]].innerText;
    let c = boxes[pattern[2]].innerText;

    if (a !== "" && b !== "" && c !== "") {
      if (a === b && b === c) {
        showWinner(a);
        winnerFound = true;
        return;
      }
    }
  }

  if (count === 9 && !winnerFound) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

const disableBox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBox();
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
