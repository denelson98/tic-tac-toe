const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
  gameController.start();
});

// IIFE
const Gameboard = (()=>{
  let board = ['','','','','','','','','']
  let gameboard = document.querySelector('#gameboard');

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

  return {
    render,
    update
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
    Gameboard.update(index, players[currentPlayerIndex].marker)
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