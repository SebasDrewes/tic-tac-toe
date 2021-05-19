const GameBoard = (() => {
    let gameBoard = ['X','O','X','O','X','O','X','O','X'];
    const displayGameBoard = () => {
        const display = document.querySelector(".display");
        while (display.firstChild) {
            display.removeChild(display.firstChild);
        }
        for (let i=0; i<gameBoard.length; i++) {
            const cuadradito = document.createElement('div');
            cuadradito.classList.add("cuadradito");
            cuadradito.textContent = gameBoard[i];
            display.appendChild(cuadradito);
        }
    }
    return {gameBoard, displayGameBoard};
})(); 



const GamePlay = (() => {
    const playerPlay = () => {
        const cuadradito = document.querySelector(".cuadradito");
        cuadradito.addEventListener('click', () => {
            for (let i=0; i<GameBoard.gameBoard.length; i++) {
                    GameBoard.gameBoard[i] = Sebas.getMark();
            }
        GameBoard.displayGameBoard();
        })
    }
    return playerPlay;
})();



const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark}
}



const Sebas = Player("Sebas", "X");
GameBoard.displayGameBoard();
GamePlay();