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



let rows = [[],[],[]] // musi byc na zewnatrz! jak jest w srodku to zeruje array
let cols = [[],[],[]]
let bothX = [[],[]]
let playerMark = "O"
//ACCESS TO BOARD DIVs
const boardDiv = document.querySelectorAll(".field");
boardDiv.forEach( function(e) {
    e.addEventListener("click", () => {
//        console.log(e.id)
    gameboard.board[e.id-1] = playerMark

// SEPARATE ROWS FROM GAMEBOARD
if (e.id-1 < 3) {
   rows[0].push(playerMark)
} else if (e.id-1 < 6) {
    rows[1].push(playerMark)
} else {rows[2].push(playerMark)}


if ([1,4,7].includes(Number(e.id))) {
    cols[0].push(playerMark)
} else if ([2,5,8].includes(Number(e.id))) {
    cols[1].push(playerMark)
} else {
    cols[2].push(playerMark)
}

if ([1,9].includes(Number(e.id))) {
    bothX[0].push(playerMark)
} else if ([3,7].includes(Number(e.id)))
{bothX[1].push(playerMark)}
else if (5 === (Number(e.id)))
{bothX[0].push(playerMark);
    bothX[1].push(playerMark)}
    console.log(bothX)

checkWin(rows)
checkWin(cols)
checkWin(bothX)


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

// ROWS DZIELI ARR ZANIM SIE ZAPELNIA, PO KAZDYM DODANIU X LUB O, TRZEBA TO ZMIENIC
// GAMEBOARD MUSI BYC SPRAWDZANY PO KLIKU CZY JEDEN Z ROW MA 3


// we can use only 1 function to check rows and cols :)
function checkWin(arr) {
    for (let i=0; i<arr.length; i++) {
        if (arr[i].length === 3) {
        let check = arr[i].every(element => element === arr[i][0])
        if (check) {
            console.log(`player ${arr[i][0]} win ${arr[i]}`);
            boardDiv.forEach(e => e.disabled = true) //DISABLE BUTTONS IF WIN
                }
            } 
        } 
    } 
/*
function checkRows() {
    for (let i=0; i<rows.length; i++) {
        if (rows[i].length === 3) {
        let check = rows[i].every(element => element === rows[i][0])
        if (check === true) {
            console.log(`player ${rows[i][0]} win r`);
            boardDiv.forEach(e => e.disabled = true) //DISABLE BUTTON IF WIN
                }
            }
        }
    } 
      
function checkCols() {
        for (let i=0; i<cols.length; i++) {
            if (cols[i].length === 3) {
            let check = cols[i].every(element => element === cols[i][0])
            if (check === true) {
                console.log(`player ${cols[i][0]} win c`);
                boardDiv.forEach(e => e.disabled = true) //DISABLE BUTTON IF WIN
                    }
                }
            }
        } 
    

    /*    for (let i=0; i<9; i++) {
            if (i<3) {
                console.log(3)
        } else if (i<6) {
            console.log(6)
        } else {
        console.log(9)}
            console.log(gameboard.board)
        } */