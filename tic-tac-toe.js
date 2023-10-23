document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    const status = document.getElementById('status');
    const newGameBtn = document.querySelector('.btn');
    let currentPlayer = 'X';
    let gameOn = true; 
    const moves = Array(9).fill(' ');

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (moves[a] === currentPlayer && moves[b] === currentPlayer && moves[c] === currentPlayer) {
                return true;
            }
        }
    }

    function handleSquareClick(square, index) {
        if (moves[index] === ' ' && gameOn) {
            square.textContent = currentPlayer;
            moves[index] = currentPlayer;
            square.classList.add(currentPlayer);

            if (checkWin()) {
                status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                status.classList.add('you-won');
                gameOn = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Now it's ${currentPlayer}'s turn`;
            }
        }
    }

    function resetGame() {
        console.log('Resetting the game...');
        squares.forEach((square, index) => {
            square.textContent = ' ';
            square.className = 'square';
            moves[index] = ' ';
        });

        gameOn = true; 
        currentPlayer = 'X';
        status.textContent = 'Move your mouse over a square and click to play an X or an O.';
        status.classList.remove('you-won');
        console.log('Game reset.');
    }

    squares.forEach((square, index) => {
        square.classList.add('square');

        square.addEventListener('mouseover', () => {
            square.classList.add('hover');
        });

        square.addEventListener('mouseout', () => {
            square.classList.remove('hover');
        });

        square.addEventListener('click', () => {
            if (square.textContent === ' ' && gameOn) {
                handleSquareClick(square, index);
            }
        });
    });

   
    resetGame();

    newGameBtn.addEventListener('click', resetGame);
});


