const Player = (name) => {
    const sayName = () => console.log(`Hello ${name}!`)
    console.log(name)
    return {sayName, name}
}

const gameBoard  =  (()=>{
//DOM
let playerOneIn = document.getElementById("p1")
let playerTwoIn = document.getElementById("p2")
let playerOneDiv = document.getElementById("player1name")
let playerTwoDiv = document.getElementById("player2name")

//AI
let playerAiIn = document.getElementById("p1vai")

let whoPlay
//create board   
    const board = [1,2,3,4,5,6,7,8,9];

//start players setting
    document.getElementById("startpvp").addEventListener("click", () => {
        document.getElementById("players").style.display = "none";
        document.getElementById("mainboard").style.display = "grid";
        let p1name = document.createElement("p");
        p1name.textContent = playerOneIn.value;
        playerOneDiv.appendChild(p1name)
    
        let p2name = document.createElement("p");
        p2name.textContent = playerTwoIn.value;
        playerTwoDiv.appendChild(p2name)
    
        const player1 = Player(playerOneIn.value)
        player1.sayName();
        const player2 = Player(playerTwoIn.value)
        player2.sayName()
    
        playerOneDiv.parentElement.style.backgroundColor ="#25bbf5";

        gameBoard.whoPlay = "pvp"
    })

//AI start settings
document.getElementById("startpve").addEventListener("click", () => {
    document.getElementById("players").style.display = "none";
    document.getElementById("mainboard").style.display = "grid";
    let p1name = document.createElement("p");
    p1name.textContent = playerAiIn.value;
    playerOneDiv.appendChild(p1name)

    let p2name = document.createElement("p");
    p2name.textContent = `AI level: ${document.querySelector("select").value}`;
    playerTwoDiv.appendChild(p2name)

    const player1 = Player(playerAiIn.value)
    player1.sayName();
    const player2 = Player(document.querySelector("select").value)
    player2.sayName()

    playerOneDiv.parentElement.style.backgroundColor ="#25bbf5";
    
    gameBoard.whoPlay = "pve"
})

    return {board, playerOneIn, playerTwoIn, playerOneDiv, playerTwoDiv, whoPlay}
})()

const displayController = (() => {
let turn = 0
let playerMark = "O"
//ACCESS TO BOARD DIVs
const boardDiv = document.querySelectorAll(".field");

boardDiv.forEach( function(e) {
    e.addEventListener("click", () => {
    
//        console.log(e.id)
    gameBoard.board[e.id-1] = displayController.playerMark
console.log(displayController.turn)
//added color to player turn
  
    if (displayController.turn %2 !== 0) {
        gameBoard.playerOneDiv.parentElement.style.backgroundColor ="#25bbf5";
        gameBoard.playerTwoDiv.parentElement.style.backgroundColor ="";
        gameFlow.result.textContent = "Now O turn"
    } else {
        gameBoard.playerOneDiv.parentElement.style.backgroundColor ="";
        gameBoard.playerTwoDiv.parentElement.style.backgroundColor ="#25bbf5";
        gameFlow.result.textContent = "Now X turn"
    }
        
    //change mark after click
        if (e.textContent === "") {
        e.textContent = displayController.playerMark;}
        if(displayController.playerMark === "O") {
            displayController.playerMark = "X";    
        } else {displayController.playerMark = "O"}    
        e.disabled = true
        //we need switch players
        
        displayController.turn++

        gameFlow.checkWinner()

    //AI move after click
    if (gameBoard.whoPlay === "pve" && gameFlow.winner === undefined) {         
            setTimeout(() => {
                test();
              }, 500);
        }
        }
    )})
    
return {boardDiv, playerMark, turn}
})()

const gameFlow = (() => {

let winner

document.getElementById("playAgain").addEventListener("click", playAgain)
    let result = document.getElementById("result")
    function checkWinner() {
        let winFields = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]]
        
       
    
        for (let i=0; i<winFields.length; i++) {
            if (gameBoard.board[winFields[i][0]] == gameBoard.board[winFields[i][1]] 
            && gameBoard.board[winFields[i][0]] == gameBoard.board[winFields[i][2]]) {
    
    // change background-color of win fields (under O or X marks)
        for (let j=0; j<winFields[i].length; j++) {
            displayController.boardDiv[winFields[i][j]].style.backgroundColor = "#7fffd4"
            }
            gameFlow.winner = gameBoard.board[winFields[i][0]];
            displayController.boardDiv.forEach(e => e.disabled = true);  
    
            if (gameFlow.winner === "O") {
                result.textContent = `Player O ${gameBoard.playerOneIn.value} won!!`;
                gameBoard.playerOneDiv.parentElement.style.backgroundColor ="#7fffd4"
                gameBoard.playerTwoDiv.parentElement.style.backgroundColor =""
            } else {
                result.textContent = `Player X ${gameBoard.playerTwoIn.value} won!!`;
                gameBoard.playerTwoDiv.parentElement.style.backgroundColor ="#7fffd4"
                gameBoard.playerOneDiv.parentElement.style.backgroundColor =""
            }
        }
    }
    
        if (gameBoard.board.every(elem => ["O","X"].indexOf(elem) > -1) 
            && gameFlow.winner === undefined) {
        console.log("tie");
        result.textContent = "It's Tie! Play again :)";
        gameBoard.playerTwoDiv.parentElement.style.backgroundColor ="";
        gameBoard.playerOneDiv.parentElement.style.backgroundColor ="";   
        }
    }    
    
    function playAgain() {
        gameFlow.winner = undefined
        gameBoard.board = [1,2,3,4,5,6,7,8,9];
    
        // clear players name divs
        gameBoard.playerOneDiv.parentElement.style.backgroundColor =""
        gameBoard.playerTwoDiv.parentElement.style.backgroundColor =""
    
        // clear board
        for (let i=0; i<displayController.boardDiv.length; i++) {
            displayController.boardDiv[i].style.backgroundColor = "";
            displayController.boardDiv[i].textContent = ""
            displayController.boardDiv[i].disabled = false;
        }
    
        // rule who have turn in next game
        if (displayController.playerMark === "X") {
            displayController.turn = 1;
            gameBoard.playerTwoDiv.parentElement.style.backgroundColor ="#25bbf5";
            result.textContent = "Now X turn"
         
        // AI move after play again if O win or started previous game
            setTimeout(() => {
                test();
              }, 1000);
        
        } else {
            displayController.turn = 0;
            gameBoard.playerOneDiv.parentElement.style.backgroundColor ="#25bbf5";
            result.textContent = "Now O turn"
        }
    }

return {playAgain, checkWinner, result, winner}
})()

function test() {
    const random = Math.floor(Math.random() * gameBoard.board.length);
        
        if (["X", "O"].includes(gameBoard.board[random]) === true) {
        //    console.log(random, gameBoard.board[random]);
            test ()
        } else {
        //    console.log(random, gameBoard.board[random]);
            gameBoard.board[random] = "X"
            displayController.boardDiv[random].textContent = "X";
            displayController.boardDiv[random].disabled = true;
            displayController.playerMark = "O";
            displayController.turn++;
            gameBoard.playerTwoDiv.parentElement.style.backgroundColor =""
            gameBoard.playerOneDiv.parentElement.style.backgroundColor ="#25bbf5"
        }
        gameFlow.checkWinner()

    }