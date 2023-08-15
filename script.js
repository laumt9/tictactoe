const x = 'x';
const o = 'o';
let oTurn

const cellElements = document.querySelectorAll('.cell');
const boardDiv = document.querySelector('.gameBoard');
const result = document.querySelector('.result');
const message = document.querySelector('.message');

const winningCombinations = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {
   startGame();
});

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', () => {
   restartGame();
});

const rematch = document.querySelector('.rematch-button');
rematch.addEventListener('click', () => {
   restartGame();
});

function startGame() {
   console.log('Game began');
   oTurn = false;
   cellElements.forEach(cell => {
      cell.addEventListener('click', boardClick, { once: true })
   });
};

function boardClick(e) {
   const cell = e.target;
   const currentTurn = oTurn ? o : x;
   console.log(currentTurn)
   addMark(cell, currentTurn);
   if (checkWin(currentTurn)) {
      endGame(false);
   } else if (checkDraw()) {
      endGame(true)
   } else {
      switchTurns();
   } 
};

function addMark(cell, currentTurn) {
   if (currentTurn == x) {
      cell.innerText = 'X';
      cell.classList.add('x');
   } else {
      cell.innerText = 'O';
      cell.classList.add('o');
   } 
};

function checkWin(currentTurn) {
   return winningCombinations.some(combination => {
      return combination.every(index => {
         return cellElements[index].classList.contains(currentTurn)
      })
   })
};

function checkDraw() {
   return [...cellElements].every(cell => {
      return cell.classList.contains(x) || cell.classList.contains(o)
   })
};

function switchTurns() {
   oTurn = !oTurn;
};

function endGame(draw) {
   let player1 = document.getElementById('player1').value;
   let player2 = document.getElementById('player2').value;
      if (player1 == '' || player2 == '') {
         player1 = `X`;
         player2 = `O`;
      }
   if (draw) {
      message.innerText = "It's a tie!";
      result.classList.add('show');
      console.log('Draw');
   } else { 
      message.innerText = `${oTurn ? player2 : player1} wins!`
      result.classList.add('show');
      console.log(player1)
      console.log(player2)
   }
};

function restartGame() {
   location.reload()
};