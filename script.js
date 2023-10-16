const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = X_CLASS;
let gameBoard = new Array(9).fill('');
let gameOver = false;

restartButton.addEventListener('click', startGame);

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameOver && !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) {
            const index = Array.from(cells).indexOf(cell);
            placeMark(cell, index);
            if (checkWin(currentPlayer)) {
                endGame(false);
            } else if (isBoardFull()) {
                endGame(true);
            } else {
                currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
            }
        }
    });
});

function placeMark(cell, index) {
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);
    gameBoard[index] = currentPlayer;
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function endGame(draw) {
    gameOver = true;
    if (draw) {
        setTimeout(() => alert('Unentschieden!'), 10);
    } else {
        setTimeout(() => alert(currentPlayer + ' gewinnt!'), 10);
    }
}

function startGame() {
    gameBoard = new Array(9).fill('');
    currentPlayer = X_CLASS;
    gameOver = false;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
    });
}

startGame();
