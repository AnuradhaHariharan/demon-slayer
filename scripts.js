const totalCells = 100;
const snakes = {
    16: 6,
    47: 37,
    49: 39,
    56: 46,
    62: 52,
    64: 54,
    87: 77,
    93: 83,
    98: 88
};

const ladders = {
    4: 14,
    9: 19,
    21: 31,
    28: 38,
    36: 46,
    51: 61,
    71: 81,
};

let playerPosition = 1;

function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    for (let i = totalCells; i > 0; i--) {
        const cell = document.createElement('div');
        cell.textContent = i;

        if (snakes[i]) {
            const snakeImg = document.createElement('img');
            snakeImg.src = 'images/icons8-vampire-48.png';
            snakeImg.className = 'snake';
            cell.appendChild(snakeImg);
        }
        if (i==totalCells) {
            const nezukoImg = document.createElement('img');
            nezukoImg.src = 'images/nezuko.jpg';
            nezukoImg.className = 'nezuko';
            cell.appendChild(nezukoImg);
        }

        if (ladders[i]) {
            const ladderImg = document.createElement('img');
            ladderImg.src = 'images/icons8-ladder-50.png';
            ladderImg.className = 'ladder';
            cell.appendChild(ladderImg);
        }

        if (i === playerPosition) {
            const playerImg = document.createElement('img');
            playerImg.src = 'images/icons8-tanjiro-kamado.svg';
            playerImg.className = 'player-icon';
            cell.appendChild(playerImg);
        }

        board.appendChild(cell);
    }
}

function rollDice() {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = `You rolled: ${diceResult}`;
    movePlayer(diceResult);
}

function movePlayer(steps) {
    playerPosition += steps;

    if (playerPosition > totalCells) {
        playerPosition = totalCells - (playerPosition - totalCells);
    }

    if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
    }

    if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
    }

    createBoard();

    if (playerPosition === totalCells) {
        alert('Congratulations! Tanjiro reached Nezuko.');
        resetGame();
    }
}

function resetGame() {
    playerPosition = 1;
    document.getElementById('diceResult').textContent = 'Dice: ';
    createBoard();
}

createBoard();