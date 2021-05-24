const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { name, mark, getName, getMark }
}

const GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    const display = document.querySelector(".display");
    const displayGameBoard = () => {
        while (display.firstChild) {
            display.removeChild(display.firstChild);
        }
        for (let i = 0; i < gameBoard.length; i++) {
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
        for (let i = 0; i < gameBoard.length; i++) {
            const cuadradito = document.createElement('div');
            cuadradito.classList.add("cuadraditoWin");
            cuadradito.textContent = gameBoard[i];
            display.appendChild(cuadradito);
        }
    }

    const start = document.querySelector(".start");
    const restart = document.querySelector(".restart");
    const vspc = document.querySelector(".vspc")
    const vspyer = document.querySelector(".vspyer")
    const nX = document.querySelector(".nX")
    const nO = document.querySelector(".nO")
    const firstName = document.querySelector(".firstName")
    const secondName = document.querySelector(".secondName")

    start.addEventListener("click", () => {
        GameBoard.displayGameBoard();
        GamePlay.playerPlay();
        start.style.cssText = "display: none";
        const primeraParte = document.querySelector(".primeraParte");
        primeraParte.style.cssText = "visibility: hidden"
    })
    restart.addEventListener("click", () => {
        const title = document.querySelector(".title");
        title.textContent = "Tic-Tac-Toe";
        GameBoard.displayGameBoard();
        GamePlay.restart();
        GamePlay.playerPlay();
        restart.style.cssText = "visibility: hidden"
    })
    vspc.addEventListener("change", () => {
        if (vspc.checked === true) {
        vspyer.checked = false;
        } else if (vspc.checked === false) {
            vspyer.checked = true;
        }
        nO.style.cssText = "display: none"
        nX.textContent = "Nombre de Jugador"
        secondName.value = "";
        secondName.style.cssText = "display: none"
    })
    vspyer.addEventListener("change", () => {
        if (vspyer.checked === true) {
        vspyer.checked = false;
        } else if (vspyer.checked === false) {
            vspyer.checked = true;
        }
        nO.style.cssText = "display: block"
        nX.textContent = "Nombre de Jugador X"
        secondName.style.cssText = "display: block"
    })
    return { gameBoard, displayGameBoard, winDisplay };
})();



