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
    squareList = document.createElement('div');
    board.forEach((square, index)=>{
      square = document.createElement('div');
      square.classList.add('square');
      square.id = `${index}`;
      squareList.appendChild(square)
    })
  }
  gameboard.appendChild(squareList)

  return {
    render
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

   return {
    start
   }
})();

// factory
const createPlayer = (name, marker) => {
  return {
    name,
    marker
  }
}