const GameBoard = (() => {
    let gameBoard = ['','','','','','','','',''];
    const displayGameBoard = () => {
        const display = document.querySelector(".display");
        while (display.firstChild) {
            display.removeChild(display.firstChild);
        }
        for (let i=0; i<gameBoard.length; i++) {
            const cuadradito = document.createElement('div');
            cuadradito.classList.add("cuadradito");
            cuadradito.setAttribute("data", [i]);
            cuadradito.textContent = gameBoard[i];
            display.appendChild(cuadradito);
        }
    }
    return {gameBoard, displayGameBoard};
})(); 



const GamePlay = (() => {
    //funcion para alertar ganador
    const winner = () => {
        if ((GameBoard.gameBoard[0] === "X" && GameBoard.gameBoard[1] === "X" && GameBoard.gameBoard[2] === "X") || 
            (GameBoard.gameBoard[3] === "X" && GameBoard.gameBoard[4] === "X" && GameBoard.gameBoard[5] === "X") ||
            (GameBoard.gameBoard[3] === "X" && GameBoard.gameBoard[4] === "X" && GameBoard.gameBoard[5] === "X") ||
            (GameBoard.gameBoard[6] === "X" && GameBoard.gameBoard[7] === "X" && GameBoard.gameBoard[8] === "X") ||
            (GameBoard.gameBoard[0] === "X" && GameBoard.gameBoard[3] === "X" && GameBoard.gameBoard[6] === "X") ||
            (GameBoard.gameBoard[0] === "X" && GameBoard.gameBoard[3] === "X" && GameBoard.gameBoard[6] === "X") ||
            (GameBoard.gameBoard[1] === "X" && GameBoard.gameBoard[4] === "X" && GameBoard.gameBoard[7] === "X") ||
            (GameBoard.gameBoard[2] === "X" && GameBoard.gameBoard[5] === "X" && GameBoard.gameBoard[8] === "X") ||
            (GameBoard.gameBoard[0] === "X" && GameBoard.gameBoard[4] === "X" && GameBoard.gameBoard[8] === "X") ||
            (GameBoard.gameBoard[2] === "X" && GameBoard.gameBoard[4] === "X" && GameBoard.gameBoard[6] === "X")){
                console.log(`${firstPlayer.getName()} Won!`);
            }else if((GameBoard.gameBoard[0] === "O" && GameBoard.gameBoard[1] === "O" && GameBoard.gameBoard[2] === "O") || 
            (GameBoard.gameBoard[3] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[5] === "O") ||
            (GameBoard.gameBoard[3] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[5] === "O") ||
            (GameBoard.gameBoard[6] === "O" && GameBoard.gameBoard[7] === "O" && GameBoard.gameBoard[8] === "O") ||
            (GameBoard.gameBoard[0] === "O" && GameBoard.gameBoard[3] === "O" && GameBoard.gameBoard[6] === "O") ||
            (GameBoard.gameBoard[0] === "O" && GameBoard.gameBoard[3] === "O" && GameBoard.gameBoard[6] === "O") ||
            (GameBoard.gameBoard[1] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[7] === "O") ||
            (GameBoard.gameBoard[2] === "O" && GameBoard.gameBoard[5] === "O" && GameBoard.gameBoard[8] === "O") ||
            (GameBoard.gameBoard[0] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[8] === "O") ||
            (GameBoard.gameBoard[2] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[6] === "O")){
                console.log(`${secondPlayer.getName()} Won!`);
    }else if (GameBoard.gameBoard[0] !== "" && GameBoard.gameBoard[1] !== "" && GameBoard.gameBoard[2] !== ""
           && GameBoard.gameBoard[3] !== "" && GameBoard.gameBoard[4] !== "" && GameBoard.gameBoard[5] !== ""
           && GameBoard.gameBoard[6] !== "" && GameBoard.gameBoard[7] !== "" && GameBoard.gameBoard[8] !== ""){
               console.log("Empate!")
        }}
    //funcion para tomar turnos y display mark en cuadradito
    let turn = true;
    const playerPlay = () => {
        const cuadradito = document.querySelectorAll(".cuadradito");
        for (let i = 0; i < cuadradito.length; i++) {
            let currentPlayer = firstPlayer;
            cuadradito[i].addEventListener('click', () => {
                if (turn === true && cuadradito[i].textContent === ""){
                    turn = false
                    currentPlayer = firstPlayer;
                    cuadradito[i].textContent = currentPlayer.getMark()
                    let data = cuadradito[i].getAttribute('data');
                    GameBoard.gameBoard[data] = currentPlayer.getMark()
                    winner();
                    
                } else if (turn === false && cuadradito[i].textContent === "") {
                    turn = true
                    currentPlayer = secondPlayer;
                cuadradito[i].textContent = currentPlayer.getMark();
                let data = cuadradito[i].getAttribute('data');
                GameBoard.gameBoard[data] = currentPlayer.getMark()
                winner();
        };
        })}}
    return playerPlay;
})();



const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark}
}


const firstPlayer = Player("Sebas", "X");
const secondPlayer = Player("Moro", "O");
GameBoard.displayGameBoard();
GamePlay();
