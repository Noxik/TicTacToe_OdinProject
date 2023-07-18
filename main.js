let players = document.getElementById("players")
let playerOneIn = document.getElementById("p1")
let playerTwoIn = document.getElementById("p2")
let playerOneName = document.getElementById("player1name")
let playerTwoName = document.getElementById("player2name")
let start = document.getElementById("start")
let mainboard = document.getElementById("mainboard")
let result = document.getElementById("result")
let playAgainBtn = document.getElementById("playAgain")

const Player = (name) => {
    const sayName = () => console.log(`Hello ${name}!`)
    return {sayName}
}

playAgainBtn.addEventListener("click", playAgain)

start.addEventListener("click", () => {
players.style.display = "none";
mainboard.style.display = "grid";
})

document.getElementById("start").addEventListener("click", () => {
    let p1name = document.createElement("p");
    p1name.textContent = playerOneIn.value;
    playerOneName.appendChild(p1name)

    let p2name = document.createElement("p");
    p2name.textContent = playerTwoIn.value;
    playerTwoName.appendChild(p2name)

    const player1 = Player(playerOneIn.value)
    player1.sayName();
    const player2 = Player(playerTwoIn.value)
    player2.sayName()

      playerOneName.parentElement.style.backgroundColor ="#25bbf5";
})

const gameBoard  =  (()=>{
    const board = [1,2,3,4,5,6,7,8,9];
    return {board}
})()

let turn = 0
let playerMark = "O"
//ACCESS TO BOARD DIVs
const boardDiv = document.querySelectorAll(".field");
boardDiv.forEach( function(e) {
    e.addEventListener("click", () => {
//        console.log(e.id)
    gameBoard.board[e.id-1] = playerMark


//added color to player turn
if (turn %2 !== 0) {
    playerOneName.parentElement.style.backgroundColor ="#25bbf5";
    playerTwoName.parentElement.style.backgroundColor ="";
    result.textContent = "Now O turn"
} else {
    playerTwoName.parentElement.style.backgroundColor ="#25bbf5";
    playerOneName.parentElement.style.backgroundColor ="";
    result.textContent = "Now X turn"
}
turn++

//change mark after click
    if (e.textContent === "") {
    e.textContent = playerMark;}
    if(playerMark === "O") {
    playerMark = "X"
    } else {playerMark = "O"}    
    e.disabled = true
    //we need switch players
    checkWinner()
}
)})

function checkWinner() {
    let winFields = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]]
    
    let winner

    for (let i=0; i<winFields.length; i++) {
        if (gameBoard.board[winFields[i][0]] == gameBoard.board[winFields[i][1]] 
        && gameBoard.board[winFields[i][0]] == gameBoard.board[winFields[i][2]]) {

// change background-color of win fields (under O or X marks)
    for (let j=0; j<winFields[i].length; j++) {
        boardDiv[winFields[i][j]].style.backgroundColor = "#7fffd4"
        }
        winner = gameBoard.board[winFields[i][0]];
        boardDiv.forEach(e => e.disabled = true);  

       

        if (winner === "O") {
            result.textContent = `Player 1 ${playerOneIn.value} won!!`;
            playerOneName.parentElement.style.backgroundColor ="#7fffd4"
            playerTwoName.parentElement.style.backgroundColor =""
        } else {
            result.textContent = `Player 2 ${playerTwoIn.value} won!!`;
            playerTwoName.parentElement.style.backgroundColor ="#7fffd4"
            playerOneName.parentElement.style.backgroundColor =""
        }
    }
}

    if (gameBoard.board.every(elem => ["O","X"].indexOf(elem) > -1) 
        && winner === undefined) {
    console.log("tie");
    result.textContent = "It's Tie! Play again :)";
    playerTwoName.parentElement.style.backgroundColor ="";
    playerOneName.parentElement.style.backgroundColor ="";   
    }

}    

function playAgain() {
    winner = undefined
    turn = 0;
    gameBoard.board = [1,2,3,4,5,6,7,8,9];
    result.textContent = ""

    playerOneName.parentElement.style.backgroundColor =""
    playerTwoName.parentElement.style.backgroundColor =""

    let buttons = document.querySelectorAll("button")
    for (let i=0; i<buttons.length; i++) {
        buttons[i].disabled = false
    }
    let fields = document.querySelectorAll(".field");
    for (let i=0; i<fields.length; i++) {
        fields[i].textContent = ""
    }

    for (let i=0; i<boardDiv.length; i++) {
        boardDiv[i].style.backgroundColor = ""
    }

    if (playerMark === "X") {
        turn = 1;
        playerTwoName.parentElement.style.backgroundColor ="#25bbf5";
        result.textContent = "Now X turn"
    } else {
        turn = 0;
        playerOneName.parentElement.style.backgroundColor ="#25bbf5";
        result.textContent = "Now O turn"
    }
}