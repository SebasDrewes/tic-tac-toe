const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {name, mark, getName, getMark}
}

const GameBoard = (() => {
    let gameBoard = ['','','','','','','','',''];
    const display = document.querySelector(".display");
    const displayGameBoard = () => {
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
    const winDisplay = () => {
        let gameBoard = GameBoard.gameBoard;
        const display = document.querySelector(".display");
        while (display.firstChild) {
            display.removeChild(display.firstChild);
        }
        for (let i=0; i<gameBoard.length; i++) {
            const cuadradito = document.createElement('div');
            cuadradito.classList.add("cuadraditoWin");
            cuadradito.textContent = gameBoard[i];
            display.appendChild(cuadradito);
        }
    }

    const start = document.querySelector(".start");
    const restart = document.querySelector(".restart");
    const send = document.querySelector(".send");
    const opciones = document.querySelector(".opciones")
    send.addEventListener("click", () => {
        const firstName = document.createElement("input")
        firstName.classList.add("firstName");
        const secondName = document.createElement("input")
        secondName.classList.add("secondName");
        opciones.appendChild(firstName);
        opciones.appendChild(secondName);
    })
    start.addEventListener("click", () => {
        GameBoard.displayGameBoard();
        GamePlay.playerPlay();
        start.style.cssText = "display: none";
        restart.style.cssText = "display: block";
    })    
    restart.addEventListener("click", () => {
        const title = document.querySelector(".title");
        title.textContent = "Tic-Tac-Toe";
        GameBoard.displayGameBoard();
        GamePlay.playerPlay();
        GamePlay.restart();
    })
    return {gameBoard, displayGameBoard, winDisplay};
})(); 



const GamePlay = (() => {
    const firstPlayer = () => {
        const firstName = document.querySelector(".firstName")
        if (firstName === null) {
            const firstPlayer = Player("X player", "X");
            return firstPlayer
        } else {
        const firstPlayer = Player(firstName.value, "X");
        return firstPlayer;
        }
    }

    const secondPlayer = () => {
        const secondName = document.querySelector(".secondName")
        if (secondName === null) {
            const secondPlayer = Player("O player", "O");
            return secondPlayer
        } else {
        const secondPlayer = Player(secondName.value, "O");
        return secondPlayer;
        }
    }

    //funcion para alertar ganador
    const winner = () => {
        const title = document.querySelector(".title");
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
                GameBoard.winDisplay();
                title.textContent = `${firstPlayer().getName()} Won!`
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
                GameBoard.winDisplay();
                title.textContent = `${secondPlayer().getName()} Won!`;
    }else if (GameBoard.gameBoard[0] !== "" && GameBoard.gameBoard[1] !== "" && GameBoard.gameBoard[2] !== ""
           && GameBoard.gameBoard[3] !== "" && GameBoard.gameBoard[4] !== "" && GameBoard.gameBoard[5] !== ""
           && GameBoard.gameBoard[6] !== "" && GameBoard.gameBoard[7] !== "" && GameBoard.gameBoard[8] !== ""){
               GameBoard.winDisplay();
               title.textContent = "Empate!";
        }}
    //funcion para tomar turnos y display mark en cuadradito
    let turn = true;
    const playerPlay = () => {
        const cuadradito = document.querySelectorAll(".cuadradito");
        for (let i = 0; i < cuadradito.length; i++) {
            let currentPlayer = firstPlayer();

            //funcionalidad vs pc
            const vspc = document.querySelector(".vspc")
            if (vspc.checked === true) {
                cuadradito[i].addEventListener('click', () => {
                    if (turn === true && cuadradito[i].textContent === ""){
                        currentPlayer = firstPlayer();
                        cuadradito[i].textContent = currentPlayer.getMark()
                        let data = cuadradito[i].getAttribute('data');
                        GameBoard.gameBoard[data] = currentPlayer.getMark()
        
                        function generateRandom() {
                            let randomNumbers = new Array();
                            for(let i=0; i<8; i++)
                            if(cuadradito[i].textContent === "")
                            randomNumbers.push(i);
                            let randomNumber = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];
                            return randomNumber;
                        }

                        let randomNumber = generateRandom();
                        if (cuadradito[randomNumber] === undefined) {
                            winner();
                        } else {
                        cuadradito[randomNumber].textContent = secondPlayer().getMark()
                        let dataRandom = cuadradito[randomNumber].getAttribute('data');
                        GameBoard.gameBoard[dataRandom] = secondPlayer().getMark();
                        winner();
                        }
                    }
            //funcionalidad vs player
            })}else {
            cuadradito[i].addEventListener('click', () => {
                if (turn === true && cuadradito[i].textContent === ""){
                    turn = false
                    currentPlayer = firstPlayer();
                    cuadradito[i].textContent = currentPlayer.getMark()
                    let data = cuadradito[i].getAttribute('data');
                    GameBoard.gameBoard[data] = currentPlayer.getMark()
                    winner();
                    
                } else if (turn === false && cuadradito[i].textContent === "") {
                    turn = true
                    currentPlayer = secondPlayer();
                    cuadradito[i].textContent = currentPlayer.getMark();
                    let data = cuadradito[i].getAttribute('data');
                    GameBoard.gameBoard[data] = currentPlayer.getMark()
                    winner();
        };
        })}}}
        const restart = () => {
            GameBoard.gameBoard = ['','','','','','','','',''];
            turn = true
            const cuadradito = document.querySelectorAll(".cuadradito");
            for (let i = 0; i < cuadradito.length; i++) {
                cuadradito[i].textContent = "";
            }}
    return {playerPlay, restart};
})();
