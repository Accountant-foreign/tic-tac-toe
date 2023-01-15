let gameBoard=(function(){
    let gameBoard=[
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ]
    return gameBoard;
})();

let player=function(player, marker){
    return {player, marker};
};

const counterCreator = () => {
    let count = 0;
    return () => {
      count++;
      return count;
    };
  };

const counter = counterCreator();

let createBoard=(function(){
    let cells=document.getElementsByClassName('cell');
    let cellMarker=document.createElement('div');
    let restartButton=document.getElementById('restart');

    for(let i=0; i<9; i++){
        let clonedCellMarker=cellMarker.cloneNode(true);
        clonedCellMarker.className=`${gameBoard[i]}`;
        cells[i].append(clonedCellMarker);
    }

    restartButton.setAttribute('onclick', 'location.reload()');
})();

let createPlayers=(function () {

    let playerX=player('one', 'X');
    let playerY=player('two', 'O');

    return {playerX, playerY};
})();

let markDown=(function(){
    let cells=Array.from(document.getElementsByClassName('cell'));
    let span=document.getElementById('getClass');
    let currentPlayer="";

    cells.forEach(cell => {
        cell.addEventListener('mousedown', ()=>{
            let claSS=Number(cell.firstChild.className);

            if(Number.isInteger(claSS)) {
                let playerTurn=counter();

                if(playerTurn%2==1){
                    cell.firstChild.className=createPlayers.playerX.marker;
                    gameBoard[claSS-1]=createPlayers.playerX.marker;
                    span.textContent=createPlayers.playerY.marker;
                    currentPlayer=createPlayers.playerX.marker;
                } 
                else {
                    cell.firstChild.className=createPlayers.playerY.marker;
                    gameBoard[claSS-1]=createPlayers.playerY.marker;
                    span.textContent=createPlayers.playerX.marker;
                    currentPlayer=createPlayers.playerY.marker;
                }
            }
        });

        cell.addEventListener('mouseup', ()=>{

            const isStringsArray =gameBoard.every(i => typeof i === "string")

            if(gameBoard[0]==gameBoard[1]&&gameBoard[1]==gameBoard[2]||gameBoard[3]==gameBoard[4]&&gameBoard[4]==gameBoard[5]||gameBoard[6]==gameBoard[7]&&gameBoard[7]==gameBoard[8]){
                span.parentElement.innerHTML="Player "+currentPlayer+" wins!";
                document.body.innerHTML=document.body.innerHTML;
            }
            if(gameBoard[0]==gameBoard[3]&&gameBoard[3]==gameBoard[6]||gameBoard[1]==gameBoard[4]&&gameBoard[4]==gameBoard[7]||gameBoard[6]==gameBoard[7]&&gameBoard[7]==gameBoard[8]){
                span.parentElement.innerHTML="Player "+currentPlayer+" wins!";
                document.body.innerHTML=document.body.innerHTML;
            }
            if(gameBoard[0]==gameBoard[4]&&gameBoard[4]==gameBoard[8]||gameBoard[2]==gameBoard[4]&&gameBoard==gameBoard[6]){
                span.parentElement.innerHTML="Player "+currentPlayer+" wins!";
                document.body.innerHTML=document.body.innerHTML;
            }
            if(isStringsArray){
                try {
                    span.parentElement.innerHTML="The game is a tie...";
                } 
                catch (error) {
                    
                }
                document.body.innerHTML=document.body.innerHTML;
            }
        })
    });
})();