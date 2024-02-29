const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
  gameController.start();
});
const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', () => {
  gameController.restart();
});
let gameboard = document.querySelector('#gameboard');

function checkWinner(board){
  const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i=0; i<wins.length; i++){
    const [a,b,c] = wins[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      return true;
    } 
  }
  return false;
}

// IIFE
const Gameboard = (()=>{
  let board = ['','','','','','','','','']

  function render(){
    board.forEach((square, index)=>{
      newTile = document.createElement('div');
      newTile.classList.add("square");
      newTile.id = `${index}`;
      newTile.textContent = `${square}`;
      gameboard.appendChild(newTile);
    })
  }

  function update(index, value){
    if (board[index] !== '') return;
    board[index] = value;
    clear(gameboard)
    render();
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => {
      square.addEventListener('click', gameController.handleClick)
    })
  }

  function clear(parent){
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
  }
  }
  
  // indirectly return gameboard 
  const getGameboard = () => gameboard;

  return {
    render,
    update,
    getGameboard
  }

})();

// IIFE with factory called
const gameController = (()=>{
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  function start() {
    players = [
      createPlayer(document.querySelector('#player-one').value, 'X'),
      createPlayer(document.querySelector('#player-two').value, 'O')
    ]

    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render()
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => {
      square.addEventListener('click', handleClick)
    })
  }

  function handleClick(event){
    let index = parseInt(event.target.id);
    Gameboard.update(index, players[currentPlayerIndex].marker);
    
    if (checkWinner(Gameboard.getGameboard), players[currentPlayerIndex].mark){
      gameOver = true;
      document.querySelector('#winner').textContent = `${players[currentPlayerIndex].name} won`
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  function restart(){
    //
  }

  return {
    start,
    handleClick, 
    restart
  }

})();

// factory
const createPlayer = (name, marker) => {
  return {
    name,
    marker
  }
}