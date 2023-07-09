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
    const board = [];
    return {board}
})()



let playerMark = "1"
//ACCESS TO BOARD DIVs
const boardDiv = document.querySelectorAll(".field");
boardDiv.forEach( function(e) {
    e.addEventListener("click", () => {
        console.log(e.id, e.textContent)
   
    if (e.textContent === "") {
    e.textContent = playerMark;}
    
    if(playerMark === "1") {
    playerMark = "X"
    } else {playerMark = "1"}    
    console.log(playerMark)
    gameboard.board[e.id-1] = playerMark
    console.log(gameboard.board)
    e.disabled = true

    //we need switch players
}
    )})