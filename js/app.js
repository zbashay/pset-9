const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn;
let win;
let countingxwins = 0
let countingowins = 0
let switch_turn_count = 0
let starter = "X";
let change = document.getElementById("order-button").innerHTML

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;

document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("order-button").onclick = changeOrder;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
board = ["", "", "", "", "", "", "", "", ""];
if (switch_turn_count == 0) {
  turn = "X";
}
else if (switch_turn_count == 1) {
  turn = "O"
}
win = null;

render();
}
function switch_turn() {
if (switch_turn_count == 0) {
  switch_turn_count = 1
}
else if (switch_turn_count == 1) {
  switch_turn_count = 0
}
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  if (win === "X") {
    countingxwins = countingxwins + 1
  }
  else if (win === "O") {
    countingowins = countingowins + 1
  }

  let change1 = document.getElementById("owins").innerHTML;
  let change2 = document.getElementById("xwins").innerHTML;

  let new1 = change2.splice(8, 1, countingxwins);
  let new2 = change1.splice(8, 1, countingowins);

  document.getElementById("xwins").innerHTML = new1;
  document.getElementById("owins").innerHTML = new2;

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}
function changeOrder() {
    init();
    if (starter === "X") {
        turn = "O";
        starter = "O";
    } else {
        turn = "X";
        starter = "X"
    }

    let neww = change.splice(16, 1, starter);
    document.getElementById("order-button").innerHTML = neww

    render();
}
p
llppllppppppppp
