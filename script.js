const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
  gameController.start();
});
const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', () => {
  gameController.restart();
});
const gameboard = document.querySelector('#gameboard')

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

  const getGameboard = () => board;

  return {
    render, 
    update,
    getGameboard
  }
})();

const gameController = (()=>{
   let players = [];
   let currentPlayerIndex;
   let gameOver;

   function start(){
    players = [
      createPlayer(document.querySelector('#player-one').value, 'X'),
      createPlayer(document.querySelector('#player-two').value, 'O')
    ]
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();

   }

   function handleClick(event){
    let index = parseInt(event.target.id);
    
    if (Gameboard.getGameboard()[index] !== '') return;
    Gameboard.update(index, players[currentPlayerIndex].marker, event.target)
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
   }

   return {
    start,
    handleClick
   }
})();

// factory
const createPlayer = (name, marker) => {
  return {
    name,
    marker
  }
}