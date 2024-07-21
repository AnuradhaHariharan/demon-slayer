const boardSize = 10; // Adjusted for a 10x10 board
const totalCells = boardSize * boardSize;
const board = document.getElementById('game-board');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const diceResult = document.getElementById('dice-result');
const playerPositionText = document.getElementById('player-position');

let playerPosition = 1;

const snakes = {
    38: 20,
    84: 28,
    86: 36,
    91: 67,
    19: 38,
    27: 83,
    54:56
};

const ladders = {
    3: 13,
    11: 26,
    17: 29,
    39: 59,
    94: 72,
    97: 78
};

const demons = {
    25: true, // Example demon positions, can be static
    50: true,
    14: true,
    31: true,

};
let a=1;

function createBoard() {
    for (let i = totalCells; i > 0; i--) {
        const cell = document.createElement('div');
        console.log("working");
        cell.textContent = a++;

    
        cell.className = 'cell';

        // Check if there's a snake at this position
        if (snakes[i]) {
            cell.classList.add('snake');
        }

        // Check if there's a ladder at this position
        if (ladders[i]) {
            cell.classList.add('ladder');
        }

        // Check if there's a demon at this position
        if (demons[i]) {
            cell.classList.add('demon');
        }

        // Add Nezuko's image if it's the final position
        if (i === totalCells) {
            cell.classList.add('nezuko');
        }
       

        board.appendChild(cell);
    }
}


function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function movePlayer() {
    const diceValue = rollDice();
    diceResult.textContent = `Dice: ${diceValue}`;

    let newPosition = playerPosition + diceValue;

    // Check if the new position encounters snakes, ladders, or demons
    while (newPosition in snakes || newPosition in ladders || newPosition in demons) {
        if (newPosition in snakes) {
            newPosition = snakes[newPosition];
            newPosition -= Math.floor(newPosition / 2); // Move back half the cell value
        } else if (newPosition in ladders) {
            newPosition = ladders[newPosition];
        } else if (newPosition in demons) {
            // Handle demon effect, move back half the cell value
            newPosition -= Math.floor(newPosition / 2);
        }
    }

    // Ensure Tanjiro's position does not exceed the board size
    playerPosition = Math.min(newPosition, totalCells);

    // Check if Tanjiro reached Nezuko
    if (playerPosition === totalCells) {
        alert('Congratulations! Tanjiro reached Nezuko.');
        resetGame();
    }

    // Update player position text
    playerPositionText.textContent = `Tanjiro's Position: ${playerPosition}`;

    // Update Tanjiro's position on the board
    updatePlayerPosition();
}

function updatePlayerPosition() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear all cells
    });

    const currentCell = document.querySelector(`.cell:nth-child(${totalCells - playerPosition + 1})`);
    if (currentCell) {
        const tanjiroImg = document.createElement('div');
        tanjiroImg.className = 'player-icon';
        currentCell.appendChild(tanjiroImg);
    }
}

function resetGame() {
    playerPosition = 1;
    playerPositionText.textContent = `Tanjiro's Position: ${playerPosition}`;
    diceResult.textContent = 'Dice: ';
    updatePlayerPosition();
}

rollDiceBtn.addEventListener('click', movePlayer);

createBoard();
updatePlayerPosition();