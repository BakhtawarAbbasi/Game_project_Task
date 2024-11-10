const cards = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍒', '🍒', '🍉', '🍉', '🍋', '🍋', '🍓', '🍓', '🍑', '🍑'];
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let timer = 0;
let timerInterval;

const gameBoard = document.getElementById('game-board');
const moveCountDisplay = document.getElementById('move-count');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moveCount++;
            moveCountDisplay.textContent = moveCount;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            clearInterval(timerInterval);
            alert(`Congratulations! You've won in ${moveCount} moves and ${timer} seconds.`);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function restartGame() {
    gameBoard.innerHTML = '';
    moveCount = 0;
    timer = 0;
    flippedCards = [];
    matchedCards = [];
    moveCountDisplay.textContent = moveCount;
    timerDisplay.textContent = timer;
    clearInterval(timerInterval); // to stop timer
    startTimer();
    createBoard();
}

restartButton.addEventListener('click', restartGame);

window.onload = () => {
    startTimer();
    createBoard();
};
