let playerOneIn = document.getElementById("p1")
let playerTwoIn = document.getElementById("p2")
let playerOneName = document.getElementById("player1")
let playerTwoName = document.getElementById("player2")

const Player = (name) => {
    const sayName = () => console.log(`Hello ${name}!`)
    return {sayName}
}

document.getElementById("start").addEventListener("click", () => {
    let p1name = document.createElement("p");
    p1name.textContent = playerOneIn.value;
    playerOneName.appendChild(p1name)

    let p2name = document.createElement("p");
    p2name.textContent = playerTwoIn.value;
    playerTwoName.appendChild(p2name)

    let player1 = Player(playerOneIn.value)
    player1.sayName();
    let player2 = Player(playerTwoIn.value)
    player2.sayName()
})

const gameboard  =  (()=>{
    const board = [1,2,3,4,5,6,7,8,9];
    return {board}
})()


let playerMark = "O"
//ACCESS TO BOARD DIVs
const boardDiv = document.querySelectorAll(".field");
boardDiv.forEach( function(e) {
    e.addEventListener("click", () => {
//        console.log(e.id)
    gameboard.board[e.id-1] = playerMark

checkWinner()

//change mark after click
    if (e.textContent === "") {
    e.textContent = playerMark;}
    if(playerMark === "O") {
    playerMark = "X"
    } else {playerMark = "O"}    
//    console.log(playerMark)
//    console.log(gameboard.board)
    e.disabled = true
    //we need switch players
    }
)})

function checkWinner() {
    let test = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]]

 for (let i=0; i<test.length; i++) {
        if (gameboard.board[test[i][0]] == gameboard.board[test[i][1]] && gameboard.board[test[i][0]] == gameboard.board[test[i][2]]) {
            console.log(test[i]);
            console.log(gameboard.board[test[i][0]])
            boardDiv.forEach(e => e.disabled = true)}
   
} 
}    
