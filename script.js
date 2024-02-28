const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
  // gameController.start();
});

// IIFE
const Gameboard = (()=>{
  let board = ['','','','','','','','','']

  function render(){
    board.forEach((square, index)=>{
      gameboard = document.querySelector('#gameboard');
      newTile = document.createElement('div');
      newTile.classList.add("square");
      newTile.id = `square-${index}`;
      newTile.textContent = `${square}`;
      gameboard.appendChild(newTile);
    })
  }

  return {render}

})();

const gameController = (()=>{
  let players = [];
  let curentPlayerIndex;
  let gameOver = false;

  const start = () => {
    let one = document.querySelector('#player-one').value
    let two = document.querySelector('#player-two').value
    players = [
      createPlayer(one, 'X'),
      createPlayer(two, 'O')
    ]

    curentPlayerIndex = 0;
  }

})();

const createPlayer = (name, marker) => {
  return {
    name,
    marker
  }
}