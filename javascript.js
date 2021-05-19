const GameBoard = (() => {
    let gameBoard = ['O','O','O','O','O','O','O','O','O'];
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
    const playerPlay = () => {
        const cuadradito = document.querySelectorAll(".cuadradito");
        for (let i = 0; i < cuadradito.length; i++) {
            cuadradito[i].addEventListener('click', () => {
                cuadradito[i].textContent = Sebas.getMark();
                let data = cuadradito[i].getAttribute('data');
                GameBoard.gameBoard[data] = Sebas.getMark();
        }
 )}}
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