const GamePlay = (() => {
    const emojiEmpate = String.fromCodePoint(0X1F91D)
    const emojiFirstPlayer = String.fromCodePoint(0X1F920)
    const emojiSecondPlayer = String.fromCodePoint(0X1F638)
    const emojiPC = String.fromCodePoint(0X1F916)
    const reset = document.querySelector(".restart");
    const title = document.querySelector(".title");
    const vspc = document.querySelector(".vspc")
    const firstPlayer = () => {
        const firstName = document.querySelector(".firstName")
        if (firstName.value === "") {
            const firstPlayer = Player("El Jugador", "X");
            return firstPlayer
        } else {
            const firstPlayer = Player(firstName.value, "X");
            return firstPlayer;
        }
    }

    const secondPlayer = () => {
        const secondName = document.querySelector(".secondName")
        if (secondName.value === "" && vspc.checked === false) {
            const secondPlayer = Player("El Jugador", "O");
            return secondPlayer
        } else if (secondName.value === "" && vspc.checked === true) {
            const secondPlayer = Player("La compu", "O");
            return secondPlayer
        } else {
            const secondPlayer = Player(secondName.value, "O");
            return secondPlayer;
        }
    }
    const isEven = (n) => {
        return n % 2 == 0;
    }
    let xWins = 0;
    let oWins = 0;
    const terceraParte = document.querySelector(".terceraParte")
    const xVictorias = document.querySelector(".firstPlayerWins");
    const oVictorias = document.querySelector(".secondPlayerWins");
    const actualizarContador = () => {
        terceraParte.style.cssText = "visibility: visible";
        xVictorias.textContent = `${firstPlayer().getName()} (${firstPlayer().getMark()}) Rondas Ganadas: ${xWins}`
        oVictorias.textContent = `${secondPlayer().getName()} (${secondPlayer().getMark()}) Rondas Ganadas: ${oWins}`
    }
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
            (GameBoard.gameBoard[2] === "X" && GameBoard.gameBoard[4] === "X" && GameBoard.gameBoard[6] === "X")) {
            GameBoard.winDisplay();
            if (firstPlayer().getName() && secondPlayer().getName() === "El Jugador") {
                title.textContent = `Gano Jugador ${firstPlayer().getMark()}! ${emojiFirstPlayer}`
                reset.style.cssText = "visibility: visible";
                xWins = ++xWins
                actualizarContador();
            } else {
                title.textContent = `Gano ${firstPlayer().getName()}! ${emojiFirstPlayer}`
                reset.style.cssText = "visibility: visible";
                xWins = ++xWins
                actualizarContador();
            }
        } else if ((GameBoard.gameBoard[0] === "O" && GameBoard.gameBoard[1] === "O" && GameBoard.gameBoard[2] === "O") ||
            (GameBoard.gameBoard[3] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[5] === "O") ||
            (GameBoard.gameBoard[3] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[5] === "O") ||
            (GameBoard.gameBoard[6] === "O" && GameBoard.gameBoard[7] === "O" && GameBoard.gameBoard[8] === "O") ||
            (GameBoard.gameBoard[0] === "O" && GameBoard.gameBoard[3] === "O" && GameBoard.gameBoard[6] === "O") ||
            (GameBoard.gameBoard[0] === "O" && GameBoard.gameBoard[3] === "O" && GameBoard.gameBoard[6] === "O") ||
            (GameBoard.gameBoard[1] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[7] === "O") ||
            (GameBoard.gameBoard[2] === "O" && GameBoard.gameBoard[5] === "O" && GameBoard.gameBoard[8] === "O") ||
            (GameBoard.gameBoard[0] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[8] === "O") ||
            (GameBoard.gameBoard[2] === "O" && GameBoard.gameBoard[4] === "O" && GameBoard.gameBoard[6] === "O")) {
            GameBoard.winDisplay();
            if (vspc.checked === true) {
                title.textContent = `Gano ${secondPlayer().getName()}! ${emojiPC}`;
                reset.style.cssText = "visibility: visible";
                oWins = ++oWins
                actualizarContador()
            } else if (firstPlayer().getName() && secondPlayer().getName() === "El Jugador") {
                title.textContent = `Gano Jugador ${secondPlayer().getMark()}! ${emojiSecondPlayer}`;
                reset.style.cssText = "visibility: visible";
                oWins = ++oWins
                actualizarContador()
            } else {
                title.textContent = `Gano ${secondPlayer().getName()}! ${emojiSecondPlayer}`;
                reset.style.cssText = "visibility: visible";
                oWins = ++oWins
                actualizarContador()
            }
        } else if (GameBoard.gameBoard[0] !== "" && GameBoard.gameBoard[1] !== "" && GameBoard.gameBoard[2] !== ""
            && GameBoard.gameBoard[3] !== "" && GameBoard.gameBoard[4] !== "" && GameBoard.gameBoard[5] !== ""
            && GameBoard.gameBoard[6] !== "" && GameBoard.gameBoard[7] !== "" && GameBoard.gameBoard[8] !== "") {
            GameBoard.winDisplay();
            reset.style.cssText = "visibility: visible";
            title.textContent = `Empate ${emojiEmpate}`;
        }
    }
    //funcion para tomar turnos y display mark en cuadradito
    let turn = true;
    let rondas = 0
    const playerPlay = () => {
        const cuadradito = document.querySelectorAll(".cuadradito");
        for (let i = 0; i < cuadradito.length; i++) {
            let currentPlayer = firstPlayer();
            const turns = document.querySelector(".turns")
            //funcionalidad vs pc
            const vspc = document.querySelector(".vspc")
            function generateRandom() {
                let randomNumbers = new Array();
                for (let i = 0; i <= 8; i++)
                    if (cuadradito[i].textContent === "")
                        randomNumbers.push(i);
                let randomNumber = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];
                return randomNumber;
            }
            if (vspc.checked === true) {
                if (turn === false) {
                    turn = true;
                    let randomNumber = generateRandom();
                    cuadradito[randomNumber].textContent = secondPlayer().getMark()
                    let dataRandom = cuadradito[randomNumber].getAttribute('data');
                    GameBoard.gameBoard[dataRandom] = secondPlayer().getMark();
                    //vuelve atras un loop
                    //para no perder EventListener
                    i = --i;//
                    /////////
                } else {
                    cuadradito[i].addEventListener('click', () => {
                        if (cuadradito[i].textContent === "") {
                            currentPlayer = firstPlayer();
                            cuadradito[i].textContent = currentPlayer.getMark()
                            let data = cuadradito[i].getAttribute('data');
                            GameBoard.gameBoard[data] = currentPlayer.getMark()

                            let randomNumber = generateRandom();
                            if (cuadradito[randomNumber] === undefined) {
                                winner();
                            }
                            ////////inteligencia AI////////
                            /////ATAQUE/////
                            //linea izquierda vertical ataque 
                            else if (cuadradito[0].textContent === secondPlayer().getMark() && cuadradito[3].textContent === secondPlayer().getMark() && cuadradito[6].textContent === "") {
                                cuadradito[6].textContent = secondPlayer().getMark()
                                let data = cuadradito[6].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            } else if (cuadradito[3].textContent === secondPlayer().getMark() && cuadradito[6].textContent === secondPlayer().getMark() && cuadradito[0].textContent === "") {
                                cuadradito[0].textContent = secondPlayer().getMark()
                                let data = cuadradito[0].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            } else if (cuadradito[0].textContent === secondPlayer().getMark() && cuadradito[6].textContent === secondPlayer().getMark() && cuadradito[3].textContent === "") {
                                cuadradito[3].textContent = secondPlayer().getMark()
                                let data = cuadradito[3].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea central verical ataque
                            } else if (cuadradito[1].textContent === secondPlayer().getMark() && cuadradito[4].textContent === secondPlayer().getMark() && cuadradito[7].textContent === "") {
                                cuadradito[7].textContent = secondPlayer().getMark()
                                let data = cuadradito[7].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            } else if (cuadradito[4].textContent === secondPlayer().getMark() && cuadradito[7].textContent === secondPlayer().getMark() && cuadradito[1].textContent === "") {
                                cuadradito[1].textContent = secondPlayer().getMark()
                                let data = cuadradito[1].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[1].textContent === secondPlayer().getMark() && cuadradito[7].textContent === secondPlayer().getMark() && cuadradito[4].textContent === "") {
                                cuadradito[4].textContent = secondPlayer().getMark()
                                let data = cuadradito[4].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea derecha vertical ataque
                            } else if (cuadradito[2].textContent === secondPlayer().getMark() && cuadradito[5].textContent === secondPlayer().getMark() && cuadradito[8].textContent === "") {
                                cuadradito[8].textContent = secondPlayer().getMark()
                                let data = cuadradito[8].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[5].textContent === secondPlayer().getMark() && cuadradito[8].textContent === secondPlayer().getMark() && cuadradito[2].textContent === "") {
                                cuadradito[2].textContent = secondPlayer().getMark()
                                let data = cuadradito[2].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[2].textContent === secondPlayer().getMark() && cuadradito[8].textContent === secondPlayer().getMark() && cuadradito[5].textContent === "") {
                                cuadradito[5].textContent = secondPlayer().getMark()
                                let data = cuadradito[5].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea primera horizontal ataque
                            } else if (cuadradito[0].textContent === secondPlayer().getMark() && cuadradito[1].textContent === secondPlayer().getMark() && cuadradito[2].textContent === "") {
                                cuadradito[2].textContent = secondPlayer().getMark()
                                let data = cuadradito[2].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[1].textContent === secondPlayer().getMark() && cuadradito[2].textContent === secondPlayer().getMark() && cuadradito[0].textContent === "") {
                                cuadradito[0].textContent = secondPlayer().getMark()
                                let data = cuadradito[0].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[0].textContent === secondPlayer().getMark() && cuadradito[2].textContent === secondPlayer().getMark() && cuadradito[1].textContent === "") {
                                cuadradito[1].textContent = secondPlayer().getMark()
                                let data = cuadradito[1].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea central horizontal ataque
                            } else if (cuadradito[3].textContent === secondPlayer().getMark() && cuadradito[4].textContent === secondPlayer().getMark() && cuadradito[5].textContent === "") {
                                cuadradito[5].textContent = secondPlayer().getMark()
                                let data = cuadradito[5].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[4].textContent === secondPlayer().getMark() && cuadradito[5].textContent === secondPlayer().getMark() && cuadradito[3].textContent === "") {
                                cuadradito[3].textContent = secondPlayer().getMark()
                                let data = cuadradito[3].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[3].textContent === secondPlayer().getMark() && cuadradito[5].textContent === secondPlayer().getMark() && cuadradito[4].textContent === "") {
                                cuadradito[4].textContent = secondPlayer().getMark()
                                let data = cuadradito[4].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea ultima horizontal ataque
                            } else if (cuadradito[6].textContent === secondPlayer().getMark() && cuadradito[7].textContent === secondPlayer().getMark() && cuadradito[8].textContent === "") {
                                cuadradito[8].textContent = secondPlayer().getMark()
                                let data = cuadradito[8].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[6].textContent === secondPlayer().getMark() && cuadradito[8].textContent === secondPlayer().getMark() && cuadradito[7].textContent === "") {
                                cuadradito[7].textContent = secondPlayer().getMark()
                                let data = cuadradito[7].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[7].textContent === secondPlayer().getMark() && cuadradito[8].textContent === secondPlayer().getMark() && cuadradito[6].textContent === "") {
                                cuadradito[6].textContent = secondPlayer().getMark()
                                let data = cuadradito[6].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea cruzada izquierda ataque
                            } else if (cuadradito[0].textContent === secondPlayer().getMark() && cuadradito[4].textContent === secondPlayer().getMark() && cuadradito[8].textContent === "") {
                                cuadradito[8].textContent = secondPlayer().getMark()
                                let data = cuadradito[8].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[4].textContent === secondPlayer().getMark() && cuadradito[8].textContent === secondPlayer().getMark() && cuadradito[0].textContent === "") {
                                cuadradito[0].textContent = secondPlayer().getMark()
                                let data = cuadradito[0].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[0].textContent === secondPlayer().getMark() && cuadradito[8].textContent === secondPlayer().getMark() && cuadradito[4].textContent === "") {
                                cuadradito[4].textContent = secondPlayer().getMark()
                                let data = cuadradito[4].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea cruzada derecha ataque
                            } else if (cuadradito[2].textContent === secondPlayer().getMark() && cuadradito[4].textContent === secondPlayer().getMark() && cuadradito[6].textContent === "") {
                                cuadradito[6].textContent = secondPlayer().getMark()
                                let data = cuadradito[6].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[2].textContent === secondPlayer().getMark() && cuadradito[6].textContent === secondPlayer().getMark() && cuadradito[4].textContent === "") {
                                cuadradito[4].textContent = secondPlayer().getMark()
                                let data = cuadradito[4].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[4].textContent === secondPlayer().getMark() && cuadradito[6].textContent === secondPlayer().getMark() && cuadradito[2].textContent === "") {
                                cuadradito[2].textContent = secondPlayer().getMark()
                                let data = cuadradito[2].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            ////DEFENSA/////
                            //linea izquierda vertical defensa 
                            else if (cuadradito[0].textContent === firstPlayer().getMark() && cuadradito[3].textContent === firstPlayer().getMark() && cuadradito[6].textContent === "") {
                                cuadradito[6].textContent = secondPlayer().getMark()
                                let data = cuadradito[6].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            } else if (cuadradito[3].textContent === firstPlayer().getMark() && cuadradito[6].textContent === firstPlayer().getMark() && cuadradito[0].textContent === "") {
                                cuadradito[0].textContent = secondPlayer().getMark()
                                let data = cuadradito[0].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            } else if (cuadradito[0].textContent === firstPlayer().getMark() && cuadradito[6].textContent === firstPlayer().getMark() && cuadradito[3].textContent === "") {
                                cuadradito[3].textContent = secondPlayer().getMark()
                                let data = cuadradito[3].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea central verical defensa
                            } else if (cuadradito[1].textContent === firstPlayer().getMark() && cuadradito[4].textContent === firstPlayer().getMark() && cuadradito[7].textContent === "") {
                                cuadradito[7].textContent = secondPlayer().getMark()
                                let data = cuadradito[7].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            } else if (cuadradito[4].textContent === firstPlayer().getMark() && cuadradito[7].textContent === firstPlayer().getMark() && cuadradito[1].textContent === "") {
                                cuadradito[1].textContent = secondPlayer().getMark()
                                let data = cuadradito[1].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[1].textContent === firstPlayer().getMark() && cuadradito[7].textContent === firstPlayer().getMark() && cuadradito[4].textContent === "") {
                                cuadradito[4].textContent = secondPlayer().getMark()
                                let data = cuadradito[4].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea derecha vertical defensa
                            } else if (cuadradito[2].textContent === firstPlayer().getMark() && cuadradito[5].textContent === firstPlayer().getMark() && cuadradito[8].textContent === "") {
                                cuadradito[8].textContent = secondPlayer().getMark()
                                let data = cuadradito[8].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[5].textContent === firstPlayer().getMark() && cuadradito[8].textContent === firstPlayer().getMark() && cuadradito[2].textContent === "") {
                                cuadradito[2].textContent = secondPlayer().getMark()
                                let data = cuadradito[2].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[2].textContent === firstPlayer().getMark() && cuadradito[8].textContent === firstPlayer().getMark() && cuadradito[5].textContent === "") {
                                cuadradito[5].textContent = secondPlayer().getMark()
                                let data = cuadradito[5].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea primera horizontal defensa
                            } else if (cuadradito[0].textContent === firstPlayer().getMark() && cuadradito[1].textContent === firstPlayer().getMark() && cuadradito[2].textContent === "") {
                                cuadradito[2].textContent = secondPlayer().getMark()
                                let data = cuadradito[2].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[1].textContent === firstPlayer().getMark() && cuadradito[2].textContent === firstPlayer().getMark() && cuadradito[0].textContent === "") {
                                cuadradito[0].textContent = secondPlayer().getMark()
                                let data = cuadradito[0].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[0].textContent === firstPlayer().getMark() && cuadradito[2].textContent === firstPlayer().getMark() && cuadradito[1].textContent === "") {
                                cuadradito[1].textContent = secondPlayer().getMark()
                                let data = cuadradito[1].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea central horizontal defensa
                            } else if (cuadradito[3].textContent === firstPlayer().getMark() && cuadradito[4].textContent === firstPlayer().getMark() && cuadradito[5].textContent === "") {
                                cuadradito[5].textContent = secondPlayer().getMark()
                                let data = cuadradito[5].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[4].textContent === firstPlayer().getMark() && cuadradito[5].textContent === firstPlayer().getMark() && cuadradito[3].textContent === "") {
                                cuadradito[3].textContent = secondPlayer().getMark()
                                let data = cuadradito[3].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[3].textContent === firstPlayer().getMark() && cuadradito[5].textContent === firstPlayer().getMark() && cuadradito[4].textContent === "") {
                                cuadradito[4].textContent = secondPlayer().getMark()
                                let data = cuadradito[4].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea ultima horizontal defensa
                            } else if (cuadradito[6].textContent === firstPlayer().getMark() && cuadradito[7].textContent === firstPlayer().getMark() && cuadradito[8].textContent === "") {
                                cuadradito[8].textContent = secondPlayer().getMark()
                                let data = cuadradito[8].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[6].textContent === firstPlayer().getMark() && cuadradito[8].textContent === firstPlayer().getMark() && cuadradito[7].textContent === "") {
                                cuadradito[7].textContent = secondPlayer().getMark()
                                let data = cuadradito[7].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[7].textContent === firstPlayer().getMark() && cuadradito[8].textContent === firstPlayer().getMark() && cuadradito[6].textContent === "") {
                                cuadradito[6].textContent = secondPlayer().getMark()
                                let data = cuadradito[6].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea cruzada izquierda defensa
                            } else if (cuadradito[0].textContent === firstPlayer().getMark() && cuadradito[4].textContent === firstPlayer().getMark() && cuadradito[8].textContent === "") {
                                cuadradito[8].textContent = secondPlayer().getMark()
                                let data = cuadradito[8].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[4].textContent === firstPlayer().getMark() && cuadradito[8].textContent === firstPlayer().getMark() && cuadradito[0].textContent === "") {
                                cuadradito[0].textContent = secondPlayer().getMark()
                                let data = cuadradito[0].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[0].textContent === firstPlayer().getMark() && cuadradito[8].textContent === firstPlayer().getMark() && cuadradito[4].textContent === "") {
                                cuadradito[4].textContent = secondPlayer().getMark()
                                let data = cuadradito[4].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                                //linea cruzada derecha defensa
                            } else if (cuadradito[2].textContent === firstPlayer().getMark() && cuadradito[4].textContent === firstPlayer().getMark() && cuadradito[6].textContent === "") {
                                cuadradito[6].textContent = secondPlayer().getMark()
                                let data = cuadradito[6].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[2].textContent === firstPlayer().getMark() && cuadradito[6].textContent === firstPlayer().getMark() && cuadradito[4].textContent === "") {
                                cuadradito[4].textContent = secondPlayer().getMark()
                                let data = cuadradito[4].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            else if (cuadradito[4].textContent === firstPlayer().getMark() && cuadradito[6].textContent === firstPlayer().getMark() && cuadradito[2].textContent === "") {
                                cuadradito[2].textContent = secondPlayer().getMark()
                                let data = cuadradito[2].getAttribute('data');
                                GameBoard.gameBoard[data] = secondPlayer().getMark();
                                winner();
                            }
                            //movimiento random
                            else {
                                cuadradito[randomNumber].textContent = secondPlayer().getMark()
                                let dataRandom = cuadradito[randomNumber].getAttribute('data');
                                GameBoard.gameBoard[dataRandom] = secondPlayer().getMark();
                                winner();
                            }
                            ////////inteligencia AI////////
                        }

                    })
                }
                //funcionalidad vs player

            } else {
                if (isEven(rondas) === true) {
                    title.textContent = `Turno de ${firstPlayer().getName()} (${firstPlayer().getMark()})`
                }
                else if (isEven(rondas) === false) {
                    title.textContent = `Turno de ${secondPlayer().getName()} (${secondPlayer().getMark()})`
                }
                cuadradito[i].addEventListener('click', () => {
                    if (turn === true && cuadradito[i].textContent === "") {
                        turn = false
                        title.textContent = `Turno de ${secondPlayer().getName()} (${secondPlayer().getMark()})`
                        currentPlayer = firstPlayer();
                        cuadradito[i].textContent = currentPlayer.getMark()
                        let data = cuadradito[i].getAttribute('data');
                        GameBoard.gameBoard[data] = currentPlayer.getMark()
                        winner();

                    } else if (turn === false && cuadradito[i].textContent === "") {
                        turn = true
                        title.textContent = `Turno de ${firstPlayer().getName()} (${firstPlayer().getMark()})`
                        currentPlayer = secondPlayer();
                        cuadradito[i].textContent = currentPlayer.getMark();
                        let data = cuadradito[i].getAttribute('data');
                        GameBoard.gameBoard[data] = currentPlayer.getMark()
                        winner();
                    };
                })
            }
        }
    }
    const restart = () => {
        GameBoard.gameBoard = ['', '', '', '', '', '', '', '', ''];

        if (isEven(rondas) === true) {
            turn = false;
            rondas = ++rondas
        } else {
            turn = true;
            rondas = ++rondas
        }
        const cuadradito = document.querySelectorAll(".cuadradito");
        for (let i = 0; i < cuadradito.length; i++) {
            cuadradito[i].textContent = "";
        }
    }
    return { playerPlay, restart };
})();
