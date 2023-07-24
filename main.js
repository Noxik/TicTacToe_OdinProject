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
    const startBoard = [0,1,2,3,4,5,6,7,8];

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

    return {board: startBoard, playerOneIn, playerTwoIn, playerOneDiv, playerTwoDiv, whoPlay}
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
            gameFlow.winner = "XO"    
        }
        
    //   console.log(123, gameFlow.winner)
    
    }    
        
        function aiMove() {
            const random = Math.floor(Math.random() * gameBoard.board.length);
                
                if (["X", "O"].includes(gameBoard.board[random]) === true) {
                //    console.log(random, gameBoard.board[random]);
                    aiMove ()
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
    
    
        function playAgain() {
            gameFlow.winner = undefined
            gameBoard.board = [0,1,2,3,4,5,6,7,8];
        
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
                if (gameBoard.whoPlay === "pve" && document.querySelector("select").value === "dumb") {
                    setTimeout(() => {
                        aiMove();
                        gameFlow.result.textContent = "Now O turn"
                    }, 500);
                    } else if (gameBoard.whoPlay === "pve" && document.querySelector("select").value === "hard") {
                    console.log("again Godmode :)");
                   
                    setTimeout(() => {
                    let place = gameFlow.minimax(gameBoard.board, "X").index
        gameBoard.board[place] = "X";
        displayController.boardDiv[place].textContent = "X";
        displayController.boardDiv[place].disabled = true;
        displayController.playerMark = "O";
        displayController.turn++;
        gameBoard.playerTwoDiv.parentElement.style.backgroundColor =""
        gameBoard.playerOneDiv.parentElement.style.backgroundColor ="#25bbf5";
        result.textContent = "Now O turn"}, 500);
                    }
            } else {
                displayController.turn = 0;
                gameBoard.playerOneDiv.parentElement.style.backgroundColor ="#25bbf5";
                result.textContent = "Now O turn"
            }
        }
    
        var huPlayer = "O";
        var aiPlayer = "X";

        function emptyIndexies(board){
            return  board.filter(s => s != "O" && s != "X");
          }
        
          // winning combinations using the board indexies
          function winning(board, player){
           if (
           (board[0] == player && board[1] == player && board[2] == player) ||
           (board[3] == player && board[4] == player && board[5] == player) ||
           (board[6] == player && board[7] == player && board[8] == player) ||
           (board[0] == player && board[3] == player && board[6] == player) ||
           (board[1] == player && board[4] == player && board[7] == player) ||
           (board[2] == player && board[5] == player && board[8] == player) ||
           (board[0] == player && board[4] == player && board[8] == player) ||
           (board[2] == player && board[4] == player && board[6] == player)
           ) {
           return true;
           } else {
           return false;
           }
          }
        
          function minimax(newBoard, player){
          
            //available spots
            var availSpots = emptyIndexies(newBoard);
        
            if (winning(newBoard, huPlayer)){
                return {score:-10};
             }
               else if (winning(newBoard, aiPlayer)){
               return {score:10};
               }
             else if (availSpots.length === 0){
                 return {score:0};
             }
        
             // an array to collect all the objects
          var moves = [];
        
          // loop through available spots
          for (var i = 0; i < availSpots.length; i++){
            //create an object for each and store the index of that spot 
            var move = {};
              move.index = newBoard[availSpots[i]];
        
            // set the empty spot to the current player
            newBoard[availSpots[i]] = player;
        
            //collect the score resulted from calling minimax  on the opponent of the current player
            if (player == aiPlayer){
              var result = minimax(newBoard, huPlayer);
              move.score = result.score;
            }
            else{
              var result = minimax(newBoard, aiPlayer);
              move.score = result.score;
            }
        
            // reset the spot to empty
            newBoard[availSpots[i]] = move.index;
        
            // push the object to the array
            moves.push(move);
          }
        
          var bestMove;
          if(player === aiPlayer){
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++){
              if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
              }
            }
          }else{
        
        // else loop over the moves and choose the move with the lowest score
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++){
              if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
              }
            }
          }
        
        // return the chosen move (object) from the moves array
        
          return moves[bestMove];
        }
    return {playAgain, checkWinner, aiMove, minimax, result, winner}
    })()

const displayController = (() => {
let turn = 0
let playerMark = "O"
gameFlow.result.textContent = "Now O turn"
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
        
        displayController.turn++

        gameFlow.checkWinner()

    //AI move after player click
    // DUMB mode
    if (gameBoard.whoPlay === "pve" && document.querySelector("select").value === "dumb" && gameFlow.winner === undefined) {
    console.log("dumb AF");
    // disable clicking inside boardgame to prevent multiple player moves;
    document.getElementById("boardgame").style.pointerEvents = "none";
    
    setTimeout(() => {
        gameFlow.aiMove();

    // activate clicking boardgame after AI make move
            document.getElementById("boardgame").style.pointerEvents = "auto"
            gameFlow.result.textContent = "Now O turn"
          }, 800);
        
    gameFlow.checkWinner()
    }

    // GODMODE
    if (gameBoard.whoPlay === "pve" && document.querySelector("select").value === "hard" && gameFlow.winner === undefined) {         
        console.log("GODMODE!");
    setTimeout(() => {
            let place = gameFlow.minimax(gameBoard.board, "X").index
        gameBoard.board[place] = "X";
        displayController.boardDiv[place].textContent = "X";
        displayController.boardDiv[place].disabled = true;
        displayController.playerMark = "O";
        displayController.turn++;
        gameBoard.playerTwoDiv.parentElement.style.backgroundColor =""
        gameBoard.playerOneDiv.parentElement.style.backgroundColor ="#25bbf5"
        gameFlow.result.textContent = "Now O turn"
        gameFlow.checkWinner()   
    }, 800);
     
        
    } 
        
        }
    )})
    
return {boardDiv, playerMark, turn}
})()



/* AI from https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/

var testb = ["O",1,"X","X",4,"X",6,"O","O"];
var testc = ['O', 'X', 2, 3, 'X', 5, 6, 7, 'O'];
var testd = ["O",1,2,"X","O","X", "X", 7,8];
var huPlayer = "O";
var aiPlayer = "X";


//check if board have empty fields:
function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
  }

  // winning combinations using the board indexies
  function winning(board, player){
   if (
   (board[0] == player && board[1] == player && board[2] == player) ||
   (board[3] == player && board[4] == player && board[5] == player) ||
   (board[6] == player && board[7] == player && board[8] == player) ||
   (board[0] == player && board[3] == player && board[6] == player) ||
   (board[1] == player && board[4] == player && board[7] == player) ||
   (board[2] == player && board[5] == player && board[8] == player) ||
   (board[0] == player && board[4] == player && board[8] == player) ||
   (board[2] == player && board[4] == player && board[6] == player)
   ) {
   return true;
   } else {
   return false;
   }
  }

  function minimax(newBoard, player){
  
    //available spots
    var availSpots = emptyIndexies(newBoard);

    if (winning(newBoard, huPlayer)){
        return {score:-10};
     }
       else if (winning(newBoard, aiPlayer)){
       return {score:10};
       }
     else if (availSpots.length === 0){
         return {score:0};
     }

     // an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot 
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //collect the score resulted from calling minimax  on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    // reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the moves array

  return moves[bestMove];
}
*/