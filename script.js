const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
  gameController.start();
});
const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', () => {
  gameController.restart();
});
const gameboard = document.querySelector('#gameboard')
const winner = document.querySelector('#winner')

const Gameboard = (()=>{
  let board = ['','','','','','','','','']

  function render(){
    board.forEach((square, index)=>{
      square = document.createElement('div');
      square.classList.add('square');
      square.id = `${index}`;
      square.addEventListener('click', gameController.handleClick)
      gameboard.appendChild(square)
    })
  }

  function update(index, value, target){
    board[index] = value;
    target.textContent = value;
  }

  function clear(){
    while (gameboard.lastChild) {
      gameboard.removeChild(gameboard.lastChild);
  }
  }

  const getGameboard = () => board;

  return {
    render, 
    update,
    clear,
    getGameboard
  }
})();

const gameController = (()=>{
   let players = [];
   let currentPlayerIndex;
   let gameOver;

   function start(){
    if (Gameboard.getGameboard().some(square => square !== '')) return;
    players = [
      createPlayer(document.querySelector('#player-one').value, 'X'),
      createPlayer(document.querySelector('#player-two').value, 'O')
    ]
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();

   }

   function handleClick(event){
    if (gameOver) return;
    let index = parseInt(event.target.id);
    
    if (Gameboard.getGameboard()[index] !== '') return;
    Gameboard.update(index, players[currentPlayerIndex].marker, event.target)

    if (checkWinner(Gameboard.getGameboard(), players[currentPlayerIndex].marker)){
      gameOver = true;
      displayController.displayWinner(`${players[currentPlayerIndex].name} won!`)
    } else if (checkTie(Gameboard.getGameboard())){
      gameOver = true;
      displayController.displayWinner("It's a tie.")
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
   }

   function checkWinner(board){
    const winTypes = 
    [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for (i = 0; i < winTypes.length; i++){
      const [a,b,c] = winTypes[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]){
        return true;
      }
    }
    return false;
  }

  function checkTie(board){
    if (board.every(square => square !== '')) return true;
  }

   function restart(){
    for (i =0; i <9; i++){
      Gameboard.update(i, '', '');
    }
    Gameboard.clear();
    Gameboard.render();
    gameOver = false;
    winner.textContent = ''
   }

   return {
    start,
    handleClick,
    restart
   }
})();

const displayController = (()=>{

  function displayWinner(winningPlayer){
    winner.textContent = winningPlayer
  }

  return {displayWinner}
})();


const createPlayer = (name, marker) => {
  return {
    name,
    marker
  }
}