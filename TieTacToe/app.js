const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');


let currentplayer = "X";
let nextPlayer = "O";
let playerTurn = currentplayer;

player1.textContent = `player 1: ${currentplayer}`;
player2.textContent = `player 2: ${currentplayer}`;
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });
}
const handleClick = (e) => {
    if (e.target.textContent === "") {
        e.target.textContent = playerTurn;
        if (checkwin()) {

            showAlert(`${playerTurn} win game`);
            disableCells();

        } else if (CheckTie()) {
            showAlert(`Its a Tie!`);
            disableCells();
        } else {
            changePlayerTurn();

        }
    }
}

// function to change player 
const changePlayerTurn = () => {
    // if (playerTurn === currentplayer) {
    //     playerTurn = nextPlayer;
    // } else {
    //     playerTurn = currentplayer;

    // } 
    // another way 

    playerTurn = playerTurn === currentplayer ? nextPlayer : currentplayer;

}

const checkwin = () => {
    const winningConditions =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];
        if (gameCells[pos1].textContent != "" &&
            gameCells[pos1].textContent === gameCells[pos2].textContent &&
            gameCells[pos2].textContent === gameCells[pos3].textContent) {

            return true;
        }
    }
    return false
}
// function to check for a tie 
const CheckTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === " ") {
            emptyCellsCount++;
        }
        return emptyCellsCount === 0 && !checkwin();
    });
}
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener("click", handleClick)
        cell.classList.add('disabled');
    });
}
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("disabled")
    })
    startGame();
}

const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}

restartBtn.addEventListener("click", restartGame);


// calling start game Function
startGame();
